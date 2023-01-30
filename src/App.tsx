import { useState, Fragment } from "react";
import Login from "./Login";
import Start from "./Start";

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("test user");

  const logIn = (name: string): void => {
    console.log("logging in");
    setIsLoggedIn(true);
  };

  const logOut = (): void => {
    console.log("logging out");
    setIsLoggedIn(false);
  };

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
