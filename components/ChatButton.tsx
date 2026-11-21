import { getSite } from "../lib/data";
import { waLink } from "../lib/format";
import { WhatsAppIcon } from "../lib/ui";

export default async function ChatButton() {
  const site = await getSite();
  const href = `${waLink(site.phone)}?text=${encodeURIComponent("Hello Meric Agro, I would like to make an enquiry.")}`;
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 left-5 z-30 flex items-center gap-3 bg-palm px-4 py-3 font-display font-semibold text-bone shadow-lg transition-transform hover:-translate-y-1 motion-reduce:transition-none md:bottom-8 md:left-8">
      <WhatsAppIcon />
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
}