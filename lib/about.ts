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
  oluwabanke: [
    "Oluwabanke joined Meric Agro Processing in February 2026 as Farm Operations & Cost Control Officer. She plays a key role in supporting the company’s farm operations through financial monitoring, cost control and operational reporting.",
    "Her responsibilities include monitoring farm expenses and budgets, tracking production and yield records, analysing operational costs and preparing reports to support management decisions. She also contributes to identifying operational inefficiencies, improving financial accountability and ensuring effective resource management across the company’s farm operations.",
    "Through her attention to detail and analytical approach, Oluwabanke supports the company’s commitment to efficient agricultural operations, cost management and sustainable business growth."],
  tunde: [
    "Tunde Ajibola is an agricultural professional and Managing Director of Deep Green Integrated Farms. He also serves as Lead Farm Consultant at Meric Agro Processing Limited, where he contributes to the development, planning and management of the company’s agricultural operations.",
    "He has played an important role in establishing and developing Meric Agro’s cultivation activities across its key crops: oil palm, cocoa and plantain. His responsibilities include supporting farm development, crop establishment, field operations and the implementation of effective agricultural practices.",
    "Tunde holds a Bachelor of Science degree in Economics and has undertaken several agricultural certification programmes and professional training courses at the International Institute of Tropical Agriculture (IITA), the Institute of Agricultural Research and Training (IAR&T), and other agricultural institutions.",
    "He brings together business knowledge, practical agricultural experience and a commitment to developing productive, well-managed and sustainable farming operations."
  ],      // waiting for bio
};

// The client's seven goals, grouped into four outcomes. Card text is his wording.
export const outcomes = [
  { title: "Stronger production", img: "/images/drone/stills/production.jpg", tag: "Live today", goals: ["Expand and improve our agricultural production capacity.", "Build quality assurance and traceability systems across our operations."] },
  { title: "Reliable supply and partnerships", img: "/images/drone/stills/partnership.png", tag: "Growing", goals: ["Develop reliable agricultural sourcing and supply partnerships.", "Develop strong relationships with local and international buyers."] },
  { title: "Value added at home", img: "/images/gallery/plantain-harvest-01.jpg", tag: "In development", goals: ["Establish processing facilities for selected agricultural products."] },
  { title: "Opportunity for communities and markets", img: "/images/drone/stills/community.jpg", tag: "Building", goals: ["Create employment and economic opportunities within agricultural communities.", "Position Nigerian agricultural products for greater participation in regional and international markets."] },
];
