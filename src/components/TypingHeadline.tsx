import { Fragment, type CSSProperties } from "react";

type TypingHeadlineProps = {
  id: string;
  text: string;
};

type CharacterStyle = CSSProperties & {
  "--typing-index": number;
};

export function TypingHeadline({ id, text }: TypingHeadlineProps) {
  let characterIndex = 0;
  const words = text.split(" ");

  return (
    <h1 className="typing-headline" id={id} aria-label={text}>
      {words.map((word, wordIndex) => (
        <Fragment key={wordIndex}>
          <span className="typing-headline__word" aria-hidden="true">
            {[...word].map((character) => {
              const style: CharacterStyle = {
                "--typing-index": characterIndex,
              };
              characterIndex += 1;

              return (
                <span
                  className="typing-headline__character"
                  style={style}
                  key={characterIndex}
                >
                  {character}
                </span>
              );
            })}
          </span>
          {wordIndex < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h1>
  );
}
