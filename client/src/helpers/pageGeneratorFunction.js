export const generator = (totalPages) => {
  const totalButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    totalButtons.push(i);
  }
  return totalButtons;
};
