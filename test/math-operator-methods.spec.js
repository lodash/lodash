import lodashStable from 'lodash';
import { _, symbol } from './utils';

describe('math operator methods', () => {
    lodashStable.each(['add', 'divide', 'multiply', 'subtract'], (methodName) => {
        const func = _[methodName];
        const isAddSub = methodName === 'add' || methodName === 'subtract';

        it(`\`_.${methodName}\` should return \`${
            isAddSub ? 0 : 1
        }\` when no arguments are given`, () => {
            expect(func()).toBe(isAddSub ? 0 : 1);
        });

        it(`\`_.${methodName}\` should work with only one defined argument`, () => {
            expect(func(6)).toBe(6);
            expect(func(6, undefined)).toBe(6);
            expect(func(undefined, 4)).toBe(4);
        });

        it(`\`_.${methodName}\` should preserve the sign of \`0\``, () => {
            const values = [0, '0', -0, '-0'];
            const expected = [
                [0, Infinity],
                ['0', Infinity],
                [-0, -Infinity],
                ['-0', -Infinity],
            ];

            lodashStable.times(2, (index) => {
                const actual = lodashStable.map(values, (value) => {
                    const result = index ? func(undefined, value) : func(value);
                    return [result, 1 / result];
                });

                expect(actual).toEqual(expected);
            });
        });

        it(`\`_.${methodName}\` should convert objects to \`NaN\``, () => {
            expect(func(0, {})).toEqual(NaN);
            expect(func({}, 0)).toEqual(NaN);
        });

        it(`\`_.${methodName}\` should convert symbols to \`NaN\``, () => {
            if (Symbol) {
                expect(func(0, symbol)).toEqual(NaN);
                expect(func(symbol, 0)).toEqual(NaN);
            }
        });

        it(`\`_.${methodName}\` should return an unwrapped value when implicitly chaining`, () => {
            const actual = _(1)[methodName](2);
            assert.notOk(actual instanceof _);
        });

        it(`\`_.${methodName}\` should return a wrapped value when explicitly chaining`, () => {
            const actual = _(1).chain()[methodName](2);
            expect(actual instanceof _);
        });
    });
});
