import { ScreenFrame } from "./screen-frame";

/**
 * Original, invented recreations of the "Add New Supplier" flow for the
 * Emerson case study — not edited versions of the real product screenshots.
 *
 * Why: the real screenshots carry the client's actual logo, brand color,
 * and live-looking supplier records (see PORTFOLIO_BUILD_BRIEF.md's
 * confidentiality flag). Those image files also were never available here
 * as files to redact — only rendered inline in chat. So every label below
 * is invented (company/supplier names, IDs, ratings) and the accent color
 * is the site's own blue, not the client's. Keep it that way if you add
 * more screens later — don't swap in real exports without re-checking this
 * note.
 */

function StatusDot({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-block h-1.5 w-1.5 rounded-full ${active ? "bg-emerald-500" : "bg-black/25"}`}
    />
  );
}

function StepIndicator({ step }: { step: 1 | 2 }) {
  const steps = ["Upload Documents", "Review Details"];
  return (
    <div className="mb-4 flex items-center justify-center gap-2 text-[10px] text-black/50 sm:text-[11px]">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${i + 1 <= step ? "bg-accent" : "border border-black/20"}`}
          />
          <span className={i + 1 === step ? "text-accent" : ""}>{label}</span>
          {i === 0 && <span className="h-px w-6 bg-black/15 sm:w-10" />}
        </div>
      ))}
    </div>
  );
}

function Btn({ children, primary = false }: { children: string; primary?: boolean }) {
  return (
    <span
      className={`rounded px-3 py-1.5 text-[10px] font-medium tracking-wide sm:text-[11px] ${
        primary ? "bg-accent text-white" : "bg-black/5 text-black/60"
      }`}
    >
      {children}
    </span>
  );
}

const SUPPLIERS = [
  { name: "Norwood Alloy Partners", status: true, id: "402981", commodity: "Industrial Fasteners" },
  { name: "Ashgrove Metals Co.", status: true, id: "317765", commodity: "Steel Components" },
  { name: "Delford Polymer Group", status: false, id: "588204", commodity: "Plastic Resin" },
];

export function SuppliersListMock() {
  return (
    <ScreenFrame>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-medium text-black/80">Supplier Hub</p>
        <Btn primary>Add New Supplier</Btn>
      </div>
      <div className="mb-3 h-6 w-40 rounded border border-black/10 sm:w-56" />
      <div className="overflow-hidden rounded border border-black/10">
        <div className="grid grid-cols-4 gap-2 bg-black/[0.03] px-3 py-2 text-[9px] uppercase tracking-wide text-black/40 sm:text-[10px]">
          <span>Supplier</span>
          <span>Status</span>
          <span>ID</span>
          <span>Commodity</span>
        </div>
        {SUPPLIERS.map((s) => (
          <div
            key={s.id}
            className="grid grid-cols-4 items-center gap-2 border-t border-black/5 px-3 py-2 text-black/70"
          >
            <span>{s.name}</span>
            <span className="flex items-center gap-1.5">
              <StatusDot active={s.status} /> {s.status ? "Active" : "Inactive"}
            </span>
            <span className="text-black/50">{s.id}</span>
            <span className="text-black/50">{s.commodity}</span>
          </div>
        ))}
      </div>
    </ScreenFrame>
  );
}

export function UploadDocumentsMock() {
  return (
    <ScreenFrame>
      <p className="mb-1 font-medium text-black/80">Add New Supplier</p>
      <StepIndicator step={1} />
      <p className="mb-1 font-medium text-black/70">Upload Documents</p>
      <p className="mb-3 text-black/45">
        To add a new supplier, upload supplier documents like W9, banking details, etc.
      </p>
      <div className="flex flex-col items-center gap-2 rounded border border-dashed border-accent/30 bg-diagram-bg px-4 py-8 text-center">
        <p className="text-black/50">Drag &amp; Drop an Attachment</p>
        <Btn>Browse Files</Btn>
      </div>
      <p className="mt-2 text-black/35">You may upload: W9, Banking Details.</p>
      <div className="mt-4 flex justify-end gap-2">
        <Btn>Cancel</Btn>
        <Btn primary>Next</Btn>
      </div>
    </ScreenFrame>
  );
}

