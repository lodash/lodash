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
        const func = _[methodName];
        const isKeys = methodName === 'keys';

        it(`\`_.${methodName}\` should return the string keyed property names of \`object\``, () => {
            const actual = func({ a: 1, b: 1 }).sort();

            expect(actual).toEqual(['a', 'b']);
        });

        it(`\`_.${methodName}\` should ${
            isKeys ? 'not ' : ''
        }include inherited string keyed properties`, () => {
            function Foo() {
                this.a = 1;
            }
            Foo.prototype.b = 2;

            const expected = isKeys ? ['a'] : ['a', 'b'];
            const actual = func(new Foo()).sort();

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should treat sparse arrays as dense`, () => {
            const array = [1];
            array[2] = 3;

            const actual = func(array).sort();

            expect(actual).toEqual(['0', '1', '2']);
        });

        it(`\`_.${methodName}\` should return keys for custom properties on arrays`, () => {
            const array = [1];
            array.a = 1;

            const actual = func(array).sort();

            expect(actual).toEqual(['0', 'a']);
        });

        it(`\`_.${methodName}\` should ${
            isKeys ? 'not ' : ''
        }include inherited string keyed properties of arrays`, () => {
            arrayProto.a = 1;

            const expected = isKeys ? ['0'] : ['0', 'a'];
            const actual = func([1]).sort();

            expect(actual).toEqual(expected);

            delete arrayProto.a;
        });

        it(`\`_.${methodName}\` should work with \`arguments\` objects`, () => {
            const values = [args, strictArgs];
            const expected = lodashStable.map(values, lodashStable.constant(['0', '1', '2']));

            const actual = lodashStable.map(values, (value) => func(value).sort());

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should return keys for custom properties on \`arguments\` objects`, () => {
            const values = [args, strictArgs];
            const expected = lodashStable.map(values, lodashStable.constant(['0', '1', '2', 'a']));

            const actual = lodashStable.map(values, (value) => {
                value.a = 1;
                const result = func(value).sort();
                delete value.a;
                return result;
            });

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should ${
            isKeys ? 'not ' : ''
        }include inherited string keyed properties of \`arguments\` objects`, () => {
            const values = [args, strictArgs];
            const expected = lodashStable.map(
                values,
                lodashStable.constant(isKeys ? ['0', '1', '2'] : ['0', '1', '2', 'a']),
            );

            const actual = lodashStable.map(values, (value) => {
                objectProto.a = 1;
                const result = func(value).sort();
                delete objectProto.a;
                return result;
            });

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should work with string objects`, () => {
            const actual = func(Object('abc')).sort();

            expect(actual).toEqual(['0', '1', '2']);
        });

        it(`\`_.${methodName}\` should return keys for custom properties on string objects`, () => {
            const object = Object('a');
            object.a = 1;

            const actual = func(object).sort();

            expect(actual).toEqual(['0', 'a']);
        });

        it(`\`_.${methodName}\` should ${
            isKeys ? 'not ' : ''
        }include inherited string keyed properties of string objects`, () => {
            stringProto.a = 1;

            const expected = isKeys ? ['0'] : ['0', 'a'];
            const actual = func(Object('a')).sort();

            expect(actual).toEqual(expected);

            delete stringProto.a;
        });

        it(`\`_.${methodName}\` should work with array-like objects`, () => {
            const object = { 0: 'a', length: 1 };
            const actual = func(object).sort();

            expect(actual).toEqual(['0', 'length']);
        });

        it(`\`_.${methodName}\` should coerce primitives to objects (test in IE 9)`, () => {
            const expected = lodashStable.map(primitives, (value) =>
                typeof value === 'string' ? ['0'] : [],
            );

            const actual = lodashStable.map(primitives, func);
            expect(actual).toEqual(expected);

            // IE 9 doesn't box numbers in for-in loops.
            numberProto.a = 1;
            expect(func(0)).toEqual(isKeys ? [] : ['a']);
            delete numberProto.a;
        });

        it(`\`_.${methodName}\` skips the \`constructor\` property on prototype objects`, () => {
            function Foo() {}
            Foo.prototype.a = 1;

            const expected = ['a'];
            expect(func(Foo.prototype)).toEqual(expected);

            Foo.prototype = { constructor: Foo, a: 1 };
            expect(func(Foo.prototype)).toEqual(expected);

            const Fake = { prototype: {} };
            Fake.prototype.constructor = Fake;
            expect(func(Fake.prototype)).toEqual(['constructor']);
        });

        it(`\`_.${methodName}\` should return an empty array when \`object\` is nullish`, () => {
            const values = [, null, undefined];
            const expected = lodashStable.map(values, stubArray);

            const actual = lodashStable.map(values, (value, index) => {
                objectProto.a = 1;
                const result = index ? func(value) : func();
                delete objectProto.a;
                return result;
            });

            expect(actual).toEqual(expected);
        });
    });
});
