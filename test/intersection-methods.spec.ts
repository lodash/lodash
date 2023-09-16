import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, args, LARGE_ARRAY_SIZE, stubNaN } from './utils';

describe('intersection methods', () => {
    lodashStable.each(['intersection', 'intersectionBy', 'intersectionWith'], (methodName) => {
        const func = _[methodName];

        it(`\`_.${methodName}\` should return the intersection of two arrays`, () => {
            const actual = func([2, 1], [2, 3]);
            assert.deepStrictEqual(actual, [2]);
        });

        it(`\`_.${methodName}\` should return the intersection of multiple arrays`, () => {
            const actual = func([2, 1, 2, 3], [3, 4], [3, 2]);
            assert.deepStrictEqual(actual, [3]);
        });

        it(`\`_.${methodName}\` should return an array of unique values`, () => {
            const actual = func([1, 1, 3, 2, 2], [5, 2, 2, 1, 4], [2, 1, 1]);
            assert.deepStrictEqual(actual, [1, 2]);
        });

        it(`\`_.${methodName}\` should work with a single array`, () => {
            const actual = func([1, 1, 3, 2, 2]);
            assert.deepStrictEqual(actual, [1, 3, 2]);
        });

        it(`\`_.${methodName}\` should work with \`arguments\` objects`, () => {
            const array = [0, 1, null, 3],
                expected = [1, 3];

            assert.deepStrictEqual(func(array, args), expected);
            assert.deepStrictEqual(func(args, array), expected);
        });

        it(`\`_.${methodName}\` should treat \`-0\` as \`0\``, () => {
            const values = [-0, 0],
                expected = lodashStable.map(values, lodashStable.constant(['0']));

            const actual = lodashStable.map(values, (value) =>
                lodashStable.map(func(values, [value]), lodashStable.toString),
            );

            assert.deepStrictEqual(actual, expected);
        });

        it(`\`_.${methodName}\` should match \`NaN\``, () => {
            const actual = func([1, NaN, 3], [NaN, 5, NaN]);
            assert.deepStrictEqual(actual, [NaN]);
        });

        it(`\`_.${methodName}\` should work with large arrays of \`-0\` as \`0\``, () => {
            const values = [-0, 0],
                expected = lodashStable.map(values, lodashStable.constant(['0']));

            const actual = lodashStable.map(values, (value) => {
                const largeArray = lodashStable.times(
                    LARGE_ARRAY_SIZE,
                    lodashStable.constant(value),
                );
                return lodashStable.map(func(values, largeArray), lodashStable.toString);
            });

            assert.deepStrictEqual(actual, expected);
        });

        it(`\`_.${methodName}\` should work with large arrays of \`NaN\``, () => {
            const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, stubNaN);
            assert.deepStrictEqual(func([1, NaN, 3], largeArray), [NaN]);
        });

        it(`\`_.${methodName}\` should work with large arrays of objects`, () => {
            const object = {},
                largeArray = lodashStable.times(LARGE_ARRAY_SIZE, lodashStable.constant(object));

            assert.deepStrictEqual(func([object], largeArray), [object]);
            assert.deepStrictEqual(func(lodashStable.range(LARGE_ARRAY_SIZE), [1]), [1]);
        });

        it(`\`_.${methodName}\` should treat values that are not arrays or \`arguments\` objects as empty`, () => {
            const array = [0, 1, null, 3];
            assert.deepStrictEqual(func(array, 3, { '0': 1 }, null), []);
            assert.deepStrictEqual(func(null, array, null, [2, 3]), []);
            assert.deepStrictEqual(func(array, null, args, null), []);
        });

        it(`\`_.${methodName}\` should return a wrapped value when chaining`, () => {
            const wrapped = _([1, 3, 2])[methodName]([5, 2, 1, 4]);
            assert.ok(wrapped instanceof _);
            assert.deepEqual(wrapped.value(), [1, 2]);
        });
    });
});
