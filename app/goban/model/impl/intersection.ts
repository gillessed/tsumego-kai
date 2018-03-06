import { Intersection, StoneState, GoStonesState } from '../goban';

export class IIntersection implements Intersection {
    constructor(
        public readonly x: number,
        public readonly y: number,
    ) { }

    public state(stoneState: GoStonesState, size: number): StoneState {
        return stoneState[this.y * size + this.x];
    }

    public neighbors(size: number): IIntersection[] {
        const neighbors: IIntersection[] = [];
        if (this.x >= 1) {
            neighbors.push(IIntersection.getI(this.x - 1, this.y));
        }
        if (this.x < size - 1) {
            neighbors.push(IIntersection.getI(this.x + 1, this.y));
        }
        if (this.y >= 1) {
            neighbors.push(IIntersection.getI(this.x, this.y - 1));
        }
        if (this.y < size - 1) {
            neighbors.push(IIntersection.getI(this.x, this.y + 1));
        }
        return neighbors;
    }

    static intersections: IIntersection[][] = [];

    static getI(x: number, y: number): IIntersection {
        if (!IIntersection.intersections[x]) {
            while (IIntersection.intersections.length <= x) {
                IIntersection.intersections.push([]);
            }
        }
        if (!IIntersection.intersections[x][y]) {
            while (IIntersection.intersections[x].length <= y) {
                IIntersection.intersections[x].push(new IIntersection(x, IIntersection.intersections[x].length));
            }
        }
        return IIntersection.intersections[x][y];
    }

    static get(intersection: Intersection): IIntersection {
        const { x, y } = intersection;
        return IIntersection.getI(x, y);
    }
}