import { ScoreItemTable } from "../../models/interfaces";

interface Props {
  history: ScoreItemTable[];
}

const ScoreHistory = ({ history }: Props): JSX.Element => {
  let id = 0;

  return (
    <div className="fade-in-slide-up history__container">
      {Object.keys(history[0]).map((key) => {
        return (
          <div key={key} className="history-header">
            {key}
          </div>
        );
      })}
      {history.map((score) =>
        Object.values(score).map((value, index) => (
          <div key={++id} className="history__item">
            {value}
          </div>
        ))
      )}
    </div>
  );
};

export default ScoreHistory;
