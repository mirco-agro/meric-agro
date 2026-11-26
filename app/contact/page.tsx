import PartnerForm from "../../components/PartnerForm";
import Socials from "../../components/Socials";
import { getSeoMeta, getSite } from "../../lib/data"; 
import { fmtPhone } from "../../lib/format";
import { PhoneIcon, MailIcon } from "../../lib/ui";
import { getContact } from "../../lib/data";
import FarmMap from "../../components/FarmMap";
import { mapPoints } from "../../lib/content";

export async function generateMetadata() {
  return getSeoMeta("contact", { title: "Contact", description: "Call, WhatsApp or email Meric Agro Processing in Ibadan, Oyo State. Offices and farm addresses." })
}

const link = "font-semibold underline decoration-palm decoration-2 underline-offset-4";

export default async function Contact() {
  const page = await getContact();
  const site = await getSite();
  const points = site.places.map((a, i) => ({
  label: `${a.label}: ${a.text.split(",")[0]}`, text: a.text, coords: mapPoints[i]?.coords ?? "", satellite: a.label.toLowerCase() === "farm",
}));
  return (
    <main>
      <div className="grid gap-16 px-6 pb-24 pt-40 md:grid-cols-[1fr_1.3fr] md:px-[8vw]">
        <div>
          <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">{page.heading}</h1>
          <address className="mt-10 space-y-4 not-italic">
            <p><a className={`${link} inline-flex items-center gap-2`} href={`tel:${site.phone}`}><PhoneIcon />{fmtPhone(site.phone)}</a> <span className="text-soil/70">(call or WhatsApp)</span></p>
            <p><a className={`${link} inline-flex items-center gap-2`} href={`mailto:${site.emailOne}`}><MailIcon />{site.emailOne}</a></p>
            {site.places.map((a) => <p key={a.text}><span className="font-semibold">{a.label}: </span>{a.text}</p>)}
            <p>Open {site.hours}</p>
            <div className="pt-2"><Socials /></div>
          </address>
          <p className="mt-8 text-base text-soil/70">{page.note} Farmers and landowners can apply on the <a className={link} href="/partner">Farmer Partnership page</a>.</p>
        </div>
        <PartnerForm />
      </div>
      <section id="map" className="scroll-mt-24 bg-white px-6 py-20 md:px-[8vw]">
        <h2 className="font-display text-3xl font-extrabold md:text-5xl">Find our offices and farms</h2>
        <div className="mt-8 max-w-5xl"><FarmMap points={points} /></div>
      </section>
    </main>
  );
}
