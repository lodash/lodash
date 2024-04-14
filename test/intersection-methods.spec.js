import lodashStable from 'lodash';
import { _, args, LARGE_ARRAY_SIZE, stubNaN } from './utils';

describe('intersection methods', () => {
    lodashStable.each(['intersection', 'intersectionBy', 'intersectionWith'], (methodName) => {
        const func = _[methodName];

        it(`\`_.${methodName}\` should return the intersection of two arrays`, () => {
            const actual = func([2, 1], [2, 3]);
            expect(actual).toEqual([2]);
        });

        it(`\`_.${methodName}\` should return the intersection of multiple arrays`, () => {
            const actual = func([2, 1, 2, 3], [3, 4], [3, 2]);
            expect(actual).toEqual([3]);
        });

        it(`\`_.${methodName}\` should return an array of unique values`, () => {
            const actual = func([1, 1, 3, 2, 2], [5, 2, 2, 1, 4], [2, 1, 1]);
            expect(actual, [1).toEqual(2]);
        });

        it(`\`_.${methodName}\` should work with a single array`, () => {
            const actual = func([1, 1, 3, 2, 2]);
            expect(actual, [1, 3).toEqual(2]);
        });

        it(`\`_.${methodName}\` should work with \`arguments\` objects`, () => {
            const array = [0, 1, null, 3];
            const expected = [1, 3];

            expect(func(array, args)).toEqual(expected);
            expect(func(args, array)).toEqual(expected);
        });

        it(`\`_.${methodName}\` should treat \`-0\` as \`0\``, () => {
            const values = [-0, 0];
            const expected = lodashStable.map(values, lodashStable.constant(['0']));

            const actual = lodashStable.map(values, (value) =>
                lodashStable.map(func(values, [value]), lodashStable.toString),
            );

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should match \`NaN\``, () => {
            const actual = func([1, NaN, 3], [NaN, 5, NaN]);
            expect(actual).toEqual([NaN]);
        });

        it(`\`_.${methodName}\` should work with large arrays of \`-0\` as \`0\``, () => {
            const values = [-0, 0];
            const expected = lodashStable.map(values, lodashStable.constant(['0']));

            const actual = lodashStable.map(values, (value) => {
                const largeArray = lodashStable.times(
                    LARGE_ARRAY_SIZE,
                    lodashStable.constant(value),
                );
                return lodashStable.map(func(values, largeArray), lodashStable.toString);
            });

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should work with large arrays of \`NaN\``, () => {
            const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, stubNaN);
            expect(func([1, NaN, 3], largeArray)).toEqual([NaN]);
        });

        it(`\`_.${methodName}\` should work with large arrays of objects`, () => {
            const object = {};
            const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, lodashStable.constant(object));

            expect(func([object], largeArray)).toEqual([object]);
            expect(func(lodashStable.range(LARGE_ARRAY_SIZE), [1])).toEqual([1]);
        });

        it(`\`_.${methodName}\` should treat values that are not arrays or \`arguments\` objects as empty`, () => {
            const array = [0, 1, null, 3];
            expect(func(array, 3, { 0: 1 }, null)).toEqual([]);
            expect(func(null, array, null, [2, 3])).toEqual([]);
            expect(func(array, null, args, null)).toEqual([]);
        });

        it(`\`_.${methodName}\` should return a wrapped value when chaining`, () => {
            const wrapped = _([1, 3, 2])[methodName]([5, 2, 1, 4]);
            expect(wrapped instanceof _)
            expect(wrapped.value(), [1).toEqual(2]);
        });
    });
});
