import { IIntersection } from './intersection';
import { Color, GoStonesState } from '../goban';

export class Group {
    public stones: Set<IIntersection>;

    constructor(public readonly color: Color, public readonly size: number) {
        this.stones = new Set();
    }

    public doesBorder(intersection: IIntersection): boolean {
        for (const stone of this.stones) {
            if (stone.neighbors(this.size).indexOf(intersection) >= 0) {
                return true;
            }
        }
        return false;
    }

    public computeLiberties(state: GoStonesState): number {
        const neighbors = new Set<IIntersection>();
        for (const stone of this.stones) {
            const stoneNeighbors = stone.neighbors(this.size);
            for (const stoneNeighbor of stoneNeighbors) {
                if (!this.stones.has(stoneNeighbor)) {
                    neighbors.add(stoneNeighbor);
                }
            }
        }
        let liberties = 0;
        for (const neighbor of neighbors) {
            if (state[neighbor.y * this.size + neighbor.x] === 'empty') {
                liberties++;
            }
        }
        return liberties;
    }
}
