import { useState, Fragment, useEffect } from "react";
import Login from "./Login";
import Game from "./Game/Game";
import { UserData } from "./models/interfaces";
import { setInitialUser } from "./helpers";

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [highscore, setHighscore] = useState<number>(0);
  const [userData, setUserData] = useState<UserData[]>([]);

  const logIn = (name: string): void => {
    console.log("logIn");
    if (name) {
      // NO STORED DATA
      if (localStorage.getItem("userdata") === null) {
        setInitialUser(name);
      }
      // STORED DATA: CHECK USERS
      else {
        // PARSE
        const retrievedData = JSON.parse(localStorage.getItem("userdata")!);
        const names = retrievedData.map((user: UserData) => user.username);

        // If user exists, retrieve highscore
        if (names.includes(name)) {
          retrievedData.forEach((user: UserData) => {
            if (user.username === name) {
              setHighscore(user.highscore);
            }
          });
        }
        // If user does not exist, add new user
        else {
          retrievedData.push({ username: name, highscore: 0 });
          localStorage.setItem("userdata", JSON.stringify(retrievedData));
        }
      }

      // Update state with final storage
      setUserData(JSON.parse(localStorage.getItem("userdata")!));

      // update state
      setUsername(name);
      setIsLoggedIn(true);
    }
  };

  const logOut = (): void => {
    console.log("logOut");
    setIsLoggedIn(false);
  };

  const updateHighscore = (score: number): void => {
    console.log("updateHighscore");
    // update if current score is higher than current highscore
    if (score > highscore) {
      setHighscore(score);
    }
  };

  // UPDATE USER DATA ON GAME OVER && NEW HIGHSCORE TODO
  // useEffect(() => {
  //   setUserData((prev) => {
  //     prev.map((user) => {
  //       if (user.username === username) {
  //         user.highscore = highscore;
  //       }
  //     });
  //   });
  // }, [highscore]);

  // useEffect(() => {
  //   localStorage.setItem("userdata", JSON.stringify(userData));
  // }, [userData]);

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
  - Add gameover state / screen once 3 strikes DONE
  - Update user stored data on game over TODO
  - Allow click to restart TODO 
  - Show user highscore on start screen TODO 
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
