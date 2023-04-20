import { useContext } from "react";
import ScoreContext from "../../context/score-context";

interface Props {
  score: number;
  numGames: number;
  aveScore: number;
  aveScoreMsg: string;
}

const ScoreStats = ({
  score,
  numGames,
  aveScore,
  aveScoreMsg,
}: Props): JSX.Element => {
  const ctx = useContext(ScoreContext);

  return (
    <div className="fade-in-slide-up stats__container">
      <h1 className="game-over__heading">Game Over!</h1>
      <p className="game-over__stat">
        Your <span>score</span> was <span>{score}.</span>
        {score > 0 ? "Great job!" : "Better luck next time!"}
      </p>
      {ctx.highscore > 0 && (
        <p className="game-over__stat">
          Your <span>ctx.highscore</span> is <span>{ctx.highscore}!</span>
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
  );
};

export default ScoreStats;
