import { prisma } from "../../../_lib/data-service";
import { stripe } from "../../../_lib/stripe";

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("SESSION:", session);

    const orderID = Number(session.metadata.orderID);

    await prisma.order.update({
      where: { id: orderID },
      data: { status: "PAID" },
    });
    await prisma.cartItems.deleteMany({});
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object;

    const orderID = Number(session.metadata.orderID);

    await prisma.order.update({
      where: { id: orderID },
      data: { status: "CANCELLED" },
    });
  }

  return new Response("OK", { status: 200 });
}
