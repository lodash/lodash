import lodashStable from 'lodash';
import { push, falsey, stubTrue } from './utils';
import bind from '../src/bind';
import placeholder from '../src/placeholder';

describe('bind', () => {
    function fn() {
        const result = [this];
        push.apply(result, arguments);
        return result;
    }

    it('should bind a function to an object', () => {
        const object = {},
            bound = bind(fn, object);

        expect(bound('a')).toEqual([object, 'a']);
    });

    it('should accept a falsey `thisArg`', () => {
        const values = lodashStable.reject(falsey.slice(1), (value) => value == null),
            expected = lodashStable.map(values, (value) => [value]);

        const actual = lodashStable.map(values, (value) => {
            try {
                const bound = bind(fn, value);
                return bound();
            } catch (e) {}
        });

        assert.ok(
            lodashStable.every(actual, (value, index) =>
                lodashStable.isEqual(value, expected[index]),
            ),
        );
    });

    it('should bind a function to nullish values', () => {
        let bound = bind(fn, null),
            actual = bound('a');

        expect(actual[0] === null || (actual[0] && actual[0].Array))
        expect(actual[1]).toBe('a');

        lodashStable.times(2, (index) => {
            bound = index ? bind(fn, undefined) : bind(fn);
            actual = bound('b');

            expect(actual[0] === undefined || (actual[0] && actual[0].Array))
            expect(actual[1]).toBe('b');
        });
    });

    it('should partially apply arguments ', () => {
        let object = {},
            bound = bind(fn, object, 'a');

        expect(bound()).toEqual([object, 'a']);

        bound = bind(fn, object, 'a');
        expect(bound('b')).toEqual([object, 'a', 'b']);

        bound = bind(fn, object, 'a', 'b');
        expect(bound()).toEqual([object, 'a', 'b']);
        expect(bound('c', 'd')).toEqual([object, 'a', 'b', 'c', 'd']);
    });

    it('should support placeholders', () => {
        const object = {},
            ph = bind.placeholder,
            bound = bind(fn, object, ph, 'b', ph);

        expect(bound('a', 'c')).toEqual([object, 'a', 'b', 'c']);
        expect(bound('a')).toEqual([object, 'a', 'b', undefined]);
        expect(bound('a', 'c', 'd')).toEqual([object, 'a', 'b', 'c', 'd']);
        expect(bound()).toEqual([object, undefined, 'b', undefined]);
    });

    it('should use `_.placeholder` when set', () => {
        const _ph = (placeholder = {}),
            ph = bind.placeholder,
            object = {},
            bound = bind(fn, object, _ph, 'b', ph);

        expect(bound('a', 'c')).toEqual([object, 'a', 'b', ph, 'c']);
        delete placeholder;
    });

    it('should create a function with a `length` of `0`', () => {
        let fn = function (a, b, c) {},
            bound = bind(fn, {});

        expect(bound.length).toBe(0);

        bound = bind(fn, {}, 1);
        expect(bound.length).toBe(0);
    });

    it('should ignore binding when called with the `new` operator', () => {
        function Foo() {
            return this;
        }

        const bound = bind(Foo, { a: 1 }),
            newBound = new bound();

        expect(bound().a).toBe(1);
        expect(newBound.a).toBe(undefined);
        expect(newBound instanceof Foo)
    });

    it('should handle a number of arguments when called with the `new` operator', () => {
        function Foo() {
            return this;
        }

        function Bar() {}

        const thisArg = { a: 1 },
            boundFoo = bind(Foo, thisArg),
            boundBar = bind(Bar, thisArg),
            count = 9,
            expected = lodashStable.times(count, lodashStable.constant([undefined, undefined]));

        const actual = lodashStable.times(count, (index) => {
            try {
                switch (index) {
                    case 0:
                        return [new boundFoo().a, new boundBar().a];
                    case 1:
                        return [new boundFoo(1).a, new boundBar(1).a];
                    case 2:
                        return [new boundFoo(1, 2).a, new boundBar(1, 2).a];
                    case 3:
                        return [new boundFoo(1, 2, 3).a, new boundBar(1, 2, 3).a];
                    case 4:
                        return [new boundFoo(1, 2, 3, 4).a, new boundBar(1, 2, 3, 4).a];
                    case 5:
                        return [new boundFoo(1, 2, 3, 4, 5).a, new boundBar(1, 2, 3, 4, 5).a];
                    case 6:
                        return [new boundFoo(1, 2, 3, 4, 5, 6).a, new boundBar(1, 2, 3, 4, 5, 6).a];
                    case 7:
                        return [
                            new boundFoo(1, 2, 3, 4, 5, 6, 7).a,
                            new boundBar(1, 2, 3, 4, 5, 6, 7).a,
                        ];
                    case 8:
                        return [
                            new boundFoo(1, 2, 3, 4, 5, 6, 7, 8).a,
                            new boundBar(1, 2, 3, 4, 5, 6, 7, 8).a,
                        ];
                }
            } catch (e) {}
        });

        expect(actual).toEqual(expected);
    });

    it('should ensure `new bound` is an instance of `func`', () => {
        function Foo(value) {
            return value && object;
        }

        var bound = bind(Foo),
            object = {};

        expect(new bound() instanceof Foo)
        expect(new bound(true)).toBe(object);
    });

    it('should append array arguments to partially applied arguments', () => {
        const object = {},
            bound = bind(fn, object, 'a');

        expect(bound(['b'], 'c')).toEqual([object, 'a', ['b'], 'c']);
    });

    it('should not rebind functions', () => {
        const object1 = {},
            object2 = {},
            object3 = {};

        const bound1 = bind(fn, object1),
            bound2 = bind(bound1, object2, 'a'),
            bound3 = bind(bound1, object3, 'b');

        expect(bound1()).toEqual([object1]);
        expect(bound2()).toEqual([object1, 'a']);
        expect(bound3()).toEqual([object1, 'b']);
    });

    it('should not error when instantiating bound built-ins', () => {
        let Ctor = bind(Date, null),
            expected = new Date(2012, 4, 23, 0, 0, 0, 0);

        try {
            var actual = new Ctor(2012, 4, 23, 0, 0, 0, 0);
        } catch (e) {}

        expect(actual).toEqual(expected);

        Ctor = bind(Date, null, 2012, 4, 23);

        try {
            actual = new Ctor(0, 0, 0, 0);
        } catch (e) {}

        expect(actual).toEqual(expected);
    });

    it('should not error when calling bound class constructors with the `new` operator', () => {
        const createCtor = lodashStable.attempt(Function, '"use strict";return class A{}');

        if (typeof createCtor === 'function') {
            const bound = bind(createCtor()),
                count = 8,
                expected = lodashStable.times(count, stubTrue);

            const actual = lodashStable.times(count, (index) => {
                try {
                    switch (index) {
                        case 0:
                            return !!new bound();
                        case 1:
                            return !!new bound(1);
                        case 2:
                            return !!new bound(1, 2);
                        case 3:
                            return !!new bound(1, 2, 3);
                        case 4:
                            return !!new bound(1, 2, 3, 4);
                        case 5:
                            return !!new bound(1, 2, 3, 4, 5);
                        case 6:
                            return !!new bound(1, 2, 3, 4, 5, 6);
                        case 7:
                            return !!new bound(1, 2, 3, 4, 5, 6, 7);
                    }
                } catch (e) {}
            });

            expect(actual).toEqual(expected);
        }
    });

    it('should return a wrapped value when chaining', () => {
        const object = {},
            bound = _(fn).bind({}, 'a', 'b');

        expect(bound instanceof _).toBeTruthy()

        const actual = bound.value()('c');
        expect(actual).toEqual([object, 'a', 'b', 'c']);
    });
});
