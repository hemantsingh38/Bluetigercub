export type NoteColor =
  | "yellow"
  | "pink"
  | "purple"
  | "blue"
  | "green"
  | "teal"
  | "coral";

export interface NoteChip {
  text: string;
  color: NoteColor;
}

/** One column in a swimlane diagram — a screen/step with its own note chips. */
export interface SwimlaneStage {
  /** Actor/lane this stage belongs to. Consecutive stages sharing an actor
   * render under one continuous orange header bar. */
  actor: string;
  screenLabel?: string;
  title: string;
  /** Each inner array renders as one stacked column of chips within the stage. */
  noteGroups: NoteChip[][];
}

export interface SwimlaneDiagram {
  title: string;
  stages: SwimlaneStage[];
  /** Bottom row of green "why this works" chips (only the onboarding
   * diagram has this in the source material). */
  advantages?: NoteChip[];
}

export const SCROLLSPY_SECTIONS = [
  { id: "brief", label: "Brief" },
  { id: "challenges", label: "Challenges" },
  { id: "approach", label: "Approach" },
  { id: "solution", label: "Solution" },
  { id: "impact", label: "Impact" },
  { id: "learning", label: "Learning" },
] as const;

export type SectionId = (typeof SCROLLSPY_SECTIONS)[number]["id"];
