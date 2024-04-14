import { MAX_SAFE_INTEGER } from './utils';
import _isIterateeCall from '../.internal/isIterateeCall';

describe('isIterateeCall', () => {
    const array = [1];
    const func = _isIterateeCall;
    const object = { a: 1 };

    it('should return `true` for iteratee calls', () => {
        function Foo() {}
        Foo.prototype.a = 1;

        if (func) {
            expect(func(1, 0, array)).toBe(true);
            expect(func(1, 'a', object)).toBe(true);
            expect(func(1, 'a', new Foo())).toBe(true);
        }
    });

    it('should return `false` for non-iteratee calls', () => {
        if (func) {
            expect(func(2, 0, array)).toBe(false);
            expect(func(1, 1.1, array)).toBe(false);
            expect(func(1, 0, { length: MAX_SAFE_INTEGER + 1 })).toBe(false);
            expect(func(1, 'b', object)).toBe(false);
        }
    });

    it('should work with `NaN` values', () => {
        if (func) {
            expect(func(NaN, 0, [NaN])).toBe(true);
            expect(func(NaN, 'a', { a: NaN })).toBe(true);
        }
    });

    it('should not error when `index` is an object without a `toString` method', () => {
        if (func) {
            try {
                var actual = func(1, { toString: null }, [1]);
            } catch (e) {
                var message = e.message;
            }
            expect(actual, false).toBe(message || '');
        }
    });
});
