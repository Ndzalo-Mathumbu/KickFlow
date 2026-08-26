import { getProducts } from "@/app/_lib/data-service";
import { NextResponse } from "next/server";

export const GET = async function () {
  const products = await getProducts();
  return NextResponse.json(products);
};
