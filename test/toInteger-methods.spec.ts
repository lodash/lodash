import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, MAX_SAFE_INTEGER, MAX_INTEGER } from './utils';

describe('toInteger methods', () => {
    lodashStable.each(['toInteger', 'toSafeInteger'], (methodName) => {
        const func = _[methodName],
            isSafe = methodName == 'toSafeInteger';

        it(`\`_.${methodName}\` should convert values to integers`, () => {
            assert.strictEqual(func(-5.6), -5);
            assert.strictEqual(func('5.6'), 5);
            assert.strictEqual(func(), 0);
            assert.strictEqual(func(NaN), 0);

            const expected = isSafe ? MAX_SAFE_INTEGER : MAX_INTEGER;
            assert.strictEqual(func(Infinity), expected);
            assert.strictEqual(func(-Infinity), -expected);
        });

        it(`\`_.${methodName}\` should support \`value\` of \`-0\``, () => {
            assert.strictEqual(1 / func(-0), -Infinity);
        });
    });
});
