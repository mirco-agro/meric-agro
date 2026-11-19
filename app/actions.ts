"use server";
import { z } from "zod";
import { deliver, confirm } from "../lib/deliver";
import { steps } from "../lib/form";
import { products } from "../lib/content";
import { layout, rows, sectioned, confirmation } from "../lib/email";

type State = { ok: boolean; message: string };
const FAIL = "We could not send your request. Please call or WhatsApp us on +234 907 885 7329.";
const reply = (email: string, subject: string) => `mailto:${email}?subject=${encodeURIComponent(subject)}`;

/* ---------- Contact form ---------- */
const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(120),
  location: z.string().trim().max(120).default(""),
  type: z.enum(["Farmer", "Commercial buyer", "Processor", "Distributor", "Investor", "Other"]),
  message: z.string().trim().max(2000).default(""),
  consent: z.literal("on"),
});

export async function submitApplication(_prev: State, fd: FormData): Promise<State> {
  if (fd.get("company")) return { ok: true, message: "Thank you. We will be in touch." };
  const p = contactSchema.safeParse(Object.fromEntries(fd));
  if (!p.success) return { ok: false, message: "Please check your details and tick the consent box." };
  const d = p.data;
  const list: [string, string][] = [["Name", d.name], ["Phone", d.phone], ["Email", d.email], ["Location", d.location], ["I am a", d.type], ["Message", d.message]];
  const html = layout({
    kind: "notify", preheader: `New enquiry from ${d.name}`, title: "New website enquiry",
    intro: "Someone contacted Meric Agro through the contact form.", body: rows(list),
    button: { label: `Reply to ${d.name}`, href: reply(d.email, "Re: your enquiry to Meric Agro") },
  });
  const ok = await deliver(`New enquiry: ${d.type}`, list.map(([k, v]) => `${k}: ${v || "-"}`).join("\n"), d.email,
    [new Date().toISOString(), d.name, d.phone, d.email, d.location, d.type, d.message], "Applications!A:G", undefined, html);
  if (!ok) return { ok: false, message: FAIL };
  const c = confirmation({ name: d.name, heading: "We have received your message", message: "Thank you for contacting Meric Agro. We have received your message and will reply as soon as we can.", summary: [["Your message", d.message]] });
  await confirm(d.email, "We have received your message", c.text, c.html);
  return { ok: true, message: "Thank you. We have received your enquiry and will contact you soon." };
}

/* ---------- Farmer partnership application ---------- */
export async function submitPartnership(_prev: State, fd: FormData): Promise<State> {
  if (fd.get("company")) return { ok: true, message: "Thank you. We will be in touch." };
  const qs = steps.flatMap((s) => s.qs).filter((q) => q.kind !== "note");
  const val = (n: string, multi: boolean) => (multi ? fd.getAll(n).map(String).join(", ") : String(fd.get(n) ?? "")).trim().slice(0, 1500);
  const answers = qs.map((q) => ({ q, v: q.kind === "consent" ? (fd.get("consent") === "on" ? "Agreed" : "") : val(q.name, q.kind === "checks") }));
  const email = val("email", false);
  if (answers.some((a) => a.q.req && !a.v) || !email.includes("@")) return { ok: false, message: "Please complete all required answers and tick the declaration box." };
  const name = val("fullName", false);
  const get = (n: string) => answers.find((a) => a.q.name === n)?.v ?? "";

  const groups = steps
    .map((s) => ({ title: s.title, rows: s.qs.filter((q) => q.kind !== "note").map((q) => [q.label, get(q.name)] as [string, string]) }))
    .filter((g) => g.rows.length);
  const html = layout({
    kind: "notify", preheader: `New farmer partnership application from ${name}`, title: "New farmer partnership application",
    intro: `${name} has applied to the Farmer Partnership Programme.`, body: sectioned(groups),
    button: { label: `Reply to ${name}`, href: reply(email, "Your Meric Agro partnership application") },
  });
  const text = answers.map((a) => `${a.q.label}: ${a.v || "-"}`).join("\n");
  const ok = await deliver(`New Farmer Partnership Application: ${name}`, text, email, [new Date().toISOString(), ...answers.map((a) => a.v)], "Partners!A:AZ", undefined, html);
  if (!ok) return { ok: false, message: "We could not send your application. Please call or WhatsApp us on +234 907 885 7329." };
  const c = confirmation({
    name, heading: "We have received your application",
    message: "Thank you for applying to the Meric Agro Farmer Partnership Programme. Our team will review your information and contact you if there is a suitable opportunity for further discussion.",
    summary: [["Applying as", get("applicantType")], ["Farm location", get("farmLocation")], ["Crops", get("crops")], ["Partnership interest", get("partnerType")]],
    note: "Applying does not guarantee a partnership, funding, produce purchase or any other commercial commitment from Meric Agro Processing Limited.",
  });
  await confirm(email, "We have received your partnership application", c.text, c.html);
  return { ok: true, message: "Thank you. Your application has been received. Our team will review it and contact you if there is a suitable opportunity." };
}

/* ---------- Quote request ---------- */
export async function submitQuote(_prev: State, fd: FormData): Promise<State> {
  if (fd.get("company")) return { ok: true, message: "Thank you. We will be in touch." };
  const product = products.find((p) => p.slug === fd.get("slug"));
  const g = (n: string) => String(fd.get(n) ?? "").trim().slice(0, 1500);
  const [name, phone, email] = [g("name"), g("phone"), g("email")];
  if (!product || name.length < 2 || phone.length < 6 || !email.includes("@") || !g("location") || !g("quantity") || fd.get("consent") !== "on")
    return { ok: false, message: "Please complete all required fields and tick the box." };
  const fields: [string, string][] = [["Name", name], ["Business", g("business")], ["Phone", phone], ["Email", email], ["Buyer type", g("type")], ["Delivery location", g("location")], ["Quantity needed", g("quantity")], ["Frequency", g("frequency")], ["Needed by", g("needed")], ["Message", g("message")]];
  const html = layout({
    kind: "notify", preheader: `Quote request for ${product.name} from ${name}`, title: `Quote request: ${product.name}`,
    intro: "A buyer has asked for a quote through the website.", body: rows([["Product", product.name], ...fields]),
    button: { label: `Reply to ${name}`, href: reply(email, `Your Meric Agro quote request: ${product.name}`) },
  });
  const text = [`Product: ${product.name}`, ...fields.map(([k, v]) => `${k}: ${v || "-"}`)].join("\n");
  const ok = await deliver(`Quote request: ${product.name}`, text, email, [new Date().toISOString(), product.name, ...fields.map((f) => f[1])], "Quotes!A:L", undefined, html);
  if (!ok) return { ok: false, message: FAIL };
  const c = confirmation({
    name, heading: "We have received your quote request",
    message: `Thank you for requesting a quote for ${product.name}. Our team will review your request and get back to you. Price and quantity are discussed on enquiry.`,
    summary: [["Product", product.name], ["Quantity", g("quantity")], ["Delivery location", g("location")], ["Needed by", g("needed")]],
  });
  await confirm(email, "We have received your quote request", c.text, c.html);
  return { ok: true, message: `Thank you. We have received your quote request for ${product.name} and will contact you soon.` };
}