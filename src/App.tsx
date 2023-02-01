import { useState, Fragment, useEffect } from "react";
import Login from "./Login";
import Game from "./Game/Game";
import { UserData } from "./models/interfaces";
import { storeInitialUser } from "./helpers";

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [highscore, setHighscore] = useState<number>(0);

  // Handle storage and username / highscore state on login
  const logIn = (name: string): void => {
    if (name) {
      let currentUser: UserData = { username: name, highscore: 0 };

      // NO STORED DATA: ADD USER
      if (localStorage.getItem("userdata") === null) {
        storeInitialUser(currentUser.username);
      }

      // STORED DATA: CHECK
      else {
        const retrievedData = JSON.parse(localStorage.getItem("userdata")!);
        let hasName = false;

        // Fetch highscore
        retrievedData.forEach((user: UserData) => {
          if (user.username === currentUser.username) {
            currentUser.highscore = user.highscore;
            hasName = true;
          }
        });

        // Or add new user
        if (!hasName) {
          retrievedData.push(currentUser);
          localStorage.setItem("userdata", JSON.stringify(retrievedData));
        }

        // Update state
        setUsername(currentUser.username);
        setHighscore(currentUser.highscore);
        setIsLoggedIn(true);
      }
    }
  };

  const logOut = (): void => {
    console.log("logOut");
    setIsLoggedIn(false);
  };

  const updateHighscore = (score: number): void => {
    if (score > highscore) {
      console.log("Updating Highscore");

      setHighscore(score);
    }
  };

  return (
    <Fragment>
      {isLoggedIn ? (
        <Game
          onLogOut={logOut}
          username={username}
          highscore={highscore}
          updateHighscore={updateHighscore}
        />
      ) : (
        <Login onLogIn={logIn} />
      )}
    </Fragment>
  );
}

export default App;
