import uuid from 'uuid';
import { Color } from './goban';

export function arrayEquals<T>(a1: T[], a2: T[]): boolean {
    if (!a1 || !a2) {
        return false;
    }
    if (a1.length != a2.length) {
        return false;
    }
    for (let i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) {
            return false;
        }
    }
    return true;
}

export function randomString(): string {
    return uuid.v4();
}

export function swapColor(color: Color): Color {
    if (color === 'black') {
        return 'white';
    } else {
        return 'black';
    }
}

export function range(min: number, max: number): number[] {
    const range: number[] = [];
    for (let i = min; i < max; i++) {
        range.push(i);
    }
    return range;
}