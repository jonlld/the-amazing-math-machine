import { useState, Fragment, useEffect } from "react";
import Login from "./Login";
import Start from "./Start";

interface UserData {
  username: string;
  highscore: number;
}

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // current user and highscore
  const [username, setUsername] = useState<string>("");
  // stored Data objects - all users and highscores
  const [userData, setUserData] = useState<UserData[]>([]);
  const [highscore, setHighscore] = useState<number>(0);

  const logIn = (name: string): void => {
    if (name) {
      setUsername(name);
      setIsLoggedIn(true);
    }
  };

  const logOut = (): void => {
    console.log("logging out");
    setIsLoggedIn(false);
  };

  // STORAGE UPDATES ON LOGIN OR USER CHANGE
  useEffect(() => {
    // Execute only if username is entered
    if (username) {
      console.log("executing use Effect now");

      // If no data, add user
      if (localStorage.getItem("userdata") === null) {
        console.log("No data exists, adding first user!");
        localStorage.setItem(
          "userdata",
          JSON.stringify([
            {
              username,
              highscore: 0,
            },
          ])
        );
      }

      // If data, check users
      else {
        console.log("Data exists, checking data...");
        const retrievedData = JSON.parse(localStorage.getItem("userdata")!);
        console.log("Retrieved users:");
        console.log(retrievedData);

        const names = retrievedData.map((user: UserData) => user.username);

        // If user exists, retrieve highscore
        if (names.includes(username)) {
          retrievedData.forEach((user: UserData) => {
            if (user.username === username) {
              console.log("User exists, retrieving highscore!");
              setHighscore(user.highscore);
            }
          });
        }
        // If user does not exist, add new user
        else {
          console.log("New user, adding to storage!");
          retrievedData.push({ username, highscore: 0 });
          localStorage.setItem("userdata", JSON.stringify(retrievedData));
        }
      }
    }
  }, [username]);

  return (
    <Fragment>
      {isLoggedIn ? (
        <Start onLogOut={logOut} username={username} highscore={highscore} />
      ) : (
        <Login onLogIn={logIn} />
      )}
    </Fragment>
  );
}

export default App;
