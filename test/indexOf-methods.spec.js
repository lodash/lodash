import lodashStable from 'lodash';
import { _, falsey } from './utils';

describe('indexOf methods', () => {
    lodashStable.each(
        ['indexOf', 'lastIndexOf', 'sortedIndexOf', 'sortedLastIndexOf'],
        (methodName) => {
            const func = _[methodName];
            const isIndexOf = !/last/i.test(methodName);
            const isSorted = /^sorted/.test(methodName);

            it(`\`_.${methodName}\` should accept a falsey \`array\``, () => {
                const expected = lodashStable.map(falsey, lodashStable.constant(-1));

                const actual = lodashStable.map(falsey, (array, index) => {
                    try {
                        return index ? func(array) : func();
                    } catch (e) {}
                });

                expect(actual).toEqual(expected);
            });

            it(`\`_.${methodName}\` should return \`-1\` for an unmatched value`, () => {
                const array = [1, 2, 3];
                const empty = [];

                expect(func(array, 4)).toBe(-1);
                expect(func(array, 4, true)).toBe(-1);
                expect(func(array, undefined, true)).toBe(-1);

                expect(func(empty, undefined)).toBe(-1);
                expect(func(empty, undefined, true)).toBe(-1);
            });

            it(`\`_.${methodName}\` should not match values on empty arrays`, () => {
                const array = [];
                array[-1] = 0;

                expect(func(array, undefined)).toBe(-1);
                expect(func(array, 0, true)).toBe(-1);
            });

            it(`\`_.${methodName}\` should match \`NaN\``, () => {
                const array = isSorted ? [1, 2, NaN, NaN] : [1, NaN, 3, NaN, 5, NaN];

                if (isSorted) {
                    expect(func(array, NaN, true)).toBe(isIndexOf ? 2 : 3);
                } else {
                    expect(func(array, NaN)).toBe(isIndexOf ? 1 : 5);
                    expect(func(array, NaN, 2)).toBe(isIndexOf ? 3 : 1);
                    expect(func(array, NaN, -2)).toBe(isIndexOf ? 5 : 3);
                }
            });

            it(`\`_.${methodName}\` should match \`-0\` as \`0\``, () => {
                expect(func([-0], 0)).toBe(0);
                expect(func([0], -0)).toBe(0);
            });
        },
    );
});
