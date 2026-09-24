type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  actionLabel,
}: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="max-w-2xl">
        <div className="font-mono-custom text-[11px] uppercase tracking-[0.28em] text-[#6a1b9a]">
          {eyebrow}
        </div>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#241f1b] sm:text-4xl">
          {title}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#6b6152] sm:text-base">
          {description}
        </p>
      </div>

      {actionLabel ? (
        <span className="hidden rounded-full border border-[#6a1b9a]/18 bg-white px-4 py-2 text-sm font-semibold text-[#6a1b9a] shadow-sm md:inline-flex">
          {actionLabel}
        </span>
      ) : null}
    </div>
  );
}
