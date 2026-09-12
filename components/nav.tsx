"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { label: "WORK", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "FUN", href: "/about#fun" },
  { label: "DEAL", href: "#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-accent/10 bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-[60px] max-w-[1560px] items-center justify-between px-6 sm:px-9">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.25em] text-text-primary"
        >
          The Blue Cub
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium tracking-wide text-text-primary sm:flex">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-opacity hover:opacity-60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 sm:hidden"
        >
          <span className="h-0.5 w-6 bg-text-primary" />
          <span className="h-0.5 w-6 bg-text-primary" />
          <span className="h-0.5 w-6 bg-text-primary" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-accent/10 px-6 pb-6 pt-4 text-sm font-medium text-text-primary sm:hidden">
          {LINKS.map((link) => (
            <Link key={link.label} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
