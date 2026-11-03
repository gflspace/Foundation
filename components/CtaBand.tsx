import Link from "next/link";
import { DonateButton } from "./DonateProvider";

export function CtaBand() {
  return (
    <section className="container-page py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald to-navy px-6 py-14 text-center text-white sm:px-12 sm:py-20">
        <div aria-hidden className="grain absolute inset-0" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl sm:text-4xl">Every gift becomes a meal, a classroom seat, a safe night’s sleep.</h2>
          <p className="mt-4 text-white/80">Give once or monthly — by card, PayPal or Mobile Money.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <DonateButton className="btn bg-white px-8 py-4 text-base text-navy hover:bg-ivory">Donate now</DonateButton>
            <Link href="/donate#involve" className="btn border border-white/30 px-8 py-4 text-base hover:bg-white/10">Volunteer or partner</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
