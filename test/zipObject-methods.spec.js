import lodashStable from 'lodash';
import { _, LARGE_ARRAY_SIZE, square, isEven } from './utils';

describe('zipObject methods', () => {
    lodashStable.each(['zipObject', 'zipObjectDeep'], (methodName) => {
        const func = _[methodName];
        const object = { barney: 36, fred: 40 };
        const isDeep = methodName === 'zipObjectDeep';

        it(`\`_.${methodName}\` should zip together key/value arrays into an object`, () => {
            const actual = func(['barney', 'fred'], [36, 40]);
            expect(actual).toEqual(object);
        });

        it(`\`_.${methodName}\` should ignore extra \`values\``, () => {
            expect(func(['a'], [1, 2])).toEqual({ a: 1 });
        });

        it(`\`_.${methodName}\` should assign \`undefined\` values for extra \`keys\``, () => {
            expect(func(['a', 'b'], [1])).toEqual({ a: 1, b: undefined });
        });

        it(`\`_.${methodName}\` should ${isDeep ? '' : 'not '}support deep paths`, () => {
            lodashStable.each(['a.b.c', ['a', 'b', 'c']], (path, index) => {
                const expected = isDeep
                    ? { a: { b: { c: 1 } } }
                    : index
                    ? { 'a,b,c': 1 }
                    : { 'a.b.c': 1 };
                expect(func([path], [1])).toEqual(expected);
            });
        });
    });
});
