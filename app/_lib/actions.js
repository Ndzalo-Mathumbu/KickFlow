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

const session = await getServerSession(authOptions);
console.log(session, "test session...");

// UpdateUser
export const updateUser = async function () {
  await prisma?.user?.update({
    where: { id: session.user.id },
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
  await prisma.user.delete({ where: { id: session.user.id } });
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
  await prisma.cart.create({ data: { userID: Number(session.user.id) } });
};

//Create Cart Items or Add items to cart
export const createCartItems = async function (productID) {
  const cart = await getCart(session.user.id);
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

  const cart = await getCart(session.user.id);
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

  const userID = Number(getFormDataValue("userID"));
  const productID = Number(getFormDataValue("productID"));

  const { role } = await getUser(session.user.id);
  if (role === "ADMIN") return;

  const userHasCart = await getCart(session.user.id);

  if (!userHasCart) {
    await prisma?.cart?.create({ data: { userID: session.user.id } });
  }

  await createCartItems(productID, session.user.id);
};

//Create Address
export const createAddress = async function (formData) {
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
    throw new Error("postalCode must be a number.");
  }

  const addressExist = await getDuplicateAddress(
    country,
    postalCode,
    city,
    street,
    session.user.id,
  );

  if (addressExist) {
    throw new Error("Address already created.");
  }

  const createdAddress = await prisma.address.create({
    data: { country, postalCode, city, street, userID: session.user.id },
  });
  return createdAddress;
};

//create orderItems
export const createOrderItems = async function (cartID, productID) {
  const { id: orderID } = await getOrder(session.user.id);
  const cartItemsAll = await getAllCartitems(session.user.id);
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
  const getFormDataValue = function (input) {
    const value = formData.get(input);
    return value;
  };
  const productID = getFormDataValue("productID");

  const { id: cartID } = await getCart(Number(session.user.id));

  if (!Number.isInteger(session.user.id)) {
    throw new Error("userID must be a number.");
  }

  const firstAddressCreated = await getFirstCreatedAddress(session.user.id);
  if (!firstAddressCreated) {
    throw new Error(
      "Could not find your address. Try selecting manually or creating an address. 😕",
    );
  }

  const totalProductPrice = await getTotalProductPrice(session.user.id);
  const order = await getOrder(session.user.id);

  if (order) {
    const { id: orderID, userID: orderUserID } = await prisma.order.update({
      where: { id: order.id },
      data: { totalPrice: totalProductPrice },
    });
    const cartItemsAll = await getAllCartitems(session.user.id);
    const checkoutSession = await createCheckoutSession(
      orderID,
      orderUserID,
      cartItemsAll,
    );
    await createOrderItems(session.user.id, cartID, productID);
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
    const cartItemsAll = await getAllCartitems(session.user.id);
    const checkoutSession = await createCheckoutSession(
      orderID,
      orderUserID,
      cartItemsAll,
    );
    await createOrderItems(session.user.id, cartID, productID);
    redirect(checkoutSession?.url);
  }
};

export const selectAddress = async function (formData) {
  const getFormDataValue = function (input) {
    const value = formData.get(input);
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(`${input} is required.`);
    }
    return value.trim();
  };

  const preferedAddress = getFormDataValue("preferedAddress");

  if (!Number.isInteger(session.user.id)) {
    throw new Error("userID must be a number.");
  }

  if (!preferedAddress || !Number.isInteger(Number(preferedAddress))) {
    throw new Error("Please select a delivery address. 😕");
  }

  const selectedAddress = await getUserAddress(preferedAddress);

  if (!selectedAddress || selectedAddress.userID !== session.user.id) {
    throw new Error("Selected address not found. 😕");
  }

  await prisma.order.upsert({
    where: { userID: session.user.id },
    update: {
      addressID: selectedAddress.id,
    },
    create: {
      userID: selectedAddress.userID,
      addressID: selectedAddress.id,
    },
  });
};
