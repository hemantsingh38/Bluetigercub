// Single source of truth for Hemant's CV content — shared by the About page
// and the Home page's CV section (components/cv-section.tsx) so the two
// never drift apart.

export const CV_SUMMARY =
  "Hi, I'm Hemant — a Product Designer based in Gurugram, working across enterprise, fintech, edtech and e-commerce for the past 3+ years. I currently design at Deloitte USI, shipping complex, regulated products for global pharmaceutical and industrial clients and multiple U.S. state governments. I turn ambiguous, high-stakes problems into clear interfaces — and I use AI across my process to roughly halve turnaround while doubling the directions I explore for any given problem.";

export interface SkillGroup {
  title: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Product & UX",
    items: [
      "End-to-end product design",
      "Rapid prototyping",
      "Exploring multiple directions",
      "User flows & information architecture",
      "Usability testing",
    ],
  },
  {
    title: "Research & Strategy",
    items: [
      "Personas & contextual inquiry",
      "Competitor analysis",
      "Journey & empathy mapping",
      "Product strategy",
    ],
  },
  {
    title: "UI & Systems",
    items: ["Visual design", "Design systems", "Componentization", "Branding", "Accessibility"],
  },
  {
    title: "AI-Native Design",
    items: [
      "Designing for LLM & agentic products",
      "AI-accelerated workflow (Claude, v0, Cursor)",
      "~2x directions explored, ~2x faster turnaround",
    ],
  },
];

export interface ExperienceEntry {
  role: string;
  org: string;
  period: string;
  meta: string;
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Design Analyst",
    org: "Deloitte USI",
    period: "Jul 2025–Present",
    meta: "Full-time, Hybrid, Gurugram",
  },
  {
    role: "Interaction Designer",
    org: "Skitre.ai",
    period: "Jan–Apr 2025",
    meta: "Freelance, Remote, Edtech",
  },
  {
    role: "UX & UI Designer",
    org: "Creative Stoica",
    period: "Jul–Oct 2024",
    meta: "Freelance, Remote, Edtech",
  },
  {
    role: "UX & Web Designer",
    org: "Sampann",
    period: "Feb–Apr 2024",
    meta: "Freelance, Remote, Fintech",
  },
  {
    role: "UX & UI Designer",
    org: "Crafters",
    period: "Dec 2023–Feb 2024",
    meta: "Part-time, Remote, Design agency",
  },
  {
    role: "UX & UI Designer",
    org: "Pictonix",
    period: "Jun–Aug 2023",
    meta: "Internship, Remote, Design agency",
  },
  {
    role: "UX & UI Designer",
    org: "VCriate",
    period: "Mar–May 2023",
    meta: "Internship, Remote, IT services",
  },
  {
    role: "Graphic Designer",
    org: "Wilson Wings",
    period: "Dec 2022–Feb 2023",
    meta: "Internship, Remote, Design agency",
  },
];

export const EDUCATION = "B.Des — UX Design, DIT University, Dehradun (May 2025)";

export const CERTIFICATIONS = [
  "HCI: The Foundation of UX Design — IxDF, 2023, Top 10%",
  "Design for the 21st Century (Don Norman) — IxDF, 2023, Top 10%",
  "Claude Code & Claude 101 — Anthropic",
];

export const CV_CONTACT = {
  linkedinHref: "https://www.linkedin.com/in/hemant-singh",
  linkedinLabel: "linkedin.com/in/hemant-singh",
  location: "Gurugram, Delhi NCR, India",
};

/** The two "pages" of the Home page CV section, switched via the dot nav. */
export const CV_PAGES = [
  { id: "experience", label: "Profile & Experience" },
  { id: "skills", label: "Skills & Education" },
] as const;

export type CvPageId = (typeof CV_PAGES)[number]["id"];
