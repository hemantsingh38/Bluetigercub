import { ReactNode } from "react";

export function Question({
  number,
  conditional,
  label,
  children,
}: {
  number?: number;
  conditional?: boolean;
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="max-w-2xl text-[15px] text-kotg-black">
        {conditional && <span className="italic text-kotg-text-muted">(Conditional) </span>}
        {number != null && <span>{number}. </span>}
        {label}
      </p>
      {children}
    </div>
  );
}
