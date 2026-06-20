"use server";
import { prisma } from "./data-service";

export const UpdateUser = async function () {
  await prisma.user.update({
    where: { id: 1 },
    data: { name: "Ndzalo NK", email: "ndzalo@gmail.com" },
  });
};

export const UpdateUsers = async function () {
  await prisma.user.updateMany({ data: { name: "newName" } });
};

export const CreateUser = async function () {
  await prisma.user.create({
    data: {
      name: "john doe",
      email: "doe@gmail.com",
      avatar: "ooooooo",
    },
  });
};

export const CreateUsers = async function () {
  await prisma.user.createMany({
    data: [
      { name: "John Doe", email: "john@example.com" },
      { name: "Sarah Johnson", email: "sarah@example.com" },
      { name: "Michael Smith", email: "michael@example.com" },
      { name: "Emma Brown", email: "emma@example.com" },
      { name: "David Wilson", email: "david@example.com" },
      { name: "Olivia Taylor", email: "olivia@example.com" },
      { name: "James Anderson", email: "james@example.com" },
      { name: "Sophia Thomas", email: "sophia@example.com" },
      { name: "Liam Martinez", email: "liam@example.com" },
      { name: "Isabella Lee", email: "isabella@example.com" },

      { name: "Noah Harris", email: "noah@example.com" },
      { name: "Mia Clark", email: "mia@example.com" },
      { name: "Lucas Lewis", email: "lucas@example.com" },
      { name: "Amelia Robinson", email: "amelia@example.com" },
      { name: "Ethan Walker", email: "ethan@example.com" },
      { name: "Ava Hall", email: "ava@example.com" },
      { name: "Benjamin Allen", email: "benjamin@example.com" },
      { name: "Charlotte Young", email: "charlotte@example.com" },
      { name: "Henry King", email: "henry@example.com" },
      { name: "Evelyn Wright", email: "evelyn@example.com" },

      { name: "Alexander Scott", email: "alex@example.com" },
      { name: "Harper Green", email: "harper@example.com" },
      { name: "Daniel Adams", email: "daniel@example.com" },
      { name: "Abigail Baker", email: "abigail@example.com" },
      { name: "Matthew Gonzalez", email: "matthew@example.com" },
      { name: "Ella Nelson", email: "ella@example.com" },
      { name: "Joseph Carter", email: "joseph@example.com" },
      { name: "Grace Mitchell", email: "grace@example.com" },
      { name: "Samuel Perez", email: "samuel@example.com" },
      { name: "Victoria Roberts", email: "victoria@example.com" },
    ],
  });
};

export const DeleteUser = async function () {
  await prisma.user.deleteMany({ where: { id: 32 } });
};
