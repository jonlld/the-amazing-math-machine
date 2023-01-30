import { Fragment } from "react";

interface StartProps {
  username: string;
  onLogOut: () => void;
}

function Start({ username, onLogOut }: StartProps): JSX.Element {
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
          <p>This is the sums section</p>
        </section>
        <section className="game-main__progress">
          <p>This is the progress section</p>
        </section>
      </main>
    </Fragment>
  );
}

export default Start;
