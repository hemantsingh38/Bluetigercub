"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { KotgLogo } from "@/components/kotg/logo";
import { CURRENT_USER } from "@/lib/kotg/current-user";

const TABS = [
  { label: "My Dashboard", href: "/kotg" },
  { label: "All Projects", href: "/kotg/projects" },
];

export function KotgTopBar() {
  const pathname = usePathname();

  return (
    <header className="flex h-14 items-center justify-between border-b border-kotg-border bg-white px-8">
      <div className="flex items-center gap-10">
        <Link href="/kotg">
          <KotgLogo />
        </Link>
        <nav className="flex items-center gap-8">
          {TABS.map((tab) => {
            const active = tab.href === "/kotg" ? pathname === "/kotg" : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={clsx(
                  "border-b-2 py-4 text-sm font-semibold",
                  active ? "border-kotg-primary text-kotg-primary" : "border-transparent text-kotg-black hover:text-kotg-primary"
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <details className="group relative">
          <summary className="list-none text-sm font-semibold text-kotg-black marker:content-[''] hover:text-kotg-primary [&::-webkit-details-marker]:hidden">
            Help
          </summary>
          <div className="absolute right-0 top-7 z-40 w-64 rounded-lg border border-kotg-border bg-white p-4 text-sm text-kotg-text-muted shadow-lg">
            <p className="font-semibold text-kotg-black">Need a hand?</p>
            <p className="mt-1">
              Fill out each section of your monthly snapshot, then hit Submit on the last step. Drafts are saved
              automatically to this browser.
            </p>
            <a href="mailto:kotg-support@deloitte.com" className="mt-2 inline-block font-semibold text-kotg-primary">
              Contact Us
            </a>
          </div>
        </details>

        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-kotg-primary/15 text-xs font-semibold text-kotg-primary">
            {CURRENT_USER.initials}
          </span>
          <span className="text-sm font-semibold text-kotg-black">{CURRENT_USER.firstName}</span>
        </div>
      </div>
    </header>
  );
}
