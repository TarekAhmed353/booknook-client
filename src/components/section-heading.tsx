type SectionHeadingProps = {
  tag: string;
  title: string;
  text?: string;
};

export function SectionHeading({ tag, title, text }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brass">
        {tag}
      </p>
      <h2 className="mt-3 text-3xl font-semibold text-primary md:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-3 text-muted-foreground">{text}</p>}
    </div>
  );
}