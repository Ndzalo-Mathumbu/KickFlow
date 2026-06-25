import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { createCheckoutSession } from "./stripe";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });

//Get User Data
export const getUser = async function (userID) {
  const user = await prisma.user.findUnique({ where: { id: Number(userID) } });
  return user;
};

//Get Product Data
export const getProduct = async function (productID) {
  const product = await prisma.product.findUnique({
    where: { id: Number(productID) },
  });
  return product;
};

//Get Cart Data
export const getCart = async function (userID) {
  const cart = await prisma.cart.findUnique({
    where: { userID: Number(userID) },
  });
  return cart;
};

//Get CartItems Data
export const getCartItems = async function (productID, cartID) {
  const itemsInCart = await prisma.cartItems.findUnique({
    where: {
      cartID_productID: {
        productID: Number(productID),
        cartID: Number(cartID),
      },
    },
  });
  return itemsInCart;
};

//Find All Products In Cart For OrderItems
export const getAllCartitems = async function (userID) {
  const { id: cartID } = await getCart(Number(userID));
  const itemsInCart = await prisma.cartItems.findMany({
    where: { cartID: Number(cartID) },
    include: { product: true },
  });
  return itemsInCart;
};

//Get User Address
export const getUserAddress = async function (id) {
  const userAddress = await prisma.address.findFirst({
    where: { id: Number(id) },
  });
  return userAddress;
};

//Find the first address created by user so it's the one in order by default
export const getFirstCreatedAddress = async function (userID) {
  const firstUserAddress = await prisma.address.findFirst({
    orderBy: { createdAt: "asc" },
    where: { userID: Number(userID) },
  });
  return firstUserAddress;
};

// Get duplicated address
export const getDuplicateAddress = async function (
  country,
  postalCode,
  city,
  street,
  userID,
) {
  const addressExist = await prisma.address.findFirst({
    where: { country, postalCode, city, street, userID },
  });
  return addressExist;
};

export const getTotalProductPrice = async function (userID) {
  const { id: cartID } = await getCart(Number(userID));
  const totalPrice = await prisma.cart.findUnique({
    where: { id: Number(cartID) },
    include: { items: { include: { product: true } } },
  });

  const accumulatedPrice = totalPrice.items.reduce((accum, cur) => {
    return accum + cur.product.price * cur.quantity;
  }, 0);

  return accumulatedPrice;
};

export const getOrder = async function (userID) {
  const orderAvailable = await prisma.order.findUnique({ where: { userID } });
  return orderAvailable;
};
