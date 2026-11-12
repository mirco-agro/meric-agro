import { Resend } from "resend";
import { google } from "googleapis";

export async function deliver(subject: string, text: string, replyTo: string, row: string[], range: string) {
  const mail = async () => {
    const r = await new Resend(process.env.RESEND_API_KEY).emails.send({ from: process.env.MAIL_FROM!, to: process.env.NOTIFY_TO!, replyTo, subject, text });
    if (r.error) throw new Error(r.error.message);
  };
  const sheet = async () => {
    const auth = new google.auth.JWT({ email: process.env.GOOGLE_CLIENT_EMAIL, key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"), scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
    await google.sheets({ version: "v4", auth }).spreadsheets.values.append({ spreadsheetId: process.env.GOOGLE_SHEET_ID!, range, valueInputOption: "RAW", requestBody: { values: [row] } });
  };
  const res = await Promise.allSettled([mail(), sheet()]);
  res.forEach((r) => r.status === "rejected" && console.error("Delivery failed:", r.reason));
  return res.some((r) => r.status === "fulfilled");
}
