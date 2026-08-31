import { getProducts } from "@/app/_lib/data-service";
import { NextResponse } from "next/server";

export const GET = async function (request) {
  const brand = request.nextUrl.searchParams.getAll(`brand`);
  console.log(brand, `BRANDY`);
  // const brand = "Nike";
  if (brand.length === 0) {
    console.log(brand, `NO BRAND`);

    const products = await getProducts();
    return NextResponse.json(products);
  }
  if (brand) {
    const products = await getProducts(brand);
    console.log(brand, `IS BRAND`);

    return NextResponse.json(products);
  }
};
