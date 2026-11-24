import { pad, quote } from "../lib/ui";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className={`${pad} flex min-h-[85svh] flex-col justify-center bg-forest pt-40 text-bone`}>
      <p className="font-display text-xl font-bold text-palm">404</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">This page has moved, or never existed.</h1>
      <p className="mt-6 max-w-xl text-xl text-bone/85">Let’s get you back to the farm.</p>
      <div className="mt-10 flex flex-wrap gap-4 font-display">
        <a href="/" className={quote}>Back to home</a>
        <a href="/products" className="inline-block border-2 border-bone px-7 py-3 font-semibold hover:bg-bone hover:text-forest">See our products</a>
        <a href="/contact" className="inline-block border-2 border-bone px-7 py-3 font-semibold hover:bg-bone hover:text-forest">Contact us</a>
      </div>
    </main>
  );
}