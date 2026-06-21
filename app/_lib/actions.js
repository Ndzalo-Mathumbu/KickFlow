"use server";
import { getCart, getUser, prisma } from "./data-service";

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

export const createCart = async function (formData, userID) {
  const id = formData.get("test");
  await prisma.cart.create({ data: { userID: Number(id) } });
};
// Add A Product To Cart
export const addToCart = async function (
  formData,
  userID,
  productID,
  cartIDDD,
) {
  const id = formData?.get("test");
  const Pid = formData?.get("test2");

  const { role } = await getUser(Number(id));
  if (role === "ADMIN") return;

  const userHasCart = await prisma?.cart?.findUnique({
    where: { userID: Number(id) },
  });

  if (userHasCart) return;
  await prisma?.cart?.create({ data: { userID: Number(id) } });
  // const { idd } = await getCart(Number(id));

  const { error } = await prisma?.product?.update({
    where: { id: Number(Pid) },
    data: { addToCart: true },
  });
  /* await prisma?.cartItems?.create({
    data: { productID: Number(Pid), cartID: idd },
  }); */

  if (error) throw new Error("Could Not Add To Cart. 😕");
};
