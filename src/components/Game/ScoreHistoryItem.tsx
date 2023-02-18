import { ScoreItem } from "../../models/interfaces";

interface Props {
  scoreItem: ScoreItem;
}

const ScoreGrid = ({ scoreItem }: Props): JSX.Element => {
  let { difficulty, gameMode, sumType, date, score } = scoreItem;
  let formattedScore = score.toString().padStart(2, "0");

  return (
    <div className="score-container">
      <div className="history__item">{formattedScore}</div>
      <div className="history__item">{sumType.toUpperCase()}</div>
      <div className="history__item">{date}</div>
    </div>
  );
};

export default ScoreGrid;
