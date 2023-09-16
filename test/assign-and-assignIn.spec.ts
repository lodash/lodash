import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, defineProperty, stubOne, noop, stubNaN } from './utils';

describe('assign and assignIn', () => {
    lodashStable.each(['assign', 'assignIn'], (methodName) => {
        const func = _[methodName];

        it(`\`_.${methodName}\` should assign source properties to \`object\``, () => {
            assert.deepStrictEqual(func({ a: 1 }, { b: 2 }), { a: 1, b: 2 });
        });

        it(`\`_.${methodName}\` should accept multiple sources`, () => {
            const expected = { a: 1, b: 2, c: 3 };
            assert.deepStrictEqual(func({ a: 1 }, { b: 2 }, { c: 3 }), expected);
            assert.deepStrictEqual(func({ a: 1 }, { b: 2, c: 2 }, { c: 3 }), expected);
        });

        it(`\`_.${methodName}\` should overwrite destination properties`, () => {
            const expected = { a: 3, b: 2, c: 1 };
            assert.deepStrictEqual(func({ a: 1, b: 2 }, expected), expected);
        });

        it(`\`_.${methodName}\` should assign source properties with nullish values`, () => {
            const expected = { a: null, b: undefined, c: null };
            assert.deepStrictEqual(func({ a: 1, b: 2 }, expected), expected);
        });

        it(`\`_.${methodName}\` should skip assignments if values are the same`, () => {
            const object = {};

            const descriptor = {
                configurable: true,
                enumerable: true,
                set: function () {
                    throw new Error();
                },
            };

            const source = {
                a: 1,
                b: undefined,
                c: NaN,
                d: undefined,
                constructor: Object,
                toString: lodashStable.constant('source'),
            };

            defineProperty(
                object,
                'a',
                lodashStable.assign({}, descriptor, {
                    get: stubOne,
                }),
            );

            defineProperty(
                object,
                'b',
                lodashStable.assign({}, descriptor, {
                    get: noop,
                }),
            );

            defineProperty(
                object,
                'c',
                lodashStable.assign({}, descriptor, {
                    get: stubNaN,
                }),
            );

            defineProperty(
                object,
                'constructor',
                lodashStable.assign({}, descriptor, {
                    get: lodashStable.constant(Object),
                }),
            );

            try {
                var actual = func(object, source);
            } catch (e) {}

            assert.deepStrictEqual(actual, source);
        });

        it(`\`_.${methodName}\` should treat sparse array sources as dense`, () => {
            const array = [1];
            array[2] = 3;

            assert.deepStrictEqual(func({}, array), { '0': 1, '1': undefined, '2': 3 });
        });

        it(`\`_.${methodName}\` should assign values of prototype objects`, () => {
            function Foo() {}
            Foo.prototype.a = 1;

            assert.deepStrictEqual(func({}, Foo.prototype), { a: 1 });
        });

        it(`\`_.${methodName}\` should coerce string sources to objects`, () => {
            assert.deepStrictEqual(func({}, 'a'), { '0': 'a' });
        });
    });
});
