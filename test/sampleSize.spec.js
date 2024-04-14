import lodashStable from 'lodash';
import { falsey, empties, stubArray } from './utils';
import sampleSize from '../src/sampleSize';

describe('sampleSize', () => {
    const array = [1, 2, 3];

    it('should return an array of random elements', () => {
        const actual = sampleSize(array, 2);

        expect(actual.length).toBe(2);
        expect(lodashStable.difference(actual, array)).toEqual([]);
    });

    it('should contain elements of the collection', () => {
        const actual = sampleSize(array, array.length).sort();

        expect(actual).toEqual(array);
    });

    it('should treat falsey `size` values, except `undefined`, as `0`', () => {
        const expected = lodashStable.map(falsey, (value) => (value === undefined ? ['a'] : []));

        const actual = lodashStable.map(falsey, (size, index) =>
            index ? sampleSize(['a'], size) : sampleSize(['a']),
        );

        expect(actual).toEqual(expected);
    });

    it('should return an empty array when `n` < `1` or `NaN`', () => {
        lodashStable.each([0, -1, -Infinity], (n) => {
            expect(sampleSize(array, n)).toEqual([]);
        });
    });

    it('should return all elements when `n` >= `length`', () => {
        lodashStable.each([3, 4, 2 ** 32, Infinity], (n) => {
            const actual = sampleSize(array, n).sort();
            expect(actual).toEqual(array);
        });
    });

    it('should coerce `n` to an integer', () => {
        const actual = sampleSize(array, 1.6);
        expect(actual.length).toBe(1);
    });

    it('should return an empty array for empty collections', () => {
        const expected = lodashStable.map(empties, stubArray);

        const actual = lodashStable.transform(empties, (result, value) => {
            try {
                result.push(sampleSize(value, 1));
            } catch (e) {}
        });

        expect(actual).toEqual(expected);
    });

    it('should sample an object', () => {
        const object = { a: 1, b: 2, c: 3 };
        const actual = sampleSize(object, 2);

        expect(actual.length).toBe(2);
        expect(lodashStable.difference(actual, lodashStable.values(object))).toEqual([]);
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const actual = lodashStable.map([['a']], sampleSize);
        expect(actual).toEqual([['a']]);
    });
});
