import { useState, Fragment } from "react";
import Login from "./Login";
import Start from "./Start";

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const logIn = (): void => {
    console.log("logging in");
    setIsLoggedIn(true);
  };

  const logOut = (): void => {
    console.log("logging out");
    setIsLoggedIn(false);
  };

  const user = "Test User";

  return (
    <Fragment>
      {!isLoggedIn && <Login onLogIn={logIn} />}
      {isLoggedIn && <Start onLogOut={logOut} username={user} />}
    </Fragment>
  );
}

export default App;
