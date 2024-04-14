import multiply from '../src/multiply';

describe('multiply', () => {
    it('should multiply two numbers', () => {
        expect(multiply(6, 4)).toBe(24);
        expect(multiply(-6, 4)).toBe(-24);
        expect(multiply(-6, -4)).toBe(24);
    });

    it('should coerce arguments to numbers', () => {
        expect(multiply('6', '4')).toBe(24);
        expect(multiply('x', 'y')).toEqual(NaN);
    });
});
