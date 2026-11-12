"use server";
import { z } from "zod";
import { Resend } from "resend";
import { google } from "googleapis";
import { deliver } from "../lib/deliver";
import { steps } from "../lib/form";
import { products } from "../lib/content";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(120),
  location: z.string().trim().max(120).default(""),
  type: z.enum(["Farmer", "Commercial buyer", "Processor", "Distributor", "Investor", "Other"]),
  message: z.string().trim().max(2000).default(""),
  consent: z.literal("on"),
});
type State = { ok: boolean; message: string };

export async function submitApplication(_prev: State, fd: FormData): Promise<State> {
  if (fd.get("company")) return { ok: true, message: "Thank you. We will be in touch." };
  const parsed = schema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return { ok: false, message: "Please check your details and tick the consent box." };
  const d = parsed.data;
  const text = [`Name: ${d.name}`, `Phone: ${d.phone}`, `Email: ${d.email}`, `Location: ${d.location}`, `Type: ${d.type}`, "", d.message].join("\n");

  const sendMail = async () => {
    const res = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: process.env.MAIL_FROM!, to: process.env.NOTIFY_TO!, replyTo: d.email,
      subject: `New enquiry: ${d.type}`, text,
    });
    if (res.error) throw new Error(res.error.message);
  };
  const addRow = async () => {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    await google.sheets({ version: "v4", auth }).spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!, range: "Applications!A:G", valueInputOption: "RAW",
      requestBody: { values: [[new Date().toISOString(), d.name, d.phone, d.email, d.location, d.type, d.message]] },
    });
  };

  const results = await Promise.allSettled([sendMail(), addRow()]);
  results.forEach((r) => r.status === "rejected" && console.error("Enquiry delivery failed:", r.reason));
  if (results.every((r) => r.status === "rejected"))
    return { ok: false, message: "We could not send your enquiry. Please call or WhatsApp us on +234 907 885 7329." };
  return { ok: true, message: "Thank you. We have received your enquiry and will contact you soon." };
}

export async function submitPartnership(_prev: State, fd: FormData): Promise<State> {
  if (fd.get("company")) return { ok: true, message: "Thank you. We will be in touch." };
  const qs = steps.flatMap((s) => s.qs).filter((q) => q.kind !== "note");
  const val = (n: string, multi: boolean) => (multi ? fd.getAll(n).map(String).join(", ") : String(fd.get(n) ?? "")).trim().slice(0, 1500);
  const answers = qs.map((q) => ({ q, v: q.kind === "consent" ? (fd.get("consent") === "on" ? "Agreed" : "") : val(q.name, q.kind === "checks") }));
  const missing = answers.filter((a) => a.q.req && !a.v);
  const email = val("email", false);
  if (missing.length || !email.includes("@")) return { ok: false, message: "Please complete all required answers and tick the declaration box." };
  const name = val("fullName", false);
  const text = answers.map((a) => `${a.q.label}: ${a.v || "-"}`).join("\n");
  const ok = await deliver(`New Farmer Partnership Application: ${name}`, text, email, [new Date().toISOString(), ...answers.map((a) => a.v)], "Partners!A:AZ");
  return ok
    ? { ok: true, message: "Thank you. Your application has been received. Our team will review it and contact you if there is a suitable opportunity." }
    : { ok: false, message: "We could not send your application. Please call or WhatsApp us on +234 907 885 7329." };
}

export async function submitQuote(_prev: State, fd: FormData): Promise<State> {
  if (fd.get("company")) return { ok: true, message: "Thank you. We will be in touch." };
  const product = products.find((p) => p.slug === fd.get("slug"));
  const g = (n: string) => String(fd.get(n) ?? "").trim().slice(0, 1500);
  const [name, phone, email] = [g("name"), g("phone"), g("email")];
  if (!product || name.length < 2 || phone.length < 6 || !email.includes("@") || !g("location") || !g("quantity") || fd.get("consent") !== "on")
    return { ok: false, message: "Please complete all required fields and tick the box." };
  const fields: [string, string][] = [["Name", name], ["Business", g("business")], ["Phone", phone], ["Email", email], ["Buyer type", g("type")], ["Delivery location", g("location")], ["Quantity needed", g("quantity")], ["Frequency", g("frequency")], ["Needed by", g("needed")], ["Message", g("message")]];
  const text = [`Product: ${product.name}`, ...fields.map(([k, v]) => `${k}: ${v || "-"}`)].join("\n");
  const ok = await deliver(`Quote request: ${product.name}`, text, email, [new Date().toISOString(), product.name, ...fields.map((f) => f[1])], "Quotes!A:L");
  return ok
    ? { ok: true, message: `Thank you. We have received your quote request for ${product.name} and will contact you soon.` }
    : { ok: false, message: "We could not send your request. Please call or WhatsApp us on +234 907 885 7329." };
}
