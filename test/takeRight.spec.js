import lodashStable from 'lodash';
import { falsey, LARGE_ARRAY_SIZE, isEven } from './utils';
import takeRight from '../src/takeRight';

describe('takeRight', () => {
    const array = [1, 2, 3];

    it('should take the last two elements', () => {
        expect(takeRight(array, 2)).toEqual([2, 3]);
    });

    it('should treat falsey `n` values, except `undefined`, as `0`', () => {
        const expected = lodashStable.map(falsey, (value) => (value === undefined ? [3] : []));

        const actual = lodashStable.map(falsey, (n) => takeRight(array, n));

        expect(actual).toEqual(expected);
    });

    it('should return an empty array when `n` < `1`', () => {
        lodashStable.each([0, -1, -Infinity], (n) => {
            expect(takeRight(array, n)).toEqual([]);
        });
    });

    it('should return all elements when `n` >= `length`', () => {
        lodashStable.each([3, 4, 2 ** 32, Infinity], (n) => {
            expect(takeRight(array, n)).toEqual(array);
        });
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const array = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];
        const actual = lodashStable.map(array, takeRight);

        expect(actual).toEqual([[3], [6], [9]]);
    });
});
