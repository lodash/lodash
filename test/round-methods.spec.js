import lodashStable from 'lodash';
import { _, MAX_SAFE_INTEGER, stubFalse } from './utils';
import round from '../src/round';

describe('round methods', () => {
    lodashStable.each(['ceil', 'floor', 'round'], (methodName) => {
        const func = _[methodName];
        const isCeil = methodName === 'ceil';
        const isFloor = methodName === 'floor';

        it(`\`_.${methodName}\` should return a rounded number without a precision`, () => {
            const actual = func(4.006);
            expect(actual).toBe(isCeil ? 5 : 4);
        });

        it(`\`_.${methodName}\` should work with a precision of \`0\``, () => {
            const actual = func(4.006, 0);
            expect(actual).toBe(isCeil ? 5 : 4);
        });

        it(`\`_.${methodName}\` should work with a positive precision`, () => {
            let actual = func(4.016, 2);
            expect(actual).toBe(isFloor ? 4.01 : 4.02);

            actual = func(4.1, 2);
            expect(actual).toBe(4.1);
        });

        it(`\`_.${methodName}\` should work with a negative precision`, () => {
            const actual = func(4160, -2);
            expect(actual).toBe(isFloor ? 4100 : 4200);
        });

        it(`\`_.${methodName}\` should coerce \`precision\` to an integer`, () => {
            let actual = func(4.006, NaN);
            expect(actual).toBe(isCeil ? 5 : 4);

            const expected = isFloor ? 4.01 : 4.02;

            actual = func(4.016, 2.6);
            expect(actual).toBe(expected);

            actual = func(4.016, '+2');
            expect(actual).toBe(expected);
        });

        it(`\`_.${methodName}\` should work with exponential notation and \`precision\``, () => {
            let actual = func(5e1, 2);
            expect(actual).toEqual(50);

            actual = func('5e', 1);
            expect(actual).toEqual(NaN);

            actual = func('5e1e1', 1);
            expect(actual).toEqual(NaN);
        });

        it(`\`_.${methodName}\` should preserve the sign of \`0\``, () => {
            const values = [[0], [-0], ['0'], ['-0'], [0, 1], [-0, 1], ['0', 1], ['-0', 1]];
            const expected = [
                Infinity,
                -Infinity,
                Infinity,
                -Infinity,
                Infinity,
                -Infinity,
                Infinity,
                -Infinity,
            ];

            const actual = lodashStable.map(values, (args) => 1 / func.apply(undefined, args));

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should not return \`NaN\` for large \`precision\` values`, () => {
            const results = [round(10.0000001, 1000), round(MAX_SAFE_INTEGER, 293)];

            const expected = lodashStable.map(results, stubFalse);
            const actual = lodashStable.map(results, lodashStable.isNaN);

            expect(actual).toEqual(expected);
        });
    });
});
