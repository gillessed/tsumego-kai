import { GoStonesState, Intersection, Color } from './goban';
import { IIntersection } from './impl/intersection';
import { Group } from './impl/group';

export function computeNewStoneState(size: number, stoneState: GoStonesState, _intersection: Intersection, color: Color): GoStonesState {
  const newState = [...stoneState];
  const intersection = IIntersection.get(_intersection);
  newState[intersection.y * size + intersection.x] = color;
  const seen: Set<IIntersection> = new Set();
  let groups: Group[] = [];

  for (let x: number = 0; x < size; x++) {
    for (let y: number = 0; y < size; y++) {
      const intersection = IIntersection.getI(x, y);
      if (seen.has(intersection)) {
        continue;
      }

      const state = intersection.state(newState, size);
      if (state !== 'empty') {
        const borderingGroups: Group[] = groups.filter((group) => {
          return group.color === state && group.doesBorder(intersection);
        });
        if (borderingGroups.length > 1) {
          const newStones: Set<IIntersection> = new Set();
          for (const group of borderingGroups) {
            for (const stone of group.stones) {
              newStones.add(stone);
            }
          }
          const newGroup = new Group(state, size);
          newGroup.stones = newStones;
          groups = groups.filter((group) => borderingGroups.indexOf(group) >= 0);
        } else if (borderingGroups.length === 1) {
          borderingGroups[0].stones.add(intersection);
        } else {
          const newGroup = new Group(state, size);
          newGroup.stones.add(intersection);
          groups.push(newGroup);
        }
      }
    }
  }

  for (const group of groups) {
    if (group.computeLiberties(newState) === 0) {
      for (const stone of group.stones) {
        newState[stone.y * size + stone.x] = 'empty';
      }
    }
  }

  return newState;
}

