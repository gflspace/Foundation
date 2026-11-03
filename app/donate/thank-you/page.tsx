import type { Metadata } from "next";
import { HeartHandshake } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

export default function ThankYouPage() {
  return (
    <section className="container-page grid min-h-[80vh] place-items-center pb-16 pt-32 text-center">
      <div className="max-w-lg">
        <HeartHandshake className="mx-auto h-14 w-14 text-emerald" aria-hidden />
        <h1 className="mt-6 text-4xl">Thank you for your gift</h1>
        <p className="mt-4 text-lg text-navy/70">A receipt is on its way to your inbox. Your generosity is already becoming meals, school places and safe nights for the people we serve.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/projects" className="btn-emerald">See the work you support</Link>
          <Link href="/" className="btn-outline">Back home</Link>
        </div>
      </div>
    </section>
  );
}
