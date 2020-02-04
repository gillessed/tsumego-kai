import { GoStonesState, Intersection, Color } from './goban';
import { IIntersection } from './impl/intersection';
import { Group } from './impl/group';

export function computeNewStoneState(size: number, stoneState: GoStonesState, _intersection: Intersection, color: Color): GoStonesState {
    const newState = [...stoneState];
    const intersection = IIntersection.get(_intersection);
    newState[intersection.y * size + intersection.x] = color;
    const seen: Set<IIntersection> = new Set();
    let groups: Group[] = [];
    let soloGroup: Group | undefined;

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
                    const newGroup = new Group(state, size);
                    for (const group of borderingGroups) {
                        for (const stone of group.stones) {
                            newGroup.stones.add(stone);
                        }
                    }
                    newGroup.stones.add(intersection);
                    const newGroups = groups.filter((group) => borderingGroups.indexOf(group) < 0);
                    newGroups.push(newGroup);
                    groups = newGroups;
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
        for (const stone of group.stones) {
            if (stone.x === intersection.x && stone.y === intersection.y) {
                soloGroup = group;
            }
        }
    }

    for (const group of groups) {
        if (group.computeLiberties(newState) === 0) {
            if (group === soloGroup) {
                continue;
            }
            for (const stone of group.stones) {
                newState[stone.y * size + stone.x] = 'empty';
            }
        }
    }

    if (soloGroup && soloGroup.computeLiberties(newState) === 0) {
        for (const stone of soloGroup.stones) {
            newState[stone.y * size + stone.x] = 'empty';
        }
    }

    return newState;
}

