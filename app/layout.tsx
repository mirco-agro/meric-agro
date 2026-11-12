import type { Metadata } from "next";
import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import Smooth from "../components/Smooth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const body = Newsreader({ subsets: ["latin"], variable: "--font-newsreader" });

export const metadata: Metadata = {
  title: "Meric Agro Processing | Growing Value. Harvesting the Future.",
  description: "Cocoa, plantain and oil palm from Oyo State, Nigeria. Produce supply, sourcing, processing and agricultural partnerships.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Header />
        <Smooth>{children}</Smooth>
        <Footer />
      </body>
    </html>
  );
}