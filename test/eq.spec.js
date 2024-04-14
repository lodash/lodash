import eq from '../src/eq';

describe('eq', () => {
    it('should perform a `SameValueZero` comparison of two values', () => {
        expect(eq()).toBe(true);
        expect(eq(undefined)).toBe(true);
        expect(eq(0, -0)).toBe(true);
        expect(eq(NaN, NaN)).toBe(true);
        expect(eq(1, 1)).toBe(true);

        expect(eq(null, undefined)).toBe(false);
        expect(eq(1, Object(1))).toBe(false);
        expect(eq(1, '1')).toBe(false);
        expect(eq(1, '1')).toBe(false);

        const object = { a: 1 };
        expect(eq(object, object)).toBe(true);
        expect(eq(object, { a: 1 })).toBe(false);
    });
});
