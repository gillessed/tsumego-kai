import { randomString } from './utils';

export type StoneState = 'empty' | Color;

export type Color = 'black' | 'white';

export interface Intersection {
    x: number;
    y: number;
}

export type GoStonesState = StoneState[];

export type MarkupType = 'triangle' | 'circle' | 'square' | 'letter';

export interface Markup {
    type: MarkupType;
    intersection: Intersection;
}

export interface GoMove {
    id: string;
    intersection: Intersection;
    color: Color;
    nextState: string;
}

export interface ReverseMove {
    moveId: string;
    previousState: string;
}

export interface BoardState {
    id: string;
    correct?: boolean;
    primary?: boolean;
    stones: GoStonesState;
    markups: Array<Markup>;
    text: string;
    moves: GoMove[];
    reverseMoves: { [key: string]: ReverseMove };
}

export interface GoRecord {
    size: number;
    initialBoardState: string;
    boardStates: { [key: string]: BoardState };
    startingPlayer: Color;
}

export function emptyBoard(size: number): GoRecord {
    const initialStones: GoStonesState = [];
    for (let i = 0; i < size * size; i++) {
        initialStones.push('empty');
    }
    const initialBoardState: BoardState = {
        id: randomString(),
        stones: initialStones,
        markups: [],
        text: '',
        moves: [],
        reverseMoves: {},
    };
    return {
        size,
        initialBoardState: initialBoardState.id,
        boardStates: {
            [initialBoardState.id]: initialBoardState,
        },
        startingPlayer: 'black',
    };
}