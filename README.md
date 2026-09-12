# Hemant Singh — Portfolio

Personal portfolio site: Next.js (App Router) + TypeScript + Tailwind CSS v4 +
Framer Motion. Built from `PORTFOLIO_BUILD_BRIEF.md` and `CONTENT_DRAFT.md`
plus a Figma reference (fileKey `F8x4aFDIGTyzBICUKmP7A7`).

**Live:** https://hemantsingh38.github.io/Bluetigercub/ — deployed via
`.github/workflows/deploy-pages.yml` on every push to this branch (or
`main`, once merged). See that workflow file for the static-export /
`basePath` setup this hosting mode needs.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build + typecheck
npm run lint
```

## Structure

- `app/` — routes: `/` (home), `/about`, `/work/[slug]` (case study template)
- `components/` — shared UI (nav, footer, badge, reveal-on-scroll wrapper,
  the swimlane diagram + annotated-screenshot-card used by case studies)
- `components/mock-ui/` — the rebuilt "Add New Supplier" illustrations for
  the Emerson case study (see confidentiality note below)
- `content/case-studies/` — case study copy + diagram data, one file per
  project
- `lib/projects.ts` — the Home work-grid data (tags, live/coming-soon state)
- `lib/case-study.ts` — shared types for case study content

## Current scope (as of this build)

Per the "Emerson only" scope decision: only one case study is fully live
(`/work/emerson-agentic-supplier-onboarding`). The other five Home grid
slots render as generic "Coming soon" placeholders with deliberately
non-specific copy — none of those five projects have been fact-checked or
cleared for public specifics yet (see `PORTFOLIO_BUILD_BRIEF.md` section 5).

**A confidentiality note, since it's easy to forget later:** the Emerson
case study's product screenshots in `components/mock-ui/emerson-screens.tsx`
are original recreations, not edited real screenshots — the real ones carry
Emerson's actual logo, brand color, and live-looking supplier names, and
were only ever available here as images rendered inline in chat, never as
files. If you get the real, already-redacted exports later, you can swap
them in as real images instead — just don't reintroduce real branding into
that file.

## Still needed from Hemant before a public launch

- Contact details for the footer/About: email, phone, Behance URL,
  Instagram (LinkedIn + location are already in from the CV)
- Hero/About photo (currently a placeholder box)
- Botanical hero/footer illustrations from the Figma design (they were
  shared inline in chat, not as file attachments, so they aren't in
  `public/` yet — see the build brief's "Illustration & motif" section)
- Project timeline + role for the Emerson case study hero meta block
- Real impact metrics for the Emerson case study, once you have figures
  you can stand behind in an interview
- A decision on the remaining five projects (see the open questions in
  `PORTFOLIO_BUILD_BRIEF.md` section 6) once you're ready to expand past
  the Emerson-only v1

## Design tokens

Colors and all fonts are confirmed directly from the Figma file's own text
nodes and variables (see `app/globals.css` and the font loading in
`app/layout.tsx`): **PT Serif** for headlines/body/nav, **PT Serif Caption**
for small UI labels (work-grid captions, filter tags, badge subtext), and
**Allison** for the cursive badge and project-index tags. One family in the
source, **Antro Vectra** — a large 96px display treatment of "Hemant Singh"
on the About page — isn't a Google Font and there's no licensed file for it
here, so that specific display flourish isn't reproduced; add it with
`next/font/local` if you get a licensed font file, or pick a substitute.

The note-chip colors and the orange section-header color (used in the
swimlane diagrams) are PNG-sampled approximations, not exact hex values —
both source diagrams turned out to be flattened raster images in Figma
with no extractable vector/color data, so there's nothing more precise to
pull. They read correctly regardless (confirmed against full-resolution
screenshots of both diagrams).

`findingyouhemant.framer.website` (the old portfolio referenced in the
build brief for extra bio/voice details) was unreachable from this
environment — blocked by network egress policy, not fetched. If it has
content worth pulling in, that'll need a session without that restriction,
or the content pasted in directly.
