import lodashStable from 'lodash';
import { falsey } from './utils';
import drop from '../src/drop';

describe('drop', () => {
    const array = [1, 2, 3];

    it('should drop the first two elements', () => {
        expect(drop(array, 2)).toEqual([3]);
    });

    it('should treat falsey `n` values, except `undefined`, as `0`', () => {
        const expected = lodashStable.map(falsey, (value) =>
            value === undefined ? [2, 3] : array,
        );

        const actual = lodashStable.map(falsey, (n) => drop(array, n));

        expect(actual).toEqual(expected);
    });

    it('should return all elements when `n` < `1`', () => {
        lodashStable.each([0, -1, -Infinity], (n) => {
            expect(drop(array, n)).toEqual(array);
        });
    });

    it('should return an empty array when `n` >= `length`', () => {
        lodashStable.each([3, 4, 2 ** 32, Infinity], (n) => {
            expect(drop(array, n)).toEqual([]);
        });
    });

    it('should coerce `n` to an integer', () => {
        expect(drop(array, 1.6)).toEqual([2, 3]);
    });
});
