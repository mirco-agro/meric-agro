export type Q = { name: string; label: string; kind?: "text" | "area" | "select" | "checks" | "note" | "consent"; opts?: string[]; req?: boolean };
const yn = ["Yes", "No"];
export const steps: { title: string; qs: Q[] }[] = [
  { title: "About you", qs: [
    { name: "fullName", label: "Full name", req: true },
    { name: "phone", label: "Phone number", req: true },
    { name: "whatsapp", label: "WhatsApp number" },
    { name: "email", label: "Email address", req: true },
    { name: "state", label: "State of residence", req: true },
    { name: "lga", label: "Local Government Area" },
    { name: "applicantType", label: "I am applying as", kind: "select", opts: ["Individual farmer", "Landowner", "Cooperative", "Registered agricultural business"], req: true },
  ] },
  { title: "Your farm", qs: [
    { name: "farmName", label: "Farm name (if applicable)" },
    { name: "farmLocation", label: "Farm location: state, LGA and community", req: true },
    { name: "farmSize", label: "Total farmland size (hectares or acres)", req: true },
    { name: "cultivated", label: "How much land is currently under cultivation?" },
    { name: "tenure", label: "Do you own, lease or manage the farmland?", kind: "select", opts: ["Own", "Lease", "Manage"], req: true },
    { name: "experience", label: "How long have you been involved in farming?" },
    { name: "water", label: "Do you have access to reliable water or irrigation?", kind: "select", opts: yn },
    { name: "road", label: "Is the farm accessible by road throughout the year?", kind: "select", opts: yn },
  ] },
  { title: "Crops and production", qs: [
    { name: "crops", label: "Which crops do you currently cultivate?", kind: "checks", opts: ["Plantain", "Cocoa", "Oil palm", "Other"], req: true },
    { name: "otherCrops", label: "If other, please specify" },
    { name: "cropAreas", label: "Current cultivated area for each crop", kind: "area" },
    { name: "plants", label: "Approximately how many plants or trees do you have?" },
    { name: "volume", label: "Estimated production or harvest volume" },
    { name: "nextHarvest", label: "When is your next expected harvest?" },
    { name: "buyers", label: "Do you currently sell to buyers, aggregators or processors? If yes, who?", kind: "area" },
    { name: "media", label: "Can you provide photographs or videos of your farm and crops?", kind: "select", opts: yn },
  ] },
  { title: "Partnership interest", qs: [
    { name: "partnerType", label: "Which type of partnership are you interested in?", kind: "checks", req: true,
      opts: ["Out-grower partnership", "Agricultural produce supply agreement", "Land and farm development partnership", "Farmer cooperative collaboration", "Other"] },
    { name: "gain", label: "What do you expect to gain from partnering with Meric Agro?", kind: "area" },
    { name: "proposal", label: "What support or collaboration are you proposing?", kind: "area" },
    { name: "otherBuyer", label: "Are you currently working with another agricultural company or buyer?" },
    { name: "quantities", label: "What quantities of produce could you potentially supply?" },
    { name: "standards", label: "Are you willing to work under agreed quality, production and delivery requirements?", kind: "select", opts: yn, req: true },
  ] },
  { title: "Documents", qs: [
    { name: "proofLand", label: "Do you have proof of farmland ownership, lease or permission to farm?", kind: "select", opts: ["Yes", "No", "In progress"] },
    { name: "registration", label: "Do you have farm, cooperative or business registration documents?", kind: "select", opts: ["Yes", "No", "Not applicable"] },
    { name: "n1", kind: "note", label: "If we see a suitable opportunity, we will ask you to send farm photographs, videos and documents on WhatsApp (+234 907 885 7329)." },
  ] },
  { title: "Declaration", qs: [
    { name: "n2", kind: "note", label: "I confirm that the information in this application is accurate to the best of my knowledge. I understand that applying does not guarantee a partnership, funding, produce purchase or any other commercial commitment from Meric Agro Processing Limited." },
    { name: "consent", kind: "consent", req: true, label: "I agree that Meric Agro Processing Limited may contact me about this application and use my information to assess potential partnership opportunities." },
  ] },
];
