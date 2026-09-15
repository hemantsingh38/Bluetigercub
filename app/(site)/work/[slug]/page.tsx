import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnnotatedScreenshotCard, FlowArrow } from "@/components/annotated-screenshot-card";
import {
  CompareDetailsMock,
  DuplicateMatchMock,
  ReviewDetailsMock,
  SuppliersListMock,
  UploadDocumentsMock,
} from "@/components/mock-ui/emerson-screens";
import { Reveal } from "@/components/reveal";
import { ScrollspyNav } from "@/components/scrollspy-nav";
import { SwimlaneDiagramView } from "@/components/swimlane-diagram";
import { contractDiagram, emerson, onboardingDiagram } from "@/content/case-studies/emerson";
import { projects } from "@/lib/projects";

// Only Emerson is live for this pass (see the scope decision in the build
// brief). Add future case studies here as they're written — the template
// below doesn't need to change, just this lookup.
const CASE_STUDIES: Record<string, typeof emerson> = {
  "emerson-agentic-supplier-onboarding": emerson,
};

export function generateStaticParams() {
  return projects
    .filter((p): p is typeof p & { slug: string } => p.status === "live" && p.slug !== null)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const study = CASE_STUDIES[slug];
  if (!study) return {};
  return {
    title: `${study.title} — Hemant Singh`,
    description: study.brief,
  };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const study = CASE_STUDIES[slug];
  if (!study) notFound();

  return (
    <div>
      <section className="mx-auto max-w-[1560px] px-6 pt-16 sm:px-9 sm:pt-24">
        <Reveal>
          <p className="max-w-4xl text-3xl leading-[1.4] text-text-primary sm:text-4xl lg:text-5xl">
            {study.title}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-col gap-6 sm:flex-row sm:gap-16">
          <div>
            <p className="text-xs uppercase tracking-wide text-text-body/40">Time period taken</p>
            <p className="mt-1 text-sm italic text-text-body/50">Add project timeline</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-text-body/40">
              Task done, hats I wore
            </p>
            <p className="mt-1 text-sm italic text-text-body/50">Add your role &amp; hats worn</p>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 aspect-21/9 w-full rounded-sm bg-diagram-bg" />
      </section>

      <div className="mx-auto flex max-w-[1560px] gap-16 px-6 py-16 sm:px-9 sm:py-24">
        <div className="min-w-0 flex-1 space-y-24 sm:space-y-32">
          <section id="brief" className="scroll-mt-24">
            <Reveal>
              <h2 className="text-xs uppercase tracking-[0.2em] text-text-body/40">Brief</h2>
              <p className="mt-4 max-w-3xl text-xl leading-relaxed text-text-primary sm:text-2xl">
                {study.brief}
              </p>
            </Reveal>
          </section>

          <section id="challenges" className="scroll-mt-24">
            <Reveal>
              <h2 className="text-xs uppercase tracking-[0.2em] text-text-body/40">Challenges</h2>
              <p className="mt-4 max-w-3xl text-xl leading-relaxed text-text-primary sm:text-2xl">
                {study.challenges}
              </p>
            </Reveal>
          </section>

          <section id="approach" className="scroll-mt-24">
            <Reveal>
              <h2 className="text-xs uppercase tracking-[0.2em] text-text-body/40">Approach</h2>
            </Reveal>
            <div className="mt-4 max-w-3xl space-y-4">
              {study.approach.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className="text-base leading-relaxed text-text-body">{paragraph}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1} className="mt-10">
              <SwimlaneDiagramView diagram={onboardingDiagram} />
            </Reveal>
            <Reveal delay={0.15} className="mt-8">
              <SwimlaneDiagramView diagram={contractDiagram} />
            </Reveal>
          </section>

          <section id="solution" className="scroll-mt-24">
            <Reveal>
              <h2 className="text-xs uppercase tracking-[0.2em] text-text-body/40">Solution</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-body">
                {study.solutionIntro}
              </p>
            </Reveal>

            <div className="mt-10 flex flex-col gap-10">
              <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                <Reveal className="w-full sm:w-72">
                  <AnnotatedScreenshotCard caption="Dashboard — Suppliers">
                    <SuppliersListMock />
                  </AnnotatedScreenshotCard>
                </Reveal>
                <FlowArrow className="hidden sm:block" />
                <Reveal delay={0.05} className="w-full sm:w-72">
                  <AnnotatedScreenshotCard caption="Step 1 — Upload supplier document">
                    <UploadDocumentsMock />
                  </AnnotatedScreenshotCard>
                </Reveal>
              </div>

              <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                <Reveal className="w-full sm:w-72">
                  <AnnotatedScreenshotCard
                    caption="Step 2 — Comparing existing profile"
                    note="In case a matching profile is found"
                  >
                    <DuplicateMatchMock />
                  </AnnotatedScreenshotCard>
                </Reveal>
                <FlowArrow className="hidden sm:block" />
                <Reveal delay={0.05} className="w-full sm:w-72">
                  <AnnotatedScreenshotCard caption="Compare details — 90% confidence match">
                    <CompareDetailsMock />
                  </AnnotatedScreenshotCard>
                </Reveal>
              </div>

              <Reveal className="w-full sm:w-72">
                <AnnotatedScreenshotCard caption="Review details — agent-prefilled form">
                  <ReviewDetailsMock />
                </AnnotatedScreenshotCard>
              </Reveal>
            </div>
          </section>

          <section id="impact" className="scroll-mt-24">
            <Reveal>
              <h2 className="text-xs uppercase tracking-[0.2em] text-text-body/40">Impact</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-body">
                {study.impact}
              </p>
            </Reveal>
          </section>

          <section id="learning" className="scroll-mt-24">
            <Reveal>
              <h2 className="text-xs uppercase tracking-[0.2em] text-text-body/40">Learning</h2>
              <p className="mt-4 max-w-3xl text-xl leading-relaxed text-text-primary sm:text-2xl">
                {study.learning}
              </p>
            </Reveal>
          </section>

          <Reveal>
            <Link
              href="/"
              className="inline-block text-text-primary underline underline-offset-4 hover:opacity-70"
            >
              ← Back to work
            </Link>
          </Reveal>
        </div>

        <div className="sticky top-24 hidden h-fit xl:block">
          <ScrollspyNav />
        </div>
      </div>
    </div>
  );
}
