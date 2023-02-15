import { SumType } from "../../models/interfaces";

interface ChooseProps {
  onStart: (sumType: SumType) => void;
}

const GameChooseWindow = ({ onStart }: ChooseProps): JSX.Element => {
  const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const sumType = e.currentTarget.getAttribute("value")!;
    if (
      sumType === "" ||
      sumType === "add" ||
      sumType === "subtract" ||
      sumType === "multiply" ||
      sumType === "mix"
    ) {
      // Initialises game from Game
      onStart(sumType);
    }
  };

  return (
    <section className="choose--container fade-in-slide-up">
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
          value="mix"
          onClick={clickHandler}
        >
          Mix it up!
        </button>
      </div>
    </section>
  );
};

export default GameChooseWindow;
