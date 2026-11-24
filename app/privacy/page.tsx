import PageHead from "../../components/PageHead";
import { getSite } from "../../lib/data";
import { pad } from "../../lib/ui";

export const metadata = { title: "Privacy Policy", description: "How Meric Agro Processing Limited collects, uses and protects personal information from this website." };

const updated = "23 November 2026";

export default async function Privacy() {
  const site = await getSite();
  const sections: { h: string; p: string[] }[] = [
    { h: "Who we are", p: [`This website is run by Meric Agro Processing Limited, an agribusiness based in Ibadan, Oyo State, Nigeria. We are responsible for the personal information described in this policy. You can reach us at ${site.emailOne} or ${site.phone}.`] },
    { h: "What we collect", p: [
      "Contact and quote forms: your name, phone number, email address, business name, location, the product you asked about, the quantity you need and your message.",
      "Farmer partnership application: your name, contact details, location, farm details, crops, production figures, partnership interests, and whether you hold land or registration documents.",
      "Live chat: your name or email if you give them, your messages, and technical details about your browser and device.",
      "Automatically: basic technical data such as your device type and the pages you visit, collected by our hosting and chat providers." ] },
    { h: "Why we use it", p: ["We use your information to reply to your messages, prepare quotes, assess partnership applications, send you a confirmation of what you submitted, keep our records, and keep the website secure. We rely on your consent where you tick the consent box, and on our legitimate interest in running our business and answering enquiries."] },
    { h: "Who we share it with", p: [
      "We use trusted service providers to run the website. They process information on our behalf: Vercel (website hosting), Resend (sending emails), Google (storing form submissions in Google Sheets) and tawk.to (live chat). When you play a video, YouTube may also collect information. Some of these providers are outside Nigeria, so your information may be processed in other countries.",
      "We do not sell your personal information." ] },
    { h: "Cookies and similar technologies", p: ["Our live chat provider may use cookies or similar storage to remember your chat. Embedded YouTube videos load only when you play them, in privacy-enhanced mode. You can block or delete cookies in your browser settings."] },
    { h: "How long we keep it", p: ["We keep your information only for as long as we need it for the purpose you gave it, or to meet legal or business record-keeping needs. When we no longer need it, we delete it."] },
    { h: "Your rights", p: [
      "Under the Nigeria Data Protection Act 2023 you may ask to see the information we hold about you, ask us to correct it, ask us to delete it, object to how we use it, or withdraw your consent at any time.",
      `To do any of this, email ${site.emailOne}. If you are unhappy with how we handle your information, you may complain to the Nigeria Data Protection Commission.` ] },
    { h: "Security", p: ["We take reasonable steps to protect your information. No website can be completely secure, so please do not send sensitive documents such as ID numbers through the forms."] },
    { h: "Children", p: ["This website is not aimed at children, and we do not knowingly collect information from them."] },
    { h: "Changes to this policy", p: ["We may update this policy from time to time. The date at the top shows when it last changed."] },
  ];
  return (
    <main>
      <PageHead title="Privacy Policy" intro={`Last updated ${updated}.`} />
      <section className={`${pad} max-w-4xl`}>
        {sections.map((s) => (
          <div key={s.h} className="mb-12">
            <h2 className="font-display text-2xl font-extrabold md:text-3xl">{s.h}</h2>
            <div className="mt-4 space-y-4 text-lg">{s.p.map((x) => <p key={x.slice(0, 30)}>{x}</p>)}</div>
          </div>
        ))}
      </section>
    </main>
  );
}