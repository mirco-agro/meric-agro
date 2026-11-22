import { createClient } from "@sanity/client";
import { about, mission, vision, core, strategy, stages, story, commitment, partner, farmVideo } from "../lib/content";
import { outcomes } from "../lib/about";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, dataset: "production",
  apiVersion: "2025-01-01", token: process.env.SANITY_WRITE_TOKEN, useCdn: false,
});
const keyed = <T extends object>(a: T[]) => a.map((x, i) => ({ _key: `k${i}`, ...x }));
const status = [
  { status: "Live today", line: "{crops} oil palm, cocoa and plantain crops on record across our farms in Onipe and Onigambari, Ibadan, Oyo State." },
  { status: "Growing", line: "Building relationships with farmers and suppliers beyond our own farms." },
  { status: "In development", line: "Plans for palm oil, cocoa and plantain products. Not yet established production lines." },
  { status: "Building", line: "Supply relationships with wholesalers, distributors, retailers and food manufacturers." },
];

async function main() {
  const docs: ({ _id: string; _type: string } & Record<string, unknown>)[] = [
    { _id: "homePage", _type: "homePage", heroLine1: "Growing value.", heroLine2: "Harvesting the future.",
      heroText: "Oil palm, cocoa and plantain, grown on our farms in Onipe and Onigambari, Ibadan, Oyo State.",
      introHeading: "We are building agriculture that adds value at every step.", introText1: about[0], introText2: about[1] },
    { _id: "journey", _type: "journey", stages: keyed(core.map((c, i) => ({ title: c.title, text: c.text, ...status[i] }))) },
    { _id: "aboutPage", _type: "aboutPage", heroIntro: about[0], intro: about[1],
      beliefHeading: "We believe agriculture is more than cultivation.",
      beliefText: "It is an opportunity to create economic value, support food security, generate employment and develop sustainable businesses around the resources our land provides.",
      videoHeading: "See our farm from above", videoText: "A drone tour of our plantain and cocoa fields in Ibadan, Oyo State.", videoId: farmVideo.id },
    { _id: "purposePage", _type: "purposePage", mission, vision,
      heroIntro: "Building a Nigerian agribusiness that creates value from cultivation through to the finished product.",
      outcomes: keyed(outcomes.map((o) => ({ title: o.title, tag: o.tag, goals: o.goals }))),
      practiceHeading: "Putting our purpose into practice", practiceText: partner.intro[1] },
    { _id: "storyPage", _type: "storyPage", heroIntro: "From an agricultural investment to an integrated agribusiness vision.",
      story: keyed(story), strategy, stages },
    { _id: "commitment", _type: "commitment", line1: commitment[0], line2: commitment[1], line3: about[2] },
    { _id: "partnerPage", _type: "partnerPage", intro: partner.intro, models: keyed(partner.models), gains: keyed(partner.gains),
      expects: partner.expects, note: partner.note },
    { _id: "contactPage", _type: "contactPage", heading: "Let’s create value across the agricultural value chain.",
      note: "Looking for a price? Use the Request a Quote button on a product." },
  ];
  for (const d of docs) await client.createOrReplace(d);
  console.log(`Seeded ${docs.length} page documents`);
}
main().catch((e) => { console.error(e); process.exit(1); });