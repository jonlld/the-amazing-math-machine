import { useState } from "react";
import { UserData } from "../../models/interfaces";

interface GameOverProps {
  score: number;
  highscore: number;
  onPlayAgain: () => void;
  onChoose: () => void;
  userStats: UserData | null;
}

const GameOverWindow = ({
  score,
  highscore,
  onPlayAgain,
  onChoose,
  userStats,
}: GameOverProps): JSX.Element => {
  const [isViewStats, setIsViewStats] = useState<boolean>(false);

  let aveScore;
  if (userStats) {
    const allScoresSum = userStats?.scoreHistory.reduce(
      (acc, curr) => (acc += curr.score),
      0
    );
    aveScore = Math.round(allScoresSum / userStats?.scoreHistory.length);
  }

  const playHandler = (): void => {
    onPlayAgain();
  };

  const chooseHandler = (): void => {
    onChoose();
  };

  const statsHandler = (): void => {
    setIsViewStats((prev) => !prev);
  };

  return (
    <section className="game-over--container fade-in-slide-up">
      <div>
        {!isViewStats && (
          <div>
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
          </div>
        )}
        {isViewStats && (
          <div>
            <h1 className="game-over--heading">Stats:</h1>
            <p className="game-over--score">
              You have{" "}
              <span>played {userStats?.scoreHistory.length} games</span> in
              total!
            </p>
            <p className="game-over--score">
              Your <span>average score</span> is <span>{aveScore}</span>, how
              cool is that!
            </p>
          </div>
        )}
      </div>
      <div className="game-over--button-container">
        <button className="btn btn__play-again" onClick={playHandler}>
          Play Again
        </button>
        <button className="btn btn__choose-type" onClick={chooseHandler}>
          Choose Game Type
        </button>
        <button className="btn btn__toggle-stats" onClick={statsHandler}>
          Toggle Stats
        </button>
      </div>
    </section>
  );
};

export default GameOverWindow;
