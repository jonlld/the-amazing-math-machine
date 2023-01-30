interface Props {
  res: string;
}

function Progress({ res }: Props): JSX.Element {
  return (
    <section className="game-main__progress">
      <p>{res}</p>
    </section>
  );
}

export default Progress;
