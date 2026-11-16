// Biographies, keyed by the `img` id used in lib/content.ts. An empty list hides the "View bio" button.
export const bios: Record<string, string[]> = {
  habeeb: [
    "Mr. Habeeb Giwa is a business executive, entrepreneur and strategic leader with over nine years of experience in business management, entrepreneurship, operations and strategic partnerships. Known for his forward-thinking approach, strong leadership and determination to deliver results, he brings a wealth of experience in building relationships, identifying growth opportunities and developing sustainable business strategies.",
    "Throughout his career, Habeeb has demonstrated the ability to lead teams, build strategic alliances, navigate complex business environments and turn ideas into meaningful business opportunities. His diverse entrepreneurial background has shaped his ability to think beyond conventional boundaries, drive innovation and create lasting value.",
    "As Director of Business Development & Strategic Partnerships, he is committed to expanding the company’s market presence, cultivating high-value partnerships and driving strategic initiatives that support sustainable growth, operational excellence and long term business success.",
  ],
  richie: [
    "Adetoro Richie is an entrepreneur, business founder and investor with interests in business development, investment and agribusiness. He founded Meric Investment Limited in 2019, where he serves as Chief Executive Officer, and is also the Founder and Managing Director of Meric Agro Processing Limited, a Nigerian agribusiness based in Oyo State.",
    "Through Meric Investment Limited, he established his entrepreneurial foundation and pursued his broader ambition of building and developing commercially viable business opportunities.",
    "His agricultural venture, Meric Agro Processing, reflects his commitment to developing Nigeria’s agricultural value chain. Under his leadership, the company is building its operations around oil palm, cocoa and plantain, with a long-term strategy encompassing agricultural production, commodity sourcing, farmer partnerships, aggregation, processing and distribution.",
    "Richie’s business philosophy centres on strategic investment, disciplined management, sustainable growth and building businesses with long-term commercial value. He is particularly interested in opportunities that connect African resources, enterprise development and international markets.",
    "His long-term ambition is to build and lead businesses that create lasting value, establish meaningful partnerships and contribute to economic development.",
  ],
  oluwabanke: [], // waiting for bio
  tunde: [],      // waiting for bio
};

// The client's seven goals, grouped into four outcomes. Card text is his wording.
export const outcomes = [
  { title: "Stronger production", img: "/images/plantain.jpg", tag: "Live today", goals: ["Expand and improve our agricultural production capacity.", "Build quality assurance and traceability systems across our operations."] },
  { title: "Reliable supply and partnerships", img: "/images/cocoa.jpg", tag: "Growing", goals: ["Develop reliable agricultural sourcing and supply partnerships.", "Develop strong relationships with local and international buyers."] },
  { title: "Value added at home", img: "", tag: "In development", goals: ["Establish processing facilities for selected agricultural products."] },
  { title: "Opportunity for communities and markets", img: "/images/gallery/plantain-harvest-01.jpg", tag: "Building", goals: ["Create employment and economic opportunities within agricultural communities.", "Position Nigerian agricultural products for greater participation in regional and international markets."] },
];
