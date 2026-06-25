import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

console.log(!!process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (order, cartItemsAll) => {
  console.log(order);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    payment_method_types: ["card"],

    line_items: cartItemsAll.map((item) => ({
      quantity: Number(item.quantity),

      price_data: {
        currency: "ZAR",

        unit_amount: Number(item.product.price) * 100,

        product_data: {
          name: item.product.name,
        },
      },
    })),

    metadata: {
      orderID: Number(order.id),
      userID: Number(order.userID),
    },

    success_url: `${process.env.NEXT_PUBLIC_URL}/success`,

    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
  });

  return session;
};
