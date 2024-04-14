import lodashStable from 'lodash';
import { _ } from './utils';
import sortBy from '../src/sortBy';

describe('sortedIndex methods', () => {
    lodashStable.each(['sortedIndex', 'sortedLastIndex'], (methodName) => {
        const func = _[methodName];
        const isSortedIndex = methodName === 'sortedIndex';

        it(`\`_.${methodName}\` should return the insert index`, () => {
            const array = [30, 50];
            const values = [30, 40, 50];
            const expected = isSortedIndex ? [0, 1, 1] : [1, 1, 2];

            const actual = lodashStable.map(values, (value) => func(array, value));

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should work with an array of strings`, () => {
            const array = ['a', 'c'];
            const values = ['a', 'b', 'c'];
            const expected = isSortedIndex ? [0, 1, 1] : [1, 1, 2];

            const actual = lodashStable.map(values, (value) => func(array, value));

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should accept a nullish \`array\` and a \`value\``, () => {
            const values = [null, undefined];
            const expected = lodashStable.map(values, lodashStable.constant([0, 0, 0]));

            const actual = lodashStable.map(values, (array) => [
                func(array, 1),
                func(array, undefined),
                func(array, NaN),
            ]);

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should align with \`_.sortBy\``, () => {
            const symbol1 = Symbol ? Symbol('a') : null;
            const symbol2 = Symbol ? Symbol('b') : null;
            const symbol3 = Symbol ? Symbol('c') : null;
            const expected = [1, '2', {}, symbol1, symbol2, null, undefined, NaN, NaN];

            lodashStable.each(
                [
                    [NaN, symbol1, null, 1, '2', {}, symbol2, NaN, undefined],
                    ['2', null, 1, symbol1, NaN, {}, NaN, symbol2, undefined],
                ],
                (array) => {
                    expect(sortBy(array)).toEqual(expected);
                    expect(func(expected, 3)).toBe(2);
                    expect(func(expected, symbol3)).toBe(isSortedIndex ? 3 : Symbol ? 5 : 6);
                    expect(func(expected, null)).toBe(isSortedIndex ? (Symbol ? 5 : 3) : 6);
                    expect(func(expected, undefined)).toBe(isSortedIndex ? 6 : 7);
                    expect(func(expected, NaN)).toBe(isSortedIndex ? 7 : 9);
                },
            );
        });

        it(`\`_.${methodName}\` should align with \`_.sortBy\` for nulls`, () => {
            const array = [null, null];

            expect(func(array, null)).toBe(isSortedIndex ? 0 : 2);
            expect(func(array, 1)).toBe(0);
            expect(func(array, 'a')).toBe(0);
        });

        it(`\`_.${methodName}\` should align with \`_.sortBy\` for symbols`, () => {
            const symbol1 = Symbol ? Symbol('a') : null;
            const symbol2 = Symbol ? Symbol('b') : null;
            const symbol3 = Symbol ? Symbol('c') : null;
            const array = [symbol1, symbol2];

            expect(func(array, symbol3)).toBe(isSortedIndex ? 0 : 2);
            expect(func(array, 1)).toBe(0);
            expect(func(array, 'a')).toBe(0);
        });
    });
});
