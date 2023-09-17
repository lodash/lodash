import divide from '../src/divide';

describe('divide', () => {
    it('should divide two numbers', () => {
        expect(divide(6, 4)).toBe(1.5);
        expect(divide(-6, 4)).toBe(-1.5);
        expect(divide(-6, -4)).toBe(1.5);
    });

    it('should coerce arguments to numbers', () => {
        expect(divide('6', '4')).toBe(1.5);
        expect(divide('x', 'y')).toEqual(NaN);
    });
});
