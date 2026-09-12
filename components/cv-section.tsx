"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import {
  CERTIFICATIONS,
  CV_CONTACT,
  CV_PAGES,
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

const pageById = (id: CvPageId) => CV_PAGES.find((p) => p.id === id)!;

/**
 * Home page CV section, right before the footer. Styled after the
 * restaurantelm.fi menu reference: one floating "page" card (white,
 * soft shadow, document-narrow width) with a caption + centered dot
 * pagination underneath, rather than a side nav.
 */
export function CvSection() {
  const [page, setPage] = useState<CvPageId>(CV_PAGES[0].id);

  return (
    <section className="mx-auto max-w-[1560px] px-6 py-16 text-center sm:px-9 lg:py-24">
      <Reveal>
        <h2 className="text-lg text-text-primary">CV</h2>
      </Reveal>

      <Reveal
        delay={0.1}
        className="mx-auto mt-10 h-[1080px] w-full max-w-2xl overflow-y-auto rounded-sm border border-accent/10 bg-bg p-8 text-left shadow-[0_30px_60px_-25px_rgba(25,72,200,0.35)] sm:h-[960px] sm:p-14 lg:h-[900px]"
      >
        <AnimatePresence mode="wait">
          {page === "experience" ? (
            <motion.div key="experience" {...PAGE_TRANSITION}>
              <h3 className="text-base text-text-primary">Experience</h3>
              <div className="mt-4 divide-y divide-accent/10 border-t border-accent/10">
                {EXPERIENCE.map((role) => (
                  <div
                    key={`${role.org}-${role.period}`}
                    className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between"
                  >
                    <p className="text-sm text-text-primary sm:text-base">
                      {role.role} <span className="text-text-body">· {role.org}</span>
                    </p>
                    <p className="text-xs text-text-body/60 sm:text-right sm:text-sm">
                      {role.period} — {role.meta}
                    </p>
                  </div>
                ))}
              </div>

              <h3 className="mt-10 text-base text-text-primary">Certifications</h3>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-text-body">
                {CERTIFICATIONS.map((cert) => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>

              <h3 className="mt-10 text-base text-text-primary">Education</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-body">{EDUCATION}</p>
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

      {/* Caption + centered dot pagination, matching the reference's
          document-pager treatment (a filled dot for the current page,
          hollow rings for the rest). */}
      <Reveal delay={0.15} className="mt-6 flex flex-col items-center gap-3">
        <p className="font-caption text-xs uppercase tracking-[0.2em] text-text-body/50">
          {pageById(page).label}
        </p>
        <div className="flex items-center gap-3">
          {CV_PAGES.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-label={`Show ${label}`}
              aria-current={page === id}
              onClick={() => setPage(id)}
              className="p-1"
            >
              <span
                className={`block h-2.5 w-2.5 rounded-full transition-colors ${
                  page === id
                    ? "bg-text-primary"
                    : "border border-text-body/40 bg-transparent hover:border-text-primary"
                }`}
              />
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
