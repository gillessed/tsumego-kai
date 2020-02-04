import { BoardState } from './goban';

export function hasMoveAtIntersection(boardState: BoardState, x: number, y: number) {
    for (const move of boardState.moves) {
        if (move.intersection.x === x && move.intersection.y === y) {
            return true;
        }
    }
    return false;
}