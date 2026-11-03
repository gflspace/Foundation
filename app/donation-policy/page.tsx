import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Donation Terms & Refund Policy",
  description: `How donations to the ${site.name} are processed, used and refunded.`,
  alternates: { canonical: "/donation-policy" },
};

// TODO(legal): confirm tax-deductibility wording for each country before launch.
export default function DonationPolicyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Donation Terms & Refund Policy" updated="November 2026">
      <p>Thank you for supporting the {site.name}. These terms apply to every gift made through this website.</p>

      <h2>How your gift is used</h2>
      <p>
        If you choose a programme, your gift is restricted to that programme. If you choose “Where it’s needed most”,
        we direct it to the programme with the greatest need at the time. If a restricted programme is fully funded or
        cannot go ahead, we will use the gift for the closest similar purpose.
      </p>

      <h2>Payment processing</h2>
      <p>
        Card payments are processed by Stripe, PayPal payments by PayPal, and MTN MoMo and Orange Money payments by
        Flutterwave. Each provider may charge a small processing fee, which is deducted before the funds reach us.
      </p>

      <h2>Receipts</h2>
      <p>An emailed receipt is sent for every successful donation. Keep it for your records.</p>

      <h2>Monthly gifts</h2>
      <p>
        Monthly card gifts are charged on the same day each month until you cancel. To change or cancel a monthly gift,
        email <a href={`mailto:${site.email}`}>{site.email}</a> or use the link in your receipt. Cancellation takes
        effect before the next payment.
      </p>

      <h2>Refunds</h2>
      <p>
        If you made a mistake, for example the wrong amount or a duplicate payment, contact us within 30 days at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> with your receipt and we will refund it in full. After 30 days, or once
        funds have been committed to a programme, we may not be able to issue a refund.
      </p>

      <h2>Tax</h2>
      <p>
        Whether your gift is tax-deductible depends on the laws of your country. Please check with a tax adviser. We
        will provide any documentation we can.
      </p>

      <h2>Security and fraud</h2>
      <p>
        We do not store card details. We may decline or refund gifts that appear fraudulent, or that come from sources
        we cannot lawfully accept.
      </p>

      <h2>Contact</h2>
      <p>Questions about a donation: <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </LegalPage>
  );
}
