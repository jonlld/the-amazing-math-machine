import { Fragment } from "react";

interface StartProps {
  username: string;
  onLogOut: () => void;
}

function Start({ username, onLogOut }: StartProps): JSX.Element {
  return (
    <Fragment>
      <h1>Welcome To The Amazing Math Machine, {username}! 🚀</h1>
      <button onClick={onLogOut}>Logout</button>
    </Fragment>
  );
}

export default Start;
