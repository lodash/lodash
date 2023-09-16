import assert from 'node:assert';
import lodashStable from 'lodash';

import {
    _,
    arrayProto,
    args,
    strictArgs,
    objectProto,
    stringProto,
    primitives,
    numberProto,
    stubArray,
} from './utils';

describe('keys methods', () => {
    lodashStable.each(['keys', 'keysIn'], (methodName) => {
        const func = _[methodName],
            isKeys = methodName === 'keys';

        it(`\`_.${methodName}\` should return the string keyed property names of \`object\``, () => {
            const actual = func({ a: 1, b: 1 }).sort();

            assert.deepStrictEqual(actual, ['a', 'b']);
        });

        it(`\`_.${methodName}\` should ${
            isKeys ? 'not ' : ''
        }include inherited string keyed properties`, () => {
            function Foo() {
                this.a = 1;
            }
            Foo.prototype.b = 2;

            const expected = isKeys ? ['a'] : ['a', 'b'],
                actual = func(new Foo()).sort();

            assert.deepStrictEqual(actual, expected);
        });

        it(`\`_.${methodName}\` should treat sparse arrays as dense`, () => {
            const array = [1];
            array[2] = 3;

            const actual = func(array).sort();

            assert.deepStrictEqual(actual, ['0', '1', '2']);
        });

        it(`\`_.${methodName}\` should return keys for custom properties on arrays`, () => {
            const array = [1];
            array.a = 1;

            const actual = func(array).sort();

            assert.deepStrictEqual(actual, ['0', 'a']);
        });

        it(`\`_.${methodName}\` should ${
            isKeys ? 'not ' : ''
        }include inherited string keyed properties of arrays`, () => {
            arrayProto.a = 1;

            const expected = isKeys ? ['0'] : ['0', 'a'],
                actual = func([1]).sort();

            assert.deepStrictEqual(actual, expected);

            delete arrayProto.a;
        });

        it(`\`_.${methodName}\` should work with \`arguments\` objects`, () => {
            const values = [args, strictArgs],
                expected = lodashStable.map(values, lodashStable.constant(['0', '1', '2']));

            const actual = lodashStable.map(values, (value) => func(value).sort());

            assert.deepStrictEqual(actual, expected);
        });

        it(`\`_.${methodName}\` should return keys for custom properties on \`arguments\` objects`, () => {
            const values = [args, strictArgs],
                expected = lodashStable.map(values, lodashStable.constant(['0', '1', '2', 'a']));

            const actual = lodashStable.map(values, (value) => {
                value.a = 1;
                const result = func(value).sort();
                delete value.a;
                return result;
            });

            assert.deepStrictEqual(actual, expected);
        });

        it(`\`_.${methodName}\` should ${
            isKeys ? 'not ' : ''
        }include inherited string keyed properties of \`arguments\` objects`, () => {
            const values = [args, strictArgs],
                expected = lodashStable.map(
                    values,
                    lodashStable.constant(isKeys ? ['0', '1', '2'] : ['0', '1', '2', 'a']),
                );

            const actual = lodashStable.map(values, (value) => {
                objectProto.a = 1;
                const result = func(value).sort();
                delete objectProto.a;
                return result;
            });

            assert.deepStrictEqual(actual, expected);
        });

        it(`\`_.${methodName}\` should work with string objects`, () => {
            const actual = func(Object('abc')).sort();

            assert.deepStrictEqual(actual, ['0', '1', '2']);
        });

        it(`\`_.${methodName}\` should return keys for custom properties on string objects`, () => {
            const object = Object('a');
            object.a = 1;

            const actual = func(object).sort();

            assert.deepStrictEqual(actual, ['0', 'a']);
        });

        it(`\`_.${methodName}\` should ${
            isKeys ? 'not ' : ''
        }include inherited string keyed properties of string objects`, () => {
            stringProto.a = 1;

            const expected = isKeys ? ['0'] : ['0', 'a'],
                actual = func(Object('a')).sort();

            assert.deepStrictEqual(actual, expected);

            delete stringProto.a;
        });

        it(`\`_.${methodName}\` should work with array-like objects`, () => {
            const object = { '0': 'a', length: 1 },
                actual = func(object).sort();

            assert.deepStrictEqual(actual, ['0', 'length']);
        });

        it(`\`_.${methodName}\` should coerce primitives to objects (test in IE 9)`, () => {
            const expected = lodashStable.map(primitives, (value) =>
                typeof value === 'string' ? ['0'] : [],
            );

            const actual = lodashStable.map(primitives, func);
            assert.deepStrictEqual(actual, expected);

            // IE 9 doesn't box numbers in for-in loops.
            numberProto.a = 1;
            assert.deepStrictEqual(func(0), isKeys ? [] : ['a']);
            delete numberProto.a;
        });

        it(`\`_.${methodName}\` skips the \`constructor\` property on prototype objects`, () => {
            function Foo() {}
            Foo.prototype.a = 1;

            const expected = ['a'];
            assert.deepStrictEqual(func(Foo.prototype), expected);

            Foo.prototype = { constructor: Foo, a: 1 };
            assert.deepStrictEqual(func(Foo.prototype), expected);

            const Fake = { prototype: {} };
            Fake.prototype.constructor = Fake;
            assert.deepStrictEqual(func(Fake.prototype), ['constructor']);
        });

        it(`\`_.${methodName}\` should return an empty array when \`object\` is nullish`, () => {
            const values = [, null, undefined],
                expected = lodashStable.map(values, stubArray);

            const actual = lodashStable.map(values, (value, index) => {
                objectProto.a = 1;
                const result = index ? func(value) : func();
                delete objectProto.a;
                return result;
            });

            assert.deepStrictEqual(actual, expected);
        });
    });
});
