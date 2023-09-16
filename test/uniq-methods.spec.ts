import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, LARGE_ARRAY_SIZE, isEven } from './utils';
import sortBy from '../src/sortBy';

describe('uniq methods', () => {
    lodashStable.each(
        ['uniq', 'uniqBy', 'uniqWith', 'sortedUniq', 'sortedUniqBy'],
        (methodName) => {
            let func = _[methodName],
                isSorted = /^sorted/.test(methodName),
                objects = [{ a: 2 }, { a: 3 }, { a: 1 }, { a: 2 }, { a: 3 }, { a: 1 }];

            if (isSorted) {
                objects = sortBy(objects, 'a');
            } else {
                it(`\`_.${methodName}\` should return unique values of an unsorted array`, () => {
                    const array = [2, 1, 2];
                    assert.deepStrictEqual(func(array), [2, 1]);
                });
            }
            it(`\`_.${methodName}\` should return unique values of a sorted array`, () => {
                const array = [1, 2, 2];
                assert.deepStrictEqual(func(array), [1, 2]);
            });

            it(`\`_.${methodName}\` should treat object instances as unique`, () => {
                assert.deepStrictEqual(func(objects), objects);
            });

            it(`\`_.${methodName}\` should treat \`-0\` as \`0\``, () => {
                const actual = lodashStable.map(func([-0, 0]), lodashStable.toString);
                assert.deepStrictEqual(actual, ['0']);
            });

            it(`\`_.${methodName}\` should match \`NaN\``, () => {
                assert.deepStrictEqual(func([NaN, NaN]), [NaN]);
            });

            it(`\`_.${methodName}\` should work with large arrays`, () => {
                const largeArray = [],
                    expected = [0, {}, 'a'],
                    count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

                lodashStable.each(expected, (value) => {
                    lodashStable.times(count, () => {
                        largeArray.push(value);
                    });
                });

                assert.deepStrictEqual(func(largeArray), expected);
            });

            it(`\`_.${methodName}\` should work with large arrays of \`-0\` as \`0\``, () => {
                const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, (index) =>
                    isEven(index) ? -0 : 0,
                );

                const actual = lodashStable.map(func(largeArray), lodashStable.toString);
                assert.deepStrictEqual(actual, ['0']);
            });

            it(`\`_.${methodName}\` should work with large arrays of boolean, \`NaN\`, and nullish values`, () => {
                const largeArray = [],
                    expected = [null, undefined, false, true, NaN],
                    count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

                lodashStable.each(expected, (value) => {
                    lodashStable.times(count, () => {
                        largeArray.push(value);
                    });
                });

                assert.deepStrictEqual(func(largeArray), expected);
            });

            it(`\`_.${methodName}\` should work with large arrays of symbols`, () => {
                if (Symbol) {
                    const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, Symbol);
                    assert.deepStrictEqual(func(largeArray), largeArray);
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

                    const largeArray = [],
                        count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

                    expected = lodashStable.map(expected, (symbol) => symbol || {});

                    lodashStable.each(expected, (value) => {
                        lodashStable.times(count, () => {
                            largeArray.push(value);
                        });
                    });

                    assert.deepStrictEqual(func(largeArray), expected);
                }
            });

            it(`\`_.${methodName}\` should distinguish between numbers and numeric strings`, () => {
                const largeArray = [],
                    expected = ['2', 2, Object('2'), Object(2)],
                    count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

                lodashStable.each(expected, (value) => {
                    lodashStable.times(count, () => {
                        largeArray.push(value);
                    });
                });

                assert.deepStrictEqual(func(largeArray), expected);
            });
        },
    );
});
