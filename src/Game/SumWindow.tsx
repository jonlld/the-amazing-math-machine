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
      className="sum-window--container hidden shift-down"
    >
      <div className="sum--container">
        <p className="sum--sum">
          {first} + {second}
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
