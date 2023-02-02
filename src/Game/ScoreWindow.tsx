import { useEffect } from "react";
import { ScoreProps } from "../models/interfaces";

function ScoreWindow({
  isCorrect,
  message,
  score,
  highscore,
}: ScoreProps): JSX.Element {
  let classes = "";

  if (message === "Good luck!") {
    classes = "score-window--container";
  } else {
    classes = `score-window--container ${isCorrect ? "correct" : "incorrect"}`;
  }

  return (
    <section className={classes}>
      <div className="score--container">
        <p>{message}</p>
      </div>
      <div className="score--container scores">
        <p>{score > 0 && `Your score is ${score}!`}</p>
        <p>{highscore > 0 && `Your previous highscore is ${highscore}!`}</p>
      </div>
    </section>
  );
}

export default ScoreWindow;
