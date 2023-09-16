import assert from 'node:assert';
import lodashStable from 'lodash';
import { falsey, LARGE_ARRAY_SIZE, isEven } from './utils';
import dropRight from '../src/dropRight';

describe('dropRight', () => {
    const array = [1, 2, 3];

    it('should drop the last two elements', () => {
        assert.deepStrictEqual(dropRight(array, 2), [1]);
    });

    it('should treat falsey `n` values, except `undefined`, as `0`', () => {
        const expected = lodashStable.map(falsey, (value) =>
            value === undefined ? [1, 2] : array,
        );

        const actual = lodashStable.map(falsey, (n) => dropRight(array, n));

        assert.deepStrictEqual(actual, expected);
    });

    it('should return all elements when `n` < `1`', () => {
        lodashStable.each([0, -1, -Infinity], (n) => {
            assert.deepStrictEqual(dropRight(array, n), array);
        });
    });

    it('should return an empty array when `n` >= `length`', () => {
        lodashStable.each([3, 4, 2 ** 32, Infinity], (n) => {
            assert.deepStrictEqual(dropRight(array, n), []);
        });
    });

    it('should coerce `n` to an integer', () => {
        assert.deepStrictEqual(dropRight(array, 1.6), [1, 2]);
    });

    it('should work in a lazy sequence', () => {
        var array = lodashStable.range(1, LARGE_ARRAY_SIZE + 1),
            predicate = function (value) {
                values.push(value);
                return isEven(value);
            },
            values = [],
            actual = _(array).dropRight(2).dropRight().value();

        assert.deepEqual(actual, array.slice(0, -3));

        actual = _(array).filter(predicate).dropRight(2).dropRight().value();
        assert.deepEqual(values, array);
        assert.deepEqual(actual, dropRight(dropRight(_.filter(array, predicate), 2)));

        actual = _(array).dropRight(2).drop().dropRight().drop(2).value();
        assert.deepEqual(actual, _.drop(dropRight(_.drop(dropRight(array, 2))), 2));

        values = [];

        actual = _(array)
            .dropRight()
            .filter(predicate)
            .dropRight(2)
            .drop()
            .dropRight()
            .drop(2)
            .value();
        assert.deepEqual(values, array.slice(0, -1));
        assert.deepEqual(
            actual,
            _.drop(dropRight(_.drop(dropRight(_.filter(dropRight(array), predicate), 2))), 2),
        );
    });
});
