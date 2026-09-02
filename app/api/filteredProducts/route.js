import { getProducts } from "@/app/_lib/data-service";
import { NextResponse } from "next/server";

export const GET = async function (request) {
  const urlParameters = function (value) {
    return request.nextUrl.searchParams.getAll(value);
  };
  const urlParameter = function (value) {
    return request.nextUrl.searchParams.get(value);
  };

  const brand = urlParameters(`brand`);
  const category = urlParameters(`category`);
  const colour = urlParameters(`colour`);
  const size = urlParameters(`size`);
  const min_Price = urlParameters(`min_price`);
  const max_Price = urlParameters(`max_price`);
  const stock = urlParameters(`stock`);
  const sale = urlParameter(`sale`);

  console.log(brand, `BRANDY`);
  console.log(category, `category`);

  const products = await getProducts(
    brand,
    category,
    colour,
    size,
    min_Price,
    max_Price,
    stock,
    sale,
  );

  return NextResponse.json(products);
};
