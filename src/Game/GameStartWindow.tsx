import { GameStartProps } from "../models/interfaces";

const GameStartWindow = ({ onStart }: GameStartProps): JSX.Element => {
  return (
    <section className="game-start--container">
      <h1 className="game-start--header">Click to start playing!</h1>
      <button className="game-start-button" onClick={onStart}>
        Go!
      </button>
    </section>
  );
};

export default GameStartWindow;
