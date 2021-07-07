import { GoRecord, GoMove, Intersection, Color, GoStonesState, ReverseMove, Markup, BoardState } from './goban';
import { IIntersection } from './impl/intersection';
import { computeNewStoneState } from './computeState';
import { randomString, arrayEquals, swapColor } from './utils';
import DotProp from 'dot-prop-immutable';
import { EditorState } from '../component/EditorState';
import { findReachableStates, findStatesThatCanReach } from './selectors';

/*
 * Immutable methods that will return a new record object with the modifications
 * executed by the accessor. 
 */

export interface AddMoveResult {
  record: GoRecord;
  moveId: string;
  newStateId: string;
}

export function addMove(_record: GoRecord, state: string, intersection: Intersection, color: Color): AddMoveResult {
  let record = _record;
  const boardState = record.boardStates[state];
  if (!boardState) {
    throw new Error('Board state does not exist.');
  }

  if (boardState.stones[intersection.y * record.size + intersection.x] !== 'empty') {
    throw new Error('There is already a stone on ' + intersection + '.');
  }

  const existingMove = boardState.moves.find((move) => {
    return IIntersection.get(intersection) === IIntersection.get(move.intersection);
  });
  if (existingMove) {
    throw new Error('Move already exists.');
  }

  const newStonesState: GoStonesState = computeNewStoneState(record.size, boardState.stones, intersection, color);

  const matchingBoardState = Object.keys(record.boardStates)
    .map((key) => record.boardStates[key])
    .find((boardState) => arrayEquals(newStonesState, boardState.stones));

  if (matchingBoardState != null) {
    const newMove: GoMove = {
      id: randomString(),
      color,
      intersection,
      nextState: matchingBoardState.id,
    };

    const reverseMove: ReverseMove = {
      moveId: newMove.id,
      previousState: state,
    };

    record = DotProp.merge(record, `boardStates.${state}.moves`, newMove);
    record = DotProp.merge(record, `boardStates.${matchingBoardState.id}.reverseMoves.${reverseMove.moveId}`, reverseMove);

    return {
      record,
      moveId: newMove.id,
      newStateId: matchingBoardState.id,
    };
  } else {
    const newStateId = randomString();
    const newMove: GoMove = {
      id: randomString(),
      color,
      intersection,
      nextState: newStateId,
    };
    const reverseMove: ReverseMove = {
      moveId: newMove.id,
      previousState: state,
    };
    const newState: BoardState = {
      id: newStateId,
      stones: newStonesState,
      markups: [],
      text: '',
      moves: [],
      reverseMoves: {
        [reverseMove.moveId]: reverseMove,
      },
      playerToPlay: swapColor(color),
    };

    record = DotProp.delete(record, `boardStates.${state}.primary`) as GoRecord;
    record = DotProp.delete(record, `boardStates.${state}.success`) as GoRecord;
    record = DotProp.merge(record, `boardStates.${state}.moves`, newMove);
    record = DotProp.set(record, `boardStates.${newStateId}`, newState);

    const parentStates = Array.from(findStatesThatCanReach(record, state));
    for (const stateId of parentStates) {
      record = DotProp.delete(record, `boardStates.${stateId}.correct`) as GoRecord;
    }

    return {
      record,
      moveId: newMove.id,
      newStateId,
    };
  }
}

export function removeMove(_record: GoRecord, state: string, intersection: Intersection): GoRecord {
  let record = _record;
  const boardState = record.boardStates[state];
  if (!boardState) {
    throw new Error('Current board state does not exist.');
  }

  const move = boardState.moves.find((move) => move.intersection.x === intersection.x && move.intersection.y === intersection.y);
  if (!move) {
    throw new Error('Move does not exist.');
  }
  const moveIndex = boardState.moves.indexOf(move);

  const nextState = record.boardStates[move.nextState];
  if (!nextState) {
    throw new Error('Next state does not exist.');
  }

  record = DotProp.delete(record, `boardStates.${nextState.id}`) as GoRecord;
  record = DotProp.delete(record, `boardStates.${state}.moves.${moveIndex}`) as GoRecord;

  const reachableStates = findReachableStates(record);
  const unreachableStates = Object.keys(record.boardStates)
    .filter((stateId) => !reachableStates.has(stateId));
  for (const stateId of unreachableStates) {
    record = DotProp.delete(record, `boardStates.${stateId}`) as GoRecord;
  }

  return record;
}

