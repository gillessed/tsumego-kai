import { Color } from '../model/goban';
export type EditorMode = 'view' | 'play' | 'edit' | 'problem' | 'solution';
export type Action = 'play' | 'place-white' | 'place-black' | 'delete' | 'triangle' | 'square' | 'circle';

export interface EditorState {
  mode: EditorMode;
  action?: Action;
  moveStack: string[];
  currentBoardState: string;
  playertoMove: Color;
}