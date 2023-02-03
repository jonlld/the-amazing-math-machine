import { useRef, useEffect } from "react";
import { GameOverProps } from "../models/interfaces";

const GameOverWindow = ({
  score,
  highscore,
  onPlayAgain,
  onChoose,
}: GameOverProps): JSX.Element => {
  const gameOverContainerRef = useRef<HTMLElement>(null);

  const playHandler = (): void => {
    onPlayAgain();
  };

  const chooseHandler = (): void => {
    console.log("Back to choose game screen!");
    onChoose();
  };

  // BUG Why require setTimeout here but not for others?
  useEffect(() => {
    setTimeout(() => {
      gameOverContainerRef.current?.classList.remove("hidden");
      gameOverContainerRef.current?.classList.remove("shift-down");
    }, 0);
  }, []);

  return (
    <section
      ref={gameOverContainerRef}
      className="game-over--container hidden shift-down"
    >
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
      <button className="btn btn__play-again" onClick={playHandler}>
        Play Again
      </button>
      <button className="btn" onClick={chooseHandler}>
        Choose Game Type
      </button>
    </section>
  );
};

export default GameOverWindow;
