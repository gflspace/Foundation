import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How the ${site.name} collects, uses and protects your personal information.`,
  alternates: { canonical: "/privacy" },
};

// TODO(legal): have counsel review before launch, and add the Foundation's registered name and address.
export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="November 2026">
      <p>
        The {site.name} (“we”, “us”) respects your privacy. This policy explains what personal information we collect
        through this website, why we collect it, and the choices you have.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Donations:</strong> your name, email address, billing details and gift amount. Card, PayPal and Mobile Money payments are processed by Stripe, PayPal and Flutterwave; we never see or store your full card number or wallet PIN.</li>
        <li><strong>Volunteer and partnership applications:</strong> the details you enter in the form, such as name, email, phone, location or organisation, area of interest and message.</li>
        <li><strong>Newsletter:</strong> your email address.</li>
        <li><strong>Technical data:</strong> standard server logs (IP address, browser type, pages requested) kept by our hosting provider for security and troubleshooting.</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        This website does not use advertising or analytics cookies. Our payment providers may set strictly necessary
        cookies on their own checkout pages to process your payment securely.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To process donations, issue receipts and, where you choose, manage recurring gifts.</li>
        <li>To respond to volunteer and partnership applications.</li>
        <li>To send the newsletter you signed up for. Every email has an unsubscribe link.</li>
        <li>To meet our legal, accounting and safeguarding obligations.</li>
      </ul>
      <p>We do not sell, rent or trade your personal information.</p>

      <h2>Who we share it with</h2>
      <p>
        Only with service providers who help us operate: payment processors (Stripe, PayPal, Flutterwave), our website
        host, and our email and form-handling tools. Each may use your data only to provide their service to us. We may
        also disclose information where the law requires it.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Donation records are kept for as long as accounting and tax law requires. Applications and newsletter
        subscriptions are kept until you ask us to delete them, or until they are no longer needed.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask to see, correct or delete the personal information we hold about you, or to stop receiving
        emails, at any time. Write to <a href={`mailto:${site.email}`}>{site.email}</a> and we will respond within 30 days.
      </p>

      <h2>Children</h2>
      <p>
        This website is not directed at children under 16, and we do not knowingly collect their personal information
        online. Information about the young people in our programmes is handled offline under our safeguarding policy.
      </p>

      <h2>Changes</h2>
      <p>We may update this policy. The date at the top shows when it last changed.</p>

      <h2>Contact</h2>
      <p>
        Questions about privacy: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
