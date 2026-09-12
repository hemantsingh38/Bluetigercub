"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FILTER_TAGS, projects, type FilterTag, type ProjectSummary } from "@/lib/projects";
import { Reveal } from "./reveal";

export function WorkGrid() {
  const [active, setActive] = useState<FilterTag[]>([]);

  const visible = useMemo(() => {
    if (active.length === 0) return projects;
    return projects.filter((p) => p.tags.some((t) => active.includes(t)));
  }, [active]);

  function toggle(tag: FilterTag) {
    setActive((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  return (
    <section className="mx-auto max-w-[1560px] px-6 py-16 sm:px-9 lg:flex lg:gap-16 lg:py-24">
      <aside className="mb-10 flex flex-wrap gap-x-6 gap-y-3 lg:mb-0 lg:w-48 lg:shrink-0 lg:flex-col lg:gap-4">
        <button
          type="button"
          onClick={() => setActive([])}
          className={`font-caption text-left text-sm tracking-wide transition-colors hover:text-text-primary ${
            active.length === 0 ? "text-text-primary underline underline-offset-4" : "text-text-body/50"
          }`}
        >
          All
        </button>
        {FILTER_TAGS.map((tag) => (
          <button
            type="button"
            key={tag}
            onClick={() => toggle(tag)}
            className={`font-caption text-left text-sm tracking-wide transition-colors hover:text-text-primary ${
              active.includes(tag)
                ? "text-text-primary underline underline-offset-4"
                : "text-text-body/50"
            }`}
          >
            {tag}
          </button>
        ))}
      </aside>

      <div className="grid flex-1 grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-14 lg:gap-y-20">
        {visible.map((project, i) => (
          <Reveal key={project.index} delay={(i % 3) * 0.08}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: ProjectSummary }) {
  const content = (
    <>
      <div className="aspect-4/5 w-full rounded-sm bg-diagram-bg transition-transform duration-300 group-hover:-translate-y-1" />
      <p className="font-script mt-2 text-2xl leading-none text-text-body/60">{project.index}</p>
      <p className="font-caption mt-1 text-base leading-snug text-text-body">
        {project.title}
        {project.status === "comingSoon" && (
          <span className="ml-2 whitespace-nowrap text-xs uppercase tracking-wide text-text-body/40">
            Coming soon
          </span>
        )}
      </p>
    </>
  );

  if (project.status === "live" && project.slug) {
    return (
      <Link href={`/work/${project.slug}`} className="group block">
        {content}
      </Link>
    );
  }

  return <div className="opacity-70">{content}</div>;
}
