import { randomString } from './utils';

export type StoneState = 'empty' | Color;

export type Color = 'black' | 'white';

export interface Intersection {
  x: number;
  y: number;
}

export type GoStonesState = StoneState[];

export interface Markup {
  type: string;
  intersection: Intersection;
}

export interface Triangle extends Markup {
  type: 'triangle';
}

export interface Letter extends Markup {
  type: 'letter';
  letter: string;
}

export interface GoMove {
  id: string;
  intersection: Intersection;
  color: Color;
  nextState: string;
  correct?: boolean;
}

export interface ReverseMove {
  moveId: string;
  previousState: string;
}

export interface BoardState {
  id: string;
  stones: GoStonesState;
  markups: Markup[];
  text: string;
  moves: { [key: string]: GoMove };
  reverseMoves: { [key: string]: ReverseMove };
}

export type RecordType = 'game' | 'problem';

export interface RecordMetadata {
  name?: string;
  author?: string;
  winLoss?: string;
}

export interface GoRecord {
  size: number;
  type: RecordType;
  metadata: RecordMetadata;
  initialBoardState: string;
  boardStates: { [key: string]: BoardState };
}

export function emptyBoard(size: number, type: RecordType): GoRecord {
  const initialStones: GoStonesState = [];
  for (let i = 0; i < size * size; i++) {
    initialStones.push('empty');
  }
  const initialBoardState: BoardState = {
    id: randomString(),
    stones: initialStones,
    markups: [],
    text: '',
    moves: {},
    reverseMoves: {},
  };
  return {
    size,
    type,
    metadata: {},
    initialBoardState: initialBoardState.id,
    boardStates: {
      [initialBoardState.id]: initialBoardState,
    },
  };
}