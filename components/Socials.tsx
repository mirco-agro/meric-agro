import { getSite } from "../lib/data";
import { InstagramIcon, TikTokIcon, WhatsAppIcon, XIcon,  } from "../lib/ui";



export default async function Socials() {
  const site = await getSite();
// add  x: "https://x.com/handle"  to the site object in lib/content.ts when the account exists

const items = [
  { label: "WhatsApp", href: `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`, Icon: WhatsAppIcon },
  { label: "Instagram", href: site.instagram, Icon: InstagramIcon },
  { label: "TikTok", href: site.tiktok, Icon: TikTokIcon },
  ...(site.x ? [{ label: "X", href: site.x, Icon: XIcon }] : []),
];
  return (
    <ul className="flex flex-wrap items-center gap-3">
      {items.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${label} (opens in a new tab)`}
            className="grid size-11 place-items-center border-2 border-current transition-colors hover:border-palm hover:bg-palm hover:text-bone motion-reduce:transition-none"
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}