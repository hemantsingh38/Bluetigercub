"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import {
  CERTIFICATIONS,
  CV_CONTACT,
  CV_PAGES,
  CV_SUMMARY,
  EDUCATION,
  EXPERIENCE,
  SKILL_GROUPS,
  type CvPageId,
} from "@/lib/cv";

const PAGE_TRANSITION = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

/**
 * Home page CV section, right before the footer. A "2 pager" resume: one
 * page of profile + experience, one of skills/education/certifications,
 * switched via a dot nav that reuses the same filled/hollow dot language as
 * the case-study template's ScrollspyNav (components/scrollspy-nav.tsx).
 */
export function CvSection() {
  const [page, setPage] = useState<CvPageId>(CV_PAGES[0].id);

  return (
    <section className="mx-auto max-w-[1560px] px-6 py-16 sm:px-9 lg:py-24">
      <Reveal>
        <h2 className="text-lg text-text-primary">CV</h2>
      </Reveal>

      <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:gap-16">
        <Reveal
          delay={0.1}
          className="min-h-[520px] min-w-0 flex-1 rounded-sm border border-accent/10 p-8 sm:p-10"
        >
          <AnimatePresence mode="wait">
            {page === "experience" ? (
              <motion.div key="experience" {...PAGE_TRANSITION}>
                <p className="text-lg leading-relaxed text-text-primary sm:text-xl">
                  {CV_SUMMARY}
                </p>

                <h3 className="mt-10 text-base text-text-primary">Experience</h3>
                <div className="mt-4 divide-y divide-accent/10 border-t border-accent/10">
                  {EXPERIENCE.map((role) => (
                    <div
                      key={`${role.org}-${role.period}`}
                      className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between"
                    >
                      <p className="text-sm text-text-primary sm:text-base">
                        {role.role} <span className="text-text-body">· {role.org}</span>
                      </p>
                      <p className="text-xs text-text-body/60 sm:text-sm">
                        {role.period} — {role.meta}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="skills" {...PAGE_TRANSITION}>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  {SKILL_GROUPS.map((group) => (
                    <div key={group.title}>
                      <h3 className="text-base text-text-primary">{group.title}</h3>
                      <ul className="mt-3 space-y-1.5 text-sm text-text-body">
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="text-base text-text-primary">Education</h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-body">{EDUCATION}</p>
                  </div>
                  <div>
                    <h3 className="text-base text-text-primary">Certifications</h3>
                    <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-text-body">
                      {CERTIFICATIONS.map((cert) => (
                        <li key={cert}>{cert}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-10 text-sm leading-relaxed text-text-body">
                  <a
                    href={CV_CONTACT.linkedinHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-text-primary underline underline-offset-4 hover:opacity-70"
                  >
                    {CV_CONTACT.linkedinLabel}
                  </a>
                  <br />
                  {CV_CONTACT.location}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>

        {/* Page dots — same filled/hollow language as the case-study ScrollspyNav,
            just click-to-switch instead of scroll-driven. */}
        <nav className="flex gap-6 sm:gap-8 lg:flex-col lg:gap-3">
          {CV_PAGES.map(({ id, label }, i) => (
            <button
              key={id}
              type="button"
              onClick={() => setPage(id)}
              aria-current={page === id}
              className="group flex items-center gap-3 text-left text-xs uppercase tracking-wide text-text-body/50 transition-colors hover:text-text-primary"
            >
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                  page === id
                    ? "bg-text-primary"
                    : "bg-text-body/20 group-hover:bg-text-primary/50"
                }`}
              />
              <span className={page === id ? "text-text-primary" : ""}>
                {String(i + 1).padStart(2, "0")} — {label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
