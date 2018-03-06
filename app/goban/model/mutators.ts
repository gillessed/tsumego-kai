import { GoRecord, GoMove, Intersection, Color, GoStonesState, ReverseMove, Markup } from './goban';
import { IIntersection } from './impl/intersection';
import { computeNewStoneState } from './computeState';
import { randomString, arrayEquals } from './utils';
import { copyRecord } from './copyRecord';

/*
 * Immutable methods that will return a new record object with the modifications
 * executred by the accessor. 
 */

export interface AddMoveResult {
    record: GoRecord;
    moveId: string;
    newStateId: string;
}

export function addMove(_record: GoRecord, state: string, intersection: Intersection, color: Color): AddMoveResult {
    const record = copyRecord(_record);
    const boardState = record.boardStates[state];
    if (!boardState) {
        throw new Error('Board state does not exist.');
    }

    if (boardState.stones[intersection.y * record.size + intersection.x] !== 'empty') {
        throw new Error('There is already a stone on ' + intersection + '.');
    }

    const existingMove = Object.keys(boardState.moves)
        .map((moveId) => boardState.moves[moveId])
        .find((move) => {
            return IIntersection.get(intersection) === IIntersection.get(move.intersection);
        });
    if (existingMove) {
        throw new Error('Move already exists.');
    }

    const newStonesState: GoStonesState = computeNewStoneState(record.size, boardState.stones, intersection, color);

    const matchingBoardState = Object.keys(record.boardStates)
        .map((key) => record.boardStates[key])
        .filter((boardState) => arrayEquals(newStonesState, boardState.stones));

    if (matchingBoardState.length === 1) {
        const nextState = matchingBoardState[0];
        const newMove: GoMove = {
            id: randomString(),
            color,
            intersection,
            nextState: nextState.id,
        };

        const reverseMove: ReverseMove = {
            moveId: newMove.id,
            previousState: state,
        };

        boardState.moves[newMove.id] = newMove;
        nextState.reverseMoves[reverseMove.moveId] = reverseMove;

        return {
            record,
            moveId: newMove.id,
            newStateId: nextState.id,
        };
    } else if (matchingBoardState.length === 0) {
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

        boardState.moves[newMove.id] = newMove;

        record.boardStates[newStateId] = {
            id: newStateId,
            stones: newStonesState,
            markups: [],
            text: '',
            moves: {},
            reverseMoves: {
                [reverseMove.moveId]: reverseMove,
            },
        };

        return {
            record,
            moveId: newMove.id,
            newStateId,
        };
    } else {
        throw new Error('Multiple board states have the same stone states : ' + matchingBoardState);
    }
}

export function removeMove(_record: GoRecord, state: string, moveId: string): GoRecord {
    const record = copyRecord(_record);
    const boardState = record.boardStates[state];
    if (!boardState) {
        throw new Error('Current board state does not exist.');
    }

    const move = boardState.moves[moveId];
    if (!move) {
        throw new Error('Move does not exist.');
    }

    const nextState = record.boardStates[move.nextState];
    if (!nextState) {
        throw new Error('Next state does not exist.');
    }

    if (!boardState.moves[moveId]) {
        throw new Error('Move does not exist.');
    }

    delete boardState.moves[moveId];
    delete nextState.reverseMoves[moveId];

    const reachableStates = findReachableStates(record);
    const unreachableStates = Object.keys(record.boardStates)
        .filter((stateId) => !reachableStates.has(stateId));
    for (const stateId of unreachableStates) {
        delete record.boardStates[stateId];
    }
    return record;
}

function findReachableStates(record: GoRecord): Set<string> {
    const reachableStates: Set<string> = new Set();

    const frontier: string[] = [record.initialBoardState];
    while (frontier.length >= 1) {
        const stateToCheck = record.boardStates[frontier.pop()!];
        reachableStates.add(stateToCheck.id);
        const children: string[] = Object.keys(stateToCheck.moves)
            .map((key) => stateToCheck.moves[key].nextState)
            .filter((stateId) => reachableStates.has(stateId));
        frontier.push(...children);
    }

    return reachableStates;
}

export function setText(_record: GoRecord, state: string, text: string): GoRecord {
    const record = copyRecord(_record);
    const boardState = record.boardStates[state];
    if (!boardState) {
        throw new Error('Current board state does not exist.');
    }

    const newBoardState = { ...boardState, text };
    record.boardStates[state] = newBoardState;
    return record;
}

export function addMarkup(_record: GoRecord, state: string, markup: Markup): GoRecord {
    const record = copyRecord(_record);
    const boardState = record.boardStates[state];
    if (!boardState) {
        throw new Error('Current board state does not exist.');
    }

    const newBoardState = { ...boardState, markups: [...boardState.markups, markup] };
    record.boardStates[state] = newBoardState;
    return record;
}

export function removeMarkup(_record: GoRecord, state: string, markup: Markup): GoRecord {
    const record = copyRecord(_record);
    const boardState = record.boardStates[state];
    if (!boardState) {
        throw new Error('Current board state does not exist.');
    }

    const newBoardState = { ...boardState, markups: boardState.markups.filter((existingMarkup) => existingMarkup !== markup) };
    record.boardStates[state] = newBoardState;
    return record;
}