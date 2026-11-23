import { site as defaults } from "./content";
import { fmtPhone } from "./format";

let site = defaults as unknown as { phone: string; emailOne: string; places: { text: string }[] };
export const setEmailSite = (s: typeof site) => { site = s; };

const C = { forest: "#0b2b1c", palm: "#e5501b", bone: "#eff2ea", soil: "#22160e", line: "#dfe3d8", mute: "#5c5a52" };
const font = "-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const br = (s: string) => esc(s).replace(/\n/g, "<br>");
const base = () =>
  process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://meric-agro.com");
type Row = [string, string];

export const rows = (list: Row[]) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 0;">${list
    .map(
      ([k, v]) =>
        `<tr><td style="padding:12px 0;border-top:1px solid ${C.line};font-family:${font};"><div style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${C.mute};">${esc(k)}</div><div style="margin-top:4px;font-size:15px;line-height:1.5;color:${C.soil};">${v ? br(v) : "&ndash;"}</div></td></tr>`
    )
    .join("")}</table>`;

export const sectioned = (groups: { title: string; rows: Row[] }[]) =>
  groups
    .map(
      (g) =>
        `<h2 style="margin:28px 0 0;font-family:${font};font-size:15px;color:${C.forest};border-bottom:2px solid ${C.palm};padding-bottom:6px;">${esc(g.title)}</h2>${rows(g.rows)}`
    )
    .join("");

type LayoutOpts = {
  preheader: string;
  title: string;
  intro?: string;
  body: string;
  button?: { label: string; href: string };
  kind: "notify" | "confirm";
};

export function layout({ preheader, title, intro, body, button, kind }: LayoutOpts) {
  const logo = `${base()}/images/logo.png`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:${C.bone};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bone};"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;">
<tr><td style="background:${C.forest};padding:18px 28px;">
 <table role="presentation" cellpadding="0" cellspacing="0"><tr>
  <td style="background:#ffffff;padding:6px;border-radius:8px;"><img src="${logo}" width="40" height="40" alt="" style="display:block;border:0;"></td>
  <td style="padding-left:14px;font-family:${font};color:#ffffff;font-size:18px;font-weight:700;line-height:1.3;">Meric Agro Processing<br><span style="font-size:12px;font-weight:400;color:#c9d6cc;">Growing Value. Harvesting the Future.</span></td>
 </tr></table>
</td></tr>
<tr><td style="height:4px;background:${C.palm};font-size:0;line-height:0;">&nbsp;</td></tr>
<tr><td style="padding:32px 28px 28px;font-family:${font};color:${C.soil};">
 <h1 style="margin:0;font-size:24px;line-height:1.25;color:${C.forest};">${esc(title)}</h1>
 ${intro ? `<p style="margin:12px 0 0;font-size:15px;line-height:1.6;">${esc(intro)}</p>` : ""}
 ${body}
 ${button ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:26px;"><tr><td style="background:${C.palm};"><a href="${esc(button.href)}" style="display:inline-block;padding:13px 24px;font-family:${font};font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;">${esc(button.label)}</a></td></tr></table>` : ""}
</td></tr>
<tr><td style="padding:20px 28px;background:${C.bone};font-family:${font};font-size:12px;line-height:1.7;color:${C.mute};">
 <strong style="color:${C.forest};">Meric Agro Processing Limited</strong><br>
 ${esc(site.places[0].text)}<br>
 <a href="tel:${site.phone}" style="color:${C.mute};">+234 907 885 7329</a> &middot; <a href="mailto:${site.emailOne}" style="color:${C.mute};">${esc(site.emailOne)}</a> &middot; <a href="${base()}" style="color:${C.mute};">Website</a><br><br>
 ${kind === "confirm" ? "You are receiving this email because you submitted a form on our website." : "Sent automatically by the Meric Agro website."}
</td></tr>
</table></td></tr></table></body></html>`;
}

// The automatic "we received it" email to the visitor: returns both text and html.
export function confirmation(o: { name: string; heading: string; message: string; summary?: Row[]; note?: string }) {
  const summary = (o.summary ?? []).filter(([, v]) => v);
  const text = [
    `Hello ${o.name},`, "", o.message,
    ...(summary.length ? ["", ...summary.map(([k, v]) => `${k}: ${v}`)] : []),
    ...(o.note ? ["", o.note] : []),
    "", "For anything urgent, call or WhatsApp +234 907 885 7329 (8am to 6pm).", "",
    "Meric Agro Processing Limited", "Growing Value. Harvesting the Future.",
  ].join("\n");
  const body = `
    <p style="margin:18px 0 0;font-size:15px;line-height:1.7;">${esc(o.message)}</p>
    ${summary.length ? `<p style="margin:24px 0 0;font-size:13px;font-weight:700;color:${C.forest};">What you sent us</p>${rows(summary)}` : ""}
    ${o.note ? `<p style="margin:22px 0 0;padding:12px 14px;background:${C.bone};font-size:13px;line-height:1.6;color:${C.mute};">${esc(o.note)}</p>` : ""}
    <p style="margin:22px 0 0;font-size:14px;line-height:1.7;">For anything urgent, call or WhatsApp us on ${fmtPhone(site.phone)} (8am to 6pm).</p>`;
  const html = layout({
    preheader: o.message, title: o.heading, intro: `Hello ${o.name},`, body, kind: "confirm",
    button: { label: "Chat with us on WhatsApp", href: `https://wa.me/${site.phone.replace(/\D/g, "")}` },
  });
  return { text, html };
}