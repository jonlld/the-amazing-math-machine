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
