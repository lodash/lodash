import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, empties, noop, add } from './utils';

describe('reduce methods', () => {
    lodashStable.each(['reduce', 'reduceRight'], (methodName) => {
        const func = _[methodName],
            array = [1, 2, 3],
            isReduce = methodName == 'reduce';

        it(`\`_.${methodName}\` should reduce a collection to a single value`, () => {
            const actual = func(['a', 'b', 'c'], (accumulator, value) => accumulator + value, '');

            assert.strictEqual(actual, isReduce ? 'abc' : 'cba');
        });

        it(`\`_.${methodName}\` should support empty collections without an initial \`accumulator\` value`, () => {
            const actual = [],
                expected = lodashStable.map(empties, noop);

            lodashStable.each(empties, (value) => {
                try {
                    actual.push(func(value, noop));
                } catch (e) {}
            });

            assert.deepStrictEqual(actual, expected);
        });

        it(`\`_.${methodName}\` should support empty collections with an initial \`accumulator\` value`, () => {
            const expected = lodashStable.map(empties, lodashStable.constant('x'));

            const actual = lodashStable.map(empties, (value) => {
                try {
                    return func(value, noop, 'x');
                } catch (e) {}
            });

            assert.deepStrictEqual(actual, expected);
        });

        it(`\`_.${methodName}\` should handle an initial \`accumulator\` value of \`undefined\``, () => {
            const actual = func([], noop, undefined);
            assert.strictEqual(actual, undefined);
        });

        it(`\`_.${methodName}\` should return \`undefined\` for empty collections when no \`accumulator\` is given (test in IE > 9 and modern browsers)`, () => {
            const array = [],
                object = { '0': 1, length: 0 };

            if ('__proto__' in array) {
                array.__proto__ = object;
                assert.strictEqual(func(array, noop), undefined);
            }
            assert.strictEqual(func(object, noop), undefined);
        });

        it(`\`_.${methodName}\` should return an unwrapped value when implicitly chaining`, () => {
            assert.strictEqual(_(array)[methodName](add), 6);
        });

        it(`\`_.${methodName}\` should return a wrapped value when explicitly chaining`, () => {
            assert.ok(_(array).chain()[methodName](add) instanceof _);
        });
    });
});
