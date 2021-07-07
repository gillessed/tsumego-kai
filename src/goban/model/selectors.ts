import { BoardState, ClipRegion, GoRecord } from './goban';
import { EditorState } from '../component/EditorState';

export const getCurrentBoardState = (record: GoRecord, editorState: EditorState): BoardState => {
  const boardState = record.boardStates[editorState.currentBoardState];
  if (boardState === undefined) {
    console.error(record, editorState);
    throw Error('Board state should not be undefined');
  }
  return boardState;
}

export const findReachableStates = (record: GoRecord, start?: string): Set<string> => {
  const reachableStates: Set<string> = new Set();
  const startingState = start || record.initialBoardState;

  const frontier: string[] = [startingState];
  while (frontier.length >= 1) {
    const stateToCheck = record.boardStates[frontier.pop()!];
    reachableStates.add(stateToCheck.id);
    const children: string[] = stateToCheck.moves
      .map((move) => move.nextState)
      .filter((stateId) => !reachableStates.has(stateId));
    frontier.push(...children);
  }

  return reachableStates;
}

export const findStatesThatCanReach = (record: GoRecord, start?: string): Set<string> => {
  const reachableStates: Set<string> = new Set();
  const startingState = start || record.initialBoardState;

  const frontier: string[] = [startingState];
  while (frontier.length >= 1) {
    const stateToCheck = record.boardStates[frontier.pop()!];
    reachableStates.add(stateToCheck.id);
    const parents: string[] = Object.keys(stateToCheck.reverseMoves)
      .map((moveId) => stateToCheck.reverseMoves[moveId].previousState)
      .filter((stateId) => !reachableStates.has(stateId));
    frontier.push(...parents);
  }

  return reachableStates;
}

export const getBoundingBox = (record: GoRecord): ClipRegion => {
  let minX = record.size;
  let minY = record.size;
  let maxX = 0;
  let maxY = 0;

  const reachableStates = Array.from(findReachableStates(record));
  reachableStates
    .map((stateId) => record.boardStates[stateId].stones)
    .forEach((stones) => {
      stones.forEach((stone, index) => {
        if (stone !== 'empty') {
          const x = index % record.size;
          const y = Math.floor(index / record.size);
          if (x < minX) {
            minX = x;
          }
          if (y < minY) {
            minY = y;
          }
          if (x > maxX) {
            maxX = x;
          }
          if (y > maxY) {
            maxY = y;
          }
        }
      });
    });
  if (maxX < minX || maxY < minY) {
    return {
      left: 0,
      top: 0,
      right: record.size,
      bottom: record.size,
    }
  } else {
    return {
      left: minX,
      top: minY,
      right: maxX,
      bottom: maxY,
    }
  }
}
