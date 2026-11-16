import AboutHero from "../../../components/AboutHero";
import AboutNav from "../../../components/AboutNav";
import LearnMore from "../../../components/LearnMore";
import TeamGrid from "../../../components/TeamGrid";
import { pad } from "../../../lib/ui";

export const metadata = { title: "Our Leadership", description: "Meet the leadership team behind Meric Agro Processing: executive, partnerships and farm operations." };

export default function Leadership() {
  return (
    <main>
      <AboutHero title="Our Leadership" intro="The people behind Meric Agro." />
      <AboutNav />
      <section className={pad}><TeamGrid /></section>
      <LearnMore current="/about/leadership" />
    </main>
  );
}
