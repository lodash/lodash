import lt from '../src/lt';

describe('lt', () => {
    it('should return `true` if `value` is less than `other`', () => {
        expect(lt(1, 3)).toBe(true);
        expect(lt('abc', 'def')).toBe(true);
    });

    it('should return `false` if `value` >= `other`', () => {
        expect(lt(3, 1)).toBe(false);
        expect(lt(3, 3)).toBe(false);
        expect(lt('def', 'abc')).toBe(false);
        expect(lt('def', 'def')).toBe(false);
    });
});
