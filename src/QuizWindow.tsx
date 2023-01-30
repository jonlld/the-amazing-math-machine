import { Fragment } from "react";

interface QuizProps {
  sum: { first: number; second: number };
}

function QuizWindow({ sum }: QuizProps): JSX.Element {
  return (
    <Fragment>
      <p className="quiz__sum">
        {sum.first} + {sum.second} = ?
      </p>
      <input type="text" className="quiz__input" autoFocus />
    </Fragment>
  );
}

export default QuizWindow;
