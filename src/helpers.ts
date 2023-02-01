import { UserData } from "./models/interfaces";

// generates two random # between 1 and 50
export const generateSum = () => {
  const first = Math.floor(Math.random() * 50 + 1);
  const second = Math.floor(Math.random() * 50 + 1);

  return { first, second };
};

// Set first user details
export const storeInitialUser = (
  username: string,
  highscore: number = 0
): void => {
  console.log("No data exists, adding first user!");
  localStorage.setItem(
    "userdata",
    JSON.stringify([
      {
        username,
        highscore,
      },
    ])
  );
};

// Update current user details
export const storeUpdatedUser = (
  username: string,
  newHighScore: number
): void => {
  const retrievedData = JSON.parse(localStorage.getItem("userdata")!);

  retrievedData.forEach((el: UserData) => {
    if (el.username === username) {
      el.highscore = newHighScore;
    }
  });

  localStorage.setItem("userdata", JSON.stringify(retrievedData));
};