import { NextResponse } from "next/server";
import Stripe from "stripe";
import { projectSlugs, site } from "@/lib/content";
import en from "@/lib/i18n/dictionaries/en";
import fr from "@/lib/i18n/dictionaries/fr";

export const runtime = "nodejs";

const ZERO_DECIMAL = new Set(["XAF"]);
const LIMITS = { USD: { min: 5, max: 50_000 }, XAF: { min: 1_000, max: 30_000_000 } } as const;

const MSG = {
  en: { setup: "Card donations are being set up. Please try PayPal or Mobile Money.", invalid: "Invalid request.", range: "Please enter an amount between {min} and {max} {cur}.", failed: "We couldn’t start checkout. Please try again.", donation: "Donation" },
  fr: { setup: "Le don par carte est en cours de mise en place. Merci d’utiliser PayPal ou Mobile Money.", invalid: "Requête invalide.", range: "Merci d’indiquer un montant entre {min} et {max} {cur}.", failed: "Impossible de lancer le paiement. Merci de réessayer.", donation: "Don" },
};

export async function POST(req: Request) {
  let body: { amount?: unknown; currency?: unknown; frequency?: unknown; programme?: unknown; locale?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: MSG.en.invalid }, { status: 400 });
  }
  const locale = body.locale === "fr" ? "fr" : "en";
  const m = MSG[locale];
  const t = locale === "fr" ? fr : en;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: m.setup }, { status: 503 });

  const currency = body.currency === "XAF" ? "XAF" : "USD";
  const amount = Number(body.amount);
  const { min, max } = LIMITS[currency];
  if (!Number.isFinite(amount) || amount < min || amount > max) {
    return NextResponse.json({ error: m.range.replace("{min}", String(min)).replace("{max}", String(max)).replace("{cur}", currency) }, { status: 400 });
  }
  const monthly = body.frequency === "monthly";
  const slug = projectSlugs.find((s) => s === body.programme);
  const programmeName = slug ? t.projects[slug].title : t.form.greatestNeed;
  const prefix = locale === "fr" ? "/fr" : "";

  const stripe = new Stripe(key);
  const origin = req.headers.get("origin") ?? site.url;
  const unitAmount = ZERO_DECIMAL.has(currency) ? Math.round(amount) : Math.round(amount * 100);

  try {
    const session = await stripe.checkout.sessions.create({
      locale,
      mode: monthly ? "subscription" : "payment",
      submit_type: monthly ? undefined : "donate",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: currency.toLowerCase(),
            unit_amount: unitAmount,
            product_data: { name: `${m.donation} — ${programmeName}`, description: t.meta.siteName },
            ...(monthly ? { recurring: { interval: "month" as const } } : {}),
          },
        },
      ],
      metadata: { programme: slug ?? "greatest-need", locale },
      success_url: `${origin}${prefix}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${prefix}/donate`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error", err);
    return NextResponse.json({ error: m.failed }, { status: 502 });
  }
}
