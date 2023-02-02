import React, { useEffect, useRef } from "react";
import { LoginProps } from "../models/interfaces";
import LeaderboardItem from "./LeaderboardItem";

// TODO
// Receive userdata props DONE
// Map into sub-component to render list of users

function Login({ onLogIn, users }: LoginProps): JSX.Element {
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
    <LeaderboardItem key={user.username} user={user} />
  ));

  return (
    <main ref={containerRef} className="login--container hidden shift-down">
      <section>
        <h1 className="login--title">
          Please enter <span>your name</span> to start!
        </h1>
        <form onSubmit={onSubmitHandler}>
          <label className="login--label" htmlFor="user">
            <span className="username">Username:</span>
          </label>
          <input
            className="login--input"
            ref={nameInputRef}
            id="user"
            type="text"
            // placeholder="name here"
            autoFocus
          ></input>
          <button className="btn login-button">Login</button>
        </form>
      </section>
      <section className="leaderboard--container">
        <h1 className="leaderboard--title">Leaderboard:</h1>
        {usersIsEmpty && <p>Looks like you're the first player!</p>}
        {!usersIsEmpty && <ul>{items}</ul>}
      </section>
    </main>
  );
}

export default Login;
