import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, identity, slice } from './utils';
import placeholder from '../src/placeholder';
import curry from '../src/curry';

describe('partial methods', () => {
    lodashStable.each(['partial', 'partialRight'], (methodName) => {
        const func = _[methodName],
            isPartial = methodName == 'partial',
            ph = func.placeholder;

        it(`\`_.${methodName}\` partially applies arguments`, () => {
            const par = func(identity, 'a');
            assert.strictEqual(par(), 'a');
        });

        it(`\`_.${methodName}\` creates a function that can be invoked with additional arguments`, () => {
            const fn = function (a, b) {
                    return [a, b];
                },
                par = func(fn, 'a'),
                expected = isPartial ? ['a', 'b'] : ['b', 'a'];

            assert.deepStrictEqual(par('b'), expected);
        });

        it(`\`_.${methodName}\` works when there are no partially applied arguments and the created function is invoked without additional arguments`, () => {
            const fn = function () {
                    return arguments.length;
                },
                par = func(fn);

            assert.strictEqual(par(), 0);
        });

        it(`\`_.${methodName}\` works when there are no partially applied arguments and the created function is invoked with additional arguments`, () => {
            const par = func(identity);
            assert.strictEqual(par('a'), 'a');
        });

        it(`\`_.${methodName}\` should support placeholders`, () => {
            let fn = function () {
                    return slice.call(arguments);
                },
                par = func(fn, ph, 'b', ph);

            assert.deepStrictEqual(par('a', 'c'), ['a', 'b', 'c']);
            assert.deepStrictEqual(par('a'), ['a', 'b', undefined]);
            assert.deepStrictEqual(par(), [undefined, 'b', undefined]);

            if (isPartial) {
                assert.deepStrictEqual(par('a', 'c', 'd'), ['a', 'b', 'c', 'd']);
            } else {
                par = func(fn, ph, 'c', ph);
                assert.deepStrictEqual(par('a', 'b', 'd'), ['a', 'b', 'c', 'd']);
            }
        });

        it(`\`_.${methodName}\` should use \`_.placeholder\` when set`, () => {
            const _ph = (placeholder = {}),
                fn = function () {
                    return slice.call(arguments);
                },
                par = func(fn, _ph, 'b', ph),
                expected = isPartial ? ['a', 'b', ph, 'c'] : ['a', 'c', 'b', ph];

            assert.deepEqual(par('a', 'c'), expected);
            delete placeholder;
        });

        it(`\`_.${methodName}\` creates a function with a \`length\` of \`0\``, () => {
            const fn = function (a, b, c) {},
                par = func(fn, 'a');

            assert.strictEqual(par.length, 0);
        });

        it(`\`_.${methodName}\` should ensure \`new par\` is an instance of \`func\``, () => {
            function Foo(value) {
                return value && object;
            }

            var object = {},
                par = func(Foo);

            assert.ok(new par() instanceof Foo);
            assert.strictEqual(new par(true), object);
        });

        it(`\`_.${methodName}\` should clone metadata for created functions`, () => {
            function greet(greeting, name) {
                return `${greeting} ${name}`;
            }

            const par1 = func(greet, 'hi'),
                par2 = func(par1, 'barney'),
                par3 = func(par1, 'pebbles');

            assert.strictEqual(par1('fred'), isPartial ? 'hi fred' : 'fred hi');
            assert.strictEqual(par2(), isPartial ? 'hi barney' : 'barney hi');
            assert.strictEqual(par3(), isPartial ? 'hi pebbles' : 'pebbles hi');
        });

        it(`\`_.${methodName}\` should work with curried functions`, () => {
            const fn = function (a, b, c) {
                    return a + b + c;
                },
                curried = curry(func(fn, 1), 2);

            assert.strictEqual(curried(2, 3), 6);
            assert.strictEqual(curried(2)(3), 6);
        });

        it('should work with placeholders and curried functions', () => {
            const fn = function () {
                    return slice.call(arguments);
                },
                curried = curry(fn),
                par = func(curried, ph, 'b', ph, 'd');

            assert.deepStrictEqual(par('a', 'c'), ['a', 'b', 'c', 'd']);
        });
    });
});
