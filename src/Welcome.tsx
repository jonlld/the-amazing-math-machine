import React, { Fragment } from "react";

interface WelcomeProps {
  isLoggedIn: boolean;
  onLogIn: () => void;
  username: string;
}

function Welcome(props: WelcomeProps): JSX.Element {
  const message = props.isLoggedIn ? (
    <h1>Welcome To The Amazing Math Machine, {props.username}! 🚀</h1>
  ) : (
    <h1>Please login! </h1>
  );

  return (
    <Fragment>
      {message}
      <button onClick={props.onLogIn}>Login</button>
    </Fragment>
  );
}

export default Welcome;
