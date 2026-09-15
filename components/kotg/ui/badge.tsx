import clsx from "clsx";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full bg-kotg-primary/10 px-3 py-1 text-xs font-semibold text-kotg-primary",
        className
      )}
    >
      {children}
    </span>
  );
}

export function ConditionalLabel() {
  return <span className="font-normal italic text-kotg-text-muted">(Conditional) </span>;
}

const PRIORITY_COLORS: Record<"Low" | "Medium" | "High", string> = {
  Low: "var(--color-kotg-green)",
  Medium: "var(--color-kotg-yellow)",
  High: "var(--color-kotg-red)",
};

export function PriorityDot({ priority }: { priority: "Low" | "Medium" | "High" }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: PRIORITY_COLORS[priority] }}>
      <span className="size-1.5 rounded-full" style={{ backgroundColor: PRIORITY_COLORS[priority] }} />
      {priority}
    </span>
  );
}
