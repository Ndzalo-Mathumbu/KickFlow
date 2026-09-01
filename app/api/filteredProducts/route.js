import { getProducts } from "@/app/_lib/data-service";
import { NextResponse } from "next/server";

export const GET = async function (request) {
  const urlParameter = function (value) {
    return request.nextUrl.searchParams.getAll(value);
  };
  const brand = urlParameter(`brand`);
  const category = urlParameter(`category`);

  console.log(brand, `BRANDY`);
  console.log(category, `category`);

  const products = await getProducts(brand, category);
  console.log(brand, `IS BRAND`);

  return NextResponse.json(products);
};
