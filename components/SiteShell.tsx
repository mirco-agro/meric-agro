
"use client";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Smooth from "./Smooth";

export default function SiteShell({ header, footer, extras, children }: { header: ReactNode; footer: ReactNode; extras: ReactNode; children: ReactNode }) {
  if (usePathname().startsWith("/studio")) return <>{children}</>;
  return <>{header}<Smooth>{children}</Smooth>{extras}{footer}</>;
}