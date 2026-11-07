/**
 * Which online giving methods are switched on. Each needs its account configured in the
 * Hostinger environment variables (then a rebuild, as these are read at build time):
 *   card   NEXT_PUBLIC_CARD_DONATIONS=true  (and STRIPE_SECRET_KEY on the server)
 *   momo   NEXT_PUBLIC_FLUTTERWAVE_PAYMENT_LINK
 *   paypal NEXT_PUBLIC_PAYPAL_DONATE_BUTTON_ID
 * When none is on, the site shows "Contact us to give" instead of a checkout.
 */
export const givingMethods = {
  card: process.env.NEXT_PUBLIC_CARD_DONATIONS === "true",
  momo: Boolean(process.env.NEXT_PUBLIC_FLUTTERWAVE_PAYMENT_LINK),
  paypal: Boolean(process.env.NEXT_PUBLIC_PAYPAL_DONATE_BUTTON_ID),
};
export const onlineGiving = Object.values(givingMethods).some(Boolean);
export const givingEmail = "support@syndyemadefoundation.org";
