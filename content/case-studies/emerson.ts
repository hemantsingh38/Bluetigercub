import type { SwimlaneDiagram } from "@/lib/case-study";

// Copy below is carried over near-verbatim from CONTENT_DRAFT.md's "Case
// study 1 (fully drafted)" section. It already refers to the client only
// as "a global industrial automation leader" — never by name — which is
// why the prose needed no further redaction. What DID need rebuilding are
// the product screenshots (see components/mock-ui/emerson-screens.tsx) and,
// per the source material's own confidentiality flag, the client's real
// name is never used anywhere in this file either.

export const onboardingDiagram: SwimlaneDiagram = {
  title: "Agentic supplier onboarding — flow overview",
  stages: [
    {
      actor: "Supplier",
      screenLabel: "Step 1",
      title: "Invitation",
      noteGroups: [[{ text: "Supplier is invited to begin onboarding", color: "yellow" }]],
    },
    {
      actor: "Supplier",
      screenLabel: "Step 2",
      title: "Smart data entry",
      noteGroups: [
        [
          {
            text: "AI agent guides data entry and flags missing or inconsistent fields",
            color: "yellow",
          },
        ],
      ],
    },
    {
      actor: "System (AI agent)",
      screenLabel: "Step 3",
      title: "Automated verification",
      noteGroups: [
        [{ text: "Tax IDs, certifications and banking details are checked automatically", color: "blue" }],
      ],
    },
    {
      actor: "System (AI agent)",
      screenLabel: "Step 4",
      title: "Profile creation",
      noteGroups: [
        [{ text: "A structured supplier profile is created for human review", color: "purple" }],
      ],
    },
    {
      actor: "System (AI agent)",
      screenLabel: "Step 5",
      title: "Ongoing compliance monitoring",
      noteGroups: [
        [{ text: "Supplier status is monitored continuously after onboarding", color: "teal" }],
      ],
    },
  ],
  advantages: [
    { text: "Fewer manual handoffs between supplier and reviewer", color: "green" },
    { text: "Consistent, structured data from day one", color: "green" },
  ],
};

export const contractDiagram: SwimlaneDiagram = {
  title: "Contract generation — flow overview",
  stages: [
    {
      actor: "Supplier",
      title: "Receiving request for contract",
      noteGroups: [
        [
          { text: "Supplier receives a request / notification", color: "yellow" },
          {
            text: "Clicks the CTA, starts creating the contract inside the document flow",
            color: "yellow",
          },
        ],
      ],
    },
    {
      actor: "Supplier",
      screenLabel: "Screen 1",
      title: "Supplier registration & smart data entry",
      noteGroups: [
        [
          { text: "AI agent generates a questionnaire from the upstream data system", color: "yellow" },
          { text: "AI assists in adding or changing supplier details", color: "yellow" },
          { text: "AI flags errors and missing or required fields", color: "yellow" },
        ],
      ],
    },
    {
      actor: "Supplier",
      screenLabel: "Screen 2",
      title: "Template choice",
      noteGroups: [
        [
          { text: "Selects contract type and location", color: "blue" },
          { text: "Long/short, local/global contract, etc.", color: "blue" },
          { text: "Chooses a template and customizes it", color: "blue" },
        ],
      ],
    },
    {
      actor: "Supplier",
      screenLabel: "Screen 3",
      title: "Generate draft",
      noteGroups: [[{ text: "AI drafts the contract with visible reasoning", color: "blue" }]],
    },
    {
      actor: "Supplier",
      screenLabel: "Screen 4",
      title: "BU receives and analyzes AI-flagged risks",
      noteGroups: [
        [
          { text: "Agent generates a draft contract populated from the parent record", color: "purple" },
          { text: "Supplier sees editable fields; changes are tracked", color: "purple" },
          { text: "Save and submit for approval", color: "purple" },
        ],
        [
          { text: "Understands which issues are critical, moderate, or informational", color: "blue" },
          { text: "Views supplier performance history and specific risk flags", color: "blue" },
        ],
      ],
    },
    {
      actor: "Risk assessment & data validation",
      title: "Stakeholder & legal review, iterations",
      noteGroups: [
        [
          { text: "Stakeholders and legal review contracts and required changes", color: "teal" },
          { text: "Comments and suggested changes go back to the supplier", color: "teal" },
          { text: "Status: Draft, Under Review, Approved, Changes Requested", color: "teal" },
        ],
      ],
    },
    {
      actor: "Legal & stakeholder review",
      title: "Internal review iterations",
      noteGroups: [
        [
          { text: "Internal approvals — finance, compliance, management", color: "coral" },
          { text: "Approvers sign off or send feedback", color: "coral" },
          { text: "Contract routed externally for negotiation if needed", color: "coral" },
          { text: "AI tracks negotiation points and version changes", color: "coral" },
          { text: "E-signature for all parties", color: "coral" },
        ],
      ],
    },
    {
      actor: "Legal & stakeholder review",
      title: "Storage & post-signature management",
      noteGroups: [
        [
          { text: "Central dashboard for signed contracts", color: "blue" },
          { text: "Reminders, filters, search", color: "blue" },
        ],
      ],
    },
  ],
};

export const emerson = {
  title:
    "Designing an agentic supplier onboarding and contract-generation tool for a global industrial automation leader",
  brief:
    "The client needed to replace a slow, manual supplier-onboarding and contract process with an agentic system — one where AI agents handle data entry, verification, and first-draft contract generation, while people stay in control of every judgment call: risk sign-off, legal review, final signature.",
  challenges:
    "The hardest part wasn't the AI — it was making automation legible. Suppliers, internal reviewers, and legal stakeholders all needed to trust a system that was quietly doing work on their behalf, across a multi-role workflow with real compliance stakes. Dense onboarding data (tax IDs, certifications, banking details) had to be structured into something a human could scan and correct in seconds, not minutes.",
  approach: [
    "I mapped the full flow end to end — from supplier invitation through smart data entry, automated verification, profile creation, and ongoing compliance monitoring — before designing a single screen. That flow work doubled as the alignment tool with engineering and the client: everyone could see exactly where an AI agent was acting versus where a human needed to step in.",
    "For the contract side, I mapped a second swimlane spanning supplier → risk assessment & data validation → legal and stakeholder review, so the same \"AI drafts, human decides\" pattern held for contract generation as it did for onboarding.",
  ],
  solutionIntro:
    "The shipped product surfaces AI confidence directly in the UI — when a new supplier record closely matches an existing profile, the system shows a match percentage and a side-by-side compare view instead of silently merging or silently creating a duplicate. Reviewers approve, edit, or reject in place. Contract generation follows the same logic: AI produces a first draft from the selected template, then routes it through risk flags and stakeholder sign-off with full visibility at every step.",
  impact:
    "Impact metrics for this engagement are still being compiled — happy to walk through specifics in conversation.",
  learning:
    "Designing trust into an agentic interface is a different problem than designing a fast interface. Speed was easy; showing people why the system did what it did — without turning every screen into a wall of logs — took the most iteration.",
};
