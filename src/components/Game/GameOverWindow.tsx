import { useState } from "react";
import { UserData, SumType } from "../../models/interfaces";

interface GameOverProps {
  score: number;
  highscore: number;
  onPlayAgain: () => void;
  onChoose: () => void;
  userStats: UserData | null;
}

// note legacy stored data may have 'random' key (now 'mix')
interface NumTypes {
  add: number;
  subtract: number;
  multiply: number;
  mix: number;
  "": number;
}

const GameOverWindow = ({
  score,
  highscore,
  onPlayAgain,
  onChoose,
  userStats,
}: GameOverProps): JSX.Element => {
  const [isViewHistory, setisViewHistory] = useState<boolean>(false);

  let numGames;
  let aveScore;
  let aveScoreMsg;
  let numTypesLookup: NumTypes = {
    "": 0,
    add: 0,
    subtract: 0,
    multiply: 0,
    mix: 0,
  };

  // UPDATE AVE SCORE & NUM GAMES
  if (userStats) {
    numGames = userStats.scoreHistory.length;
    const allScoresSum = userStats.scoreHistory.reduce(
      (acc, curr) => (acc += curr.score),
      0
    );
    aveScore = Math.round(allScoresSum / numGames);

    aveScoreMsg = aveScore > 2000 ? "how cool is that!?" : "keep going!";

    // Build lookup for favourite sumType stat
    userStats.scoreHistory.forEach((scoreItem) => {
      const sumType = scoreItem.sumType;
      numTypesLookup[sumType] === 0
        ? (numTypesLookup[sumType] = 1)
        : (numTypesLookup[sumType] += 1);
    });

    // TODO Add favourite sum type(s) message to stats
  }

  const playHandler = (): void => {
    onPlayAgain();
  };

  const chooseHandler = (): void => {
    onChoose();
  };

  const statsHandler = (): void => {
    setisViewHistory((prev) => !prev);
  };

  return (
    <section className="game-over--container fade-in-slide-up">
      <div className="game-over__messages">
        {!isViewHistory && (
          <div className="fade-in-slide-up">
            <h1 className="game-over__heading">Game Over!</h1>
            <p className="game-over__stat">
              Your <span>score</span> was <span>{score}.</span>
              {score > 0 ? "Great job!" : "Better luck next time!"}
            </p>
            {highscore > 0 && (
              <p className="game-over__stat">
                Your <span>highscore</span> is <span>{highscore}!</span>
              </p>
            )}
            <p className="game-over__stat">
              You have{" "}
              <span>
                played {numGames} {numGames === 1 ? "game" : "games"}
              </span>{" "}
              in total!
            </p>
            <p className="game-over__stat">
              Your <span>average score</span> is <span>{aveScore}</span>,{" "}
              {aveScoreMsg}
            </p>
          </div>
        )}
        {isViewHistory && (
          <div className="fade-in-slide-up">
            <h1 className="game-over--heading stats">Placeholder:</h1>
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
          Toggle History
        </button>
      </div>
    </section>
  );
};

export default GameOverWindow;
