import { useState, useEffect, Fragment } from "react";
import Login from "./Login/Login";
import Game from "./Game/Game";
import { UserData } from "./models/interfaces";
import { storeInitialUser, storeUpdatedUser } from "./helpers";

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // current
  const [username, setUsername] = useState<string>("");
  const [highscore, setHighscore] = useState<number>(0);
  // storage
  const [leaderboardData, setLeaderboardData] = useState<UserData[]>([]);

  // UPDATE LEADERBOARD ON LOAD AND CHANGE OF LOGIN STATUS
  useEffect(() => {
    console.log("updating leaderboard running");
    if (localStorage.getItem("userdata") !== null) {
      const data = JSON.parse(localStorage.getItem("userdata")!);
      setLeaderboardData(data);
    }
  }, [isLoggedIn]);

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

  // TODO update leaderboard to latest stored data on logout
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
        <Login onLogIn={logIn} users={leaderboardData} />
      )}
    </Fragment>
  );
}

export default App;
