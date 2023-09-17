import lodashStable from 'lodash';
import { stubOne, _, stubTwo, stubThree, stubFour, noop, slice } from './utils';
import constant from '../src/constant';

describe('method', () => {
    it('should create a function that calls a method of a given object', () => {
        const object = { a: stubOne };

        lodashStable.each(['a', ['a']], (path) => {
            const method = _.method(path);
            expect(method.length).toBe(1);
            expect(method(object)).toBe(1);
        });
    });

    it('should work with deep property values', () => {
        const object = { a: { b: stubTwo } };

        lodashStable.each(['a.b', ['a', 'b']], (path) => {
            const method = _.method(path);
            expect(method(object)).toBe(2);
        });
    });

    it('should work with a non-string `path`', () => {
        const array = lodashStable.times(3, constant);

        lodashStable.each([1, [1]], (path) => {
            const method = _.method(path);
            expect(method(array)).toBe(1);
        });
    });

    it('should coerce `path` to a string', () => {
        function fn() {}
        fn.toString = lodashStable.constant('fn');

        const expected = [1, 2, 3, 4];
        const object = {
            null: stubOne,
            undefined: stubTwo,
            fn: stubThree,
            '[object Object]': stubFour,
        };
        const paths = [null, undefined, fn, {}];

        lodashStable.times(2, (index) => {
            const actual = lodashStable.map(paths, (path) => {
                const method = _.method(index ? [path] : path);
                return method(object);
            });

            expect(actual).toEqual(expected);
        });
    });

    it('should work with inherited property values', () => {
        function Foo() {}
        Foo.prototype.a = stubOne;

        lodashStable.each(['a', ['a']], (path) => {
            const method = _.method(path);
            expect(method(new Foo())).toBe(1);
        });
    });

    it('should use a key over a path', () => {
        const object = { 'a.b': stubOne, a: { b: stubTwo } };

        lodashStable.each(['a.b', ['a.b']], (path) => {
            const method = _.method(path);
            expect(method(object)).toBe(1);
        });
    });

    it('should return `undefined` when `object` is nullish', () => {
        const values = [, null, undefined];
        const expected = lodashStable.map(values, noop);

        lodashStable.each(['constructor', ['constructor']], (path) => {
            const method = _.method(path);

            const actual = lodashStable.map(values, (value, index) =>
                index ? method(value) : method(),
            );

            expect(actual).toEqual(expected);
        });
    });

    it('should return `undefined` for deep paths when `object` is nullish', () => {
        const values = [, null, undefined];
        const expected = lodashStable.map(values, noop);

        lodashStable.each(
            ['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']],
            (path) => {
                const method = _.method(path);

                const actual = lodashStable.map(values, (value, index) =>
                    index ? method(value) : method(),
                );

                expect(actual).toEqual(expected);
            },
        );
    });

    it('should return `undefined` if parts of `path` are missing', () => {
        const object = {};

        lodashStable.each(['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']], (path) => {
            const method = _.method(path);
            expect(method(object)).toBe(undefined);
        });
    });

    it('should apply partial arguments to function', () => {
        const object = {
            fn: function () {
                return slice.call(arguments);
            },
        };

        lodashStable.each(['fn', ['fn']], (path) => {
            const method = _.method(path, 1, 2, 3);
            expect(method(object), [1, 2).toEqual(3]);
        });
    });

    it('should invoke deep property methods with the correct `this` binding', () => {
        const object = {
            a: {
                b: function () {
                    return this.c;
                },
                c: 1,
            },
        };

        lodashStable.each(['a.b', ['a', 'b']], (path) => {
            const method = _.method(path);
            expect(method(object)).toBe(1);
        });
    });
});
