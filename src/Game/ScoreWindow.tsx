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
    classes = "game-main__progress";
  } else {
    classes = `game-main__progress ${isCorrect ? "correct" : "incorrect"}`;
  }

  return (
    <section className={classes}>
      <div className="progress--container">
        <p>{message}</p>
      </div>
      <div className="progress--container scores">
        {/* Render only if have score or highscore */}
        <p>{score > 0 && `Your score is ${score}!`}</p>
        <p>{highscore > 0 && `Your previous highscore is ${highscore}!`}</p>
      </div>
    </section>
  );
}

export default ScoreWindow;
