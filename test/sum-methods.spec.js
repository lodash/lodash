import lodashStable from 'lodash';
import { _, empties, stubZero } from './utils';

describe('sum methods', () => {
    lodashStable.each(['sum', 'sumBy'], (methodName) => {
        const array = [6, 4, 2];
        const func = _[methodName];

        it(`\`_.${methodName}\` should return the sum of an array of numbers`, () => {
            expect(func(array)).toBe(12);
        });

        it(`\`_.${methodName}\` should return \`0\` when passing empty \`array\` values`, () => {
            const expected = lodashStable.map(empties, stubZero);

            const actual = lodashStable.map(empties, (value) => func(value));

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should skip \`undefined\` values`, () => {
            expect(func([1, undefined])).toBe(1);
        });

        it(`\`_.${methodName}\` should not skip \`NaN\` values`, () => {
            expect(func([1, NaN])).toEqual(NaN);
        });

        it(`\`_.${methodName}\` should not coerce values to numbers`, () => {
            expect(func(['1', '2'])).toBe('12');
        });
    });
});
