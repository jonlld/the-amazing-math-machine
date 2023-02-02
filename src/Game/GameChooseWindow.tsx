import { ChooseProps } from "../models/interfaces";

const GameChooseWindow = ({ onStart }: ChooseProps): JSX.Element => {
  return (
    <section className="choose--container">
      <h1 className="choose--header">Click to start playing!</h1>
      <button className="btn" onClick={onStart}>
        Go!
      </button>
    </section>
  );
};

export default GameChooseWindow;
