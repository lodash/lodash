import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, symbol, defineProperty } from './utils';

describe('pick methods', () => {
    lodashStable.each(['pick', 'pickBy'], (methodName) => {
        let expected = { a: 1, c: 3 },
            func = _[methodName],
            isPick = methodName === 'pick',
            object = { a: 1, b: 2, c: 3, d: 4 },
            resolve = lodashStable.nthArg(1);

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
            assert.deepStrictEqual(func(object, resolve(object, 'a')), { a: 1 });
            assert.deepStrictEqual(func(object, resolve(object, ['a', 'c'])), expected);
        });

        it(`\`_.${methodName}\` should pick inherited string keyed properties`, () => {
            function Foo() {}
            Foo.prototype = object;

            const foo = new Foo();
            assert.deepStrictEqual(func(foo, resolve(foo, ['a', 'c'])), expected);
        });

        it(`\`_.${methodName}\` should preserve the sign of \`0\``, () => {
            const object = { '-0': 'a', '0': 'b' },
                props = [-0, Object(-0), 0, Object(0)],
                expected = [{ '-0': 'a' }, { '-0': 'a' }, { '0': 'b' }, { '0': 'b' }];

            const actual = lodashStable.map(props, (key) => func(object, resolve(object, key)));

            assert.deepStrictEqual(actual, expected);
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

                const foo = new Foo(),
                    actual = func(foo, resolve(foo, [symbol, symbol2, symbol3]));

                assert.strictEqual(actual[symbol], 1);
                assert.strictEqual(actual[symbol2], 2);

                if (isPick) {
                    assert.strictEqual(actual[symbol3], 3);
                } else {
                    assert.ok(!(symbol3 in actual));
                }
            }
        });

        it(`\`_.${methodName}\` should work with an array \`object\``, () => {
            const array = [1, 2, 3];
            assert.deepStrictEqual(func(array, resolve(array, '1')), { '1': 2 });
        });
    });
});
