"use server";
import { redirect } from "next/navigation";
import {
  getAllCartitems,
  getCart,
  getCartItems,
  getDuplicateAddress,
  getFirstCreatedAddress,
  getOrder,
  getProduct,
  getTotalProductPrice,
  getUser,
  getUserAddress,
  prisma,
} from "./data-service";
import { createCheckoutSession } from "./stripe";
import { authOptions } from "../_lib/auth";
import { getServerSession } from "next-auth";
import z, { success } from "zod";
import bcrypt from "bcryptjs";
import { VerifyEmail, WelcomeEmail } from "./email";
import { addMinutes } from "date-fns";

const getCurrentUser = async function () {
  const session = await getServerSession(authOptions);
  const userID = Number(session?.user?.id);
  console.log(session, `this is a user session...`);

  if (!Number.isInteger(userID)) {
    throw new Error("You must be signed in to perform this action 😕.");
  }

  const user = await getUser(userID);
  if (!user) {
    throw new Error(
      "Your account no longer exists. Please sign out and sign in again 😕.",
    );
  }

  return { session, user, userID };
};

// UpdateUser
export const updateUser = async function () {
  const { session, userID } = await getCurrentUser();

  await prisma?.user?.update({
    where: { id: userID },
    data: { name: session.user.name, email: session.user.email, role: "ADMIN" },
  });
};

// UpdateUsers
export const updateUsers = async function () {
  const { error } = await prisma.user.updateMany({
    data: { name: "newName", role: "ADMIN" },
  });
  if (error) {
    throw new Error("Could Not Update Users. 😕");
  }
};

const generateToken = async function (email) {
  const verificationToken = crypto.randomUUID();
  await prisma.user.update({
    where: { email },
    data: { verificationToken },
  });
  return verificationToken;
};

// CreateUser
export const createUser = async function (formData) {
  const getFormDataValue = function (input) {
    const value = formData.get(input);
    return value;
  };

  const dataFromForm = {
    fullName: getFormDataValue("fullName"),
    email: getFormDataValue("email"),
    password: getFormDataValue("password"),
  };

  const createUserSchemaZOD = z.object({
    fullName: z
      .string()
      .min(2, "FullName must be at least two(2) characters 😕."),
    email: z.string().email("Email is required 😕."),
    password: z
      .string()
      .min(8, "Password must have at least 8 characters 😕.")
      .regex(/[A-Z]/, "Password must include an uppercase letter 😕.")
      .regex(/[a-z]/, "Password must include a lowercase letter 😕.")
      .regex(/[0-9]/, "Password must include a number 😕.")
      .regex(/[^A-Za-z0-9]/, "Password must include a special character 😕."),
  });
  const validationResult = createUserSchemaZOD.safeParse(dataFromForm);
  const hashedPassword = await bcrypt.hash(dataFromForm.password, 10);
  if (!validationResult.success) {
    return {
      success: false,
      message: validationResult.error.issues[0].message,
    };
  }

  const emailExist = await prisma.user.findUnique({
    where: { email: dataFromForm.email },
  });

  if (emailExist) {
    return {
      success: false,
      message: `Email ${dataFromForm.email} already exist. Try signing in 😕.`,
    };
  }

  const { error } = await prisma.user.create({
    data: {
      name: dataFromForm.fullName,
      email: dataFromForm.email,
      password: hashedPassword,
    },
  });

  if (error) {
    throw new Error("Could Not Create User. 😕");
  }

  const token = await generateToken(dataFromForm.email);
  const expirationTime = addMinutes(new Date(), 15);
  await prisma.user.update({
    where: { email: dataFromForm.email },
    data: { verificationTokenExpires: expirationTime.toISOString() },
  });
  await WelcomeEmail(dataFromForm.email, dataFromForm.fullName);
  await VerifyEmail(dataFromForm.email, dataFromForm.fullName, token);
  return {
    success: true,
    message: "Welcome to KickFlow 🎉. Thanks for signing up 😀!",
  };
};

//validate user info before signing in
export const signInFormValidation = async function (formData) {
  const getFormDataValue = function (input) {
    const value = formData.get(input);
    return value;
  };

  const dataFromForm = {
    email: getFormDataValue("email"),
    password: getFormDataValue("password"),
  };

  const createUserSchemaZOD = z.object({
    email: z.string().email("Email is required 😕."),
    password: z
      .string()
      .min(8, "Password must have at least 8 characters 😕.")
      .regex(/[A-Z]/, "Password must include an uppercase letter 😕.")
      .regex(/[a-z]/, "Password must include a lowercase letter 😕.")
      .regex(/[0-9]/, "Password must include a number 😕.")
      .regex(/[^A-Za-z0-9]/, "Password must include a special character 😕."),
  });
  const validationResult = createUserSchemaZOD.safeParse(dataFromForm);
  if (!validationResult.success) {
    return {
      success: false,
      message: validationResult.error.issues[0].message,
    };
  }
  if (validationResult.success) {
    return {
      success: true,
    };
  }
};

