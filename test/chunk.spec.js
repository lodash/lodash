import lodashStable from 'lodash';
import { falsey, stubArray } from './utils';
import chunk from '../src/chunk';

describe('chunk', () => {
    const array = [0, 1, 2, 3, 4, 5];

    it('should return chunked arrays', () => {
        const actual = chunk(array, 3);
        expect(actual).toEqual([
            [0, 1, 2],
            [3, 4, 5],
        ]);
    });

    it('should return the last chunk as remaining elements', () => {
        const actual = chunk(array, 4);
        expect(actual).toEqual([
            [0, 1, 2, 3],
            [4, 5],
        ]);
    });

    it('should treat falsey `size` values, except `undefined`, as `0`', () => {
        const expected = lodashStable.map(falsey, (value) =>
            value === undefined ? [[0], [1], [2], [3], [4], [5]] : [],
        );

        const actual = lodashStable.map(falsey, (size, index) =>
            index ? chunk(array, size) : chunk(array),
        );

        expect(actual).toEqual(expected);
    });

    it('should ensure the minimum `size` is `0`', () => {
        const values = lodashStable.reject(falsey, lodashStable.isUndefined).concat(-1, -Infinity);
        const expected = lodashStable.map(values, stubArray);

        const actual = lodashStable.map(values, (n) => chunk(array, n));

        expect(actual).toEqual(expected);
    });

    it('should coerce `size` to an integer', () => {
        expect(chunk(array, array.length / 4)).toEqual([[0], [1], [2], [3], [4], [5]]);
    });
});
