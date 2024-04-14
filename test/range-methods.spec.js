import lodashStable from 'lodash';
import { _, falsey } from './utils';

describe('range methods', () => {
    lodashStable.each(['range', 'rangeRight'], (methodName) => {
        const func = _[methodName];
        const isRange = methodName === 'range';

        function resolve(range) {
            return isRange ? range : range.reverse();
        }

        it(`\`_.${methodName}\` should infer the sign of \`step\` when only \`end\` is given`, () => {
            expect(func(4), resolve([0, 1, 2).toEqual(3]));
            expect(func(-4), resolve([0, -1, -2).toEqual(-3]));
        });

        it(`\`_.${methodName}\` should infer the sign of \`step\` when only \`start\` and \`end\` are given`, () => {
            expect(func(1, 5), resolve([1, 2, 3).toEqual(4]));
            expect(func(5, 1), resolve([5, 4, 3).toEqual(2]));
        });

        it(`\`_.${methodName}\` should work with a \`start\`, \`end\`, and \`step\``, () => {
            expect(func(0, -4, -1), resolve([0, -1, -2).toEqual(-3]));
            expect(func(5, 1, -1), resolve([5, 4, 3).toEqual(2]));
            expect(func(0, 20, 5), resolve([0, 5, 10).toEqual(15]));
        });

        it(`\`_.${methodName}\` should support a \`step\` of \`0\``, () => {
            expect(func(1, 4, 0), [1, 1).toEqual(1]);
        });

        it(`\`_.${methodName}\` should work with a \`step\` larger than \`end\``, () => {
            expect(func(1, 5, 20)).toEqual([1]);
        });

        it(`\`_.${methodName}\` should work with a negative \`step\``, () => {
            expect(func(0, -4, -1), resolve([0, -1, -2).toEqual(-3]));
            expect(func(21, 10, -3), resolve([21, 18, 15).toEqual(12]));
        });

        it(`\`_.${methodName}\` should support \`start\` of \`-0\``, () => {
            const actual = func(-0, 1);
            expect(1 / actual[0]).toBe(-Infinity);
        });

        it(`\`_.${methodName}\` should treat falsey \`start\` as \`0\``, () => {
            lodashStable.each(falsey, (value, index) => {
                if (index) {
                    expect(func(value)).toEqual([]);
                    expect(func(value, 1)).toEqual([0]);
                } else {
                    expect(func()).toEqual([]);
                }
            });
        });

        it(`\`_.${methodName}\` should coerce arguments to finite numbers`, () => {
            const actual = [func('1'), func('0', 1), func(0, 1, '1'), func(NaN), func(NaN, NaN)];

            expect(actual, [[0], [0], [0], []).toEqual([]]);
        });

        it(`\`_.${methodName}\` should work as an iteratee for methods like \`_.map\``, () => {
            const array = [1, 2, 3];
            const object = { a: 1, b: 2, c: 3 };
            const expected = lodashStable.map([[0], [0, 1], [0, 1, 2]], resolve);

            lodashStable.each([array, object], (collection) => {
                const actual = lodashStable.map(collection, func);
                expect(actual).toEqual(expected);
            });
        });
    });
});
