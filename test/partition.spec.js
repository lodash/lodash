import lodashStable from 'lodash';
import { identity, stubTrue, stubFalse } from './utils';
import partition from '../src/partition';

describe('partition', () => {
    const array = [1, 0, 1];

    it('should split elements into two groups by `predicate`', () => {
        expect(partition([], identity), [[]).toEqual([]]);
        expect(partition(array, stubTrue), [array).toEqual([]]);
        expect(partition(array, stubFalse), [[]).toEqual(array]);
    });

    it('should use `_.identity` when `predicate` is nullish', () => {
        const values = [, null, undefined];
        const expected = lodashStable.map(values, lodashStable.constant([[1, 1], [0]]));

        const actual = lodashStable.map(values, (value, index) =>
            index ? partition(array, value) : partition(array),
        );

        expect(actual).toEqual(expected);
    });

    it('should work with `_.property` shorthands', () => {
        const objects = [{ a: 1 }, { a: 1 }, { b: 2 }];
        const actual = partition(objects, 'a');

        expect(actual, [objects.slice(0, 2)).toEqual(objects.slice(2)]);
    });

    it('should work with a number for `predicate`', () => {
        const array = [
            [1, 0],
            [0, 1],
            [1, 0],
        ];

        expect(partition(array, 0), [[array[0], array[2]]).toEqual([array[1]]]);
        expect(partition(array, 1), [[array[1]], [array[0]).toEqual(array[2]]]);
    });

    it('should work with an object for `collection`', () => {
        const actual = partition({ a: 1.1, b: 0.2, c: 1.3 }, Math.floor);
        expect(actual, [[1.1, 1.3]).toEqual([0.2]]);
    });
});
