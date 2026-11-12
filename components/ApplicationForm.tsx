"use client";
import { useActionState, useRef, useState } from "react";
import { submitPartnership } from "../app/actions";
import { steps } from "../lib/form";

const f = "mt-1 w-full border-b-2 border-soil/40 bg-transparent py-2 focus:border-palm focus:outline-none";
const box = "mt-1.5 size-4 accent-palm";

export default function ApplicationForm() {
  const [state, action, pending] = useActionState(submitPartnership, { ok: false, message: "" });
  const [i, setI] = useState(0);
  const [err, setErr] = useState("");
  const ref = useRef<HTMLFormElement>(null);
  const last = steps.length - 1;

  const move = (n: number) => { setI(n); ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const onSubmit = (e: React.FormEvent) => {
    const fd = new FormData(ref.current!);
    const miss = steps[i].qs.filter((q) => q.req && (q.kind === "checks" ? !fd.getAll(q.name).length : q.kind === "consent" ? fd.get("consent") !== "on" : !String(fd.get(q.name) ?? "").trim())).map((q) => q.label);
    if (steps[i].qs.some((q) => q.name === "email") && !String(fd.get("email")).includes("@")) miss.push("A valid email address");
    if (miss.length) { e.preventDefault(); setErr("Please complete: " + miss.join("; ")); return; }
    setErr("");
    if (i < last) { e.preventDefault(); move(i + 1); }
  };

  if (state.ok) return <p role="status" className="font-display text-3xl font-bold">{state.message}</p>;
  return (
    <form ref={ref} action={action} onSubmit={onSubmit} noValidate className="scroll-mt-28">
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <p className="font-display text-xl font-bold">Step {i + 1} of {steps.length}: {steps[i].title}</p>
      <div className="mb-10 mt-3 h-1 bg-soil/15"><div className="h-full bg-palm transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${((i + 1) / steps.length) * 100}%` }} /></div>
      {steps.map((s, k) => (
        <div key={s.title} className={k === i ? "grid gap-6" : "hidden"}>
          {s.qs.map((q) => {
            const star = q.req ? <span className="text-palm"> *</span> : null;
            if (q.kind === "note") return <p key={q.name} className="text-base text-soil/75">{q.label}</p>;
            if (q.kind === "consent") return <label key={q.name} className="flex items-start gap-3 text-base"><input type="checkbox" name="consent" className={box} /><span>{q.label}{star}</span></label>;
            if (q.kind === "checks") return (
              <fieldset key={q.name}><legend>{q.label}{star}</legend>
                {q.opts!.map((o) => <label key={o} className="mt-2 flex items-start gap-3 text-base"><input type="checkbox" name={q.name} value={o} className={box} />{o}</label>)}
              </fieldset>);
            if (q.kind === "select") return (
              <label key={q.name}>{q.label}{star}
                <select name={q.name} className={f}><option value="">Choose</option>{q.opts!.map((o) => <option key={o}>{o}</option>)}</select>
              </label>);
            if (q.kind === "area") return <label key={q.name}>{q.label}{star}<textarea name={q.name} rows={3} className={f} /></label>;
            const type = q.name === "email" ? "email" : /phone|whatsapp/.test(q.name) ? "tel" : "text";
            return <label key={q.name}>{q.label}{star}<input name={q.name} type={type} className={f} /></label>;
          })}
        </div>
      ))}
      {(err || state.message) && <p role="alert" className="mt-6 font-semibold text-palm">{err || state.message}</p>}
      <div className="mt-10 flex gap-4 font-display font-semibold">
        {i > 0 && <button type="button" onClick={() => move(i - 1)} className="border-2 border-soil px-6 py-3 hover:bg-soil hover:text-bone">Back</button>}
        <button disabled={pending} className="bg-forest px-8 py-3 text-bone hover:bg-palm disabled:opacity-60">{i < last ? "Continue" : pending ? "Sending" : "Submit application"}</button>
      </div>
    </form>
  );
}
