export const generateSum = () => {
  const first = Math.floor(Math.random() * 50 + 1);
  const second = Math.floor(Math.random() * 50 + 1);

  return { first, second };
};
