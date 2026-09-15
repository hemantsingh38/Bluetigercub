import type { Metadata } from "next";
import { Allison, PT_Serif, PT_Serif_Caption } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

// Confirmed directly from the Figma file's text nodes (see the Explore
// agent's font audit) — not a guess. PT Serif carries headlines, body and
// nav; PT Serif Caption is the file's small-UI-label style; Allison is the
// one cursive/script family in the file, used for the badge and the
// project-index tags.
const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-serif",
  display: "swap",
});

const ptSerifCaption = PT_Serif_Caption({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pt-serif-caption",
  display: "swap",
});

const allison = Allison({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-allison",
  display: "swap",
});

// Licensed font Hemant supplied directly — used in the source Figma file
// for one thing only: the large "Hemant Singh" display name on the Home
// page's about teaser (Bolder weight, 96px).
const antroVectra = localFont({
  src: [
    { path: "./fonts/antro-vectra-regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/antro-vectra-bolder.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-antro-vectra",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hemant Singh — Product Designer",
  description:
    "Product designer working across enterprise, fintech, edtech and e-commerce — agentic AI product design and an AI-native, AI-accelerated workflow.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${ptSerif.variable} ${ptSerifCaption.variable} ${allison.variable} ${antroVectra.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
