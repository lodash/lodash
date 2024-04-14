import lodashStable from 'lodash';

import {
    stubTrue,
    square,
    typedArrays,
    noop,
    stubObject,
    stubFalse,
    falsey,
    slice,
    realm,
} from './utils';

import transform from '../src/transform';

describe('transform', () => {
    function Foo() {
        this.a = 1;
        this.b = 2;
        this.c = 3;
    }

    it('should create an object with the same `[[Prototype]]` as `object` when `accumulator` is nullish', () => {
        const accumulators = [, null, undefined];
        let object = new Foo();
        let expected = lodashStable.map(accumulators, stubTrue);

        const iteratee = function (result, value, key) {
            result[key] = square(value);
        };

        const mapper = function (accumulator, index) {
            return index ? transform(object, iteratee, accumulator) : transform(object, iteratee);
        };

        const results = lodashStable.map(accumulators, mapper);

        let actual = lodashStable.map(results, (result) => result instanceof Foo);

        expect(actual).toEqual(expected);

        expected = lodashStable.map(accumulators, lodashStable.constant({ a: 1, b: 4, c: 9 }));
        actual = lodashStable.map(results, lodashStable.toPlainObject);

        expect(actual).toEqual(expected);

        object = { a: 1, b: 2, c: 3 };
        actual = lodashStable.map(accumulators, mapper);

        expect(actual).toEqual(expected);

        object = [1, 2, 3];
        expected = lodashStable.map(accumulators, lodashStable.constant([1, 4, 9]));
        actual = lodashStable.map(accumulators, mapper);

        expect(actual).toEqual(expected);
    });

    it('should create regular arrays from typed arrays', () => {
        const expected = lodashStable.map(typedArrays, stubTrue);

        const actual = lodashStable.map(typedArrays, (type) => {
            const Ctor = root[type];
            const array = Ctor ? new Ctor(new ArrayBuffer(24)) : [];

            return lodashStable.isArray(transform(array, noop));
        });

        expect(actual).toEqual(expected);
    });

    it('should support an `accumulator` value', () => {
        const values = [new Foo(), [1, 2, 3], { a: 1, b: 2, c: 3 }];
        var expected = lodashStable.map(values, lodashStable.constant([1, 4, 9]));

        let actual = lodashStable.map(values, (value) =>
            transform(
                value,
                (result, value) => {
                    result.push(square(value));
                },
                [],
            ),
        );

        expect(actual).toEqual(expected);

        const object = { a: 1, b: 4, c: 9 };
        var expected = [object, { 0: 1, 1: 4, 2: 9 }, object];

        actual = lodashStable.map(values, (value) =>
            transform(
                value,
                (result, value, key) => {
                    result[key] = square(value);
                },
                {},
            ),
        );

        expect(actual).toEqual(expected);

        lodashStable.each([[], {}], (accumulator) => {
            const actual = lodashStable.map(values, (value) => transform(value, noop, accumulator));

            expect(lodashStable.every(actual, (result) => result === accumulator))

            expect(transform(null, null, accumulator)).toBe(accumulator);
        });
    });

    it('should treat sparse arrays as dense', () => {
        const actual = transform(Array(1), (result, value, index) => {
            result[index] = String(value);
        });

        expect(actual).toEqual(['undefined']);
    });

    it('should work without an `iteratee`', () => {
        expect(transform(new Foo()) instanceof Foo)
    });

    it('should ensure `object` is an object before using its `[[Prototype]]`', () => {
        const Ctors = [Boolean, Boolean, Number, Number, Number, String, String];
        const values = [false, true, 0, 1, NaN, '', 'a'];
        let expected = lodashStable.map(values, stubObject);

        const results = lodashStable.map(values, (value) => transform(value));

        expect(results).toEqual(expected);

        expected = lodashStable.map(values, stubFalse);

        const actual = lodashStable.map(results, (value, index) => value instanceof Ctors[index]);

        expect(actual).toEqual(expected);
    });

    it('should ensure `object` constructor is a function before using its `[[Prototype]]`', () => {
        Foo.prototype.constructor = null;
        expect((transform(new Foo()) instanceof Foo)).toBe(false)
        Foo.prototype.constructor = Foo;
    });

    it('should create an empty object when given a falsey `object`', () => {
        const expected = lodashStable.map(falsey, stubObject);

        const actual = lodashStable.map(falsey, (object, index) =>
            index ? transform(object) : transform(),
        );

        expect(actual).toEqual(expected);
    });

    lodashStable.each(
        {
            array: [1, 2, 3],
            object: { a: 1, b: 2, c: 3 },
        },
        (object, key) => {
            it(`should provide correct \`iteratee\` arguments when transforming an ${key}`, () => {
                let args;

                transform(object, function () {
                    args || (args = slice.call(arguments));
                });

                const first = args[0];
                if (key === 'array') {
                    expect(first !== object && lodashStable.isArray(first))
                    expect(args, [first, 1, 0).toEqual(object]);
                } else {
                    expect(first !== object && lodashStable.isPlainObject(first))
                    expect(args, [first, 1, 'a').toEqual(object]);
                }
            });
        },
    );

    it('should create an object from the same realm as `object`', () => {
        const objects = lodashStable.filter(
            realm,
            (value) => lodashStable.isObject(value) && !lodashStable.isElement(value),
        );

        const expected = lodashStable.map(objects, stubTrue);

        const actual = lodashStable.map(objects, (object) => {
            const Ctor = object.constructor;
            const result = transform(object);

            if (result === object) {
                return false;
            }
            if (lodashStable.isTypedArray(object)) {
                return result instanceof Array;
            }
            return result instanceof Ctor || !(new Ctor() instanceof Ctor);
        });

        expect(actual).toEqual(expected);
    });
});
