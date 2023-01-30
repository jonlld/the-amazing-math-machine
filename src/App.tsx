import { useState, Fragment } from "react";
import Login from "./Login";
import Start from "./Start";

function App(): JSX.Element {
  // temp true
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("test user");

  const logIn = (name: string): void => {
    setUsername(name);
    setIsLoggedIn(true);
  };

  const logOut = (): void => {
    console.log("logging out");
    setIsLoggedIn(false);
  };

  // TODO
  // Make wrapper to format & center whole app
  return (
    <Fragment>
      {isLoggedIn ? (
        <Start onLogOut={logOut} username={username} />
      ) : (
        <Login onLogIn={logIn} />
      )}
    </Fragment>
  );
}

export default App;
