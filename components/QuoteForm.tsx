"use client";
import { useActionState } from "react";
import { submitQuote } from "../app/actions";

const f = "mt-1 w-full border-b-2 border-soil/40 bg-transparent py-2 focus:border-palm focus:outline-none";
const types = ["Wholesaler", "Distributor", "Retailer", "Food business", "Processor or manufacturer", "Trader or aggregator", "Other"];
const freq = ["One-off order", "Weekly", "Monthly", "Ongoing supply"];

export default function QuoteForm({ slug, product }: { slug: string; product: string }) {
  const [state, action, pending] = useActionState(submitQuote, { ok: false, message: "" });
  if (state.ok) return <p role="status" className="font-display text-3xl font-bold">{state.message}</p>;
  return (
    <form action={action} className="grid gap-6">
      <input type="hidden" name="slug" value={slug} />
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <p className="font-display text-xl font-bold">Quote for: {product}</p>
      <div className="grid gap-6 md:grid-cols-2">
        <label>Full name *<input name="name" required className={f} /></label>
        <label>Business name<input name="business" className={f} /></label>
        <label>Phone or WhatsApp *<input name="phone" type="tel" required className={f} /></label>
        <label>Email *<input name="email" type="email" required className={f} /></label>
        <label>Type of buyer<select name="type" className={f}><option value="">Choose</option>{types.map((t) => <option key={t}>{t}</option>)}</select></label>
        <label>Delivery location *<input name="location" required className={f} /></label>
        <label>Quantity needed *<input name="quantity" required placeholder="For example 500 kg or 2 truckloads" className={f} /></label>
        <label>How often?<select name="frequency" className={f}><option value="">Choose</option>{freq.map((t) => <option key={t}>{t}</option>)}</select></label>
      </div>
      <label>Needed by (date or period)<input name="needed" className={f} /></label>
      <label>Anything else we should know?<textarea name="message" rows={4} className={f} /></label>
      <label className="flex items-start gap-3 text-base">
        <input type="checkbox" name="consent" required className="mt-1.5 size-4 accent-palm" />
        <span>I agree that Meric Agro Processing may contact me about this quote request.</span>
      </label>
      {state.message && <p role="alert" className="font-semibold text-palm">{state.message}</p>}
      <button disabled={pending} className="justify-self-start bg-forest px-8 py-3 font-display font-semibold text-bone hover:bg-palm disabled:opacity-60">{pending ? "Sending" : "Send quote request"}</button>
    </form>
  );
}
