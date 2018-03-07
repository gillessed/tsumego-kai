import { GoStonesState } from '../../app/goban/model/goban';
import { computeNewStoneState } from '../../app/goban/model/computeState';

describe('Accesors Model Tests', () => {
  it('Captures stones 1', () => {
    const state: GoStonesState = [
      'empty', 'black',
      'empty', 'white',
    ];
    const expectedState: GoStonesState = [
      'white', 'empty',
      'empty', 'white',
    ];
    
    const actualState = computeNewStoneState(2, state, { x: 0, y: 0 }, 'white');

    for (let i = 0; i < 4; i++) {
      expect(actualState[i]).toBe(expectedState[i]);
    }
  });
  it('Captures stones 2', () => {
    const state: GoStonesState = [
      'black', 'black',
      'empty', 'black',
    ];
    const expectedState: GoStonesState = [
      'empty', 'empty',
      'white', 'empty',
    ];

    const actualState = computeNewStoneState(2, state, { x: 0, y: 1 }, 'white');

    for (let i = 0; i < 4; i++) {
      expect(actualState[i]).toBe(expectedState[i]);
    }
  });

  it('Captures stones 3', () => {
    const state: GoStonesState = [
      'empty', 'black', 'white',
      'empty', 'black', 'white',
      'empty', 'white', 'empty',
    ];
    const expectedNextState1: GoStonesState = [
      'empty', 'black', 'white',
      'white', 'black', 'white',
      'empty', 'white', 'empty',
    ];
    const expectedNextState2: GoStonesState = [
      'white', 'empty', 'white',
      'white', 'empty', 'white',
      'empty', 'white', 'empty',
    ];

    const actualState1 = computeNewStoneState(3, state, { x: 0, y: 1 }, 'white');

    for (let i = 0; i < 9; i++) {
      expect(actualState1[i]).toBe(expectedNextState1[i]);
    }

    const actualState2 = computeNewStoneState(3, actualState1, { x: 0, y: 0 }, 'white');

    for (let i = 0; i < 9; i++) {
      expect(actualState2[i]).toBe(expectedNextState2[i]);
    }
  });
});