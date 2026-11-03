import { NextResponse } from "next/server";
import Stripe from "stripe";
import { projects, site } from "@/lib/content";

export const runtime = "nodejs";

const ZERO_DECIMAL = new Set(["XAF"]);
const LIMITS = { USD: { min: 5, max: 50_000 }, XAF: { min: 1_000, max: 30_000_000 } } as const;

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ error: "Card donations are being set up. Please try PayPal or Mobile Money." }, { status: 503 });
  }

  let body: { amount?: unknown; currency?: unknown; frequency?: unknown; programme?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const currency = body.currency === "XAF" ? "XAF" : "USD";
  const amount = Number(body.amount);
  const { min, max } = LIMITS[currency];
  if (!Number.isFinite(amount) || amount < min || amount > max) {
    return NextResponse.json({ error: `Please enter an amount between ${min} and ${max} ${currency}.` }, { status: 400 });
  }
  const monthly = body.frequency === "monthly";
  const programme = projects.find((p) => p.slug === body.programme);
  const programmeName = programme?.title ?? "Where it’s needed most";

  const stripe = new Stripe(key);
  const origin = req.headers.get("origin") ?? site.url;
  const unitAmount = ZERO_DECIMAL.has(currency) ? Math.round(amount) : Math.round(amount * 100);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: monthly ? "subscription" : "payment",
      submit_type: monthly ? undefined : "donate",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: currency.toLowerCase(),
            unit_amount: unitAmount,
            product_data: { name: `Donation — ${programmeName}`, description: site.name },
            ...(monthly ? { recurring: { interval: "month" as const } } : {}),
          },
        },
      ],
      metadata: { programme: programme?.slug ?? "greatest-need" },
      success_url: `${origin}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error", err);
    return NextResponse.json({ error: "We couldn’t start checkout. Please try again." }, { status: 502 });
  }
}
