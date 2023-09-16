import assert from 'node:assert';
import lodashStable from 'lodash';
import { falsey, LARGE_ARRAY_SIZE, isEven } from './utils';
import takeRight from '../src/takeRight';

describe('takeRight', () => {
    const array = [1, 2, 3];

    it('should take the last two elements', () => {
        assert.deepStrictEqual(takeRight(array, 2), [2, 3]);
    });

    it('should treat falsey `n` values, except `undefined`, as `0`', () => {
        const expected = lodashStable.map(falsey, (value) => (value === undefined ? [3] : []));

        const actual = lodashStable.map(falsey, (n) => takeRight(array, n));

        assert.deepStrictEqual(actual, expected);
    });

    it('should return an empty array when `n` < `1`', () => {
        lodashStable.each([0, -1, -Infinity], (n) => {
            assert.deepStrictEqual(takeRight(array, n), []);
        });
    });

    it('should return all elements when `n` >= `length`', () => {
        lodashStable.each([3, 4, 2 ** 32, Infinity], (n) => {
            assert.deepStrictEqual(takeRight(array, n), array);
        });
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const array = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ],
            actual = lodashStable.map(array, takeRight);

        assert.deepStrictEqual(actual, [[3], [6], [9]]);
    });

    it('should work in a lazy sequence', () => {
        var array = lodashStable.range(LARGE_ARRAY_SIZE),
            predicate = function (value) {
                values.push(value);
                return isEven(value);
            },
            values = [],
            actual = _(array).takeRight(2).takeRight().value();

        assert.deepEqual(actual, takeRight(takeRight(array)));

        actual = _(array).filter(predicate).takeRight(2).takeRight().value();
        assert.deepEqual(values, array);
        assert.deepEqual(actual, takeRight(takeRight(_.filter(array, predicate), 2)));

        actual = _(array).takeRight(6).take(4).takeRight(2).take().value();
        assert.deepEqual(actual, _.take(takeRight(_.take(takeRight(array, 6), 4), 2)));

        values = [];

        actual = _(array).filter(predicate).takeRight(6).take(4).takeRight(2).take().value();
        assert.deepEqual(values, array);
        assert.deepEqual(
            actual,
            _.take(takeRight(_.take(takeRight(_.filter(array, predicate), 6), 4), 2)),
        );
    });
});
