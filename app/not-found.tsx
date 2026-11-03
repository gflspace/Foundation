import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[80vh] place-items-center pb-16 pt-32 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-4xl">This page has moved on</h1>
        <p className="mt-4 text-navy/65">But there’s still plenty of good to do.</p>
        <Link href="/" className="btn-gold mt-8">Return home</Link>
      </div>
    </section>
  );
}
