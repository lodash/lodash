import gte from '../src/gte';

describe('gte', () => {
    it('should return `true` if `value` >= `other`', () => {
        expect(gte(3, 1)).toBe(true);
        expect(gte(3, 3)).toBe(true);
        expect(gte('def', 'abc')).toBe(true);
        expect(gte('def', 'def')).toBe(true);
    });

    it('should return `false` if `value` is less than `other`', () => {
        expect(gte(1, 3)).toBe(false);
        expect(gte('abc', 'def')).toBe(false);
    });
});
