import { useState, useEffect, Fragment } from "react";
import Login from "./components/Login/Login";
import Game from "./components/Game/Game";
import { UserData, PausedGameData } from "./models/interfaces";
import {
  storeInitialUser,
  storeUpdatedUser,
  sortUsersByScore,
} from "./helpers";

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [highscore, setHighscore] = useState<number>(0);
  const [leaderboardData, setLeaderboardData] = useState<UserData[]>([]);

  // UPDATE LEADERBOARD
  // TRIGGERED ONCE ON LOAD & ON LOGOUT
  useEffect(() => {
    if (localStorage.getItem("userdata") !== null) {
      const data = JSON.parse(localStorage.getItem("userdata")!);
      const sortedData = sortUsersByScore(data);
      setLeaderboardData(sortedData);
    }
  }, [isLoggedIn]);

  // Login - leaderboard click
  const leaderBoardLogIn = (user: UserData) => {
    setUsername(user.username);
    setHighscore(user.highscore);
    setIsLoggedIn(true);
  };

  // Login - name input
  const logIn = (name: string): void => {
    if (name) {
      const formattedName = name.trim().toLowerCase();
      let currentUser: UserData = { username: formattedName, highscore: 0 };

      // INITIALISE IF NO STORED DATA
      if (localStorage.getItem("userdata") === null) {
        storeInitialUser(currentUser.username);
      }

      // CHECK IF HAVE STORED DATA
      else {
        const retrievedData = JSON.parse(localStorage.getItem("userdata")!);
        let hasName = retrievedData
          .map((el: UserData) => el.username)
          .includes(currentUser.username);

        // IF USER DOES NOT EXIST, ADD NEW USER
        if (!hasName) {
          retrievedData.push(currentUser);
          localStorage.setItem("userdata", JSON.stringify(retrievedData));
        } else {
          // IF USER EXISTS, UPDATE CURRENT SCORE / HIGHSCORE
          retrievedData.forEach((el: UserData) => {
            if (el.username === currentUser.username) {
              currentUser.highscore = el.highscore;
            }
          });
        }
      }

      setUsername(currentUser.username);
      setHighscore(currentUser.highscore);
      setIsLoggedIn(true);
    }
  };

  // HANDLE LOGOUT OR PAUSE EVENTS w. OPTIONAL DATA PARAMETER
  const logOut = (data?: PausedGameData): void => {
    // logout
    if (typeof data === "undefined") {
      setIsLoggedIn(false);
    }
    // pause
    else {
      localStorage.setItem("pausedData", JSON.stringify(data));
      setIsLoggedIn(false);
    }
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
        <Login
          onLogIn={logIn}
          onLeaderboardLogin={leaderBoardLogIn}
          users={leaderboardData}
        />
      )}
    </Fragment>
  );
}

export default App;
