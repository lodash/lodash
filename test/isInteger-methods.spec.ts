import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, stubTrue, MAX_INTEGER, stubFalse, falsey, args, symbol } from './utils';

describe('isInteger methods', () => {
    lodashStable.each(['isInteger', 'isSafeInteger'], (methodName) => {
        const func = _[methodName],
            isSafe = methodName == 'isSafeInteger';

        it(`\`_.${methodName}\` should return \`true\` for integer values`, () => {
            const values = [-1, 0, 1],
                expected = lodashStable.map(values, stubTrue);

            const actual = lodashStable.map(values, (value) => func(value));

            assert.deepStrictEqual(actual, expected);
            assert.strictEqual(func(MAX_INTEGER), !isSafe);
        });

        it('should return `false` for non-integer number values', () => {
            const values = [NaN, Infinity, -Infinity, Object(1), 3.14],
                expected = lodashStable.map(values, stubFalse);

            const actual = lodashStable.map(values, (value) => func(value));

            assert.deepStrictEqual(actual, expected);
        });

        it('should return `false` for non-numeric values', () => {
            const expected = lodashStable.map(falsey, (value) => value === 0);

            const actual = lodashStable.map(falsey, (value, index) =>
                index ? func(value) : func(),
            );

            assert.deepStrictEqual(actual, expected);

            assert.strictEqual(func(args), false);
            assert.strictEqual(func([1, 2, 3]), false);
            assert.strictEqual(func(true), false);
            assert.strictEqual(func(new Date()), false);
            assert.strictEqual(func(new Error()), false);
            assert.strictEqual(func({ a: 1 }), false);
            assert.strictEqual(func(/x/), false);
            assert.strictEqual(func('a'), false);
            assert.strictEqual(func(symbol), false);
        });
    });
});
