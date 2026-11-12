import PartnerForm from "../../components/PartnerForm";
import { site } from "../../lib/content";

export const metadata = { title: "Contact", description: "Call, WhatsApp or email Meric Agro Processing in Ibadan, Oyo State. Offices and farm addresses." };
const link = "font-semibold underline decoration-palm decoration-2 underline-offset-4";

export default function Contact() {
  return (
    <main className="grid gap-16 px-6 pb-24 pt-40 md:grid-cols-[1fr_1.3fr] md:px-[8vw]">
      <div>
        <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">Let’s create value across the agricultural value chain.</h1>
        <address className="mt-10 space-y-3 not-italic">
          <p><a className={link} href={`tel:${site.phone}`}>+234 907 885 7329</a> (call or WhatsApp)</p>
          <p><a className={link} href={`mailto:${site.emailOne}`}>{site.emailOne}</a></p>
          <p><a className={link} href={`mailto:${site.emailTwo}`}>{site.emailTwo}</a></p>
          {site.places.map((a) => <p key={a.text}><span className="font-semibold">{a.label}: </span>{a.text}</p>)}
          <p>Open {site.hours}</p>
          <p><a className={link} href={site.instagram} target="_blank" rel="noreferrer">Instagram: @mericagro</a></p>
          <p><a className={link} href={site.tiktok} target="_blank" rel="noreferrer">Tiktok: @mericagro</a></p>
        </address>
        <p className="mt-8 text-base text-soil/70">Looking for a price? Use the Request a Quote button on a product. Farmers and landowners can apply on the <a className={link} href="/partner">Farmer Partnership page</a>.</p>
      </div>
      <PartnerForm />
    </main>
  );
}
