import assert from 'node:assert';
import { MAX_SAFE_INTEGER } from './utils';
import _isIterateeCall from '../.internal/isIterateeCall';

describe('isIterateeCall', () => {
    const array = [1],
        func = _isIterateeCall,
        object = { a: 1 };

    it('should return `true` for iteratee calls', () => {
        function Foo() {}
        Foo.prototype.a = 1;

        if (func) {
            assert.strictEqual(func(1, 0, array), true);
            assert.strictEqual(func(1, 'a', object), true);
            assert.strictEqual(func(1, 'a', new Foo()), true);
        }
    });

    it('should return `false` for non-iteratee calls', () => {
        if (func) {
            assert.strictEqual(func(2, 0, array), false);
            assert.strictEqual(func(1, 1.1, array), false);
            assert.strictEqual(func(1, 0, { length: MAX_SAFE_INTEGER + 1 }), false);
            assert.strictEqual(func(1, 'b', object), false);
        }
    });

    it('should work with `NaN` values', () => {
        if (func) {
            assert.strictEqual(func(NaN, 0, [NaN]), true);
            assert.strictEqual(func(NaN, 'a', { a: NaN }), true);
        }
    });

    it('should not error when `index` is an object without a `toString` method', () => {
        if (func) {
            try {
                var actual = func(1, { toString: null }, [1]);
            } catch (e) {
                var message = e.message;
            }
            assert.strictEqual(actual, false, message || '');
        }
    });
});
