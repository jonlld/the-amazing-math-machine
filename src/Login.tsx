import { Fragment } from "react";

interface LoginProps {
  onLogIn: () => void;
}

function Login({ onLogIn }: LoginProps): JSX.Element {
  return (
    <Fragment>
      <h1>Please Click To Login! </h1>
      <button onClick={onLogIn}>Login</button>
    </Fragment>
  );
}

export default Login;
