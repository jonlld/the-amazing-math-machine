interface QuizProps {
  sum: { first: number; second: number };
}

function QuizWindow({ sum }: QuizProps): JSX.Element {
  return (
    <p>
      {sum.first} + {sum.second} = ?
    </p>
  );
}

export default QuizWindow;