export function setText(_record: GoRecord, state: string, text: string): GoRecord {
  let record = _record
  const boardState = record.boardStates[state];
  if (!boardState) {
    throw new Error('Current board state does not exist.');
  }

  return DotProp.set(record, `boardStates.${state}.text`, text);
}

export function addMarkup(_record: GoRecord, state: string, markup: Markup): GoRecord {
  let record = _record;
  const boardState = record.boardStates[state];
  if (!boardState) {
    throw new Error('Current board state does not exist.');
  }

  const existingMarkup = boardState.markups.find((oldMarkup) => {
    return markup.intersection.x === oldMarkup.intersection.x &&
      markup.intersection.y === oldMarkup.intersection.y;
  });

  let newMarkups: Markup[];
  if (existingMarkup) {
    const index = boardState.markups.indexOf(existingMarkup);
    newMarkups = [...boardState.markups];
    newMarkups.splice(index, 1);
    if (existingMarkup.type !== markup.type) {
      newMarkups.push(markup);
    }
  } else {
    newMarkups = [...boardState.markups, markup];
  }

  return DotProp.set(record, `boardStates.${state}.markups`, newMarkups);
}

export function removeMarkup(_record: GoRecord, state: string, intersection: Intersection): GoRecord {
  let record = _record;
  const boardState = record.boardStates[state];
  if (!boardState) {
    throw new Error('Current board state does not exist.');
  }

  const newMarkups = boardState.markups.filter((existingMarkup) => {
    return existingMarkup.intersection.x !== intersection.x || existingMarkup.intersection.y !== intersection.y;
  });

  return DotProp.set(record, `boardStates.${state}.markups`, newMarkups);
}

export function playPrimary(record: GoRecord, editorState: EditorState): EditorState | undefined {
  const boardState = record.boardStates[editorState.currentBoardState];
  const isFinalCorrectMove = checkState(record, editorState.currentBoardState);
  if (isFinalCorrectMove !== undefined) {
    return {
      ...editorState,
      mode: 'solution',
      action: 'play',
    };
  }

  const primaryMoves = boardState.moves.filter((move) => {
    const reachable = Array.from(findReachableStates(record, move.nextState));
    return reachable.filter((stateId) => record.boardStates[stateId].primary).length >= 0;
  });

  const movesToPick = primaryMoves.length >= 1 ? primaryMoves : boardState.moves;

  if (movesToPick.length === 0) {
    return {
      ...editorState,
      mode: 'solution',
      action: 'play',
    };
  }

  const random = Math.floor(Math.random() * movesToPick.length);
  const nextMove = movesToPick[random];
  const newEditorState = {
    ...editorState,
    moveStack: [...editorState.moveStack, nextMove.id],
    currentBoardState: nextMove.nextState,
  };
  const secondCorrect = checkState(record, nextMove.nextState);
  if (secondCorrect === undefined) {
    return newEditorState;
  } else {
    return {
      ...newEditorState,
      mode: 'solution',
      action: 'play',
    };
  }
}

export function checkState(record: GoRecord, state: string): boolean | undefined {
  const boardState = record.boardStates[state];
  if (boardState.moves.length === 0) {
    return !!boardState.correct;
  }
}

/*
 * Immutable methods that will return a new editorState object with the modifications
 * executred by the accessor. 
 */

export function nextMove(record: GoRecord, editorState: EditorState): EditorState {
  const boardState = record.boardStates[editorState.currentBoardState];
  if (Object.keys(boardState.moves).length === 0) {
    throw Error('No moves to step through.');
  }
  let nextMove: GoMove;
  nextMove = boardState.moves[0];
  return {
    ...editorState,
    moveStack: [...editorState.moveStack, nextMove.id],
    currentBoardState: nextMove.nextState,
  };
}

export function previousMove(record: GoRecord, editorState: EditorState): EditorState {
  const boardState = record.boardStates[editorState.currentBoardState];
  const newMoveStack = [...editorState.moveStack];
  const reverseMoveId = newMoveStack.pop();
  if (!reverseMoveId) {
    throw Error('No more previous moves.');
  }
  const reverseMove = boardState.reverseMoves[reverseMoveId];

  return {
    ...editorState,
    moveStack: newMoveStack,
    currentBoardState: reverseMove.previousState,
  };
}
