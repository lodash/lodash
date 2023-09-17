import lte from '../src/lte';
import lt from '../src/lt';

describe('lte', () => {
    it('should return `true` if `value` is <= `other`', () => {
        expect(lte(1, 3)).toBe(true);
        expect(lte(3, 3)).toBe(true);
        expect(lte('abc', 'def')).toBe(true);
        expect(lte('def', 'def')).toBe(true);
    });

    it('should return `false` if `value` > `other`', () => {
        expect(lt(3, 1)).toBe(false);
        expect(lt('def', 'abc')).toBe(false);
    });
});
