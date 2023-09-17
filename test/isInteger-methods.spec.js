import lodashStable from 'lodash';
import { _, stubTrue, MAX_INTEGER, stubFalse, falsey, args, symbol } from './utils';

describe('isInteger methods', () => {
    lodashStable.each(['isInteger', 'isSafeInteger'], (methodName) => {
        const func = _[methodName];
        const isSafe = methodName === 'isSafeInteger';

        it(`\`_.${methodName}\` should return \`true\` for integer values`, () => {
            const values = [-1, 0, 1];
            const expected = lodashStable.map(values, stubTrue);

            const actual = lodashStable.map(values, (value) => func(value));

            expect(actual).toEqual(expected);
            expect(func(MAX_INTEGER)).toBe(!isSafe);
        });

        it('should return `false` for non-integer number values', () => {
            const values = [NaN, Infinity, -Infinity, Object(1), 3.14];
            const expected = lodashStable.map(values, stubFalse);

            const actual = lodashStable.map(values, (value) => func(value));

            expect(actual).toEqual(expected);
        });

        it('should return `false` for non-numeric values', () => {
            const expected = lodashStable.map(falsey, (value) => value === 0);

            const actual = lodashStable.map(falsey, (value, index) =>
                index ? func(value) : func(),
            );

            expect(actual).toEqual(expected);

            expect(func(args)).toBe(false);
            expect(func([1, 2, 3])).toBe(false);
            expect(func(true)).toBe(false);
            expect(func(new Date())).toBe(false);
            expect(func(new Error())).toBe(false);
            expect(func({ a: 1 })).toBe(false);
            expect(func(/x/)).toBe(false);
            expect(func('a')).toBe(false);
            expect(func(symbol)).toBe(false);
        });
    });
});
