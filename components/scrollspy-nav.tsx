"use client";

import { useEffect, useState } from "react";
import { SCROLLSPY_SECTIONS } from "@/lib/case-study";

export function ScrollspyNav() {
  const [active, setActive] = useState<string>(SCROLLSPY_SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    for (const { id } of SCROLLSPY_SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="hidden xl:flex xl:flex-col xl:gap-3">
      {SCROLLSPY_SECTIONS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className="group flex items-center gap-3 text-xs uppercase tracking-wide text-text-body/50 transition-colors hover:text-text-primary"
        >
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
              active === id ? "bg-text-primary" : "bg-text-body/20 group-hover:bg-text-primary/50"
            }`}
          />
          <span className={active === id ? "text-text-primary" : ""}>{label}</span>
        </a>
      ))}
    </nav>
  );
}
