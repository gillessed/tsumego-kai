import { emptyBoard } from '../../model/goban';

const size = 19;

function i(x: number, y: number) {
    return size * y + x;
}

export const demoRecord1 = emptyBoard(size, 'game');

demoRecord1.boardStates[demoRecord1.initialBoardState].stones[i(2, 3)] = 'white';
demoRecord1.boardStates[demoRecord1.initialBoardState].stones[i(3, 3)] = 'black';
demoRecord1.boardStates[demoRecord1.initialBoardState].markups.push({
    type: 'triangle',
    intersection: {
        x: 2,
        y: 2,
    },
});
demoRecord1.boardStates[demoRecord1.initialBoardState].markups.push({
    type: 'triangle',
    intersection: {
        x: 2,
        y: 3,
    },
});
demoRecord1.boardStates[demoRecord1.initialBoardState].markups.push({
    type: 'triangle',
    intersection: {
        x: 3,
        y: 3,
    },
});

demoRecord1.boardStates[demoRecord1.initialBoardState].stones[i(5, 3)] = 'white';
demoRecord1.boardStates[demoRecord1.initialBoardState].stones[i(6, 3)] = 'black';
demoRecord1.boardStates[demoRecord1.initialBoardState].markups.push({
    type: 'circle',
    intersection: {
        x: 5,
        y: 2,
    },
});
demoRecord1.boardStates[demoRecord1.initialBoardState].markups.push({
    type: 'circle',
    intersection: {
        x: 5,
        y: 3,
    },
});
demoRecord1.boardStates[demoRecord1.initialBoardState].markups.push({
    type: 'circle',
    intersection: {
        x: 6,
        y: 3,
    },
});

demoRecord1.boardStates[demoRecord1.initialBoardState].stones[i(8, 3)] = 'white';
demoRecord1.boardStates[demoRecord1.initialBoardState].stones[i(9, 3)] = 'black';
demoRecord1.boardStates[demoRecord1.initialBoardState].markups.push({
    type: 'square',
    intersection: {
        x: 8,
        y: 2,
    },
});
demoRecord1.boardStates[demoRecord1.initialBoardState].markups.push({
    type: 'square',
    intersection: {
        x: 8,
        y: 3,
    },
});
demoRecord1.boardStates[demoRecord1.initialBoardState].markups.push({
    type: 'square',
    intersection: {
        x: 9,
        y: 3,
    },
});

demoRecord1.boardStates[demoRecord1.initialBoardState].stones[i(11, 3)] = 'white';
demoRecord1.boardStates[demoRecord1.initialBoardState].stones[i(12, 3)] = 'black';
demoRecord1.boardStates[demoRecord1.initialBoardState].markups.push({
    type: 'letter',
    intersection: {
        x: 11,
        y: 2,
    },
});
demoRecord1.boardStates[demoRecord1.initialBoardState].markups.push({
    type: 'letter',
    intersection: {
        x: 11,
        y: 3,
    },
});
demoRecord1.boardStates[demoRecord1.initialBoardState].markups.push({
    type: 'letter',
    intersection: {
        x: 12,
        y: 3,
    },
});