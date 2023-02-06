import React, { useRef } from "react";
import { Sum } from "../../models/interfaces";

interface QuizProps {
  sum: Sum;
  onAnswer: (guess: number) => void;
}

function SumWindow({
  sum: { first, second, operand },
  onAnswer,
}: QuizProps): JSX.Element {
  const answerRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      onAnswer(parseInt(answerRef.current!.value));
      answerRef.current!.value = "";
    }
  };

  return (
    <section className="sum-window--container fade-in-slide-up">
      <div className="sum--container">
        <p className="sum--sum">
          {first} {operand} {second}
        </p>
      </div>
      <div className="sum--container">
        <input
          ref={answerRef}
          type="number"
          className="sum--input"
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
    </section>
  );
}

export default SumWindow;
