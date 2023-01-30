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

    console.log("submitted");
    console.log(nameInputRef.current?.value);
  };

  return (
    <main>
      <h1>Please enter your name to start!</h1>
      <form className="login-form" onSubmit={onSubmitHandler}>
        <label>Name</label>
        <input ref={nameInputRef} type="text" placeholder="name here"></input>
        <button>Login</button>
      </form>
    </main>
  );
}

export default Login;
