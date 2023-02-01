/*

  Development Notes:

  1. Basic registration! (center)

  - Prompt user to enter name (form, state) - center of page DONE
  - Save name to local storage DONE
  - Switch to game screen DONE

  2. Game screen! (center)

  - Choose game mode to start TODO
    - sum type (addition, subtraction)
    - game type
      - zen
      - normal (each sum is timed, ramping difficulty, bonus points)
      - rush (how many sums in 60 seconds - separate leaderboard)

  3. Game!

  - Display sum with input, and check answers DONE
  - Add scores for correct answer DONE
  - Add strike (max 3) for incorrect answer DONE
  - Add gameover state / screen once 3 strikes TODO
  - Progress / level tracker? TODO

  4. Other

  - Leaderboard, populated from local storage
  - 'About' page / modal
  - Make it pretty, use icons, colors, animations TODO
  - Refactor
  - Make responsive (number boxes for touch input)


  * Bonus ideas

  - Add a TNT power for every 10 sums answered - allows you to skip an answer?


  * References / Resources
  
  Imported Font:
  https://fonts.google.com/specimen/Press+Start+2P

  Layout:
  https://www.w3schools.com/howto/howto_css_stacked_form.asp

  CSS - BEM:
  https://www.freecodecamp.org/news/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849/

  Transitions - add a key: TODO
  https://stackoverflow.com/questions/63186710/how-to-trigger-a-css-animation-on-every-time-a-react-component-re-renders

*/

import { useState, Fragment, useEffect } from "react";
import Login from "./Login";
import Game from "./Game/Game";
import { UserData } from "./models/interfaces";

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
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
        <Game onLogOut={logOut} username={username} highscore={highscore} />
      ) : (
        <Login onLogIn={logIn} />
      )}
    </Fragment>
  );
}

export default App;
