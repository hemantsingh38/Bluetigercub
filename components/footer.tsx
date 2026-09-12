import Image from "next/image";
import Link from "next/link";
import { BlueTigerCubBadge } from "./blue-tiger-cub-badge";
import { basePath } from "@/lib/base-path";

// Site links repeat here to match the Figma footer (which duplicates the nav).
const SITE_LINKS = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "Fun", href: "/about#fun" },
];

// Email / phone / Behance / Instagram / resume are still pending from
// Hemant (see PORTFOLIO_BUILD_BRIEF.md section 6, open question 10) —
// only confirmed channels render for now. Add them here once supplied.
export function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-accent/10 px-6 py-20 sm:px-9"
    >
      <div className="mx-auto flex max-w-[1560px] flex-col gap-16 sm:flex-row sm:justify-between">
        <div className="max-w-md">
          <h2 className="text-3xl font-medium text-text-primary sm:text-4xl">
            Let&apos;s make a deal.
          </h2>
          <p className="mt-4 text-text-body">
            Open to new product design roles — the fastest way to reach me is
            LinkedIn.
          </p>
          <Link
            href="https://www.linkedin.com/in/hemant-singh"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block text-text-primary underline underline-offset-4 hover:opacity-70"
          >
            linkedin.com/in/hemant-singh
          </Link>
          <p className="mt-2 text-sm text-text-body/70">
            Gurugram, Delhi NCR, India
          </p>
        </div>

        <nav className="flex gap-4 text-sm sm:flex-col sm:gap-2">
          {SITE_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-text-primary hover:opacity-60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="w-[180px] shrink-0 self-start sm:w-[220px]">
          <BlueTigerCubBadge />
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1560px]">
        <Image
          src={`${basePath}/images/footer-gazebo-illustration.webp`}
          alt=""
          width={1100}
          height={1009}
          className="w-full max-w-sm select-none"
        />
      </div>

      <p className="mx-auto mt-8 max-w-[1560px] text-xs text-text-body/60">
        © {new Date().getFullYear()} Hemant Singh.
      </p>
    </footer>
  );
}
