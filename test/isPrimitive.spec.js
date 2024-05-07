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
        expect(isPrimitive(Object('args'))).toBeFalsy();
        expect(isPrimitive({ title: 'lodash' })).toBeFalsy();
        expect(isPrimitive([1, 2, 3])).toBeFalsy();
        expect(isPrimitive(new Date())).toBeFalsy();
        expect(isPrimitive(new Error())).toBeFalsy();
        expect(isPrimitive(/lodash/)).toBeFalsy();
        expect(isPrimitive({ 0: 1, length: 1 })).toBeFalsy();
    });
});
