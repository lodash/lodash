import lodashStable from 'lodash';
import { _, falsey, LARGE_ARRAY_SIZE, isEven } from './utils';
import take from '../src/take';

describe('take', () => {
    const array = [1, 2, 3];

    it('should take the first two elements', () => {
        expect(take(array, 2)).toEqual([1, 2]);
    });

    it('should treat falsey `n` values, except `undefined`, as `0`', () => {
        const expected = lodashStable.map(falsey, (value) => (value === undefined ? [1] : []));

        const actual = lodashStable.map(falsey, (n) => take(array, n));

        expect(actual).toEqual(expected);
    });

    it('should return an empty array when `n` < `1`', () => {
        lodashStable.each([0, -1, -Infinity], (n) => {
            expect(take(array, n)).toEqual([]);
        });
    });

    it('should return all elements when `n` >= `length`', () => {
        lodashStable.each([3, 4, 2 ** 32, Infinity], (n) => {
            expect(take(array, n)).toEqual(array);
        });
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const array = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];
        const actual = lodashStable.map(array, take);

        expect(actual).toEqual([[1], [4], [7]]);
    });
});
