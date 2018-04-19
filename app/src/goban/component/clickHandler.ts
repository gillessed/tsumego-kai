import { GoRecord } from '../model/goban';
import { EditorState } from './editorState';
import { addMove } from '../model/mutators';
import { swapColor } from '../model/utils';

export interface ClickResult {
    record: GoRecord;
    editorState: EditorState;
}

export type EditorMode = 'view' | 'play' | 'review' | 'edit' | 'problem' | 'solution';
export function clickHandler(record: GoRecord, editorState: EditorState, x: number, y: number): ClickResult | undefined {
    switch (editorState.mode) {
        case 'view': return undefined;
        case 'play': return playClickHandler(record, editorState, x, y);
        case 'review': return playClickHandler(record, editorState, x, y);
        case 'edit': return playClickHandler(record, editorState, x, y);
        case 'problem': return playClickHandler(record, editorState, x, y);
        case 'solution': return playClickHandler(record, editorState, x, y);
    }
}

export function playClickHandler(record: GoRecord, editorState: EditorState, x: number, y: number): ClickResult | undefined {
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
            };
        } else {
            throw new Error('Multiple moves have the same interestion ' + x + ',' + y);
        }
    } else {
        return undefined;
    }
}