import { useState, useEffect, Fragment } from "react";
import Login from "./components/Login/Login";
import Game from "./components/Game/Game";
import { UserData, PausedGameData, SumType } from "./models/interfaces";
import {
  initialiseStorage,
  addNewUser,
  updateUserOnGameOver,
  sortUsersByScore,
} from "./helpers";

function App(): JSX.Element {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isRestart, setIsRestart] = useState<boolean>(false);
  const [pauseGameData, setPauseGameData] = useState<PausedGameData | null>(
    null
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [highscore, setHighscore] = useState<number>(0);
  const [leaderboardData, setLeaderboardData] = useState<UserData[]>([]);
  const [currentUserStats, setCurrentUserStats] = useState<UserData | null>(
    null
  );

  // FETCH SAVED DATA FOR LOGIN SCREEN
  // TRIGGERED: INITIALISE & ON LOGOUT
  useEffect(() => {
    // FETCH SAVEGAME DATA
    if (localStorage.getItem("pausedData") !== null) {
      // To show saved game message
      setIsPaused(true);
      // Update state
      const data = JSON.parse(localStorage.getItem("pausedData")!);
      setPauseGameData(data);
    }

    // FETCH USER DATA
    if (localStorage.getItem("userdata") !== null) {
      const data = JSON.parse(localStorage.getItem("userdata")!);
      const sortedData = sortUsersByScore(data);
      setLeaderboardData(sortedData);
    }
  }, [isLoggedIn]);

  // HANDLE LOGIN WITH LEADERBOARD CLICK
  // RECEIVES USER FROM LEADERBOARD ITEM
  const leaderBoardLogIn = (user: UserData) => {
    setUsername(user.username);
    setHighscore(user.highscore);
    setIsLoggedIn(true);
  };

  // HANDLE LOGIN WITH NAME INPUT OR CONTINUE
  const logIn = (name: string): void => {
    // CONTINUE SAVE GAME
    // CONTINUE BUTTON PASSES IN 'RESTART'
    if (name === "restart" && pauseGameData) {
      setUsername(pauseGameData.username);
      setHighscore(pauseGameData.pausedHighScore);
      setIsLoggedIn(true);
      setIsRestart(true);
    }

    // START NEW GAME
    else if (name) {
      const formattedName = name.trim().toLowerCase();

      // INITIALISE IF FIRST USER
      if (localStorage.getItem("userdata") === null) {
        initialiseStorage(formattedName);
        setUsername(formattedName);
      }

      // CHECK IF HAVE STORED DATA
      else {
        const retrievedData = JSON.parse(localStorage.getItem("userdata")!);

        const existingPlayer = retrievedData
          .map((el: UserData) => el.username)
          .includes(formattedName);

        // IF USER DOES NOT EXIST, ADD NEW USER
        if (!existingPlayer) {
          addNewUser(formattedName, retrievedData);
        }
        // IF USER EXISTS, UPDATE CURRENT SCORE / HIGHSCORE
        else {
          retrievedData.forEach((el: UserData) => {
            if (el.username === formattedName) {
              setHighscore(el.highscore);
            }
          });
        }
        setUsername(formattedName);
      }

      setIsLoggedIn(true);
    }
  };

  // HANDLE LOGOUT OR PAUSE
  // IF PAUSE, TAKES DATA TO SAVE GAME
  const logOut = (data?: PausedGameData): void => {
    // RESET
    setIsRestart(false);

    // IF PAUSE
    if (data) {
      localStorage.setItem("pausedData", JSON.stringify(data));
    }

    setIsLoggedIn(false);
  };

  const gameOverHandler = (score: number, sumType: SumType): void => {
    // IF RESTART, CLEAR SAVEGAME DATA
    if (isRestart) {
      localStorage.removeItem("pausedData");
      setIsRestart(false);
      setIsPaused(false);
    }

    // TODO check if this if statement required
    if (score > highscore) {
      setHighscore(score);
    }

    // UPDATE STORED USER DATA
    updateUserOnGameOver(username, score, highscore, sumType);

    const updatedData = JSON.parse(localStorage.getItem("userdata")!);

    updatedData.forEach((user: UserData) => {
      if (user.username === username) {
        setCurrentUserStats(user);
      }
    });
  };

  return (
    <Fragment>
      {isLoggedIn ? (
        <Game
          onLogOut={logOut}
          username={username}
          highscore={highscore}
          onGameOver={gameOverHandler}
          isRestart={isRestart}
          pauseData={pauseGameData}
          userStats={currentUserStats}
        />
      ) : (
        <Login
          onLogIn={logIn}
          onLeaderboardLogin={leaderBoardLogIn}
          users={leaderboardData}
          isPaused={isPaused}
          pauseData={pauseGameData}
        />
      )}
    </Fragment>
  );
}

export default App;
