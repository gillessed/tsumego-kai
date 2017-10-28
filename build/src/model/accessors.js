import { IIntersection } from './impl/intersection';
import { computeNewStoneState } from './computeState';
import { randomString, arrayEquals } from './utils';
import { copyRecord } from './copyRecord';
export function addMove(_record, state, intersection, color) {
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
    const newStonesState = computeNewStoneState(record.size, boardState.stones, intersection, color);
    const matchingBoardState = Object.keys(record.boardStates)
        .map((key) => record.boardStates[key])
        .filter((boardState) => arrayEquals(newStonesState, boardState.stones));
    if (matchingBoardState.length === 1) {
        const nextState = matchingBoardState[0];
        const newMove = {
            id: randomString(),
            color,
            intersection,
            nextState: nextState.id,
        };
        const reverseMove = {
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
    }
    else if (matchingBoardState.length === 0) {
        const newStateId = randomString();
        const newMove = {
            id: randomString(),
            color,
            intersection,
            nextState: newStateId,
        };
        const reverseMove = {
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
    }
    else {
        throw new Error('Multiple board states have the same stone states : ' + matchingBoardState);
    }
}
export function removeMove(_record, state, moveId) {
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
function findReachableStates(record) {
    const reachableStates = new Set();
    const frontier = [record.initialBoardState];
    while (frontier.length >= 1) {
        const stateToCheck = record.boardStates[frontier.pop()];
        reachableStates.add(stateToCheck.id);
        const children = Object.keys(stateToCheck.moves)
            .map((key) => stateToCheck.moves[key].nextState)
            .filter((stateId) => reachableStates.has(stateId));
        frontier.push(...children);
    }
    return reachableStates;
}
export function setText(_record, state, text) {
    const record = copyRecord(_record);
    const boardState = record.boardStates[state];
    if (!boardState) {
        throw new Error('Current board state does not exist.');
    }
    const newBoardState = Object.assign({}, boardState, { text });
    record.boardStates[state] = newBoardState;
    return record;
}
export function addMarkup(_record, state, markup) {
    const record = copyRecord(_record);
    const boardState = record.boardStates[state];
    if (!boardState) {
        throw new Error('Current board state does not exist.');
    }
    const newBoardState = Object.assign({}, boardState, { markups: [...boardState.markups, markup] });
    record.boardStates[state] = newBoardState;
    return record;
}
export function removeMarkup(_record, state, markup) {
    const record = copyRecord(_record);
    const boardState = record.boardStates[state];
    if (!boardState) {
        throw new Error('Current board state does not exist.');
    }
    const newBoardState = Object.assign({}, boardState, { markups: boardState.markups.filter((existingMarkup) => existingMarkup !== markup) });
    record.boardStates[state] = newBoardState;
    return record;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZGVsL2FjY2Vzc29ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQWExQyxNQUFNLGtCQUFrQixPQUFpQixFQUFFLEtBQWEsRUFBRSxZQUEwQixFQUFFLEtBQVk7SUFDaEcsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDakYsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsR0FBRyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztTQUMvQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN6QyxJQUFJLENBQUMsQ0FB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