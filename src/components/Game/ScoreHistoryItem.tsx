import { ScoreItem } from "../../models/interfaces";

interface Props {
  scoreItem: ScoreItem;
}

const ScoreHistoryItem = ({ scoreItem }: Props): JSX.Element => {
  let { difficulty, gameMode, sumType, date, score } = scoreItem;

  return (
    <ul>
      <li>{date}</li>
      <li>{score}</li>
      <li>{sumType}</li>
    </ul>
  );
};

export default ScoreHistoryItem;
