"use client";
import { useActionState } from "react";
import { submitApplication } from "../app/actions";

const field = "mt-1 w-full border-b-2 border-soil/40 bg-transparent py-2 focus:border-palm focus:outline-none";

export default function PartnerForm() {
  const [state, action, pending] = useActionState(submitApplication, { ok: false, message: "" });
  if (state.ok) return <p role="status" className="font-display text-2xl font-semibold">{state.message}</p>;
  return (
    <form action={action} className="grid gap-6 font-body">
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label>Full name<input name="name" required className={field} /></label>
      <div className="grid gap-6 md:grid-cols-2">
        <label>Phone or WhatsApp<input name="phone" type="tel" required className={field} /></label>
        <label>Email<input name="email" type="email" required className={field} /></label>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <label>Location<input name="location" className={field} /></label>
        <label>I am a
          <select name="type" required className={field}>
            {["Farmer", "Commercial buyer", "Processor", "Distributor", "Investor", "Other"].map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
      </div>
      <label>What would you like to discuss?<textarea name="message" rows={4} className={field} /></label>
      <label className="flex items-start gap-3 text-base">
        <input type="checkbox" name="consent" required className="mt-1.5 size-4 accent-palm" />
        <span>I agree that Meric Agro Processing may store my details and contact me about this enquiry.</span>
      </label>
      {state.message && <p role="alert" className="font-semibold text-palm">{state.message}</p>}
      <button disabled={pending} className="justify-self-start bg-forest px-8 py-3 font-display font-semibold text-bone hover:bg-palm disabled:opacity-60">
        {pending ? "Sending" : "Send enquiry"}
      </button>
    </form>
  );
}
