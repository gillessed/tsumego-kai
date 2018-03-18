import { GoStonesState } from '../../src/goban/model/goban';
import { Group } from '../../src/goban/model/impl/group';
import { IIntersection } from '../../src/goban/model/impl/intersection';

const size = 7;

let state: GoStonesState;
let group1: Group;
let group2: Group;
let group3: Group;

beforeEach(() => {
  group1 = new Group('black', size);
  group1.stones.add(IIntersection.getI(1, 1));
  group1.stones.add(IIntersection.getI(2, 1));
  group1.stones.add(IIntersection.getI(1, 2));
  group1.stones.add(IIntersection.getI(0, 2));

  group2 = new Group('black', size);
  group2.stones.add(IIntersection.getI(5, 1));
  
  group3 = new Group('black', size);
  group3.stones.add(IIntersection.getI(5, 4));
  group3.stones.add(IIntersection.getI(5, 5));
  group3.stones.add(IIntersection.getI(4, 4));

  state = [
    'empty', 'empty', 'empty', 'empty', 'empty', 'white', 'empty',
    'empty', 'black', 'black', 'empty', 'white', 'black', 'white',
    'black', 'black', 'empty', 'empty', 'empty', 'white', 'empty',
    'empty', 'empty', 'empty', 'empty', 'empty', 'white', 'empty',
    'empty', 'empty', 'empty', 'empty', 'black', 'black', 'white',
    'empty', 'empty', 'empty', 'empty', 'empty', 'black', 'white',
    'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
  ];
});

describe('Group Model Tests', () => {
  it('Computes borders', () => {

    expect(group1.doesBorder(IIntersection.getI(2, 2))).toBe(true);
    expect(group1.doesBorder(IIntersection.getI(3, 1))).toBe(true);

    expect(group1.doesBorder(IIntersection.getI(5, 6))).toBe(false);
    expect(group1.doesBorder(IIntersection.getI(0, 0))).toBe(false);
  });

  it('Computes liberties', () => {
    expect(group1.computeLiberties(state)).toBe(7);
    expect(group2.computeLiberties(state)).toBe(0);
    expect(group3.computeLiberties(state)).toBe(4);
  });
});