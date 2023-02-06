interface ScoreProps {
  isCorrect: boolean;
  message: string;
  score: number;
  highscore: number;
}

function ScoreWindow({
  isCorrect,
  message,
  score,
  highscore,
}: ScoreProps): JSX.Element {
  let classes = "";

  // Class (and therefore animation) added based on message
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
        <p>{highscore > 0 && `Your highscore is ${highscore}`}</p>
      </div>
    </section>
  );
}

export default ScoreWindow;
