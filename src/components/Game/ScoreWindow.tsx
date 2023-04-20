import { useContext } from "react";
import ScoreContext from "../../context/score-context";

interface ScoreProps {
  isCorrect: boolean;
  message: string;
  score: number;
}

function ScoreWindow({ isCorrect, message, score }: ScoreProps): JSX.Element {
  const ctx = useContext(ScoreContext);
  let classes = "";

  // Animation class from message props
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
        <p>{score > 0 && `Your score is ${score}`}</p>
        <p>{ctx.highscore > 0 && `Your highscore is ${ctx.highscore}`}</p>
      </div>
    </section>
  );
}

export default ScoreWindow;
