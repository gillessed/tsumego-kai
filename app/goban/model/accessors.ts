import { BoardState } from './goban';

export function hasMoveAtIntersection(boardState: BoardState, x: number, y: number) {
  for (const moveId of Object.keys(boardState.moves)) {
    const move = boardState.moves[moveId];
    if (move.intersection.x === x && move.intersection.y === y) {
      return true;
    }
  }
  return false;
}