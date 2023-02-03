import React, { useRef, useEffect } from "react";
import { ChooseProps } from "../models/interfaces";

const GameChooseWindow = ({ onStart }: ChooseProps): JSX.Element => {
  const chooseContainerRef = useRef<HTMLDivElement>(null);

  const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const type = e.currentTarget.getAttribute("value")!;
    onStart(type);
  };

  // remove class on mount to trigger transition
  useEffect(() => {
    setTimeout(() => {
      chooseContainerRef.current?.classList.remove("hidden");
      chooseContainerRef.current?.classList.remove("shift-down");
    }, 0);
  }, []);

  return (
    <section
      ref={chooseContainerRef}
      className="choose--container shift-down hidden"
    >
      <h1 className="choose--header">Choose Game Type:</h1>
      <div className="choose--buttons">
        <button
          className="btn btn__choose btn__add"
          value="add"
          onClick={clickHandler}
        >
          Add +
        </button>
        <button
          className="btn btn__choose btn__subtract"
          value="subtract"
          onClick={clickHandler}
        >
          Subtract -
        </button>
        <button
          className="btn btn__choose btn__multiply"
          value="multiply"
          onClick={clickHandler}
        >
          Multiply *
        </button>
        <button
          className="btn btn__choose btn__random"
          value="random"
          onClick={clickHandler}
        >
          Mix it up!
        </button>
      </div>
    </section>
  );
};

export default GameChooseWindow;
