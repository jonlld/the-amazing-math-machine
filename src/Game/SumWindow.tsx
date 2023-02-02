import React, { Fragment, useRef, useEffect } from "react";
import { QuizProps } from "../models/interfaces";

function SumWindow({
  sum: { first, second },
  onAnswer,
}: QuizProps): JSX.Element {
  const sumContainerRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      onAnswer(parseInt(answerRef.current!.value));
      answerRef.current!.value = "";
    }
  };

  // remove class on mount to trigger transition
  useEffect(() => {
    sumContainerRef.current?.classList.remove("hidden");
    sumContainerRef.current?.classList.remove("shift-down");
  }, []);

  return (
    <section
      ref={sumContainerRef}
      className="game-main__sums hidden shift-down"
    >
      <div className="quiz--container sum">
        <p className="quiz__sum">
          {first} + {second}
        </p>
      </div>
      <div className="quiz--container">
        <input
          ref={answerRef}
          type="number"
          className="quiz__input"
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
    </section>
  );
}

export default SumWindow;
