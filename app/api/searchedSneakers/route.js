import { getProducts, prisma } from "@/app/_lib/data-service";

import { NextResponse } from "next/server";

export const GET = async function (request) {
  const searchedSneaker =
    request.nextUrl.searchParams.get("user-search")?.trim() ?? "";

  const parsedPrice = Number(searchedSneaker);
  const isPrice = searchedSneaker !== "" && Number.isFinite(parsedPrice);

  const searchSneakers = async (query) =>
    await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { brand: { contains: query, mode: "insensitive" } },
          { color: { contains: query, mode: "insensitive" } },
          ...(isPrice ? [{ price: { equals: parsedPrice } }] : []),
        ],
      },
    });

  const product = await searchSneakers(searchedSneaker);

  // const products = await getProducts(searchedSneaker);

  return NextResponse.json(product);
};
