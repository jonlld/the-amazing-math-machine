interface Props {
  res: string;
  isCorrect: boolean;
}

function Progress({ res, isCorrect }: Props): JSX.Element {
  const classes = `game-main__progress  game-main__progress${
    isCorrect ? "--correct" : "--incorrect"
  }`;

  return (
    <section className={classes}>
      <p>{res}</p>
    </section>
  );
}

export default Progress;
