export const FILTER_TAGS = [
  "US GOV Projects",
  "Big 4 clients",
  "Edtech",
  "Personal",
  "Branding",
] as const;

export type FilterTag = (typeof FILTER_TAGS)[number];

export interface ProjectSummary {
  /** hand-lettered "p-01" style tag shown above the thumbnail */
  index: string;
  slug: string | null;
  title: string;
  tags: FilterTag[];
  status: "live" | "comingSoon";
}

/**
 * Grid data for the Home work section. Mirrors the 3x2 layout in the Figma
 * home frame (six thumbnails). Per the scope decision (Emerson-only v1),
 * only the Emerson case study is live — the rest render as "Coming soon"
 * placeholders with deliberately generic, non-specific copy: none of these
 * five have been fact-checked or cleared for public specifics yet (e.g. the
 * Figma captions for p-01 and p-06 include claims/company specificity that
 * haven't been confirmed safe to publish - see PORTFOLIO_BUILD_BRIEF.md
 * section 5-6). Update this list as each project gets its own case study.
 */
export const projects: ProjectSummary[] = [
  {
    index: "p-01",
    slug: null,
    title: "Provider enrollment platform for a U.S. state health program",
    tags: ["US GOV Projects", "Big 4 clients"],
    status: "comingSoon",
  },
  {
    index: "p-02",
    slug: null,
    title: "Bid-management platform for digital procurement",
    tags: ["Big 4 clients"],
    status: "comingSoon",
  },
  {
    index: "p-03",
    slug: null,
    title: "AI-assisted interview-prep platform",
    tags: ["Edtech"],
    status: "comingSoon",
  },
  {
    index: "p-04",
    slug: null,
    title: "New work, in progress",
    tags: ["Personal"],
    status: "comingSoon",
  },
  {
    index: "p-05",
    slug: "emerson-agentic-supplier-onboarding",
    title:
      "Designing an agentic supplier onboarding and contract-generation tool for a global industrial automation leader",
    tags: ["Big 4 clients"],
    status: "live",
  },
  {
    index: "p-06",
    slug: null,
    title: "AI-assisted business summary tool for a global pharmaceutical company",
    tags: ["Big 4 clients"],
    status: "comingSoon",
  },
];
