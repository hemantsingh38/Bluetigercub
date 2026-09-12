import type { NoteChip, NoteColor, SwimlaneDiagram } from "@/lib/case-study";

const NOTE_BG: Record<NoteColor, string> = {
  yellow: "bg-note-yellow",
  pink: "bg-note-pink",
  purple: "bg-note-purple",
  blue: "bg-note-blue",
  green: "bg-note-green",
  teal: "bg-note-teal",
  coral: "bg-note-coral",
};

function Chip({ chip }: { chip: NoteChip }) {
  return (
    <p
      className={`rounded-md ${NOTE_BG[chip.color]} px-3 py-2 text-xs leading-snug text-black/70`}
    >
      {chip.text}
    </p>
  );
}

/**
 * Renders a flow/swimlane diagram from data: post-it-style note chips under
 * screen columns, grouped into actor "lanes" marked by an all-caps orange
 * header bar (see PORTFOLIO_BUILD_BRIEF.md section 2, "Illustration & motif").
 * Reused across both diagrams in the Emerson case study; drop in another
 * SwimlaneDiagram object to reuse it for a future project.
 */
export function SwimlaneDiagramView({ diagram }: { diagram: SwimlaneDiagram }) {
  const bands: { actor: string; stages: SwimlaneDiagram["stages"] }[] = [];
  for (const stage of diagram.stages) {
    const last = bands[bands.length - 1];
    if (last && last.actor === stage.actor) {
      last.stages.push(stage);
    } else {
      bands.push({ actor: stage.actor, stages: [stage] });
    }
  }

  return (
    <div className="rounded-lg bg-diagram-bg p-6 sm:p-8">
      <p className="mb-6 text-sm font-medium uppercase tracking-wide text-text-body/60">
        {diagram.title}
      </p>

      <div className="overflow-x-auto">
        <div className="flex min-w-max flex-col gap-6">
          {bands.map((band, bandIdx) => (
            <div key={bandIdx}>
              <div className="mb-3 inline-block rounded-sm bg-section-orange px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
                {band.actor}
              </div>
              <div className="flex gap-4">
                {band.stages.map((stage, i) => (
                  <div
                    key={i}
                    className={stage.noteGroups.length > 1 ? "w-80 shrink-0" : "w-48 shrink-0"}
                  >
                    {stage.screenLabel && (
                      <p className="text-xs font-medium text-text-primary/70">
                        {stage.screenLabel}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-medium text-text-primary">{stage.title}</p>
                    <div className="mt-3 flex gap-3">
                      {stage.noteGroups.map((group, gi) => (
                        <div key={gi} className="flex flex-1 flex-col gap-2">
                          {group.map((chip, ci) => (
                            <Chip key={ci} chip={chip} />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {diagram.advantages && diagram.advantages.length > 0 && (
        <div className="mt-8 border-t border-accent/10 pt-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-text-body/50">
            Advantages
          </p>
          <div className="flex flex-wrap gap-3">
            {diagram.advantages.map((chip, i) => (
              <div key={i} className="max-w-[220px]">
                <Chip chip={chip} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
