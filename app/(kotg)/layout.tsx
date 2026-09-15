import type { Metadata } from "next";
import { Open_Sans, Sora } from "next/font/google";
import { KotgFooter } from "@/components/kotg/footer";
import { KotgTopBar } from "@/components/kotg/topbar";
import { KotgProvider } from "@/lib/kotg/store";
import "./kotg.css";

// KOTG is a separate internal tool (project-health monthly snapshots) driven
// by its own Figma file, distinct from the portfolio site — so it gets its
// own root layout/html tag instead of inheriting the portfolio's PT Serif
// theme and Nav/Footer. Fonts confirmed from the Figma file's variable defs:
// Open Sans carries every UI/body string. The file's heading/display font
// is "Clash Display", which isn't on Google Fonts and isn't licensed here;
// Sora is used as the closest free geometric-grotesk substitute (see
// README-equivalent note in app/(kotg)/kotg.css).
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-kotg-open-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-kotg-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KOTG — Project Health Snapshots",
  description: "Monthly project health snapshot tool: scope, budget, delivery quality, metrics and risk tracking.",
};

export default function KotgRootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${openSans.variable} ${sora.variable}`}>
      <body className="min-h-screen bg-kotg-bg font-kotg-sans text-kotg-black antialiased">
        <KotgProvider>
          <div className="flex min-h-screen flex-col">
            <KotgTopBar />
            <div className="flex flex-1 flex-col">{children}</div>
            <KotgFooter />
          </div>
        </KotgProvider>
      </body>
    </html>
  );
}
