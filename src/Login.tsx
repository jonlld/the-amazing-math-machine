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
        <ul>
          <li className="login-form">
            <label>Name</label>
            <input
              ref={nameInputRef}
              type="text"
              placeholder="name here"
            ></input>
            <button>Login</button>
          </li>
        </ul>
      </form>
    </main>
  );
}

export default Login;
