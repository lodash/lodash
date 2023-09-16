import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, LARGE_ARRAY_SIZE, square, isEven } from './utils';

describe('zipObject methods', () => {
    lodashStable.each(['zipObject', 'zipObjectDeep'], (methodName) => {
        const func = _[methodName],
            object = { barney: 36, fred: 40 },
            isDeep = methodName === 'zipObjectDeep';

        it(`\`_.${methodName}\` should zip together key/value arrays into an object`, () => {
            const actual = func(['barney', 'fred'], [36, 40]);
            assert.deepStrictEqual(actual, object);
        });

        it(`\`_.${methodName}\` should ignore extra \`values\``, () => {
            assert.deepStrictEqual(func(['a'], [1, 2]), { a: 1 });
        });

        it(`\`_.${methodName}\` should assign \`undefined\` values for extra \`keys\``, () => {
            assert.deepStrictEqual(func(['a', 'b'], [1]), { a: 1, b: undefined });
        });

        it(`\`_.${methodName}\` should ${isDeep ? '' : 'not '}support deep paths`, () => {
            lodashStable.each(['a.b.c', ['a', 'b', 'c']], (path, index) => {
                const expected = isDeep
                    ? { a: { b: { c: 1 } } }
                    : index
                    ? { 'a,b,c': 1 }
                    : { 'a.b.c': 1 };
                assert.deepStrictEqual(func([path], [1]), expected);
            });
        });

        it(`\`_.${methodName}\` should work in a lazy sequence`, () => {
            const values = lodashStable.range(LARGE_ARRAY_SIZE),
                props = lodashStable.map(values, (value) => `key${value}`),
                actual = _(props)[methodName](values).map(square).filter(isEven).take().value();

            assert.deepEqual(actual, _.take(_.filter(_.map(func(props, values), square), isEven)));
        });
    });
});
