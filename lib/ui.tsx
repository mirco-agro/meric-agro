export const pad = "px-6 py-24 md:px-[8vw] md:py-32";
export const h2 = "font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl";
export const quote = "inline-block bg-palm px-7 py-3 font-display font-semibold text-bone hover:bg-forest";

export const Pin = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="size-4 shrink-0 fill-palm">
    <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
  </svg>
);

const icon = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, className: "size-5 shrink-0" } as const;

export const InstagramIcon = () => (
  <svg {...icon}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

export const TikTokIcon = () => (
  <svg {...icon}>
    <path d="M15 3v10.5a4 4 0 1 1-4-4" />
    <path d="M15 3c.4 2.6 2.2 4.4 5 4.6" />
  </svg>
);

export const PhoneIcon = () => (
  <svg {...icon}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

export const MailIcon = () => (
  <svg {...icon}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const WhatsAppIcon = () => (
  <svg {...icon}>
    <path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6L3 21Z" />
    <path d="M9 8.5c.3 2.6 2.9 5.2 5.5 5.5l1.3-1.3-2-1-.9.8a4.5 4.5 0 0 1-2-2l.8-.9-1-2L9 8.5Z" />
  </svg>
);

export const XIcon = () => (
  <svg {...icon}>
    <path d="M4 4l16 16" />
    <path d="M20 4l-6.6 7.2M10.6 12.8L4 20" />
  </svg>
);