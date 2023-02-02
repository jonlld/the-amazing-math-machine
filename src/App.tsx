import { useState, Fragment, useEffect } from "react";
import Login from "./Login";
import Game from "./Game/Game";
import { UserData } from "./models/interfaces";
import { storeInitialUser, storeUpdatedUser } from "./helpers";

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("TEST");
  const [highscore, setHighscore] = useState<number>(0);

  const logIn = (name: string): void => {
    if (name) {
      const formattedName = name.trim().toLowerCase();
      let currentUser: UserData = { username: formattedName, highscore: 0 };

      // NO STORED DATA
      // INITIALISE STORAGE
      if (localStorage.getItem("userdata") === null) {
        storeInitialUser(currentUser.username);
      }

      // HAVE STORED DATA
      else {
        const retrievedData = JSON.parse(localStorage.getItem("userdata")!);
        let hasName = retrievedData
          .map((el: UserData) => el.username)
          .includes(currentUser.username);

        if (!hasName) {
          retrievedData.push(currentUser);
          localStorage.setItem("userdata", JSON.stringify(retrievedData));
        } else {
          retrievedData.forEach((el: UserData) => {
            if (el.username === currentUser.username) {
              currentUser.highscore = el.highscore;
            }
          });
        }

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
      setHighscore(score);
      storeUpdatedUser(username, score);
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
