import lodashStable from 'lodash';
import { _, symbol, defineProperty } from './utils';

describe('pick methods', () => {
    lodashStable.each(['pick', 'pickBy'], (methodName) => {
        const expected = { a: 1, c: 3 };
        const func = _[methodName];
        const isPick = methodName === 'pick';
        const object = { a: 1, b: 2, c: 3, d: 4 };
        let resolve = lodashStable.nthArg(1);

        if (methodName === 'pickBy') {
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
        it(`\`_.${methodName}\` should create an object of picked string keyed properties`, () => {
            expect(func(object, resolve(object, 'a'))).toEqual({ a: 1 });
            expect(func(object, resolve(object, ['a', 'c']))).toEqual(expected);
        });

        it(`\`_.${methodName}\` should pick inherited string keyed properties`, () => {
            function Foo() {}
            Foo.prototype = object;

            const foo = new Foo();
            expect(func(foo, resolve(foo, ['a', 'c']))).toEqual(expected);
        });

        it(`\`_.${methodName}\` should preserve the sign of \`0\``, () => {
            const object = { '-0': 'a', 0: 'b' };
            const props = [-0, Object(-0), 0, Object(0)];
            const expected = [{ '-0': 'a' }, { '-0': 'a' }, { 0: 'b' }, { 0: 'b' }];

            const actual = lodashStable.map(props, (key) => func(object, resolve(object, key)));

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should pick symbols`, () => {
            function Foo() {
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
                const actual = func(foo, resolve(foo, [symbol, symbol2, symbol3]));

                expect(actual[symbol]).toBe(1);
                expect(actual[symbol2]).toBe(2);

                if (isPick) {
                    expect(actual[symbol3]).toBe(3);
                } else {
                    expect(symbol3 in actual).toBe(false);
                }
            }
        });

        it(`\`_.${methodName}\` should work with an array \`object\``, () => {
            const array = [1, 2, 3];
            expect(func(array, resolve(array, '1'))).toEqual({ 1: 2 });
        });
    });
});
