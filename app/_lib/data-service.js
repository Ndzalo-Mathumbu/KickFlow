import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });

export const getUser = async function (userID) {
  const user = await prisma.user.findUnique({ where: { id: userID } });
  return user;
};
