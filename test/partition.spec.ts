import assert from 'node:assert';
import lodashStable from 'lodash';
import { identity, stubTrue, stubFalse } from './utils';
import partition from '../src/partition';

describe('partition', () => {
    const array = [1, 0, 1];

    it('should split elements into two groups by `predicate`', () => {
        assert.deepStrictEqual(partition([], identity), [[], []]);
        assert.deepStrictEqual(partition(array, stubTrue), [array, []]);
        assert.deepStrictEqual(partition(array, stubFalse), [[], array]);
    });

    it('should use `_.identity` when `predicate` is nullish', () => {
        const values = [, null, undefined],
            expected = lodashStable.map(values, lodashStable.constant([[1, 1], [0]]));

        const actual = lodashStable.map(values, (value, index) =>
            index ? partition(array, value) : partition(array),
        );

        assert.deepStrictEqual(actual, expected);
    });

    it('should work with `_.property` shorthands', () => {
        const objects = [{ a: 1 }, { a: 1 }, { b: 2 }],
            actual = partition(objects, 'a');

        assert.deepStrictEqual(actual, [objects.slice(0, 2), objects.slice(2)]);
    });

    it('should work with a number for `predicate`', () => {
        const array = [
            [1, 0],
            [0, 1],
            [1, 0],
        ];

        assert.deepStrictEqual(partition(array, 0), [[array[0], array[2]], [array[1]]]);
        assert.deepStrictEqual(partition(array, 1), [[array[1]], [array[0], array[2]]]);
    });

    it('should work with an object for `collection`', () => {
        const actual = partition({ a: 1.1, b: 0.2, c: 1.3 }, Math.floor);
        assert.deepStrictEqual(actual, [[1.1, 1.3], [0.2]]);
    });
});
