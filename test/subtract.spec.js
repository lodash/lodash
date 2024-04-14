import subtract from '../src/subtract';

describe('subtract', () => {
    it('should subtract two numbers', () => {
        expect(subtract(6, 4)).toBe(2);
        expect(subtract(-6, 4)).toBe(-10);
        expect(subtract(-6, -4)).toBe(-2);
    });

    it('should coerce arguments to numbers', () => {
        expect(subtract('6', '4')).toBe(2);
        expect(subtract('x', 'y')).toEqual(NaN);
    });
});
