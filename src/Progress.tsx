interface Props {
  message: string;
  isCorrect: boolean;
}

function Progress({ message, isCorrect }: Props): JSX.Element {
  let classes = "";

  if (message !== "Good luck!") {
    classes = `game-main__progress ${isCorrect ? "correct" : "incorrect"}`;
  } else {
    classes = "game-main__progress";
  }

  return (
    <section className={classes}>
      <p>{message}</p>
    </section>
  );
}

export default Progress;
