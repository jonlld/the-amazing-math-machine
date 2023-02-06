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

  const processAnswer = (answer: string): void => {
    onAnswer(parseInt(answerRef.current!.value));
    answerRef.current!.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (answerRef.current!.value && e.key === "Enter")
      processAnswer(answerRef.current!.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (answerRef.current!.value) processAnswer(answerRef.current!.value);
  };

  return (
    <section className="sum-window--container fade-in-slide-up">
      <div className="sum--container">
        <p className="sum--sum">
          {first} {operand} {second}
        </p>
      </div>
      <form className="sum--container" onSubmit={handleSubmit}>
        <input
          ref={answerRef}
          type="number"
          className="sum--input"
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <button className="btn btn__submit">Submit</button>
      </form>
    </section>
  );
}

export default SumWindow;
