import lodashStable from 'lodash';
import { _ } from './utils';
import pad from '../src/pad';

describe('pad methods', () => {
    lodashStable.each(['pad', 'padStart', 'padEnd'], (methodName) => {
        const func = _[methodName];
        const isPad = methodName === 'pad';
        const isStart = methodName === 'padStart';
        const string = 'abc';

        it(`\`_.${methodName}\` should not pad if string is >= \`length\``, () => {
            expect(func(string, 2)).toBe(string);
            expect(func(string, 3)).toBe(string);
        });

        it(`\`_.${methodName}\` should treat negative \`length\` as \`0\``, () => {
            lodashStable.each([0, -2], (length) => {
                expect(func(string, length)).toBe(string);
            });
        });

        it(`\`_.${methodName}\` should coerce \`length\` to a number`, () => {
            lodashStable.each(['', '4'], (length) => {
                const actual = length ? (isStart ? ' abc' : 'abc ') : string;
                expect(func(string, length)).toBe(actual);
            });
        });

        it(`\`_.${methodName}\` should treat nullish values as empty strings`, () => {
            lodashStable.each([undefined, '_-'], (chars) => {
                const expected = chars ? (isPad ? '__' : chars) : '  ';
                expect(func(null, 2, chars)).toBe(expected);
                expect(func(undefined, 2, chars)).toBe(expected);
                expect(func('', 2, chars)).toBe(expected);
            });
        });

        it(`\`_.${methodName}\` should return \`string\` when \`chars\` coerces to an empty string`, () => {
            const values = ['', Object('')];
            const expected = lodashStable.map(values, lodashStable.constant(string));

            const actual = lodashStable.map(values, (value) => pad(string, 6, value));

            expect(actual).toEqual(expected);
        });
    });
});
