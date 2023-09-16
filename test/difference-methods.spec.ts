import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, LARGE_ARRAY_SIZE, stubOne, stubNaN, args } from './utils';

describe('difference methods', () => {
    lodashStable.each(['difference', 'differenceBy', 'differenceWith'], (methodName) => {
        const func = _[methodName];

        it(`\`_.${methodName}\` should return the difference of two arrays`, () => {
            const actual = func([2, 1], [2, 3]);
            assert.deepStrictEqual(actual, [1]);
        });

        it(`\`_.${methodName}\` should return the difference of multiple arrays`, () => {
            const actual = func([2, 1, 2, 3], [3, 4], [3, 2]);
            assert.deepStrictEqual(actual, [1]);
        });

        it(`\`_.${methodName}\` should treat \`-0\` as \`0\``, () => {
            const array = [-0, 0];

            let actual = lodashStable.map(array, (value) => func(array, [value]));

            assert.deepStrictEqual(actual, [[], []]);

            actual = lodashStable.map(func([-0, 1], [1]), lodashStable.toString);
            assert.deepStrictEqual(actual, ['0']);
        });

        it(`\`_.${methodName}\` should match \`NaN\``, () => {
            assert.deepStrictEqual(func([1, NaN, 3], [NaN, 5, NaN]), [1, 3]);
        });

        it(`\`_.${methodName}\` should work with large arrays`, () => {
            const array1 = lodashStable.range(LARGE_ARRAY_SIZE + 1),
                array2 = lodashStable.range(LARGE_ARRAY_SIZE),
                a = {},
                b = {},
                c = {};

            array1.push(a, b, c);
            array2.push(b, c, a);

            assert.deepStrictEqual(func(array1, array2), [LARGE_ARRAY_SIZE]);
        });

        it(`\`_.${methodName}\` should work with large arrays of \`-0\` as \`0\``, () => {
            const array = [-0, 0];

            let actual = lodashStable.map(array, (value) => {
                const largeArray = lodashStable.times(
                    LARGE_ARRAY_SIZE,
                    lodashStable.constant(value),
                );
                return func(array, largeArray);
            });

            assert.deepStrictEqual(actual, [[], []]);

            const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, stubOne);
            actual = lodashStable.map(func([-0, 1], largeArray), lodashStable.toString);
            assert.deepStrictEqual(actual, ['0']);
        });

        it(`\`_.${methodName}\` should work with large arrays of \`NaN\``, () => {
            const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, stubNaN);
            assert.deepStrictEqual(func([1, NaN, 3], largeArray), [1, 3]);
        });

        it(`\`_.${methodName}\` should work with large arrays of objects`, () => {
            const object1 = {},
                object2 = {},
                largeArray = lodashStable.times(LARGE_ARRAY_SIZE, lodashStable.constant(object1));

            assert.deepStrictEqual(func([object1, object2], largeArray), [object2]);
        });

        it(`\`_.${methodName}\` should ignore values that are not array-like`, () => {
            const array = [1, null, 3];

            assert.deepStrictEqual(func(args, 3, { '0': 1 }), [1, 2, 3]);
            assert.deepStrictEqual(func(null, array, 1), []);
            assert.deepStrictEqual(func(array, args, null), [null]);
        });
    });
});
