import { Color } from '../model/goban';

export type EditorMode = 'view' | 'play' | 'review' | 'edit' | 'problem' | 'solution';
export type ReviewAction = 'play' | 'delete' | 'triangle' | 'square' | 'circle' | 'letter';
export type EditAction = ReviewAction | 'place-white' | 'place-black';

export interface EditorState {
  mode: EditorMode;
  action?: EditAction;
  moveStack: string[];
  currentBoardState: string;
  playerToMove: Color;
}