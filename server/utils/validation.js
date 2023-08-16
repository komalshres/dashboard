export const validation = (condition, message) => {
  if (condition) throw new Error(message);
};
