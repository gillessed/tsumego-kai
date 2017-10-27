import { emptyBoard } from '../model/goban';
import { EditorState } from '../component/editorState';
import { RenderingProps } from '../component/canvas';
const size = 19;

function i(x: number, y: number) {
  return size * y + x;
}

export const record = emptyBoard(19, 'game');
record.boardStates[record.initialBoardState].stones[i(1, 1)] = 'white';
record.boardStates[record.initialBoardState].stones[i(1, 2)] = 'white';
record.boardStates[record.initialBoardState].stones[i(1, 3)] = 'white';
record.boardStates[record.initialBoardState].stones[i(0, 3)] = 'white';
record.boardStates[record.initialBoardState].stones[i(3, 4)] = 'black';
record.boardStates[record.initialBoardState].stones[i(4, 4)] = 'black';
record.boardStates[record.initialBoardState].stones[i(5, 3)] = 'black';
record.boardStates[record.initialBoardState].stones[i(6, 3)] = 'black';

export const editorState: EditorState = {
  mode: 'view',
  moveStack: [],
  currentBoardState: record.initialBoardState,
  playertoMove: 'black',
};

export const renderingProps: Partial<RenderingProps> = {
  showCoordinates: true,
  clipRegion: {
    top: 0,
    bottom: 18,
    left: 0,
    right: 18,
  },
};