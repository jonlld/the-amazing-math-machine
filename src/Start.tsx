import { Fragment, useEffect, useState } from "react";
import QuizWindow from "./QuizWindow";

interface StartProps {
  username: string;
  onLogOut: () => void;
}

interface Sum {
  first: number;
  second: number;
}

function Start({ username, onLogOut }: StartProps): JSX.Element {
  const [sum, setSum] = useState<Sum>({
    first: 0,
    second: 0,
  });

  const onAnswerHandler = (answer: number): void => {
    if (sum.first + sum.second === answer) {
      console.log("Well done, that is correct!");
    } else {
      console.log("Not quite!");
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
        <section className="game-main__sums">
          <QuizWindow sum={sum} onAnswer={onAnswerHandler} />
        </section>
        <section className="game-main__progress">
          <p>Progress...</p>
          <p>Highscore</p>
        </section>
      </main>
    </Fragment>
  );
}

export default Start;
