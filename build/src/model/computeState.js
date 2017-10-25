import { IIntersection } from './impl/intersection';
import { Group } from './impl/group';
export function computeNewStoneState(size, stoneState, _intersection, color) {
    const newState = [...stoneState];
    const intersection = IIntersection.get(_intersection);
    newState[intersection.y * size + intersection.x] = color;
    const seen = new Set();
    let groups = [];
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            const intersection = IIntersection.getI(x, y);
            if (seen.has(intersection)) {
                continue;
            }
            const state = intersection.state(newState, size);
            if (state !== 'empty') {
                const borderingGroups = groups.filter((group) => {
                    return group.color === state && group.doesBorder(intersection);
                });
                if (borderingGroups.length > 1) {
                    const newStones = new Set();
                    for (const group of borderingGroups) {
                        for (const stone of group.stones) {
                            newStones.add(stone);
                        }
                    }
                    const newGroup = new Group(state, size);
                    newGroup.stones = newStones;
                    groups = groups.filter((group) => borderingGroups.indexOf(group) >= 0);
                }
                else if (borderingGroups.length === 1) {
                    borderingGroups[0].stones.add(intersection);
                }
                else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHV0ZVN0YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZGVsL2NvbXB1dGVTdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVyQyxNQUFNLCtCQUErQixJQUFZLEVBQUUsVUFBeUIsRUFBRSxhQUEyQixFQUFFLEtBQVk7SUFDckgsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDO0lBQ2pDLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdEQsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDekQsTUFBTSxJQUFJLEdBQXVCLElBQUksR0FBRyxFQUFFLENBQUM7SUFDM0MsSUFBSSxNQUFNLEdBQVksRUFBRSxDQUFDO0lBRXpCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDdEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN0QyxNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM5QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsUUFBUSxDQUFDO1lBQ1gsQ0FBQztZQUVELE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2pELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixNQUFNLGVBQWUsR0FBWSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSztvQkFDbkQsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssS0FBSyxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2pFLENBQUMsQ0FBQyxDQUFDO2dCQUNILEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDL0IsTUFBTSxTQUFTLEdBQXVCLElBQUksR0FBRyxFQUFFLENBQUM7b0JBQ2hELEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUM7d0JBQ3BDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzRCQUNqQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN2QixDQUFDO29CQUNILENBQUM7b0JBQ0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUN4QyxRQUFRLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztvQkFDNUIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEtBQUssZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDekUsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDOUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixNQUFNLFFBQVEsR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3hDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN4QixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMzQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDakMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7WUFDL0MsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNsQixDQUFDIn0=