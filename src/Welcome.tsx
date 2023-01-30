import React, { Fragment } from "react";

interface WelcomeProps {
  isLoggedIn: boolean;
  username: string;
}

function Welcome(props: WelcomeProps): JSX.Element {
  return (
    <Fragment>
      <h1>Welcome To The Amazing Math Machine, {props.username}! 🚀</h1>
    </Fragment>
  );
}

export default Welcome;
