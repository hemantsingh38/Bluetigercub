export function StepPageHeader({ title }: { title: string }) {
  return (
    <div className="mb-7 border-b border-kotg-border pb-4">
      <h1 className="font-kotg-display text-[26px] text-kotg-black">{title}</h1>
    </div>
  );
}
