import { site } from "../lib/content";
import { PhoneIcon, MailIcon } from "../lib/ui";
import Socials from "./Socials";
const links = [["About", "/about"], ["Products", "/products"], ["Services", "/services"], ["Gallery", "/#gallery"], ["Team", "/about#team"], ["Farmer Partnership", "/partner"], ["Contact", "/contact"]];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest text-bone">
      <div className="px-6 pb-6 pt-20 md:px-[8vw] md:pt-28">
        <div className="flex flex-col gap-10 border-b border-bone/20 pb-14 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
            Let’s grow something <span className="text-palm">together.</span>
          </h2>
          <div className="flex flex-wrap gap-4 font-display font-semibold">
            <a href="/products" className="bg-palm px-7 py-3 hover:bg-bone hover:text-forest">Request a Quote</a>
            <a href="/partner" className="border-2 border-bone px-7 py-3 hover:bg-bone hover:text-forest">Become a Partner</a>
          </div>
        </div>
        <div className="grid gap-2 py-14 sm:grid-cols-2 sm:gap-2 md:grid-cols-[1.3fr_0.8fr_1fr_1.5fr]">
          <div>
              <p className="font-display text-2xl font-bold">{site.name} Limited</p>
              <p className="mt-3 max-w-xs text-bone/70">{site.tagline}</p>
              <div className="mt-6"><Socials /></div>
          </div>
          <nav aria-label="Footer">
            <h3 className="font-display font-bold text-palm">Explore</h3>
            <ul className="mt-4 space-y-2">{links.map(([l, h]) => <li key={h}><a href={h} className="hover:text-palm">{l}</a></li>)}</ul>
          </nav>
          <div>
            <h3 className="font-display font-bold text-palm">Reach us</h3>
            <ul className="mt-4 space-y-2">
              <li><a href={`tel:${site.phone}`} className="inline-flex items-center gap-2 hover:text-palm"><PhoneIcon />+234 907 885 7329</a></li>
              <li><a href={`mailto:${site.emailOne}`} className="inline-flex items-start gap-2 break-all hover:text-palm"><span className="mt-0.5"><MailIcon /></span>{site.emailOne}</a></li>
              <li className="text-bone/70">Open {site.hours}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-display font-bold text-palm">Find us</h3>
            <ul className="mt-4 space-y-3">{site.places.map((a) => <li key={a.text}><span className="font-semibold">{a.label}</span><br /><span className="text-bone/70">{a.text}</span></li>)}</ul>
          </div>
        </div>
      </div>
      <p aria-hidden className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[14vw] font-extrabold leading-[0.85] tracking-tighter text-bone/[0.07]">MERIC AGRO</p>
      <div className="relative flex flex-col gap-2 border-t border-bone/20 px-6 py-6 text-sm text-bone/70 md:flex-row md:justify-between md:px-[8vw]">
        <p>© {new Date().getFullYear()} {site.name} Limited. All rights reserved.</p>
        <a href="#top" className="hover:text-palm">Back to top</a>
      </div>
    </footer>
  );
}
