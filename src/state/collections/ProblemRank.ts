export const problemRankToString = (rank: number) => {
  if (rank == null) {
    throw Error('Problem rank cannot be undefined');
  }
  if (rank < 30) {
    return `${30 - rank} kyu`;
  } else if (rank < 39) {
    return `${rank - 29} dan`;
  } else {
    throw Error('Problem rank must be within [0, 38], but was ' + rank);
  }
}
