import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { get } from "node:http";

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

//Get User Address
export const getUserAddress = async function (id) {
  const userAddress = await prisma.address.findFirst({
    where: { id: Number(id) },
  });
  return userAddress;
};

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

//Get User Addresses To Find User's Available addresses So user can select prefered delivery location
export const getUserAddresses = async function (userID) {
  const availableAddresses = await prisma.address.findMany({
    where: { userID },
  });
  return availableAddresses;
};

const foundAddresses = await getUserAddresses(119);
// console.log(foundAddresses, "testtttt");

/* const shoe = await getProduct(99);
console.log(shoe); */
