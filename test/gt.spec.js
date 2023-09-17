import gt from '../src/gt';

describe('gt', () => {
    it('should return `true` if `value` > `other`', () => {
        expect(gt(3, 1)).toBe(true);
        expect(gt('def', 'abc')).toBe(true);
    });

    it('should return `false` if `value` is <= `other`', () => {
        expect(gt(1, 3)).toBe(false);
        expect(gt(3, 3)).toBe(false);
        expect(gt('abc', 'def')).toBe(false);
        expect(gt('def', 'def')).toBe(false);
    });
});
