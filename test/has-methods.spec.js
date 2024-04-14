import lodashStable from 'lodash';
import { _, toArgs, stubTrue, args, symbol, defineProperty, stubFalse } from './utils';

describe('has methods', () => {
    lodashStable.each(['has', 'hasIn'], (methodName) => {
        const func = _[methodName];
        const isHas = methodName === 'has';
        const sparseArgs = toArgs([1]);
        const sparseArray = Array(1);
        const sparseString = Object('a');

        delete sparseArgs[0];
        delete sparseString[0];

        it(`\`_.${methodName}\` should check for own properties`, () => {
            const object = { a: 1 };

            lodashStable.each(['a', ['a']], (path) => {
                expect(func(object, path)).toBe(true);
            });
        });

        it(`\`_.${methodName}\` should not use the \`hasOwnProperty\` method of \`object\``, () => {
            const object = { hasOwnProperty: null, a: 1 };
            expect(func(object, 'a')).toBe(true);
        });

        it(`\`_.${methodName}\` should support deep paths`, () => {
            const object = { a: { b: 2 } };

            lodashStable.each(['a.b', ['a', 'b']], (path) => {
                expect(func(object, path)).toBe(true);
            });

            lodashStable.each(['a.a', ['a', 'a']], (path) => {
                expect(func(object, path)).toBe(false);
            });
        });

        it(`\`_.${methodName}\` should coerce \`path\` to a string`, () => {
            function fn() {}
            fn.toString = lodashStable.constant('fn');

            const object = { null: 1, undefined: 2, fn: 3, '[object Object]': 4 };
            const paths = [null, undefined, fn, {}];
            const expected = lodashStable.map(paths, stubTrue);

            lodashStable.times(2, (index) => {
                const actual = lodashStable.map(paths, (path) =>
                    func(object, index ? [path] : path),
                );

                expect(actual).toEqual(expected);
            });
        });

        it(`\`_.${methodName}\` should work with \`arguments\` objects`, () => {
            expect(func(args, 1)).toBe(true);
        });

        it(`\`_.${methodName}\` should work with a non-string \`path\``, () => {
            const array = [1, 2, 3];

            lodashStable.each([1, [1]], (path) => {
                expect(func(array, path)).toBe(true);
            });
        });

        it(`\`_.${methodName}\` should preserve the sign of \`0\``, () => {
            const object = { '-0': 'a', 0: 'b' };
            const props = [-0, Object(-0), 0, Object(0)];
            const expected = lodashStable.map(props, stubTrue);

            const actual = lodashStable.map(props, (key) => func(object, key));

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should work with a symbol \`path\``, () => {
            function Foo() {}

            if (Symbol) {
                Foo.prototype[symbol] = 1;

                const symbol2 = Symbol('b');
                defineProperty(Foo.prototype, symbol2, {
                    configurable: true,
                    enumerable: false,
                    writable: true,
                    value: 2,
                });

                const object = isHas ? Foo.prototype : new Foo();
                expect(func(object, symbol)).toBe(true);
                expect(func(object, symbol2)).toBe(true);
            }
        });

        it(`\`_.${methodName}\` should check for a key over a path`, () => {
            const object = { 'a.b': 1 };

            lodashStable.each(['a.b', ['a.b']], (path) => {
                expect(func(object, path)).toBe(true);
            });
        });

        it(`\`_.${methodName}\` should return \`true\` for indexes of sparse values`, () => {
            const values = [sparseArgs, sparseArray, sparseString];
            const expected = lodashStable.map(values, stubTrue);

            const actual = lodashStable.map(values, (value) => func(value, 0));

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should return \`true\` for indexes of sparse values with deep paths`, () => {
            const values = [sparseArgs, sparseArray, sparseString];
            const expected = lodashStable.map(values, lodashStable.constant([true, true]));

            const actual = lodashStable.map(values, (value) =>
                lodashStable.map(['a[0]', ['a', '0']], (path) => func({ a: value }, path)),
            );

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should return \`${
            isHas ? 'false' : 'true'
        }\` for inherited properties`, () => {
            function Foo() {}
            Foo.prototype.a = 1;

            lodashStable.each(['a', ['a']], (path) => {
                expect(func(new Foo(), path)).toBe(!isHas);
            });
        });

        it(`\`_.${methodName}\` should return \`${
            isHas ? 'false' : 'true'
        }\` for nested inherited properties`, () => {
            function Foo() {}
            Foo.prototype.a = { b: 1 };

            lodashStable.each(['a.b', ['a', 'b']], (path) => {
                expect(func(new Foo(), path)).toBe(!isHas);
            });
        });

        it(`\`_.${methodName}\` should return \`false\` when \`object\` is nullish`, () => {
            const values = [null, undefined];
            const expected = lodashStable.map(values, stubFalse);

            lodashStable.each(['constructor', ['constructor']], (path) => {
                const actual = lodashStable.map(values, (value) => func(value, path));

                expect(actual).toEqual(expected);
            });
        });

        it(`\`_.${methodName}\` should return \`false\` for deep paths when \`object\` is nullish`, () => {
            const values = [null, undefined];
            const expected = lodashStable.map(values, stubFalse);

            lodashStable.each(
                ['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']],
                (path) => {
                    const actual = lodashStable.map(values, (value) => func(value, path));

                    expect(actual).toEqual(expected);
                },
            );
        });

        it(`\`_.${methodName}\` should return \`false\` for nullish values of nested objects`, () => {
            const values = [, null, undefined];
            const expected = lodashStable.map(values, stubFalse);

            lodashStable.each(['a.b', ['a', 'b']], (path) => {
                const actual = lodashStable.map(values, (value, index) => {
                    const object = index ? { a: value } : {};
                    return func(object, path);
                });

                expect(actual).toEqual(expected);
            });
        });

        it(`\`_.${methodName}\` should return \`false\` over sparse values of deep paths`, () => {
            const values = [sparseArgs, sparseArray, sparseString];
            const expected = lodashStable.map(values, lodashStable.constant([false, false]));

            const actual = lodashStable.map(values, (value) =>
                lodashStable.map(['a[0].b', ['a', '0', 'b']], (path) => func({ a: value }, path)),
            );

            expect(actual).toEqual(expected);
        });
    });
});