export const newPasswordFormValidation = async function (formData) {
  const getFormDataValue = function (input) {
    const value = formData.get(input);
    return value;
  };

  const dataFromForm = {
    email: getFormDataValue("email"),
  };

  const createUserSchemaZOD = z.object({
    email: z.string().email("Email is required 😕."),
  });
  const validationResult = createUserSchemaZOD.safeParse(dataFromForm);
  if (!validationResult.success) {
    return {
      success: false,
      message: validationResult.error.issues[0].message,
    };
  }
  if (validationResult.success) {
    return {
      success: true,
    };
  }

  const userExist = await prisma.user.findUnique({
    where: { email: dataFromForm.email },
  });
  if (!userExist) {
    return {
      success: false,
      message: ``,
    };
  }
};

// CreateUsers
export const createUsers = async function () {
  const { error } = await prisma?.user?.createMany({
    data: [],
  });
  if (error) {
    throw new Error("Could Not Create Users. 😕");
  }
};

// Delete One user
export const deleteUser = async function () {
  const { userID } = await getCurrentUser();
  await prisma.user.delete({ where: { id: userID } });
};

// DeleteUsers
export const deleteUsers = async function () {
  await prisma.user.deleteMany({});
};

// Create One Product
export const createProduct = async function (formData) {
  const getFormDataValue = function (input) {
    const value = formData.get(input);
    return value;
  };
  const name = getFormDataValue("name");
  const brand = getFormDataValue("brand");
  const color = getFormDataValue("color");
  const size = getFormDataValue("size");
  const price = getFormDataValue("price");
  const description = getFormDataValue("description");
  const image = getFormDataValue("image");
  const category = getFormDataValue("category");
  const wishlist = getFormDataValue("wishlist");
  const rate = getFormDataValue("rate");
  const sale = getFormDataValue("sale");
  const discount = getFormDataValue("discount");
  const numRemaining = getFormDataValue("numRemaining");
  const reviews = getFormDataValue("reviews");

  const { error } = await prisma.product.create({
    data: {
      name: name,
      brand: brand,
      color: color,
      size: [size, size, size, size],
      price: price,
      description: description,
      image: image,
      category: category,
      wishlist: false,
      rate: rate,
      sale: true,
      discount: discount,
      numRemaining: numRemaining,
      reviews: reviews,
    },
  });
  if (error) throw new Error("Could Not Create Product. 😕");
};

// Create Many Products
export const createProducts = async function () {
  const { error } = await prisma.product.createMany({
    data: [],
  });
  if (error) {
    throw Error("Could Not Create Products. 😕");
  }
};

// Update One Product
export const updateProduct = async function (formData, productID) {
  const getFormDataValue = function (input) {
    const value = formData.get(input);
    return value;
  };
  const name = getFormDataValue("name");
  const brand = getFormDataValue("brand");
  const color = getFormDataValue("color");
  const size = getFormDataValue("size");
  const price = getFormDataValue("price");
  const description = getFormDataValue("description");
  const image = getFormDataValue("image");
  const category = getFormDataValue("category");
  const wishlist = getFormDataValue("wishlist");
  const rate = getFormDataValue("rate");
  const sale = getFormDataValue("sale");
  const discount = getFormDataValue("discount");
  const numRemaining = getFormDataValue("numRemaining");
  const reviews = getFormDataValue("reviews");

  const { error } = await prisma.product.update({
    where: { id: productID },
    data: {
      name: name,
      brand: brand,
      color: color,
      size: [size, size, size, size],
      price: price,
      description: description,
      image: image,
      category: category,
      wishlist: false,
      rate: rate,
      sale: true,
      discount: discount,
      numRemaining: numRemaining,
      reviews: reviews,
    },
  });
  if (error) throw new Error("Could Not Update Product. 😕");
};

// Update Many Products
export const updateProducts = async function () {
  const { error } = await prisma.product.updateMany({
    data: [],
  });
  if (error) throw new Error("Could Not Update Products. 😕");
};

// Delete One Product
export const deleteProduct = async function (productID) {
  const { error } = await prisma.product.delete({ where: { id: productID } });
  if (error) throw new Error("Could Not Delete Product. 😕");
};

// Delete All Products
export const deleteProducts = async function () {
  await prisma.product.deleteMany({});
};

// Create a Cart
export const createCart = async function () {
  const { userID } = await getCurrentUser();
  await prisma.cart.create({ data: { userID } });
};

//Create Cart Items or Add items to cart
export const createCartItems = async function (productID) {
  const { userID } = await getCurrentUser();
  const cart = await getCart(userID);
  if (!cart) {
    throw new Error("No Cart Found. 😕");
  }
  const { id: cartID } = cart;

  await prisma.cartItems.upsert({
    where: {
      cartID_productID: {
        cartID: Number(cartID),
        productID: Number(productID),
      },
    },
    update: { quantity: { increment: 1 } },
    create: { cartID: Number(cartID), productID: Number(productID) },
  });
};

