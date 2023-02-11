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

// Set first user details
export const storeInitialUser = (username: string): void => {
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
