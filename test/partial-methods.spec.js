import lodashStable from 'lodash';
import { _, identity, slice } from './utils';
import placeholder from '../src/placeholder';
import curry from '../src/curry';

describe('partial methods', () => {
    lodashStable.each(['partial', 'partialRight'], (methodName) => {
        const func = _[methodName],
            isPartial = methodName === 'partial',
            ph = func.placeholder;

        it(`\`_.${methodName}\` partially applies arguments`, () => {
            const par = func(identity, 'a');
            expect(par()).toBe('a');
        });

        it(`\`_.${methodName}\` creates a function that can be invoked with additional arguments`, () => {
            const fn = function (a, b) {
                    return [a, b];
                },
                par = func(fn, 'a'),
                expected = isPartial ? ['a', 'b'] : ['b', 'a'];

            expect(par('b')).toEqual(expected);
        });

        it(`\`_.${methodName}\` works when there are no partially applied arguments and the created function is invoked without additional arguments`, () => {
            const fn = function () {
                    return arguments.length;
                },
                par = func(fn);

            expect(par()).toBe(0);
        });

        it(`\`_.${methodName}\` works when there are no partially applied arguments and the created function is invoked with additional arguments`, () => {
            const par = func(identity);
            expect(par('a')).toBe('a');
        });

        it(`\`_.${methodName}\` should support placeholders`, () => {
            let fn = function () {
                    return slice.call(arguments);
                },
                par = func(fn, ph, 'b', ph);

            expect(par('a', 'c')).toEqual(['a', 'b', 'c']);
            expect(par('a')).toEqual(['a', 'b', undefined]);
            expect(par()).toEqual([undefined, 'b', undefined]);

            if (isPartial) {
                expect(par('a', 'c', 'd')).toEqual(['a', 'b', 'c', 'd']);
            } else {
                par = func(fn, ph, 'c', ph);
                expect(par('a', 'b', 'd')).toEqual(['a', 'b', 'c', 'd']);
            }
        });

        it(`\`_.${methodName}\` should use \`_.placeholder\` when set`, () => {
            const _ph = (placeholder = {}),
                fn = function () {
                    return slice.call(arguments);
                },
                par = func(fn, _ph, 'b', ph),
                expected = isPartial ? ['a', 'b', ph, 'c'] : ['a', 'c', 'b', ph];

            expect(par('a', 'c')).toEqual(expected);
            delete placeholder;
        });

        it(`\`_.${methodName}\` creates a function with a \`length\` of \`0\``, () => {
            const fn = function (a, b, c) {},
                par = func(fn, 'a');

            expect(par.length).toBe(0);
        });

        it(`\`_.${methodName}\` should ensure \`new par\` is an instance of \`func\``, () => {
            function Foo(value) {
                return value && object;
            }

            var object = {},
                par = func(Foo);

            expect(new par() instanceof Foo)
            expect(new par(true)).toBe(object);
        });

        it(`\`_.${methodName}\` should clone metadata for created functions`, () => {
            function greet(greeting, name) {
                return `${greeting} ${name}`;
            }

            const par1 = func(greet, 'hi'),
                par2 = func(par1, 'barney'),
                par3 = func(par1, 'pebbles');

            expect(par1('fred')).toBe(isPartial ? 'hi fred' : 'fred hi');
            expect(par2()).toBe(isPartial ? 'hi barney' : 'barney hi');
            expect(par3()).toBe(isPartial ? 'hi pebbles' : 'pebbles hi');
        });

        it(`\`_.${methodName}\` should work with curried functions`, () => {
            const fn = function (a, b, c) {
                    return a + b + c;
                },
                curried = curry(func(fn, 1), 2);

            expect(curried(2, 3)).toBe(6);
            expect(curried(2)(3)).toBe(6);
        });

        it('should work with placeholders and curried functions', () => {
            const fn = function () {
                    return slice.call(arguments);
                },
                curried = curry(fn),
                par = func(curried, ph, 'b', ph, 'd');

            expect(par('a', 'c')).toEqual(['a', 'b', 'c', 'd']);
        });
    });
});
