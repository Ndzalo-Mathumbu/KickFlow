import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });

export const getUser = async function (userID) {
  const user = await prisma.user.findUnique({ where: { id: Number(userID) } });
  return user;
};

export const getProduct = async function (productID) {
  const product = await prisma.product.findUnique({
    where: { id: Number(productID) },
  });
  return product;
};

export const getCart = async function (userID) {
  const cart = await prisma.cart.findUnique({
    where: { userID: Number(userID) },
  });
  return cart;
};

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
/* const shoe = await getProduct(99);
console.log(shoe); */
