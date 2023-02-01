import { GameOverProps } from "../models/interfaces";

const GameOverWindow = ({ score, highscore }: GameOverProps): JSX.Element => {
  return (
    <section>
      <h1>Game Over!</h1>
      <p>Your current score is {score}! Great job!</p>
      <p>Your highscore is {highscore}!</p>
      <button className="btn">Play Again</button>
    </section>
  );
};

export default GameOverWindow;
