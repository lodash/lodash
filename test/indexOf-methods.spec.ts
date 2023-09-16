import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, falsey } from './utils';

describe('indexOf methods', () => {
    lodashStable.each(
        ['indexOf', 'lastIndexOf', 'sortedIndexOf', 'sortedLastIndexOf'],
        (methodName) => {
            const func = _[methodName],
                isIndexOf = !/last/i.test(methodName),
                isSorted = /^sorted/.test(methodName);

            it(`\`_.${methodName}\` should accept a falsey \`array\``, () => {
                const expected = lodashStable.map(falsey, lodashStable.constant(-1));

                const actual = lodashStable.map(falsey, (array, index) => {
                    try {
                        return index ? func(array) : func();
                    } catch (e) {}
                });

                assert.deepStrictEqual(actual, expected);
            });

            it(`\`_.${methodName}\` should return \`-1\` for an unmatched value`, () => {
                const array = [1, 2, 3],
                    empty = [];

                assert.strictEqual(func(array, 4), -1);
                assert.strictEqual(func(array, 4, true), -1);
                assert.strictEqual(func(array, undefined, true), -1);

                assert.strictEqual(func(empty, undefined), -1);
                assert.strictEqual(func(empty, undefined, true), -1);
            });

            it(`\`_.${methodName}\` should not match values on empty arrays`, () => {
                const array = [];
                array[-1] = 0;

                assert.strictEqual(func(array, undefined), -1);
                assert.strictEqual(func(array, 0, true), -1);
            });

            it(`\`_.${methodName}\` should match \`NaN\``, () => {
                const array = isSorted ? [1, 2, NaN, NaN] : [1, NaN, 3, NaN, 5, NaN];

                if (isSorted) {
                    assert.strictEqual(func(array, NaN, true), isIndexOf ? 2 : 3);
                } else {
                    assert.strictEqual(func(array, NaN), isIndexOf ? 1 : 5);
                    assert.strictEqual(func(array, NaN, 2), isIndexOf ? 3 : 1);
                    assert.strictEqual(func(array, NaN, -2), isIndexOf ? 5 : 3);
                }
            });

            it(`\`_.${methodName}\` should match \`-0\` as \`0\``, () => {
                assert.strictEqual(func([-0], 0), 0);
                assert.strictEqual(func([0], -0), 0);
            });
        },
    );
});
