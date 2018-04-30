import { GoRecord, MarkupType } from '../model/goban';
import { EditorState } from './editorState';
import { addMove, addMarkup, removeMarkup, removeMove } from '../model/mutators';
import { swapColor } from '../model/utils';

export interface ClickResult {
    record: GoRecord;
    editorState: EditorState;
    playedMove?: boolean;
}

export function clickHandler(record: GoRecord, editorState: EditorState, x: number, y: number): ClickResult | undefined {
    if (editorState.mode === 'view') {
        return undefined;
    }
    if (editorState.mode !== 'edit') {
        if (editorState.action === 'place-black' || editorState.action === 'place-white') {
            throw Error('Cannot place stones while not in edit mode.');
        }
    }
    switch (editorState.action) {
        case 'play': return playClickHandler(record, editorState, x, y);
        case 'place-black': return placeBlackClickHandler(record, editorState, x, y);
        case 'place-white': return placeWhiteClickHandler(record, editorState, x, y);
        case 'triangle': return triangleClickHandler(record, editorState, x, y);
        case 'square': return squareClickHandler(record, editorState, x, y);
        case 'letter': return letterClickHandler(record, editorState, x, y);
        case 'erase': return eraseClickHandler(record, editorState, x, y);
        case 'delete': return deleteClickHandler(record, editorState, x, y);
    }
}

function playClickHandler(record: GoRecord, editorState: EditorState, x: number, y: number): ClickResult | undefined {
    const boardState = record.boardStates[editorState.currentBoardState];
    const stone = boardState.stones[y * record.size + x];
    if (stone === 'empty') {
        const existingMoves = boardState.moves.filter((move) => move.intersection.x === x && move.intersection.y === y);
        if (existingMoves.length === 1) {
            const move = existingMoves[0];
            return {
                record,
                editorState: {
                    ...editorState,
                    moveStack: [...editorState.moveStack, move.id],
                    currentBoardState: move.nextState,
                    playerToMove: swapColor(editorState.playerToMove),
                },
                playedMove: true,
            };
        } else if (existingMoves.length === 0) {
            const result = addMove(record, editorState.currentBoardState, { x, y }, editorState.playerToMove);
            const newEditorState: EditorState = {
                ...editorState,
                moveStack: [...editorState.moveStack, result.moveId],
                currentBoardState: result.newStateId,
                playerToMove: swapColor(editorState.playerToMove),
            };
            return {
                record: result.record,
                editorState: newEditorState,
                playedMove: true,
            };
        } else {
            throw new Error('Multiple moves have the same interestion ' + x + ',' + y);
        }
    } else {
        return undefined;
    }
}

function placeBlackClickHandler(record: GoRecord, editorState: EditorState, x: number, y: number): ClickResult | undefined {
    const boardState = record.boardStates[editorState.currentBoardState];
    if (boardState.stones[y * record.size + x] === 'black') {
        boardState.stones[y * record.size + x] = 'empty';
    } else {
        boardState.stones[y * record.size + x] = 'black';
    }
    return {
        record: { ...record },
        editorState,
    };
}

function placeWhiteClickHandler(record: GoRecord, editorState: EditorState, x: number, y: number): ClickResult | undefined {
    const boardState = record.boardStates[editorState.currentBoardState];
    if (boardState.stones[y * record.size + x] === 'white') {
        boardState.stones[y * record.size + x] = 'empty';
    } else {
        boardState.stones[y * record.size + x] = 'white';
    }
    return {
        record: { ...record },
        editorState,
    };
}

function triangleClickHandler(_record: GoRecord, editorState: EditorState, x: number, y: number): ClickResult | undefined {
    return markupClickHandler(_record, editorState, x, y, 'triangle');
}

function squareClickHandler(_record: GoRecord, editorState: EditorState, x: number, y: number): ClickResult | undefined {
    return markupClickHandler(_record, editorState, x, y, 'square');
}

function letterClickHandler(_record: GoRecord, editorState: EditorState, x: number, y: number): ClickResult | undefined {
    return markupClickHandler(_record, editorState, x, y, 'letter');
}

function markupClickHandler(_record: GoRecord, editorState: EditorState, x: number, y: number, markup: MarkupType): ClickResult | undefined {
    const record = addMarkup(_record, editorState.currentBoardState, {
        type: markup,
        intersection: { x, y },
    });
    return { record, editorState };
}

function eraseClickHandler(_record: GoRecord, editorState: EditorState, x: number, y: number): ClickResult | undefined {
    const record = removeMarkup(_record, editorState.currentBoardState, { x, y });
    return { record, editorState };
}

function deleteClickHandler(_record: GoRecord, editorState: EditorState, x: number, y: number): ClickResult | undefined {
    const boardState = _record.boardStates[editorState.currentBoardState];
    const move = boardState.moves.find((move) => move.intersection.x === x && move.intersection.y === y);
    if (!move) {
        return;
    }
    const record = removeMove(_record, editorState.currentBoardState, { x, y });
    return { record, editorState };
}
