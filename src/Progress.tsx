interface Props {
  isPlaying: boolean;
  isCorrect: boolean;
  message: string;
  score: number;
}

function Progress({
  isPlaying,
  message,
  isCorrect,
  score,
}: Props): JSX.Element {
  let classes = "";

  if (message !== "Good luck!") {
    classes = `game-main__progress ${isCorrect ? "correct" : "incorrect"}`;
  } else {
    classes = "game-main__progress";
  }

  return (
    <section className={classes}>
      <div className="progress--container">
        <p>{message}</p>
      </div>
      <div className="progress--container">
        <p>{isPlaying || score ? `Your current score is ${score}!` : ``}</p>
      </div>
    </section>
  );
}

export default Progress;
