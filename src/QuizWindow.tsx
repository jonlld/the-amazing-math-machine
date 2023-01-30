import React, { Fragment, useRef } from "react";

interface QuizProps {
  sum: { first: number; second: number };
  onGuess: (guess: number) => void;
}

function QuizWindow({ sum, onGuess }: QuizProps): JSX.Element {
  const guessRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      onGuess(parseInt(guessRef.current!.value));
      guessRef.current!.value = "";
    }
  };

  return (
    <Fragment>
      <p className="quiz__sum">
        {sum.first} + {sum.second} = ?
      </p>
      <input
        ref={guessRef}
        type="text"
        className="quiz__input"
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </Fragment>
  );
}

export default QuizWindow;
