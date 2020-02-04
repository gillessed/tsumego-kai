import { IIntersection } from '../../src/goban/model/impl/intersection';

describe('IIntersection Model Tests', () => {
  it('Should return the same value for the same coordinates', () => {
    const oneOne = IIntersection.getI(1, 1);
    expect(oneOne).toBe(IIntersection.getI(1, 1));
    expect(IIntersection.getI(25, 24)).toBe(IIntersection.getI(25, 24));
    expect(oneOne).toBe(IIntersection.getI(1, 1));
  });
});