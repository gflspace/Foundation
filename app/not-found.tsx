import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80vh] place-items-center overflow-hidden bg-navy px-4 pb-16 pt-32 text-center text-white">
      <div aria-hidden className="grain absolute inset-0" />
      <div className="relative">
        <p className="eyebrow text-gold-400">404</p>
        <h1 className="mt-3 text-4xl">This page has moved on</h1>
        <p className="mt-4 text-white/70">But there’s still plenty of good to do.</p>
        <Link href="/" className="btn-gold mt-8">Return home</Link>
      </div>
    </section>
  );
}
