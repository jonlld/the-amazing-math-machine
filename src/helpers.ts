// generates two random # between 1 and 50
export const generateSum = () => {
  const first = Math.floor(Math.random() * 50 + 1);
  const second = Math.floor(Math.random() * 50 + 1);

  return { first, second };
};

// Set first user details
export const setInitialUser = (name: string): void => {
  console.log("No data exists, adding first user!");
  localStorage.setItem(
    "userdata",
    JSON.stringify([
      {
        username: name,
        highscore: 0,
      },
    ])
  );
};
