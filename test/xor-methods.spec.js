import lodashStable from 'lodash';
import { _, args, LARGE_ARRAY_SIZE } from './utils';

describe('xor methods', () => {
    lodashStable.each(['xor', 'xorBy', 'xorWith'], (methodName) => {
        const func = _[methodName];

        it(`\`_.${methodName}\` should return the symmetric difference of two arrays`, () => {
            const actual = func([2, 1], [2, 3]);
            expect(actual).toEqual([1, 3]);
        });

        it(`\`_.${methodName}\` should return the symmetric difference of multiple arrays`, () => {
            let actual = func([2, 1], [2, 3], [3, 4]);
            expect(actual).toEqual([1, 4]);

            actual = func([1, 2], [2, 1], [1, 2]);
            expect(actual).toEqual([]);
        });

        it(`\`_.${methodName}\` should return an empty array when comparing the same array`, () => {
            const array = [1];
            const actual = func(array, array, array);

            expect(actual).toEqual([]);
        });

        it(`\`_.${methodName}\` should return an array of unique values`, () => {
            let actual = func([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]);
            expect(actual).toEqual([1, 4]);

            actual = func([1, 1]);
            expect(actual).toEqual([1]);
        });

        it(`\`_.${methodName}\` should return a new array when a single array is given`, () => {
            const array = [1];
            expect(func(array)).not.toBe(array);
        });

        it(`\`_.${methodName}\` should ignore individual secondary arguments`, () => {
            const array = [0];
            expect(func(array, 3, null, { 0: 1 })).toEqual(array);
        });

        it(`\`_.${methodName}\` should ignore values that are not arrays or \`arguments\` objects`, () => {
            const array = [1, 2];
            expect(func(array, 3, { 0: 1 }, null)).toEqual(array);
            expect(func(null, array, null, [2, 3])).toEqual([1, 3]);
            expect(func(array, null, args, null)).toEqual([3]);
        });

        it(`\`_.${methodName}\` should return a wrapped value when chaining`, () => {
            const wrapped = _([1, 2, 3])[methodName]([5, 2, 1, 4]);
            expect(wrapped instanceof _).toBeTruthy();
        });

        it(`\`_.${methodName}\` should work when in a lazy sequence before \`head\` or \`last\``, () => {
            const array = lodashStable.range(LARGE_ARRAY_SIZE + 1);
            const wrapped = _(array)
                .slice(1)
                [methodName]([LARGE_ARRAY_SIZE, LARGE_ARRAY_SIZE + 1]);

            const actual = lodashStable.map(['head', 'last'], (methodName) =>
                wrapped[methodName](),
            );

            expect(actual).toEqual([1, LARGE_ARRAY_SIZE + 1]);
        });
    });
});
