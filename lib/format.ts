export const fmtPhone = (p: string) => p.replace(/^\+234(\d{3})(\d{3})(\d{4})$/, "+234 $1 $2 $3");
export const waLink = (p: string) => `https://wa.me/${p.replace(/\D/g, "")}`;