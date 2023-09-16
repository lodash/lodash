import assert from 'node:assert';
import lodashStable from 'lodash';
import { identity, empties, stubFalse, stubTrue } from './utils';
import some from '../src/some';

describe('some', () => {
    it('should return `true` if `predicate` returns truthy for any element', () => {
        assert.strictEqual(some([false, 1, ''], identity), true);
        assert.strictEqual(some([null, 'a', 0], identity), true);
    });

    it('should return `false` for empty collections', () => {
        const expected = lodashStable.map(empties, stubFalse);

        const actual = lodashStable.map(empties, (value) => {
            try {
                return some(value, identity);
            } catch (e) {}
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should return `true` as soon as `predicate` returns truthy', () => {
        let count = 0;

        assert.strictEqual(
            some([null, true, null], (value) => {
                count++;
                return value;
            }),
            true,
        );

        assert.strictEqual(count, 2);
    });

    it('should return `false` if `predicate` returns falsey for all elements', () => {
        assert.strictEqual(some([false, false, false], identity), false);
        assert.strictEqual(some([null, 0, ''], identity), false);
    });

    it('should use `_.identity` when `predicate` is nullish', () => {
        let values = [, null, undefined],
            expected = lodashStable.map(values, stubFalse);

        let actual = lodashStable.map(values, (value, index) => {
            const array = [0, 0];
            return index ? some(array, value) : some(array);
        });

        assert.deepStrictEqual(actual, expected);

        expected = lodashStable.map(values, stubTrue);
        actual = lodashStable.map(values, (value, index) => {
            const array = [0, 1];
            return index ? some(array, value) : some(array);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should work with `_.property` shorthands', () => {
        const objects = [
            { a: 0, b: 0 },
            { a: 0, b: 1 },
        ];
        assert.strictEqual(some(objects, 'a'), false);
        assert.strictEqual(some(objects, 'b'), true);
    });

    it('should work with `_.matches` shorthands', () => {
        const objects = [
            { a: 0, b: 0 },
            { a: 1, b: 1 },
        ];
        assert.strictEqual(some(objects, { a: 0 }), true);
        assert.strictEqual(some(objects, { b: 2 }), false);
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const actual = lodashStable.map([[1]], some);
        assert.deepStrictEqual(actual, [true]);
    });
});
