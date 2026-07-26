import { prisma } from "../../../_lib/data-service";
import { stripe } from "../../../_lib/stripe";

export const runtime = "nodejs";

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return new Response("Invalid webhook signature", { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const orderID = Number(session.metadata?.orderID);
      const userID = Number(session.metadata?.userID);

      if (!Number.isInteger(orderID) || !Number.isInteger(userID)) {
        console.error("Stripe checkout session is missing valid order metadata", {
          sessionID: session.id,
          orderID: session.metadata?.orderID,
          userID: session.metadata?.userID,
        });
        return new Response("Missing order metadata", { status: 400 });
      }

      console.log("Marking order as paid:", orderID);

      await prisma.order.update({
        where: { id: orderID },
        data: { status: "PAID" },
      });

      const cart = await prisma.cart.findUnique({ where: { userID } });
      if (cart) {
        await prisma.cartItems.deleteMany({ where: { cartID: cart.id } });
      }
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object;
      const orderID = Number(session.metadata?.orderID);

      if (Number.isInteger(orderID)) {
        await prisma.order.update({
          where: { id: orderID },
          data: { status: "CANCELLED" },
        });
      }
    }
  } catch (error) {
    console.error("Stripe webhook processing failed:", error);
    return new Response("Webhook processing failed", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}
