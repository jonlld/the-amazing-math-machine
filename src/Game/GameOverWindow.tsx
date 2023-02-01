import { GameOverProps } from "../models/interfaces";

const GameOverWindow = ({ score, highscore }: GameOverProps): JSX.Element => {
  return (
    <section>
      <h1 className="game-over--heading">Game Over!</h1>
      <p className="game-over--score">
        Your <span>current score</span> is <span>{score}.</span>
        {score > 0 ? "Great job!" : "Better luck next time!"}
      </p>
      {highscore > 0 && (
        <p className="game-over--score">
          Your <span>highscore</span> is <span>{highscore}!</span>
        </p>
      )}
      <button className="btn">Play Again</button>
    </section>
  );
};

export default GameOverWindow;
