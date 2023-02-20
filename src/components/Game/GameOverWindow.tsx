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
  let scoreHistory;
  let scoreHistoryForTable;

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

    // Make copy to reverse order...
    let cloneScoreHistory = userStats.scoreHistory.map((obj) => {
      return { ...obj };
    });
    scoreHistory = cloneScoreHistory.reverse();

    // Extract stats used in table to map through
    scoreHistoryForTable = scoreHistory.map((scoreObj) => {
      const { date, sumType: mode, score } = scoreObj;
      return { date, mode, score };
    });
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

  const copyScoreHistory = scoreHistory?.slice();
  const reversedHistory = copyScoreHistory?.reverse();
  console.log(reversedHistory);

  return (
    <section className="game-over__main-container">
      {!isViewHistory && (
        <div className="fade-in-slide-up stats__container">
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
      {isViewHistory && scoreHistoryForTable && (
        <div className="fade-in-slide-up history__container">
          {Object.keys(scoreHistoryForTable[0]).map((key) => {
            return <div className="history-header">{key}</div>;
          })}
          {scoreHistoryForTable.map((score) =>
            Object.values(score).map((value) => (
              <div className="history__item">{value}</div>
            ))
          )}
        </div>
      )}
      <div className="game-over__buttons-container">
        <button className="btn btn--play-again" onClick={playHandler}>
          Play Again
        </button>
        <button className="btn btn--choose-type" onClick={chooseHandler}>
          Choose Game Type
        </button>
        <button className="btn btn--toggle-scores" onClick={statsHandler}>
          Toggle Scores
        </button>
      </div>
    </section>
  );
};

export default GameOverWindow;
