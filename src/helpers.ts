import { UserData, Sum } from "./models/interfaces";

// generates two random # between 1 and 50
export const generateSum = (type: string) => {
  const operands = ["+", "-", "*"];

  let operand = "";
  if (type === "add") operand = operands[0];
  if (type === "subtract") operand = operands[1];
  if (type === "multiply") operand = operands[2];
  if (type === "random") operand = operands[Math.floor(Math.random() * 3)];

  // Limit scope for multiplication sums
  let multiplier = 50;
  if (operand === "*") multiplier = 10;

  let first = Math.floor(Math.random() * multiplier + 1);
  let second = Math.floor(Math.random() * multiplier + 1);

  // Ensure second number is smaller for subtraction
  if (operand === "-" && second > first) [second, first] = [first, second];

  return { first, second, operand };
};

export const checkAnswer = (
  { first, second, operand }: Sum,
  answer: number
): boolean => {
  let result: boolean = false;

  if (operand === "+") result = first + second === answer;
  if (operand === "-") result = first - second === answer;
  if (operand === "*") result = first * second === answer;

  return result;
};

// INITIALISE ARRAY OF USER OBJECTS
export const initialiseStorage = (name: string): void => {
  const initialUser: UserData = {
    username: name,
    highscore: 0,
    savegame: false,
    savegameData: {},
    scoreHistory: [],
  };

  const initialData = [initialUser];

  localStorage.setItem("userdata", JSON.stringify(initialData));
};

// ADD NEW USER TO ARRAY OF USER OBJECTS
export const addNewUser = (name: string, retrievedData: UserData[]): void => {
  const newUser: UserData = {
    username: name,
    highscore: 0,
    savegame: false,
    savegameData: {},
    scoreHistory: [],
  };

  retrievedData.push(newUser);
  localStorage.setItem("userdata", JSON.stringify(retrievedData));
};

export const updateUserOnGameOver = (
  username: string,
  score: number,
  highscore: number
): void => {
  const retrievedData = JSON.parse(localStorage.getItem("userdata")!);

  retrievedData.forEach((user: UserData) => {
    // ROLL ANY DATA IN ORIGINAL FORMAT
    if (!user.hasOwnProperty("savegame")) user.savegame = false;
    if (!user.hasOwnProperty("savegameData")) user.savegameData = {};
    if (!user.hasOwnProperty("scoreHistory")) user.scoreHistory = [];

    // ****** DEVELOPMENT ONLY: RESET TEST SCORE HISTORY ******
    // if (user.username === "test") {
    //   user.scoreHistory = [];
    // }

    // UPDATE HIGHSCORE AND SCORE HISTORY
    if (user.username === username) {
      if (score > highscore) {
        user.highscore = score;
      }

      // Get and format date
      const now = new Date();
      const day = `${now.getDate()}`.padStart(2, "0");
      const month = `${now.getMonth() + 1}`.padStart(2, "0");
      const year = now.getFullYear();
      const date = `${day}/${month}/${year}`;

      // 5 = default difficulty
      // Zen = Default game mode w. no timer or ramping
      user.scoreHistory.push({
        difficulty: 5,
        gameMode: "zen",
        date,
        score: score,
      });
    }
  });

  // STORE UPDATED DATA
  localStorage.setItem("userdata", JSON.stringify(retrievedData));
  console.log("data stored on game over");
  console.log(retrievedData);
};

// Sort
export const sortUsersByScore = (data: UserData[]): UserData[] => {
  // copy
  const dataToSort = [...data];

  const compare = (a: UserData, b: UserData): number => {
    if (a.highscore > b.highscore) {
      return -1;
    }
    if (a.highscore < b.highscore) {
      return 1;
    }
    return 0;
  };

  let sortedUsers = dataToSort.sort(compare);

  // return new array
  return sortedUsers;
};
