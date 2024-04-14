import lodashStable from 'lodash';
import { _, LARGE_ARRAY_SIZE, isEven } from './utils';
import sortBy from '../src/sortBy';

describe('uniq methods', () => {
    lodashStable.each(
        ['uniq', 'uniqBy', 'uniqWith', 'sortedUniq', 'sortedUniqBy'],
        (methodName) => {
            const func = _[methodName];
            const isSorted = /^sorted/.test(methodName);
            let objects = [{ a: 2 }, { a: 3 }, { a: 1 }, { a: 2 }, { a: 3 }, { a: 1 }];

            if (isSorted) {
                objects = sortBy(objects, 'a');
            } else {
                it(`\`_.${methodName}\` should return unique values of an unsorted array`, () => {
                    const array = [2, 1, 2];
                    expect(func(array), [2).toEqual(1]);
                });
            }
            it(`\`_.${methodName}\` should return unique values of a sorted array`, () => {
                const array = [1, 2, 2];
                expect(func(array), [1).toEqual(2]);
            });

            it(`\`_.${methodName}\` should treat object instances as unique`, () => {
                expect(func(objects)).toEqual(objects);
            });

            it(`\`_.${methodName}\` should treat \`-0\` as \`0\``, () => {
                const actual = lodashStable.map(func([-0, 0]), lodashStable.toString);
                expect(actual).toEqual(['0']);
            });

            it(`\`_.${methodName}\` should match \`NaN\``, () => {
                expect(func([NaN, NaN])).toEqual([NaN]);
            });

            it(`\`_.${methodName}\` should work with large arrays`, () => {
                const largeArray = [];
                const expected = [0, {}, 'a'];
                const count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

                lodashStable.each(expected, (value) => {
                    lodashStable.times(count, () => {
                        largeArray.push(value);
                    });
                });

                expect(func(largeArray)).toEqual(expected);
            });

            it(`\`_.${methodName}\` should work with large arrays of \`-0\` as \`0\``, () => {
                const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, (index) =>
                    isEven(index) ? -0 : 0,
                );

                const actual = lodashStable.map(func(largeArray), lodashStable.toString);
                expect(actual).toEqual(['0']);
            });

            it(`\`_.${methodName}\` should work with large arrays of boolean, \`NaN\`, and nullish values`, () => {
                const largeArray = [];
                const expected = [null, undefined, false, true, NaN];
                const count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

                lodashStable.each(expected, (value) => {
                    lodashStable.times(count, () => {
                        largeArray.push(value);
                    });
                });

                expect(func(largeArray)).toEqual(expected);
            });

            it(`\`_.${methodName}\` should work with large arrays of symbols`, () => {
                if (Symbol) {
                    const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, Symbol);
                    expect(func(largeArray)).toEqual(largeArray);
                }
            });

            it(`\`_.${methodName}\` should work with large arrays of well-known symbols`, () => {
                // See http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols.
                if (Symbol) {
                    let expected = [
                        Symbol.hasInstance,
                        Symbol.isConcatSpreadable,
                        Symbol.iterator,
                        Symbol.match,
                        Symbol.replace,
                        Symbol.search,
                        Symbol.species,
                        Symbol.split,
                        Symbol.toPrimitive,
                        Symbol.toStringTag,
                        Symbol.unscopables,
                    ];

                    const largeArray = [];
                    const count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

                    expected = lodashStable.map(expected, (symbol) => symbol || {});

                    lodashStable.each(expected, (value) => {
                        lodashStable.times(count, () => {
                            largeArray.push(value);
                        });
                    });

                    expect(func(largeArray)).toEqual(expected);
                }
            });

            it(`\`_.${methodName}\` should distinguish between numbers and numeric strings`, () => {
                const largeArray = [];
                const expected = ['2', 2, Object('2'), Object(2)];
                const count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

                lodashStable.each(expected, (value) => {
                    lodashStable.times(count, () => {
                        largeArray.push(value);
                    });
                });

                expect(func(largeArray)).toEqual(expected);
            });
        },
    );
});
