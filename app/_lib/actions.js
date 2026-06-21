"use server";
import { getSneakers, getUser, prisma } from "./data-service";

// UpdateUser
export const updateUser = async function () {
  await prisma?.user?.update({
    where: { id: 1 },
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
    data: [
      { name: "John Doe", email: "john@example.com", role: "admin" },
      { name: "Sarah Johnson", email: "sarah@example.com" },
      { name: "Michael Smith", email: "michael@example.com" },
      { name: "Emma Brown", email: "emma@example.com" },
      { name: "David Wilson", email: "david@example.com" },
      { name: "Olivia Taylor", email: "olivia@example.com", role: "admin" },
      { name: "James Anderson", email: "james@example.com" },
      { name: "Sophia Thomas", email: "sophia@example.com", role: "admin" },
      { name: "Liam Martinez", email: "liam@example.com" },
      { name: "Isabella Lee", email: "isabella@example.com" },

      { name: "Noah Harris", email: "noah@example.com" },
      { name: "Mia Clark", email: "mia@example.com" },
      { name: "Lucas Lewis", email: "lucas@example.com" },
      { name: "Amelia Robinson", email: "amelia@example.com", role: "admin" },
      { name: "Ethan Walker", email: "ethan@example.com" },
      { name: "Ava Hall", email: "ava@example.com" },
      { name: "Benjamin Allen", email: "benjamin@example.com", role: "admin" },
      { name: "Charlotte Young", email: "charlotte@example.com" },
      { name: "Henry King", email: "henry@example.com" },
      { name: "Evelyn Wright", email: "evelyn@example.com" },

      { name: "Alexander Scott", email: "alex@example.com", role: "admin" },
      { name: "Harper Green", email: "harper@example.com" },
      { name: "Daniel Adams", email: "daniel@example.com" },
      { name: "Abigail Baker", email: "abigail@example.com" },
      { name: "Matthew Gonzalez", email: "matthew@example.com" },
      { name: "Ella Nelson", email: "ella@example.com" },
      { name: "Joseph Carter", email: "joseph@example.com" },
      { name: "Grace Mitchell", email: "grace@example.com", role: "admin" },
      { name: "Samuel Perez", email: "samuel@example.com" },
      { name: "Victoria Roberts", email: "victoria@example.com" },
    ],
  });
  if (error) throw new Error("Could Not Create Users. 😕");
};

// DeleteUser
export const deleteUser = async function () {
  const { error } = await prisma?.user?.deleteMany({});
  if (error) throw new Error("Could Not Delete. 😕");
};

export const createProduct = async function () {
  const { error } = await prisma.product.create({
    data: {
      name: "Nike Air Force 55",
      brand: "Nike",
      color: "White",
      size: 42,
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

export const createProducts = async function () {
  const { error } = await prisma.product.createMany({
    data: [
      {
        name: "Adidas Ultraboost",
        brand: "Adidas",
        color: "Black",
        size: 43,
        price: 2800,
        description: "Responsive running shoe with Boost cushioning.",
        image: "/ultraboost.jpg",
        category: "Running",
        wishlist: true,
        rate: 4.7,
        sale: false,
        discount: 0,
        numRemaining: 9,
        reviews: "Excellent comfort for long walks.",
        addToCart: false,
      },

      {
        name: "Jordan Retro 4",
        brand: "Jordan",
        color: "Red",
        size: 44,
        price: 4500,
        description: "Iconic basketball sneaker with retro styling.",
        image: "/retro4.jpg",
        category: "Basketball",
        wishlist: false,
        rate: 4.9,
        sale: true,
        discount: 10,
        numRemaining: 5,
        reviews: "One of the best Jordans ever made.",
        addToCart: false,
      },

      {
        name: "Puma RS-X",
        brand: "Puma",
        color: "Blue",
        size: 41,
        price: 1800,
        description: "Bold chunky sneaker with modern design.",
        image: "/rsx.jpg",
        category: "Lifestyle",
        wishlist: true,
        rate: 4.4,
        sale: false,
        discount: 0,
        numRemaining: 20,
        reviews: "Stylish and lightweight.",
        addToCart: false,
      },

      {
        name: "New Balance 550",
        brand: "New Balance",
        color: "Grey",
        size: 42,
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
    ],
  });
  if (error) throw Error("Could Not Create Products. 😕");
};

export const updateProduct = async function () {
  const { error } = await prisma.product.update({
    data: {
      name: "hrbfwhfbwf",
      brand: "fbwuhfuhf",
      color: "Grey",
      size: 42,
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

const sneakers = [];

export const updateProducts = async function () {
  const { error } = await prisma.product.updateMany({
    data: [],
  });
  if (error) throw new Error("Could Not Update Products. 😕");
};

export const addToCart = async function (userID, productID) {
  const { role } = await getUser(userID);
  if (role === "admin") return;
  const { error } = await prisma.product.update({ data: { addToCart: true } });
  if (error) throw new Error("Could Not Add To Cart. 😕");
};

export const deleteProduct = async function (productID) {
  const { error } = await prisma.product.delete({ where: { id: productID } });
  if (error) throw new Error("Could Not Delete Product. 😕");
};

export const deleteProducts = async function () {
  const [error] = await prisma.product.deleteMany({});
  if (error) throw new Error("Could Not Delete Products. 😕");
};
