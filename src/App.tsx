import { useState, useEffect, Fragment } from "react";
import Login from "./Login/Login";
import Game from "./Game/Game";
import { UserData } from "./models/interfaces";
import { storeInitialUser, storeUpdatedUser } from "./helpers";

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [highscore, setHighscore] = useState<number>(0);
  const [leaderboardData, setLeaderboardData] = useState<UserData[]>([]);

  // UPDATE LEADERBOARD ON LOAD AND CHANGE OF LOGIN STATUS
  useEffect(() => {
    console.log("updating leaderboard running");
    if (localStorage.getItem("userdata") !== null) {
      const data = JSON.parse(localStorage.getItem("userdata")!);
      setLeaderboardData(data);
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

  const logOut = (): void => {
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
