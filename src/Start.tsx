import { Fragment, useState } from "react";
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
    first: 5,
    second: 50,
  });

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
          <QuizWindow sum={sum} />
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
