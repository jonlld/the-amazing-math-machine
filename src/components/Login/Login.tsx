import React, { useRef } from "react";
import LeaderboardItem from "./LeaderboardItem";
import { PausedGameData, UserData } from "../../models/interfaces";

interface LoginProps {
  onLogIn: (name: string) => void;
  users: UserData[];
  onLeaderboardLogin: (user: UserData) => void;
  isPaused: boolean;
  pauseData: PausedGameData | null;
}

function Login({
  onLogIn,
  users,
  onLeaderboardLogin,
  isPaused,
  pauseData,
}: LoginProps): JSX.Element {
  const nameInputRef = useRef<HTMLInputElement>(null);

  const usersIsEmpty = users.length === 0;

  const onSubmitHandler = (e: React.FormEvent): void => {
    e.preventDefault();

    if (nameInputRef.current?.value) {
      onLogIn(nameInputRef.current.value);
    } else {
      // temporary
      alert("Please enter a name!");
    }
  };

  // Render LeaderboardItem list
  const leaderboardItems = users.map((user) => (
    <LeaderboardItem
      key={user.username}
      user={user}
      login={onLeaderboardLogin}
    />
  ));

  return (
    <main className="login-window--container fade-in-slide-up">
      <section className="login--container">
        {isPaused && (
          <p className="login--savegame">
            {pauseData?.username.toUpperCase()}'s save game found! Restart?
          </p>
        )}
        <h1 className="login--title">
          Please click on <span>your name</span> or register below to start!
        </h1>
        <form onSubmit={onSubmitHandler}>
          <label className="login--label" htmlFor="user">
            <span className="register">Register:</span>
          </label>
          <input
            className="login--input"
            ref={nameInputRef}
            id="user"
            type="text"
            placeholder="name"
            autoFocus
          ></input>
          <button className="btn login-button">Login</button>
        </form>
      </section>
      <section className="leaderboard--container">
        <h1 className="leaderboard--title">Leaderboard:</h1>
        {usersIsEmpty && (
          <p>
            Looks like you're the first player! Please register your name on the
            left.
          </p>
        )}
        {!usersIsEmpty && (
          <ul className="leaderboard--list">{leaderboardItems}</ul>
        )}
      </section>
    </main>
  );
}

export default Login;
