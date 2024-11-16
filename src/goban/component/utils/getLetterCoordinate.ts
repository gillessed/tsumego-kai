export const getLetterCoordinate = (index: number): string => {
  if (index <= 8) {
    return String.fromCharCode(index + 65);
  } else if (index >= 8 && index <= 24) {
    return String.fromCharCode(index + 66);
  } else {
    return (
      getLetterCoordinate(~~(index / 25) - 1) + getLetterCoordinate(index % 25)
    );
  }
};
