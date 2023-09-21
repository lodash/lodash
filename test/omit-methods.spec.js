import lodashStable from 'lodash';
import { _, symbol, defineProperty } from './utils';

describe('omit methods', () => {
    lodashStable.each(['omit', 'omitBy'], (methodName) => {
        const expected = { b: 2, d: 4 };
        const func = _[methodName];
        const object = { a: 1, b: 2, c: 3, d: 4 };
        let resolve = lodashStable.nthArg(1);

        if (methodName === 'omitBy') {
            resolve = function (object, props) {
                props = lodashStable.castArray(props);
                return function (value) {
                    return lodashStable.some(props, (key) => {
                        key = lodashStable.isSymbol(key) ? key : lodashStable.toString(key);
                        return object[key] === value;
                    });
                };
            };
        }
        it(`\`_.${methodName}\` should create an object with omitted string keyed properties`, () => {
            expect(func(object, resolve(object, 'a'))).toEqual({ b: 2, c: 3, d: 4 });
            expect(func(object, resolve(object, ['a', 'c']))).toEqual(expected);
        });

        it(`\`_.${methodName}\` should include inherited string keyed properties`, () => {
            function Foo() {}
            Foo.prototype = object;

            expect(func(new Foo(), resolve(object, ['a', 'c']))).toEqual(expected);
        });

        it(`\`_.${methodName}\` should preserve the sign of \`0\``, () => {
            const object = { '-0': 'a', 0: 'b' };
            const props = [-0, Object(-0), 0, Object(0)];
            const expected = [{ 0: 'b' }, { 0: 'b' }, { '-0': 'a' }, { '-0': 'a' }];

            const actual = lodashStable.map(props, (key) => func(object, resolve(object, key)));

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should include symbols`, () => {
            function Foo() {
                this.a = 0;
                this[symbol] = 1;
            }

            if (Symbol) {
                const symbol2 = Symbol('b');
                Foo.prototype[symbol2] = 2;

                const symbol3 = Symbol('c');
                defineProperty(Foo.prototype, symbol3, {
                    configurable: true,
                    enumerable: false,
                    writable: true,
                    value: 3,
                });

                const foo = new Foo();
                const actual = func(foo, resolve(foo, 'a'));

                expect(actual[symbol]).toBe(1);
                expect(actual[symbol2]).toBe(2);
                expect(symbol3 in actual).toBeFalsy();
            }
        });

        it(`\`_.${methodName}\` should create an object with omitted symbols`, () => {
            function Foo() {
                this.a = 0;
                this[symbol] = 1;
            }

            if (Symbol) {
                const symbol2 = Symbol('b');
                Foo.prototype[symbol2] = 2;

                const symbol3 = Symbol('c');
                defineProperty(Foo.prototype, symbol3, {
                    configurable: true,
                    enumerable: false,
                    writable: true,
                    value: 3,
                });

                const foo = new Foo();
                let actual = func(foo, resolve(foo, symbol));

                expect(actual.a).toBe(0);
                expect(symbol in actual).toBeFalsy();
                expect(actual[symbol2]).toBe(2);
                expect(symbol3 in actual).toBeFalsy();

                actual = func(foo, resolve(foo, symbol2));

                expect(actual.a).toBe(0);
                expect(actual[symbol]).toBe(1);
                expect(symbol2 in actual).toBeFalsy();
                expect(symbol3 in actual).toBeFalsy();
            }
        });

        it(`\`_.${methodName}\` should work with an array \`object\``, () => {
            const array = [1, 2, 3];
            expect(func(array, resolve(array, ['0', '2']))).toEqual({ 1: 2 });
        });
    });
});
