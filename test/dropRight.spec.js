import lodashStable from 'lodash';
import { falsey } from './utils';
import dropRight from '../src/dropRight';

describe('dropRight', () => {
    const array = [1, 2, 3];

    it('should drop the last two elements', () => {
        expect(dropRight(array, 2)).toEqual([1]);
    });

    it('should treat falsey `n` values, except `undefined`, as `0`', () => {
        const expected = lodashStable.map(falsey, (value) =>
            value === undefined ? [1, 2] : array,
        );

        const actual = lodashStable.map(falsey, (n) => dropRight(array, n));

        expect(actual).toEqual(expected);
    });

    it('should return all elements when `n` < `1`', () => {
        lodashStable.each([0, -1, -Infinity], (n) => {
            expect(dropRight(array, n)).toEqual(array);
        });
    });

    it('should return an empty array when `n` >= `length`', () => {
        lodashStable.each([3, 4, 2 ** 32, Infinity], (n) => {
            expect(dropRight(array, n)).toEqual([]);
        });
    });

    it('should coerce `n` to an integer', () => {
        expect(dropRight(array, 1.6)).toEqual([1, 2]);
    });
});
