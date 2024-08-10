import { _, args } from './utils';

describe('union methods', () => {
    ['union', 'unionBy', 'unionWith'].forEach((methodName) => {
        const func = _[methodName];

        it(`\`_.${methodName}\` should return the union of two arrays`, () => {
            const actual = func([2], [1, 2]);
            expect(actual).toEqual([1, 2]);
        });

        it(`\`_.${methodName}\` should return the union of multiple arrays`, () => {
            const actual = func([2], [1, 2], [2, 3]);
            expect(actual).toEqual([2, 1, 3]);
        });

        it(`\`_.${methodName}\` should not flatten nested arrays`, () => {
            const actual = func([1, 3, 2], [1, [5]], [2, [4]]);
            expect(actual).toEqual([1, 3, 2, [5], [4]]);
        });

        it(`\`_.${methodName}\` should ignore values that are not arrays or \`arguments\` objects`, () => {
            const array = [0];
            expect(func(array, 3, { 0: 1 }, null)).toEqual(array);
            expect(func(null, array, null, [2, 1])).toEqual([0, 2, 1]);
            expect(func(array, null, args, null)).toEqual([0, 1, 2, 3]);
        });
    });
});
