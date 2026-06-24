"use server";
import {
  getCart,
  getCartItems,
  getDuplicateAddress,
  getFirstCreatedAddress,
  getOrder,
  getTotalProductPrice,
  getUser,
  getUserAddress,
  prisma,
} from "./data-service";

// UpdateUser
export const updateUser = async function (userID) {
  await prisma?.user?.update({
    where: { id: userID },
    data: { name: "Ndzalo NK", email: "ndzalo@gmail.com", role: "admin" },
  });
};

// UpdateUsers
export const updateUsers = async function () {
  const { error } = await prisma?.user?.updateMany({
    data: { name: "newName", role: "admin" },
  });
  if (error) throw new Error("Could Not Update Users. 😕");
};

// CreateUser
export const createUser = async function () {
  const { error } = await prisma?.user?.create({
    data: {
      name: "john doe",
      email: "doe@gmail.com",
      avatar: "ooooooo",
      role: "admin",
    },
  });

  if (error) throw new Error("Could Not Create User. 😕");
};

// CreateUsers
export const createUsers = async function () {
  const { error } = await prisma?.user?.createMany({
    data: [],
  });
  if (error) throw new Error("Could Not Create Users. 😕");
};

// Delete One user
export const deleteUser = async function (userID) {
  await prisma?.user?.delete({ where: { id: userID } });
};

// DeleteUsers
export const deleteUsers = async function () {
  await prisma?.user?.deleteMany({});
};

// Create One Product
export const createProduct = async function () {
  const { error } = await prisma.product.create({
    data: {
      name: "Nike Air Force 55",
      brand: "Nike",
      color: "White",
      size: [5, 7, 8],
      price: 2200,
      description: "Classic everyday sneaker with premium leather design.",
      image: "/nike-airforce1.jpg",
      category: "Lifestyle",
      wishlist: false,
      rate: 4.3,
      sale: true,
      discount: 80,
      numRemaining: 12,
      reviews: "Very comfortable and clean design.",
      addToCart: false,
    },
  });
  if (error) throw new Error("Could Not Create Product. 😕");
};

// Create Many Products
export const createProducts = async function () {
  const { error } = await prisma.product.createMany({
    data: sneakers,
  });
  if (error) throw Error("Could Not Create Products. 😕");
};

// Update One Product
export const updateProduct = async function (productID) {
  const { error } = await prisma.product.update({
    where: { id: productID },
    data: {
      name: "hrbfwhfbwf",
      brand: "fbwuhfuhf",
      color: "Grey",
      size: [4, 5, 7, 8],
      price: 2600,
      description: "Retro-inspired sneaker with versatile styling.",
      image: "/nb550.jpg",
      category: "Lifestyle",
      wishlist: false,
      rate: 4.6,
      sale: true,
      discount: 20,
      numRemaining: 7,
      reviews: "Looks great with almost anything.",
      addToCart: false,
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
export const createCart = async function (formData) {
  const userID = formData.get("test");
  await prisma.cart.create({ data: { userID: Number(userID) } });
};

//Create Cart Items or Add items to cart
export const createCartItems = async function (productID, userID) {
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
  const userID = formData.get("test");
  const productID = formData.get("test2");

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

  const userID = Number(getFormDataValue("userID"));
  const productID = Number(getFormDataValue("productID"));

  const { role } = await getUser(userID);
  if (role === "ADMIN") return;

  const userHasCart = await getCart(userID);

  if (!userHasCart) {
    await prisma?.cart?.create({ data: { userID } });
  }

  await createCartItems(productID, userID);
  /* const totalProductPrice = await getTotalProductPrice(userID);

  const orderExist = await getOrder(userID);

  if (orderExist) {
    await prisma.order.update({
      where: { id: orderExist.id },
      data: { totalPrice: totalProductPrice },
    });
  } */
};

//Checkout
export const checkOut = async function (formData) {
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
  const userID = Number(getFormDataValue("userID"));

  if (!Number.isInteger(postalCode)) {
    throw new Error("postalCode must be a number.");
  }

  if (!Number.isInteger(userID)) {
    throw new Error("userID must be a number.");
  }

  const user = await getUser(userID);

  if (!user) {
    throw new Error("User not found. 😕");
  }

  const addressExist = await getDuplicateAddress(
    country,
    postalCode,
    city,
    street,
    userID,
  );

  if (addressExist) {
    throw new Error("Address already created.");
  }

  await prisma.address.create({
    data: { country, postalCode, city, street, userID },
  });

  const firstAddressCreated = await getFirstCreatedAddress(userID);
  if (!firstAddressCreated) {
    throw new Error("Could not find your address. Try selecting manually. 😕");
  }

  const totalProductPrice = await getTotalProductPrice(userID);

  await prisma.order.upsert({
    where: { userID },
    update: {
      addressID: firstAddressCreated.id,
      totalPrice: totalProductPrice,
    },
    create: {
      addressID: firstAddressCreated.id,
      userID: firstAddressCreated.userID,
      totalPrice: totalProductPrice,
    },
  });
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
  const userID = Number(getFormDataValue("userID"));

  if (!Number.isInteger(userID)) {
    throw new Error("userID must be a number.");
  }

  if (!preferedAddress || !Number.isInteger(Number(preferedAddress))) {
    throw new Error("Please select a delivery address. 😕");
  }

  const selectedAddress = await getUserAddress(preferedAddress);

  if (!selectedAddress || selectedAddress.userID !== userID) {
    throw new Error("Selected address not found. 😕");
  }

  const totalProductPrice = await getTotalProductPrice(userID);

  await prisma.order.upsert({
    where: { userID },
    update: {
      addressID: selectedAddress.id,
      totalPrice: totalProductPrice,
    },
    create: {
      userID: selectedAddress.userID,
      addressID: selectedAddress.id,
      totalPrice: totalProductPrice,
    },
  });
};
