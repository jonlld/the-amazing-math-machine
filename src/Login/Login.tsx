import React, { useEffect, useRef } from "react";
import { LoginProps } from "../models/interfaces";
import LeaderboardItem from "./LeaderboardItem";

function Login({
  onLogIn,
  users,
  onLeaderboardLogin,
}: LoginProps): JSX.Element {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const usersIsEmpty = users.length === 0;

  const onSubmitHandler = (e: React.FormEvent): void => {
    e.preventDefault();

    if (nameInputRef.current?.value) {
      onLogIn(nameInputRef.current.value);
    } else {
      console.log("Please enter a name!");
    }
  };

  // Transition - After FC Mounted
  useEffect(() => {
    containerRef.current?.classList.remove("hidden");
    containerRef.current?.classList.remove("shift-down");
  }, []);

  // Render LeaderboardItem list
  const items = users.map((user) => (
    <LeaderboardItem
      key={user.username}
      user={user}
      login={onLeaderboardLogin}
    />
  ));

  return (
    <main
      ref={containerRef}
      className="login-window--container hidden shift-down"
    >
      <section className="login--container">
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
        {!usersIsEmpty && <ul className="leaderboard--list">{items}</ul>}
      </section>
    </main>
  );
}

export default Login;
