export const getCurrentWord = (currentTime, words) => {
  const word = words.find((w, index, arr) => {
    const bool = currentTime >= w.time;

    if (index === arr.length - 1) {
      return bool && currentTime < w.time + 1;
    }

    return bool && currentTime < arr.at(index + 1)?.time;
  });

  return word;
};
