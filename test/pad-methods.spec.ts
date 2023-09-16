import assert from 'node:assert';
import lodashStable from 'lodash';
import { _ } from './utils';
import pad from '../src/pad';

describe('pad methods', () => {
    lodashStable.each(['pad', 'padStart', 'padEnd'], (methodName) => {
        const func = _[methodName],
            isPad = methodName === 'pad',
            isStart = methodName === 'padStart',
            string = 'abc';

        it(`\`_.${methodName}\` should not pad if string is >= \`length\``, () => {
            assert.strictEqual(func(string, 2), string);
            assert.strictEqual(func(string, 3), string);
        });

        it(`\`_.${methodName}\` should treat negative \`length\` as \`0\``, () => {
            lodashStable.each([0, -2], (length) => {
                assert.strictEqual(func(string, length), string);
            });
        });

        it(`\`_.${methodName}\` should coerce \`length\` to a number`, () => {
            lodashStable.each(['', '4'], (length) => {
                const actual = length ? (isStart ? ' abc' : 'abc ') : string;
                assert.strictEqual(func(string, length), actual);
            });
        });

        it(`\`_.${methodName}\` should treat nullish values as empty strings`, () => {
            lodashStable.each([undefined, '_-'], (chars) => {
                const expected = chars ? (isPad ? '__' : chars) : '  ';
                assert.strictEqual(func(null, 2, chars), expected);
                assert.strictEqual(func(undefined, 2, chars), expected);
                assert.strictEqual(func('', 2, chars), expected);
            });
        });

        it(`\`_.${methodName}\` should return \`string\` when \`chars\` coerces to an empty string`, () => {
            const values = ['', Object('')],
                expected = lodashStable.map(values, lodashStable.constant(string));

            const actual = lodashStable.map(values, (value) => pad(string, 6, value));

            assert.deepStrictEqual(actual, expected);
        });
    });
});
