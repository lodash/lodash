import lodashStable from 'lodash';
import { stubZero, falsey } from './utils';
import indexOf from '../src/indexOf';

describe('indexOf', () => {
    const array = [1, 2, 3, 1, 2, 3];

    it('`_.indexOf` should return the index of the first matched value', () => {
        expect(indexOf(array, 3)).toBe(2);
    });

    it('`_.indexOf` should work with a positive `fromIndex`', () => {
        expect(indexOf(array, 1, 2)).toBe(3);
    });

    it('`_.indexOf` should work with a `fromIndex` >= `length`', () => {
        const values = [6, 8, 2 ** 32, Infinity];
        const expected = lodashStable.map(values, lodashStable.constant([-1, -1, -1]));

        const actual = lodashStable.map(values, (fromIndex) => [
            indexOf(array, undefined, fromIndex),
            indexOf(array, 1, fromIndex),
            indexOf(array, '', fromIndex),
        ]);

        expect(actual).toEqual(expected);
    });

    it('`_.indexOf` should work with a negative `fromIndex`', () => {
        expect(indexOf(array, 2, -3)).toBe(4);
    });

    it('`_.indexOf` should work with a negative `fromIndex` <= `-length`', () => {
        const values = [-6, -8, -Infinity];
        const expected = lodashStable.map(values, stubZero);

        const actual = lodashStable.map(values, (fromIndex) => indexOf(array, 1, fromIndex));

        expect(actual).toEqual(expected);
    });

    it('`_.indexOf` should treat falsey `fromIndex` values as `0`', () => {
        const expected = lodashStable.map(falsey, stubZero);

        const actual = lodashStable.map(falsey, (fromIndex) => indexOf(array, 1, fromIndex));

        expect(actual).toEqual(expected);
    });

    it('`_.indexOf` should coerce `fromIndex` to an integer', () => {
        expect(indexOf(array, 2, 1.2)).toBe(1);
    });
});
