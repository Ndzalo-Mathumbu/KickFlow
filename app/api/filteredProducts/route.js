import { getProducts } from "@/app/_lib/data-service";
import { NextResponse } from "next/server";

export const GET = async function (request) {
  const urlParameter = function (value) {
    return request.nextUrl.searchParams.getAll(value);
  };

  const brand = urlParameter(`brand`);
  const category = urlParameter(`category`);
  const colour = urlParameter(`colour`);
  const size = urlParameter(`size`);
  const min_Price = urlParameter(`min_price`);
  const max_Price = urlParameter(`max_price`);

  console.log(brand, `BRANDY`);
  console.log(category, `category`);

  const products = await getProducts(
    brand,
    category,
    colour,
    size,
    min_Price,
    max_Price,
  );

  return NextResponse.json(products);
};
