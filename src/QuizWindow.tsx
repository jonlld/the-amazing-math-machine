import React, { Fragment, useRef } from "react";

interface QuizProps {
  sum: { first: number; second: number };
  onAnswer: (guess: number) => void;
}

function QuizWindow({ sum, onAnswer }: QuizProps): JSX.Element {
  const answerRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      onAnswer(parseInt(answerRef.current!.value));
      answerRef.current!.value = "";
    }
  };

  return (
    <section className="game-main__sums">
      <p className="quiz__sum">
        {sum.first} + {sum.second} = ?
      </p>
      <input
        ref={answerRef}
        type="text"
        className="quiz__input"
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </section>
  );
}

export default QuizWindow;
