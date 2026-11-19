import { Resend } from "resend";
import { google } from "googleapis";

export const googleKey = () =>
  (process.env.GOOGLE_PRIVATE_KEY ?? "").trim().replace(/^["']|["']$/g, "").replace(/\\n/g, "\n");

export const mailFrom = () =>
  (process.env.MAIL_FROM ?? "").trim().replace(/^["']|["']$/g, "") || "Meric Agro <enquiries@meric-agro.com>";

export async function deliver(subject: string, text: string, replyTo: string, row: string[], range: string, to?: string, html?: string) {
  const mail = async () => {
    const r = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: mailFrom(), to: to ?? process.env.NOTIFY_TO!, replyTo, subject, text, ...(html ? { html } : {}),
    });
    if (r.error) throw new Error(r.error.message);
  };
  const sheet = async () => {
    const auth = new google.auth.JWT({ email: process.env.GOOGLE_CLIENT_EMAIL, key: googleKey(), scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
    await google.sheets({ version: "v4", auth }).spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!, range, valueInputOption: "RAW", requestBody: { values: [row] },
    });
  };
  const res = await Promise.allSettled([mail(), sheet()]);
  res.forEach((r, i) => r.status === "rejected" && console.error(`Delivery failed (${i === 0 ? "email" : "sheet"}):`, r.reason?.message ?? r.reason));
  return res.some((r) => r.status === "fulfilled");
}

// Automatic confirmation to the visitor. A failure here never breaks the form.
export async function confirm(to: string, subject: string, text: string, html?: string) {
  try {
    const r = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: "Meric Agro <info@meric-agro.com>", to, replyTo: "info@meric-agro.com", subject, text, ...(html ? { html } : {}),
    });
    if (r.error) console.error("Confirmation failed:", r.error.message);
  } catch (e) {
    console.error("Confirmation failed:", e);
  }
}