import { ScoreItemTable } from "../../models/interfaces";

interface Props {
  history: ScoreItemTable[];
}

const ScoreHistory = ({ history }: Props): JSX.Element => {
  return (
    <div className="fade-in-slide-up history__container">
      {Object.keys(history[0]).map((key) => {
        return <div className="history-header">{key}</div>;
      })}
      {history.map((score) =>
        Object.values(score).map((value) => (
          <div className="history__item">{value}</div>
        ))
      )}
    </div>
  );
};

export default ScoreHistory;
