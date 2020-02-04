import { Color } from '../model/goban';

export type EditorMode = 'view' | 'play' | 'review' | 'edit' | 'problem' | 'solution';
export type ReviewAction = 'play' | 'triangle' | 'square' | 'letter' | 'delete';
export type EditAction = ReviewAction | 'place-white' | 'place-black' | 'erase';

export function shouldRenderNextMoves(mode: EditorMode) {
    return [
        'review',
        'edit',
        'solution',
    ].indexOf(mode) >= 0;
}

export function readonlyText(mode: EditorMode) {
    return [
        'view',
        'play',
        'problem',
        'solution',
    ].indexOf(mode) >= 0;
}

export interface EditorState {
    mode: EditorMode;
    action: EditAction;
    moveStack: string[];
    currentBoardState: string;
    playerToMove: Color;
}