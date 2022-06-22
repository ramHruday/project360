export const range = (s, e) => {
  return Array(e - s + 1)
    .fill()
    .map((_, i) => s + i);
};
