import { GameOverProps } from "../models/interfaces";

const GameOverWindow = ({
  score,
  highscore,
  onPlayAgain,
}: GameOverProps): JSX.Element => {
  const clickHandler = (): void => {
    onPlayAgain();
  };

  return (
    <section>
      <h1 className="game-over--heading">Game Over!</h1>
      <p className="game-over--score">
        Your <span>score</span> was <span>{score}.</span>
        {score > 0 ? "Great job!" : "Better luck next time!"}
      </p>
      {highscore > 0 && (
        <p className="game-over--score">
          Your <span>highscore</span> is <span>{highscore}!</span>
        </p>
      )}
      <button className="btn btn__play-again" onClick={clickHandler}>
        Play Again
      </button>
      <button className="btn" onClick={clickHandler}>
        Choose Game Type
      </button>
    </section>
  );
};

export default GameOverWindow;
