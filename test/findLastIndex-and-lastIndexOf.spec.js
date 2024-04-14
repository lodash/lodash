import lodashStable from 'lodash';
import { identity, stubZero, falsey } from './utils';
import findLastIndex from '../src/findLastIndex';
import lastIndexOf from '../src/lastIndexOf';

const methods = {
    findLastIndex,
    lastIndexOf,
};

describe('findLastIndex and lastIndexOf', () => {
    lodashStable.each(['findLastIndex', 'lastIndexOf'], (methodName) => {
        const array = [1, 2, 3, 1, 2, 3];
        const func = methods[methodName];
        const resolve =
            methodName === 'findLastIndex' ? lodashStable.curry(lodashStable.eq) : identity;

        it(`\`_.${methodName}\` should return the index of the last matched value`, () => {
            expect(func(array, resolve(3))).toBe(5);
        });

        it(`\`_.${methodName}\` should work with a positive \`fromIndex\``, () => {
            expect(func(array, resolve(1), 2)).toBe(0);
        });

        it(`\`_.${methodName}\` should work with a \`fromIndex\` >= \`length\``, () => {
            const values = [6, 8, 2 ** 32, Infinity];
            const expected = lodashStable.map(values, lodashStable.constant([-1, 3, -1]));

            const actual = lodashStable.map(values, (fromIndex) => [
                func(array, resolve(undefined), fromIndex),
                func(array, resolve(1), fromIndex),
                func(array, resolve(''), fromIndex),
            ]);

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should work with a negative \`fromIndex\``, () => {
            expect(func(array, resolve(2), -3)).toBe(1);
        });

        it(`\`_.${methodName}\` should work with a negative \`fromIndex\` <= \`-length\``, () => {
            const values = [-6, -8, -Infinity];
            const expected = lodashStable.map(values, stubZero);

            const actual = lodashStable.map(values, (fromIndex) =>
                func(array, resolve(1), fromIndex),
            );

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should treat falsey \`fromIndex\` values correctly`, () => {
            const expected = lodashStable.map(falsey, (value) => (value === undefined ? 5 : -1));

            const actual = lodashStable.map(falsey, (fromIndex) =>
                func(array, resolve(3), fromIndex),
            );

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should coerce \`fromIndex\` to an integer`, () => {
            expect(func(array, resolve(2), 4.2)).toBe(4);
        });
    });
});
