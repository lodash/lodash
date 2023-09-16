import assert from 'node:assert';
import lodashStable from 'lodash';
import { falsey, empties, stubArray } from './utils';
import sampleSize from '../src/sampleSize';

describe('sampleSize', () => {
    const array = [1, 2, 3];

    it('should return an array of random elements', () => {
        const actual = sampleSize(array, 2);

        assert.strictEqual(actual.length, 2);
        assert.deepStrictEqual(lodashStable.difference(actual, array), []);
    });

    it('should contain elements of the collection', () => {
        const actual = sampleSize(array, array.length).sort();

        assert.deepStrictEqual(actual, array);
    });

    it('should treat falsey `size` values, except `undefined`, as `0`', () => {
        const expected = lodashStable.map(falsey, (value) => (value === undefined ? ['a'] : []));

        const actual = lodashStable.map(falsey, (size, index) =>
            index ? sampleSize(['a'], size) : sampleSize(['a']),
        );

        assert.deepStrictEqual(actual, expected);
    });

    it('should return an empty array when `n` < `1` or `NaN`', () => {
        lodashStable.each([0, -1, -Infinity], (n) => {
            assert.deepStrictEqual(sampleSize(array, n), []);
        });
    });

    it('should return all elements when `n` >= `length`', () => {
        lodashStable.each([3, 4, 2 ** 32, Infinity], (n) => {
            const actual = sampleSize(array, n).sort();
            assert.deepStrictEqual(actual, array);
        });
    });

    it('should coerce `n` to an integer', () => {
        const actual = sampleSize(array, 1.6);
        assert.strictEqual(actual.length, 1);
    });

    it('should return an empty array for empty collections', () => {
        const expected = lodashStable.map(empties, stubArray);

        const actual = lodashStable.transform(empties, (result, value) => {
            try {
                result.push(sampleSize(value, 1));
            } catch (e) {}
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should sample an object', () => {
        const object = { a: 1, b: 2, c: 3 },
            actual = sampleSize(object, 2);

        assert.strictEqual(actual.length, 2);
        assert.deepStrictEqual(lodashStable.difference(actual, lodashStable.values(object)), []);
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const actual = lodashStable.map([['a']], sampleSize);
        assert.deepStrictEqual(actual, [['a']]);
    });
});
