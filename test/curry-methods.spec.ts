import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, slice } from './utils';
import curry from '../src/curry';

describe('curry methods', () => {
    lodashStable.each(['curry', 'curryRight'], (methodName) => {
        const func = _[methodName],
            fn = function (a, b) {
                return slice.call(arguments);
            },
            isCurry = methodName == 'curry';

        it(`\`_.${methodName}\` should not error on functions with the same name as lodash methods`, () => {
            function run(a, b) {
                return a + b;
            }

            const curried = func(run);

            try {
                var actual = curried(1)(2);
            } catch (e) {}

            assert.strictEqual(actual, 3);
        });

        it(`\`_.${methodName}\` should work for function names that shadow those on \`Object.prototype\``, () => {
            const curried = curry((a, b, c) => [a, b, c]);

            const expected = [1, 2, 3];

            assert.deepStrictEqual(curried(1)(2)(3), expected);
        });

        it(`\`_.${methodName}\` should work as an iteratee for methods like \`_.map\``, () => {
            const array = [fn, fn, fn],
                object = { a: fn, b: fn, c: fn };

            lodashStable.each([array, object], (collection) => {
                const curries = lodashStable.map(collection, func),
                    expected = lodashStable.map(
                        collection,
                        lodashStable.constant(isCurry ? ['a', 'b'] : ['b', 'a']),
                    );

                const actual = lodashStable.map(curries, (curried) => curried('a')('b'));

                assert.deepStrictEqual(actual, expected);
            });
        });
    });
});