export function DuplicateMatchMock() {
  return (
    <ScreenFrame>
      <div className="mb-3 flex items-center gap-2">
        <p className="font-medium text-black/80">Similar profile(s) found</p>
        <span className="rounded-full bg-note-yellow px-2 py-0.5 text-[9px] font-medium text-black/60">
          Suggested
        </span>
      </div>
      <p className="mb-3 text-black/45">
        We found similar supplier profiles in our database. Compare and validate to avoid
        duplication.
      </p>
      <div className="overflow-hidden rounded border border-black/10">
        <div className="grid grid-cols-4 gap-2 bg-black/[0.03] px-3 py-2 text-[9px] uppercase tracking-wide text-black/40">
          <span>Supplier</span>
          <span>Match</span>
          <span>System ID</span>
          <span>Rating</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-2 border-t border-black/5 bg-accent/5 px-3 py-2 text-black/70">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border border-accent bg-accent" /> Norwood Alloy
            Partners
          </span>
          <span className="text-emerald-600">90% match</span>
          <span className="text-black/50">402981</span>
          <span className="text-black/50">5.0</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-2 border-t border-black/5 px-3 py-2 text-black/70">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border border-black/20" /> Ashgrove Metals Co.
          </span>
          <span className="text-black/45">55% match</span>
          <span className="text-black/50">317765</span>
          <span className="text-black/50">4.2</span>
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Btn>Continue Adding New</Btn>
        <Btn primary>Select to Compare</Btn>
      </div>
    </ScreenFrame>
  );
}

export function CompareDetailsMock() {
  const rows = [
    ["Supplier Name", "Norwood Alloy Partners", "Norwood Alloy Partners"],
    ["Supplier ID", "402981", "402981"],
    ["Rating", "5.0", "4.8"],
    ["TIN Number", "12-3456789", "12-3456789"],
  ];
  return (
    <ScreenFrame>
      <p className="mb-3 rounded bg-emerald-50 px-3 py-1.5 text-emerald-700">
        Our agent has identified this supplier within the company&apos;s database.
      </p>
      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-accent/15">
          <span className="absolute inset-0 rounded-full border-4 border-accent border-r-transparent border-t-transparent rotate-45" />
          <span className="font-medium text-accent">90%</span>
        </div>
        <p className="text-black/50">Confidence score</p>
      </div>
      <div className="overflow-hidden rounded border border-black/10">
        <div className="grid grid-cols-3 gap-2 bg-black/[0.03] px-3 py-2 text-[9px] uppercase tracking-wide text-black/40">
          <span>Field</span>
          <span>Uploaded</span>
          <span>Existing profile</span>
        </div>
        {rows.map((row) => (
          <div
            key={row[0]}
            className="grid grid-cols-3 items-center gap-2 border-t border-black/5 px-3 py-2 text-black/70"
          >
            {row.map((cell, i) => (
              <span key={i} className={i === 0 ? "text-black/45" : ""}>
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Btn>Continue Adding New</Btn>
        <Btn primary>View Existing Profile</Btn>
      </div>
    </ScreenFrame>
  );
}

export function ReviewDetailsMock() {
  return (
    <ScreenFrame>
      <p className="mb-1 font-medium text-black/80">Add New Supplier</p>
      <StepIndicator step={2} />
      <p className="mb-3 rounded bg-emerald-50 px-3 py-1.5 text-emerald-700">
        Our agent has prefilled the form for you. Validate and edit if needed.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {[
          "Supplier Name",
          "TIN",
          "Company Address Line 1",
          "City",
          "State / Province",
          "Zip / Postal Code",
        ].map((label) => (
          <div key={label}>
            <p className="mb-1 text-[9px] uppercase tracking-wide text-black/35">{label}</p>
            <div className="h-6 rounded border border-black/10 bg-diagram-bg" />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Btn>Back</Btn>
        <Btn primary>Add New Supplier</Btn>
      </div>
    </ScreenFrame>
  );
}
