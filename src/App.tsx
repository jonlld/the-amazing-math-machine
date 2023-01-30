import { useState, Fragment } from "react";
import Login from "./Login";

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const logIn = (): void => {
    console.log("logging in");
    setIsLoggedIn(true);
  };

  const user = "Test User";

  return (
    <Fragment>
      {!isLoggedIn && <Login onLogIn={logIn} />}
      {/* {isLoggedIn && <Start username={user} />} */}
    </Fragment>
  );
}

export default App;
