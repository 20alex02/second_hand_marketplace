const capitalizeWord = (word?: string) => {
  if (!word) {
    return '';
  }

  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export default {
  capitalizeWord,
};
