import React, { useRef } from "react";

// INTERFACE
interface LoginProps {
  onLogIn: (name: string) => void;
}

// COMPONENT
function Login({ onLogIn }: LoginProps): JSX.Element {
  const nameInputRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    if (nameInputRef.current?.value) {
      // set username
      onLogIn(nameInputRef.current.value);
    } else {
      // TODO
      // to add error behaviour
      console.log("Please enter a name!");
    }
  };

  return (
    <main>
      <h1>Please enter your name to start!</h1>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="user">Username: </label>
        <input
          ref={nameInputRef}
          id="user"
          type="text"
          // placeholder="name here"
          autoFocus
        ></input>
        <button>Login</button>
      </form>
    </main>
  );
}

export default Login;
