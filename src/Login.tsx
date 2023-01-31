import React, { useEffect, useRef } from "react";

interface LoginProps {
  onLogIn: (name: string) => void;
}

function Login({ onLogIn }: LoginProps): JSX.Element {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const onSubmitHandler = (e: React.FormEvent): void => {
    e.preventDefault();

    if (nameInputRef.current?.value) {
      onLogIn(nameInputRef.current.value);
    } else {
      console.log("Please enter a name!");
    }
  };

  useEffect(() => {
    // to animate fade-in
    setTimeout(() => {
      containerRef.current?.classList.remove("hidden");
    }, 0);
  }, []);

  return (
    <main ref={containerRef} className="login-container hidden">
      <h1 className="login-title">
        Please enter <span>your name</span> to start!
      </h1>
      <form onSubmit={onSubmitHandler}>
        <label className="login-label" htmlFor="user">
          <span>Username:</span>
        </label>
        <input
          className="login-input"
          ref={nameInputRef}
          id="user"
          type="text"
          // placeholder="name here"
          autoFocus
        ></input>
        <button className="login-button">Login</button>
      </form>
    </main>
  );
}

export default Login;
