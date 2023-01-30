import React, { useState } from "react";
import Welcome from "./Welcome";

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const logIn = (): void => {
    console.log("logging in");
    setIsLoggedIn(true);
  };

  const user = "Test User";

  return (
    <div>
      <Welcome isLoggedIn={isLoggedIn} onLogIn={logIn} username={user} />
    </div>
  );
}

export default App;
