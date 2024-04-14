import lodashStable from 'lodash';
import { falsey } from './utils';
import slice from '../src/slice';

describe('slice', () => {
    const array = [1, 2, 3];

    it('should use a default `start` of `0` and a default `end` of `length`', () => {
        const actual = slice(array);
        expect(actual).toEqual(array);
        expect(actual).not.toBe(array);
    });

    it('should work with a positive `start`', () => {
        expect(slice(array, 1)).toEqual( [2, 3]);
        expect(slice(array, 1, 3)).toEqual([2, 3]);
    });

    it('should work with a `start` >= `length`', () => {
        lodashStable.each([3, 4, 2 ** 32, Infinity], (start) => {
            expect(slice(array, start)).toEqual([]);
        });
    });

    it('should treat falsey `start` values as `0`', () => {
        const expected = lodashStable.map(falsey, lodashStable.constant(array));

        const actual = lodashStable.map(falsey, (start) => slice(array, start));

        expect(actual).toEqual(expected);
    });

    it('should work with a negative `start`', () => {
        expect(slice(array, -1)).toEqual([3]);
    });

    it('should work with a negative `start` <= negative `length`', () => {
        lodashStable.each([-3, -4, -Infinity], (start) => {
            expect(slice(array, start)).toEqual(array);
        });
    });

    it('should work with `start` >= `end`', () => {
        lodashStable.each([2, 3], (start) => {
            expect(slice(array, start, 2)).toEqual([]);
        });
    });

    it('should work with a positive `end`', () => {
        expect(slice(array, 0, 1)).toEqual([1]);
    });

    it('should work with a `end` >= `length`', () => {
        lodashStable.each([3, 4, 2 ** 32, Infinity], (end) => {
            expect(slice(array, 0, end)).toEqual(array);
        });
    });

    it('should treat falsey `end` values, except `undefined`, as `0`', () => {
        const expected = lodashStable.map(falsey, (value) => (value === undefined ? array : []));

        const actual = lodashStable.map(falsey, (end, index) =>
            index ? slice(array, 0, end) : slice(array, 0),
        );

        expect(actual).toEqual(expected);
    });

    it('should work with a negative `end`', () => {
        expect(slice(array, 0, -1)).toEqual([1, 2]);
    });

    it('should work with a negative `end` <= negative `length`', () => {
        lodashStable.each([-3, -4, -Infinity], (end) => {
            expect(slice(array, 0, end)).toEqual([]);
        });
    });

    it('should coerce `start` and `end` to integers', () => {
        const positions = [[0.1, 1.6], ['0', 1], [0, '1'], ['1'], [NaN, 1], [1, NaN]];

        const actual = lodashStable.map(positions, (pos) => slice.apply(_, [array].concat(pos)));

        expect(actual).toEqual([[1], [1], [1], [2, 3], [1], []]);
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const array = [[1], [2, 3]];
        const actual = lodashStable.map(array, slice);

        expect(actual).toEqual(array);
        expect(actual).not.toBe(array);
    });
});
