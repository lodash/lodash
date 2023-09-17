import clamp from '../src/clamp';

describe('clamp', () => {
    it('should work with a `max`', () => {
        expect(clamp(5, 3)).toBe(3);
        expect(clamp(1, 3)).toBe(1);
    });

    it('should clamp negative numbers', () => {
        expect(clamp(-10, -5, 5)).toBe(-5);
        expect(clamp(-10.2, -5.5, 5.5)).toBe(-5.5);
        expect(clamp(-Infinity, -5, 5)).toBe(-5);
    });

    it('should clamp positive numbers', () => {
        expect(clamp(10, -5, 5)).toBe(5);
        expect(clamp(10.6, -5.6, 5.4)).toBe(5.4);
        expect(clamp(Infinity, -5, 5)).toBe(5);
    });

    it('should not alter negative numbers in range', () => {
        expect(clamp(-4, -5, 5)).toBe(-4);
        expect(clamp(-5, -5, 5)).toBe(-5);
        expect(clamp(-5.5, -5.6, 5.6)).toBe(-5.5);
    });

    it('should not alter positive numbers in range', () => {
        expect(clamp(4, -5, 5)).toBe(4);
        expect(clamp(5, -5, 5)).toBe(5);
        expect(clamp(4.5, -5.1, 5.2)).toBe(4.5);
    });

    it('should not alter `0` in range', () => {
        expect(1 / clamp(0, -5, 5)).toBe(Infinity);
    });

    it('should clamp to `0`', () => {
        expect(1 / clamp(-10, 0, 5)).toBe(Infinity);
    });

    it('should not alter `-0` in range', () => {
        expect(1 / clamp(-0, -5, 5)).toBe(-Infinity);
    });

    it('should clamp to `-0`', () => {
        expect(1 / clamp(-10, -0, 5)).toBe(-Infinity);
    });

    it('should return `NaN` when `number` is `NaN`', () => {
        expect(clamp(NaN, -5, 5)).toEqual(NaN);
    });

    it('should coerce `min` and `max` of `NaN` to `0`', () => {
        expect(clamp(1, -5, NaN)).toEqual(0);
        expect(clamp(-1, NaN, 5)).toEqual(0);
    });
});
