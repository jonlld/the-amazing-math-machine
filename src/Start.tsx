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
  const [message, setMessage] = useState<string>("Good luck!");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [sum, setSum] = useState<Sum>({
    first: 0,
    second: 0,
  });

  const onAnswerHandler = (answer: number): void => {
    setIsPlaying(true);

    if (sum.first + sum.second === answer) {
      setMessage("Correct!");
      setIsCorrect(true);
      // increment score
      // TODO multiplier
      setScore((prev) => prev + 10);
    } else {
      setMessage("Try again!");
      setIsCorrect(false);

      if (score !== 0) {
        setScore((prev) => prev - 5);
      }
    }

    generateSum();
  };

  const generateSum = (): void => {
    const first = Math.floor(Math.random() * 50 + 1);
    const second = Math.floor(Math.random() * 50 + 1);

    setSum((prev) => {
      return { ...prev, first, second };
    });
  };

  useEffect(() => {
    generateSum();
  }, []);

  return (
    <Fragment>
      <header className="game-header">
        <h1 className="game-header__welcome">
          Welcome To The <span>Amazing Math Machine</span>, {username}!
        </h1>
        <button className="game-header__button" onClick={onLogOut}>
          Logout
        </button>
      </header>
      <main className="game-main">
        <QuizWindow sum={sum} onAnswer={onAnswerHandler} />
        <Progress
          isPlaying={isPlaying}
          message={message}
          isCorrect={isCorrect}
          score={score}
        />
      </main>
    </Fragment>
  );
}

export default Start;
