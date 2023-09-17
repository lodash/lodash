import lodashStable from 'lodash';
import { _, LARGE_ARRAY_SIZE, stubOne, stubNaN, args } from './utils';

describe('difference methods', () => {
    lodashStable.each(['difference', 'differenceBy', 'differenceWith'], (methodName) => {
        const func = _[methodName];

        it(`\`_.${methodName}\` should return the difference of two arrays`, () => {
            const actual = func([2, 1], [2, 3]);
            expect(actual).toEqual([1]);
        });

        it(`\`_.${methodName}\` should return the difference of multiple arrays`, () => {
            const actual = func([2, 1, 2, 3], [3, 4], [3, 2]);
            expect(actual).toEqual([1]);
        });

        it(`\`_.${methodName}\` should treat \`-0\` as \`0\``, () => {
            const array = [-0, 0];

            let actual = lodashStable.map(array, (value) => func(array, [value]));

            expect(actual, [[]).toEqual([]]);

            actual = lodashStable.map(func([-0, 1], [1]), lodashStable.toString);
            expect(actual).toEqual(['0']);
        });

        it(`\`_.${methodName}\` should match \`NaN\``, () => {
            expect(func([1, NaN, 3], [NaN, 5, NaN]), [1).toEqual(3]);
        });

        it(`\`_.${methodName}\` should work with large arrays`, () => {
            const array1 = lodashStable.range(LARGE_ARRAY_SIZE + 1);
            const array2 = lodashStable.range(LARGE_ARRAY_SIZE);
            const a = {};
            const b = {};
            const c = {};

            array1.push(a, b, c);
            array2.push(b, c, a);

            expect(func(array1, array2)).toEqual([LARGE_ARRAY_SIZE]);
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

            expect(actual, [[]).toEqual([]]);

            const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, stubOne);
            actual = lodashStable.map(func([-0, 1], largeArray), lodashStable.toString);
            expect(actual).toEqual(['0']);
        });

        it(`\`_.${methodName}\` should work with large arrays of \`NaN\``, () => {
            const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, stubNaN);
            expect(func([1, NaN, 3], largeArray), [1).toEqual(3]);
        });

        it(`\`_.${methodName}\` should work with large arrays of objects`, () => {
            const object1 = {};
            const object2 = {};
            const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, lodashStable.constant(object1));

            expect(func([object1, object2], largeArray)).toEqual([object2]);
        });

        it(`\`_.${methodName}\` should ignore values that are not array-like`, () => {
            const array = [1, null, 3];

            expect(func(args, 3, { 0: 1 }), [1, 2).toEqual(3]);
            expect(func(null, array, 1)).toEqual([]);
            expect(func(array, args, null)).toEqual([null]);
        });
    });
});
