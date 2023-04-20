import { useState } from "react";
import ScoreStats from "./ScoreStats";
import ScoreHistory from "./ScoreHistory";
import { UserData, SumType, ScoreItemTable } from "../../models/interfaces";

interface GameOverProps {
  score: number;
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
  onPlayAgain,
  onChoose,
  userStats,
}: GameOverProps): JSX.Element => {
  const [isViewHistory, setisViewHistory] = useState<boolean>(false);

  // Stats - Using
  let numGames = 0;
  let aveScore = 0;
  let aveScoreMsg = "";

  // Stats - To Use
  let numTypesLookup: NumTypes = {
    "": 0,
    add: 0,
    subtract: 0,
    multiply: 0,
    mix: 0,
  };

  // Score History - All and Table
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

    // TODO - USE THIS?
    // Build lookup for favourite sumType stat
    userStats.scoreHistory.forEach((scoreItem) => {
      const sumType = scoreItem.sumType;
      numTypesLookup[sumType] === 0
        ? (numTypesLookup[sumType] = 1)
        : (numTypesLookup[sumType] += 1);
    });

    // Copy to reverse
    let cloneScoreHistory = userStats.scoreHistory.map((obj) => {
      return { ...obj };
    });
    scoreHistory = cloneScoreHistory.reverse();

    // Update table-specific stats
    scoreHistoryForTable = scoreHistory.map((scoreObj) => {
      const { date, sumType: mode, score } = scoreObj;
      return { date, mode, score };
    });
  }

  // HANDLE BUTTONS
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
    <section className="fade-in-slide-up game-over__main-container">
      {!isViewHistory && (
        <ScoreStats
          score={score}
          numGames={numGames}
          aveScore={aveScore}
          aveScoreMsg={aveScoreMsg}
        />
      )}
      {isViewHistory && scoreHistoryForTable && (
        <ScoreHistory history={scoreHistoryForTable} />
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
