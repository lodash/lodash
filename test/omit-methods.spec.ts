import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, symbol, defineProperty } from './utils';

describe('omit methods', () => {
    lodashStable.each(['omit', 'omitBy'], (methodName) => {
        let expected = { b: 2, d: 4 },
            func = _[methodName],
            object = { a: 1, b: 2, c: 3, d: 4 },
            resolve = lodashStable.nthArg(1);

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
            assert.deepStrictEqual(func(object, resolve(object, 'a')), { b: 2, c: 3, d: 4 });
            assert.deepStrictEqual(func(object, resolve(object, ['a', 'c'])), expected);
        });

        it(`\`_.${methodName}\` should include inherited string keyed properties`, () => {
            function Foo() {}
            Foo.prototype = object;

            assert.deepStrictEqual(func(new Foo(), resolve(object, ['a', 'c'])), expected);
        });

        it(`\`_.${methodName}\` should preserve the sign of \`0\``, () => {
            const object = { '-0': 'a', '0': 'b' },
                props = [-0, Object(-0), 0, Object(0)],
                expected = [{ '0': 'b' }, { '0': 'b' }, { '-0': 'a' }, { '-0': 'a' }];

            const actual = lodashStable.map(props, (key) => func(object, resolve(object, key)));

            assert.deepStrictEqual(actual, expected);
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

                const foo = new Foo(),
                    actual = func(foo, resolve(foo, 'a'));

                assert.strictEqual(actual[symbol], 1);
                assert.strictEqual(actual[symbol2], 2);
                assert.ok(!(symbol3 in actual));
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

                let foo = new Foo(),
                    actual = func(foo, resolve(foo, symbol));

                assert.strictEqual(actual.a, 0);
                assert.ok(!(symbol in actual));
                assert.strictEqual(actual[symbol2], 2);
                assert.ok(!(symbol3 in actual));

                actual = func(foo, resolve(foo, symbol2));

                assert.strictEqual(actual.a, 0);
                assert.strictEqual(actual[symbol], 1);
                assert.ok(!(symbol2 in actual));
                assert.ok(!(symbol3 in actual));
            }
        });

        it(`\`_.${methodName}\` should work with an array \`object\``, () => {
            const array = [1, 2, 3];
            assert.deepStrictEqual(func(array, resolve(array, ['0', '2'])), { '1': 2 });
        });
    });
});
