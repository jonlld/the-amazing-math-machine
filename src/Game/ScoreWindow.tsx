import { useEffect } from "react";

interface Props {
  isPlaying: boolean;
  isCorrect: boolean;
  message: string;
  score: number;
  highscore: number;
}

function ScoreWindow({
  isPlaying,
  isCorrect,
  message,
  score,
  highscore,
}: Props): JSX.Element {
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
        <p>{isPlaying || score ? `Your score is ${score}!` : ``}</p>
        <p>{highscore ? `Your highscore is ${highscore}!` : ``}</p>
      </div>
    </section>
  );
}

export default ScoreWindow;
