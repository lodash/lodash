// @ts-check
import isPrimitive from '../src/isPrimitive';

describe('isPrimitive', () => {
    it('should return `true` for primitive', () => {
        expect(isPrimitive()).toBeTruthy();
        expect(isPrimitive('a')).toBeTruthy();
        expect(isPrimitive(13)).toBeTruthy();
        expect(isPrimitive(0)).toBeTruthy();
        expect(isPrimitive(true)).toBeTruthy();
        expect(isPrimitive(false)).toBeTruthy();
        expect(isPrimitive(null)).toBeTruthy();
        expect(isPrimitive(10n)).toBeTruthy();
    });

    it('should return `false` for non-primitive', () => {
        expect(isPrimitive(Object('args'))).toBe(false);
        expect(isPrimitive({ title: 'lodash' })).toBe(false);
        expect(isPrimitive([1, 2, 3])).toBe(false);
        expect(isPrimitive(new Date())).toBe(false);
        expect(isPrimitive(new Error())).toBe(false);
        expect(isPrimitive(/lodash/)).toBe(false);
        expect(isPrimitive({ 0: 1, length: 1 })).toBe(false);
    });
});