//Delete Cart Items
export const deleteCartItems = async function (formData) {
  const productID = formData.get("productID");
  const { userID } = await getCurrentUser();

  const cart = await getCart(userID);
  if (!cart) {
    throw new Error("Cart not found. 😕");
  }

  const { id: cartID } = cart;
  const cartItem = await getCartItems(productID, cartID);

  if (!cartItem) return;
  if (cartItem.quantity === 1) {
    await prisma.cartItems.delete({
      where: {
        cartID_productID: {
          cartID: Number(cartID),
          productID: Number(productID),
        },
      },
    });
  } else {
    await prisma.cartItems.update({
      where: {
        cartID_productID: {
          cartID: Number(cartID),
          productID: Number(productID),
        },
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
  }
};

// Add A Product To Cart
export const addToCart = async function (formData) {
  const getFormDataValue = function (input) {
    const value = formData.get(input);
    return value;
  };

  const productID = Number(getFormDataValue("productID"));
  const { user, userID } = await getCurrentUser();
  if (user.role === "ADMIN") return;

  const userHasCart = await getCart(userID);

  if (!userHasCart) {
    await prisma.cart.create({ data: { userID } });
  }

  await createCartItems(productID);
};

//Create Address
export const createAddress = async function (formData) {
  const { userID } = await getCurrentUser();

  const getFormDataValue = function (input) {
    const value = formData.get(input);
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(`Kindly fill in all the address fields. 😕`);
    }
    return value.trim();
  };

  const country = getFormDataValue("country");
  const city = getFormDataValue("city");
  const street = getFormDataValue("street");
  const postalCode = Number(getFormDataValue("postalCode"));

  if (!Number.isInteger(postalCode)) {
    throw new Error("postalCode must be a number 😕.");
  }

  const addressExist = await getDuplicateAddress(
    country,
    postalCode,
    city,
    street,
    userID,
  );

  if (addressExist) {
    throw new Error("Address already created 😕.");
  }

  const createdAddress = await prisma.address.create({
    data: { country, postalCode, city, street, userID },
  });
  return createdAddress;
};

//create orderItems
export const createOrderItems = async function (userID) {
  const order = await getOrder(userID);
  if (!order) {
    throw new Error("Order not found 😕.");
  }
  const orderID = order.id;
  const cartItemsAll = await getAllCartitems(userID);
  return cartItemsAll.map(async (a) => {
    await prisma.orderItems.create({
      data: {
        orderID,
        productID: a.productID,
        quantity: a.quantity,
        price: a.product.price,
      },
    });
  });
};

//Delete one orderItems
export const deleteOrderItem = async function (formData) {
  const orderItemID = formData.get("orderItemID");
  await prisma.orderItems.delete({ where: { id: Number(orderItemID) } });
};

export const deleteOrderItems = async function () {
  await prisma.orderItems.deleteMany({});
};

//Checkout
export const checkout = async function (formData) {
  const { userID } = await getCurrentUser();
  const cart = await getCart(userID);
  if (!cart) throw new Error("Cart not found 😕.");

  const firstAddressCreated = await getFirstCreatedAddress(userID);
  if (!firstAddressCreated) {
    throw new Error(
      "Could not find your address. Try selecting manually or creating an address. 😕",
    );
  }

  const totalProductPrice = await getTotalProductPrice(userID);
  const order = await getOrder(userID);

  if (order) {
    const { id: orderID, userID: orderUserID } = await prisma.order.update({
      where: { id: order.id },
      data: { totalPrice: totalProductPrice },
    });
    const cartItemsAll = await getAllCartitems(userID);
    const checkoutSession = await createCheckoutSession(
      orderID,
      orderUserID,
      cartItemsAll,
    );
    await createOrderItems(userID);
    redirect(checkoutSession?.url);
  }
  if (!order) {
    const { id: orderID, userID: orderUserID } = await prisma.order.create({
      data: {
        addressID: firstAddressCreated.id,
        userID: firstAddressCreated.userID,
        totalPrice: totalProductPrice,
      },
    });
    const cartItemsAll = await getAllCartitems(userID);
    const checkoutSession = await createCheckoutSession(
      orderID,
      orderUserID,
      cartItemsAll,
    );
    await createOrderItems(userID);
    redirect(checkoutSession?.url);
  }
};

export const selectAddress = async function (formData) {
  const { userID } = await getCurrentUser();

  const getFormDataValue = function (input) {
    const value = formData.get(input);
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(`${input} is required 😕.`);
    }
    return value.trim();
  };

  const preferedAddress = getFormDataValue("preferedAddress");

  if (!preferedAddress || !Number.isInteger(Number(preferedAddress))) {
    throw new Error("Please select a delivery address. 😕");
  }

  const selectedAddress = await getUserAddress(preferedAddress);

  if (!selectedAddress || selectedAddress.userID !== userID) {
    throw new Error("Selected address not found. 😕");
  }

  await prisma.order.upsert({
    where: { userID },
    update: {
      addressID: selectedAddress.id,
    },
    create: {
      userID: selectedAddress.userID,
      addressID: selectedAddress.id,
    },
  });
};
