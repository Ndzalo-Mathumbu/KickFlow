import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });

export const getUser = async function (userID) {
  const user = await prisma.user.findUnique({ where: { id: userID } });
  return user;
};

export const getProduct = async function (productID) {
  const product = await prisma.product.findUnique({ where: { id: productID } });
  return product;
};

export const getCart = async function (userID) {
  const cart = await prisma.cart.findUnique({ where: { userID } });
  return cart;
};
const { id } = await getCart(84);
console.log(id);
const items = await prisma.cartItems.findMany();
console.log(items);
const shoe = await getProduct(99);
console.log(shoe);
