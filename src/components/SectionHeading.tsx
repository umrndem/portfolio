type SectionHeadingProps = {
  index: string;
  title: string;
  note?: string;
};

export function SectionHeading({ index, title, note }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <p className="section-heading__index">{index}</p>
      <h2>{title}</h2>
      {note ? <p className="section-heading__note">{note}</p> : null}
    </header>
  );
}
