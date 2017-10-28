import { GoRecord } from '../model/goban';
import { EditorState } from './editorState';
import { addMove } from '../model/accessors';
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
  const stone = record.boardStates[editorState.currentBoardState].stones[y * record.size + x];
  if (stone === 'empty') {
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
    return undefined;
  }
}