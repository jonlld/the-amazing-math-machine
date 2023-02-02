import React from "react";
import { ChooseProps } from "../models/interfaces";

const GameChooseWindow = ({ onStart }: ChooseProps): JSX.Element => {
  const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const type = e.currentTarget.getAttribute("value")!;
    onStart(type);
  };

  return (
    <section className="choose--container">
      <h1 className="choose--header">Choose Game Type!</h1>
      <button
        className="btn btn__choose btn__add"
        value="add"
        onClick={clickHandler}
      >
        Addition
      </button>
      <button
        className="btn btn__choose btn__subtract"
        value="subtract"
        onClick={clickHandler}
      >
        Subtraction
      </button>
      <button
        className="btn btn__choose btn__multiply"
        value="multiply"
        onClick={clickHandler}
      >
        Multiplication
      </button>
      <button
        className="btn btn__choose btn__random"
        value="random"
        onClick={clickHandler}
      >
        Random!
      </button>
    </section>
  );
};

export default GameChooseWindow;
