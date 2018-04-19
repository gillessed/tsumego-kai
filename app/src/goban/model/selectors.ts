import { GoRecord } from './goban';
import { EditorState } from '../component/editorState';

export const getCurrentBoardState = (record: GoRecord, editorState: EditorState) => {
    return record.boardStates[editorState.currentBoardState];
}
