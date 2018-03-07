import { Color } from '../model/goban';

export type EditorMode = 'view' | 'play' | 'review' | 'edit' | 'problem' | 'solution';
export type ReviewAction = 'play' | 'triangle' | 'square' | 'circle' | 'letter' | 'erase';
export type EditAction = ReviewAction | 'place-white' | 'place-black' | 'delete';

export interface EditorState {
    mode: EditorMode;
    action?: EditAction;
    moveStack: string[];
    currentBoardState: string;
    playerToMove: Color;
}