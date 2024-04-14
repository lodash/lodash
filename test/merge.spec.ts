import lodashStable from 'lodash';
import { args, typedArrays, stubTrue, defineProperty, document, root } from './utils';
import merge from '../src/merge';
import isArguments from '../src/isArguments';

describe('merge', () => {
    it('should merge `source` into `object`', () => {
        const names = {
            characters: [{ name: 'barney' }, { name: 'fred' }],
        };

        const ages = {
            characters: [{ age: 36 }, { age: 40 }],
        };

        const heights = {
            characters: [{ height: '5\'4"' }, { height: '5\'5"' }],
        };

        const expected = {
            characters: [
                { name: 'barney', age: 36, height: '5\'4"' },
                { name: 'fred', age: 40, height: '5\'5"' },
            ],
        };

        expect(merge(names, ages, heights)).toEqual(expected);
    });

    it('should merge sources containing circular references', () => {
        const object = {
            foo: { a: 1 },
            bar: { a: 2 },
        };

        const source = {
            foo: { b: { c: { d: {} } } },
            bar: {},
        };

        source.foo.b.c.d = source;
        source.bar.b = source.foo.b;

        const actual = merge(object, source);

        assert.notStrictEqual(actual.bar.b, actual.foo.b);
        expect(actual.foo.b.c.d).toBe(actual.foo.b.c.d.foo.b.c.d);
    });

    it('should work with four arguments', () => {
        const expected = { a: 4 },
            actual = merge({ a: 1 }, { a: 2 }, { a: 3 }, expected);

        expect(actual).toEqual(expected);
    });

    it('should merge onto function `object` values', () => {
        function Foo() {}

        const source = { a: 1 },
            actual = merge(Foo, source);

        expect(actual).toBe(Foo);
        expect(Foo.a).toBe(1);
    });

    it('should merge first source object properties to function', () => {
        const fn = function () {},
            object = { prop: {} },
            actual = merge({ prop: fn }, object);

        expect(actual).toEqual(object);
    });

    it('should merge first and second source object properties to function', () => {
        const fn = function () {},
            object = { prop: {} },
            actual = merge({ prop: fn }, { prop: fn }, object);

        expect(actual).toEqual(object);
    });

    it('should not merge onto function values of sources', () => {
        let source1 = { a: function () {} },
            source2 = { a: { b: 2 } },
            expected = { a: { b: 2 } },
            actual = merge({}, source1, source2);

        expect(actual).toEqual(expected);
        expect(('b' in source1.a)).toBe(false)

        actual = merge(source1, source2);
        expect(actual).toEqual(expected);
    });

    it('should merge onto non-plain `object` values', () => {
        function Foo() {}

        const object = new Foo(),
            actual = merge(object, { a: 1 });

        expect(actual).toBe(object);
        expect(object.a).toBe(1);
    });

    // TODO: revisit.
    it.skip('should treat sparse array sources as dense', () => {
        const array = [1];
        array[2] = 3;

        const actual = merge([], array),
            expected = array.slice();

        expected[1] = undefined;

        expect('1' in actual)
        expect(actual).toEqual(expected);
    });

    it('should merge `arguments` objects', () => {
        let object1 = { value: args },
            object2 = { value: { '3': 4 } },
            expected = { '0': 1, '1': 2, '2': 3, '3': 4 },
            actual = merge(object1, object2);

        expect(('3' in args)).toBe(false)
        expect(isArguments(actual.value)).toBe(false)
        expect(actual.value).toEqual(expected);
        object1.value = args;

        actual = merge(object2, object1);
        expect(isArguments(actual.value)).toBe(false)
        expect(actual.value).toEqual(expected);

        expected = { '0': 1, '1': 2, '2': 3 };

        actual = merge({}, object1);
        expect(isArguments(actual.value)).toBe(false)
        expect(actual.value).toEqual(expected);
    });

    it('should merge typed arrays', () => {
        const array1 = [0],
            array2 = [0, 0],
            array3 = [0, 0, 0, 0],
            array4 = [0, 0, 0, 0, 0, 0, 0, 0];

        const arrays = [array2, array1, array4, array3, array2, array4, array4, array3, array2],
            buffer = ArrayBuffer && new ArrayBuffer(8);

        let expected = lodashStable.map(typedArrays, (type, index) => {
            const array = arrays[index].slice();
            array[0] = 1;
            return root[type] ? { value: array } : false;
        });

        let actual = lodashStable.map(typedArrays, (type) => {
            const Ctor = root[type];
            return Ctor ? merge({ value: new Ctor(buffer) }, { value: [1] }) : false;
        });

        expect(lodashStable.isArray(actual))
        expect(actual).toEqual(expected);

        expected = lodashStable.map(typedArrays, (type, index) => {
            const array = arrays[index].slice();
            array.push(1);
            return root[type] ? { value: array } : false;
        });

        actual = lodashStable.map(typedArrays, (type, index) => {
            const Ctor = root[type],
                array = lodashStable.range(arrays[index].length);

            array.push(1);
            return Ctor ? merge({ value: array }, { value: new Ctor(buffer) }) : false;
        });

        expect(lodashStable.isArray(actual))
        expect(actual).toEqual(expected);
    });

    it('should assign `null` values', () => {
        const actual = merge({ a: 1 }, { a: null });
        expect(actual.a).toBe(null);
    });

    it('should assign non array/buffer/typed-array/plain-object source values directly', () => {
        function Foo() {}

        const values = [
                new Foo(),
                new Boolean(),
                new Date(),
                Foo,
                new Number(),
                new String(),
                new RegExp(),
            ],
            expected = lodashStable.map(values, stubTrue);

        const actual = lodashStable.map(values, (value) => {
            const object = merge({}, { a: value, b: { c: value } });
            return object.a === value && object.b.c === value;
        });

        expect(actual).toEqual(expected);
    });

    it('should clone buffer source values', () => {
        if (Buffer) {
            const buffer = Buffer.alloc([1]),
                actual = merge({}, { value: buffer }).value;

            expect(lodashStable.isBuffer(actual))
            expect(actual[0]).toBe(buffer[0]);
            assert.notStrictEqual(actual, buffer);
        }
    });

    it('should deep clone array/typed-array/plain-object source values', () => {
        const typedArray = Uint8Array ? new Uint8Array([1]) : { buffer: [1] };

        const props = ['0', 'buffer', 'a'],
            values = [[{ a: 1 }], typedArray, { a: [1] }],
            expected = lodashStable.map(values, stubTrue);

        const actual = lodashStable.map(values, (value, index) => {
            const key = props[index],
                object = merge({}, { value: value }),
                subValue = value[key],
                newValue = object.value,
                newSubValue = newValue[key];

            return (
                newValue !== value &&
                newSubValue !== subValue &&
                lodashStable.isEqual(newValue, value)
            );
        });

        expect(actual).toEqual(expected);
    });

    it('should not augment source objects', () => {
        var source1 = { a: [{ a: 1 }] },
            source2 = { a: [{ b: 2 }] },
            actual = merge({}, source1, source2);

        expect(source1.a).toEqual([{ a: 1 }]);
        expect(source2.a).toEqual([{ b: 2 }]);
        expect(actual.a).toEqual([{ a: 1, b: 2 }]);

        var source1 = { a: [[1, 2, 3]] },
            source2 = { a: [[3, 4]] },
            actual = merge({}, source1, source2);

        expect(source1.a).toEqual([[1, 2, 3]]);
        expect(source2.a).toEqual([[3, 4]]);
        expect(actual.a).toEqual([[3, 4, 3]]);
    });

    it('should merge plain objects onto non-plain objects', () => {
        function Foo(object) {
            lodashStable.assign(this, object);
        }

        let object = { a: 1 },
            actual = merge(new Foo(), object);

        expect(actual instanceof Foo)
        expect(actual).toEqual(new Foo(object));

        actual = merge([new Foo()], [object]);
        expect(actual[0] instanceof Foo)
        expect(actual).toEqual([new Foo(object)]);
    });

    it('should not overwrite existing values with `undefined` values of object sources', () => {
        const actual = merge({ a: 1 }, { a: undefined, b: undefined });
        expect(actual).toEqual({ a: 1, b: undefined });
    });

    it('should not overwrite existing values with `undefined` values of array sources', () => {
        let array = [1];
        array[2] = 3;

        let actual = merge([4, 5, 6], array),
            expected = [1, 5, 3];

        expect(actual).toEqual(expected);

        array = [1, , 3];
        array[1] = undefined;

        actual = merge([4, 5, 6], array);
        expect(actual).toEqual(expected);
    });

    it('should skip merging when `object` and `source` are the same value', () => {
        let object = {},
            pass = true;

        defineProperty(object, 'a', {
            configurable: true,
            enumerable: true,
            get: function () {
                pass = false;
            },
            set: function () {
                pass = false;
            },
        });

        merge(object, object);
        expect(pass)
    });

    it('should convert values to arrays when merging arrays of `source`', () => {
        let object = { a: { '1': 'y', b: 'z', length: 2 } };
        let actual = merge(object, { a: ['x'] });

        expect(actual).toEqual({ a: ['x', 'y'] });

        actual = merge({ a: {} }, { a: [] });
        expect(actual).toEqual({ a: [] });
    });

    it('should convert strings to arrays when merging arrays of `source`', () => {
        const object = { a: 'abcde' };
        const actual = merge(object, { a: ['x', 'y', 'z'] });

        expect(actual).toEqual({ a: ['x', 'y', 'z'] });
    });

    it('should not error on DOM elements', () => {
        const object1 = { el: document && document.createElement('div') },
            object2 = { el: document && document.createElement('div') },
            pairs = [
                [{}, object1],
                [object1, object2],
            ],
            expected = lodashStable.map(pairs, stubTrue);

        const actual = lodashStable.map(pairs, (pair) => {
            try {
                return merge(pair[0], pair[1]).el === pair[1].el;
            } catch (e) {}
        });

        expect(actual).toEqual(expected);
    });
});
