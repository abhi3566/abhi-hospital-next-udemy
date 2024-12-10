"use server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const getStripePaymentIntent = async (amount: number) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      description: "SHEY-HOSPITAL APPOINTMENT",
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(paymentIntent)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};