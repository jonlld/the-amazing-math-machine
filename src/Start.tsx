import { Fragment, useEffect, useState } from "react";
import QuizWindow from "./QuizWindow";
import Progress from "./Progress";

interface StartProps {
  username: string;
  onLogOut: () => void;
}

interface Sum {
  first: number;
  second: number;
}

function Start({ username, onLogOut }: StartProps): JSX.Element {
  const [response, setResponse] = useState<string>("Good luck!");
  const [isCorrect, setIsCorrect] = useState<boolean>();
  const [sum, setSum] = useState<Sum>({
    first: 0,
    second: 0,
  });

  // let progressClass = "game-main__progress";

  const onAnswerHandler = (answer: number): void => {
    if (sum.first + sum.second === answer) {
      setResponse("Correct!");
      setIsCorrect(true);
    } else {
      setResponse("Try again!");
      setIsCorrect(false);
    }

    // if (isCorrect) {
    //   progressClass = "game-main__progress--correct";
    // } else {
    //   progressClass = "game-main__progress--incorrect";
    // }

    generateSum();
  };

  const generateSum = (): void => {
    const first = Math.floor(Math.random() * 50 + 1);
    const second = Math.floor(Math.random() * 50 + 1);

    setSum((prev) => {
      return { ...prev, first, second };
    });
  };

  // runs once after component executed
  useEffect(() => {
    generateSum();
  }, []);

  return (
    <Fragment>
      <header className="game-header">
        <h1 className="game-header__welcome">
          Welcome To The Amazing Math Machine, {username}!
        </h1>
        <button className="game-header__button" onClick={onLogOut}>
          Logout
        </button>
      </header>
      <main className="game-main">
        <QuizWindow sum={sum} onAnswer={onAnswerHandler} />
        <Progress res={response} />
      </main>
    </Fragment>
  );
}

export default Start;
