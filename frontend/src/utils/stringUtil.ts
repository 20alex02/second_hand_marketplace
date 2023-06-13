const capitalizeWord = (word?: string) => {
  if (!word) {
    return undefined;
  }

  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export default {
  capitalizeWord,
};
