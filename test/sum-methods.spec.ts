import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, empties, stubZero } from './utils';

describe('sum methods', () => {
    lodashStable.each(['sum', 'sumBy'], (methodName) => {
        const array = [6, 4, 2],
            func = _[methodName];

        it(`\`_.${methodName}\` should return the sum of an array of numbers`, () => {
            assert.strictEqual(func(array), 12);
        });

        it(`\`_.${methodName}\` should return \`0\` when passing empty \`array\` values`, () => {
            const expected = lodashStable.map(empties, stubZero);

            const actual = lodashStable.map(empties, (value) => func(value));

            assert.deepStrictEqual(actual, expected);
        });

        it(`\`_.${methodName}\` should skip \`undefined\` values`, () => {
            assert.strictEqual(func([1, undefined]), 1);
        });

        it(`\`_.${methodName}\` should not skip \`NaN\` values`, () => {
            assert.deepStrictEqual(func([1, NaN]), NaN);
        });

        it(`\`_.${methodName}\` should not coerce values to numbers`, () => {
            assert.strictEqual(func(['1', '2']), '12');
        });
    });
});
