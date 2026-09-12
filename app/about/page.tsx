import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About — Hemant Singh",
  description:
    "Product designer based in Gurugram, working across enterprise, fintech, edtech and e-commerce.",
};

const SKILL_GROUPS = [
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

const EXPERIENCE = [
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

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1560px] px-6 py-16 sm:px-9 sm:py-24">
      {/* Lead-in + photo */}
      <section className="flex flex-col-reverse gap-10 lg:flex-row lg:items-center lg:gap-16">
        <Reveal className="max-w-2xl">
          <p className="text-2xl leading-[1.45] text-text-primary sm:text-3xl lg:text-4xl">
            Hi, I&apos;m Hemant — a Product Designer based in Gurugram,
            working across enterprise, fintech, edtech and e-commerce for the
            past 3+ years. I currently design at Deloitte USI, shipping
            complex, regulated products for global pharmaceutical and
            industrial clients and multiple U.S. state governments. I turn
            ambiguous, high-stakes problems into clear interfaces — and I use
            AI across my process to roughly halve turnaround while doubling
            the directions I explore for any given problem.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="aspect-[4/5] w-full max-w-xs shrink-0 rounded-sm bg-diagram-bg lg:ml-auto" />
      </section>

      {/* Skills */}
      <section className="mt-24 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:mt-32 lg:grid-cols-4">
        {SKILL_GROUPS.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.08}>
            <h2 className="text-lg text-text-primary">{group.title}</h2>
            <ul className="mt-4 space-y-2 text-sm text-text-body">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </section>

      {/* Tools / Domains / Strengths */}
      <section className="mt-24 grid grid-cols-1 gap-12 sm:grid-cols-3 lg:mt-32">
        <Reveal>
          <h2 className="text-lg text-text-primary">Tools</h2>
          <p className="mt-4 text-sm leading-relaxed text-text-body">
            Figma, Illustrator, Photoshop, Miro, Framer, Claude, v0, Cursor
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-lg text-text-primary">Domains</h2>
          <p className="mt-4 text-sm leading-relaxed text-text-body">
            Enterprise & regulated software, Healthcare, Tax/audit/compliance,
            Fintech, Edtech, E-commerce, B2B platforms
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <h2 className="text-lg text-text-primary">Strengths</h2>
          <p className="mt-4 text-sm leading-relaxed text-text-body">
            Design leadership, cross-functional collaboration, cross-geo
            delivery (US & Ukraine), stakeholder management, strategic
            thinking
          </p>
        </Reveal>
      </section>

      {/* Education + certifications */}
      <section className="mt-24 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:mt-32">
        <Reveal>
          <h2 className="text-lg text-text-primary">Education</h2>
          <p className="mt-4 text-sm leading-relaxed text-text-body">
            B.Des — UX Design, DIT University, Dehradun (May 2025)
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-lg text-text-primary">Certifications</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-body">
            <li>HCI: The Foundation of UX Design — IxDF, 2023, Top 10%</li>
            <li>Design for the 21st Century (Don Norman) — IxDF, 2023, Top 10%</li>
            <li>Claude Code &amp; Claude 101 — Anthropic</li>
          </ul>
        </Reveal>
      </section>

      {/* Experience timeline */}
      <section className="mt-24 lg:mt-32">
        <Reveal>
          <h2 className="text-lg text-text-primary">Experience</h2>
        </Reveal>
        <div className="mt-8 divide-y divide-accent/10 border-t border-accent/10">
          {EXPERIENCE.map((role, i) => (
            <Reveal key={`${role.org}-${role.period}`} delay={Math.min(i * 0.05, 0.3)}>
              <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="text-base text-text-primary">
                  {role.role} <span className="text-text-body">· {role.org}</span>
                </p>
                <p className="text-sm text-text-body/60">
                  {role.period} — {role.meta}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Fun */}
      <section id="fun" className="mt-24 scroll-mt-24 lg:mt-32">
        <Reveal>
          <h2 className="text-lg text-text-primary">Fun</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-body">
            Meta detail, in the spirit of the rest of this site: I used
            Claude and Claude Code across research, design and the build
            itself to put this portfolio together.
          </p>
        </Reveal>
      </section>

      {/* Contact */}
      <section className="mt-24 lg:mt-32">
        <Reveal>
          <h2 className="text-lg text-text-primary">Contact</h2>
          <p className="mt-4 text-sm leading-relaxed text-text-body">
            <a
              href="https://www.linkedin.com/in/hemant-singh"
              target="_blank"
              rel="noreferrer"
              className="text-text-primary underline underline-offset-4 hover:opacity-70"
            >
              linkedin.com/in/hemant-singh
            </a>
            <br />
            Gurugram, Delhi NCR, India
          </p>
        </Reveal>
      </section>
    </div>
  );
}
