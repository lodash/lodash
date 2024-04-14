import lodashStable from 'lodash';
import { _, MAX_SAFE_INTEGER, MAX_INTEGER } from './utils';

describe('toInteger methods', () => {
    lodashStable.each(['toInteger', 'toSafeInteger'], (methodName) => {
        const func = _[methodName];
        const isSafe = methodName === 'toSafeInteger';

        it(`\`_.${methodName}\` should convert values to integers`, () => {
            expect(func(-5.6)).toBe(-5);
            expect(func('5.6')).toBe(5);
            expect(func()).toBe(0);
            expect(func(NaN)).toBe(0);

            const expected = isSafe ? MAX_SAFE_INTEGER : MAX_INTEGER;
            expect(func(Infinity)).toBe(expected);
            expect(func(-Infinity)).toBe(-expected);
        });

        it(`\`_.${methodName}\` should support \`value\` of \`-0\``, () => {
            expect(1 / func(-0)).toBe(-Infinity);
        });
    });
});
