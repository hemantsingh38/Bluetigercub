import { ReactNode } from "react";
import { Badge } from "@/components/kotg/ui/badge";

export function FormSection({
  title,
  subtitle,
  badge,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-kotg-border pt-6 first:mt-0 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-bold text-kotg-black">{title}</h3>
          {badge && <Badge>{badge}</Badge>}
        </div>
        {action}
      </div>
      {subtitle && <p className="mt-1 text-sm text-kotg-text-muted">{subtitle}</p>}
      <div className="mt-5 flex flex-col gap-7">{children}</div>
    </section>
  );
}
