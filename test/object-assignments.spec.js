import lodashStable from 'lodash';
import { _, primitives, stubTrue, defineProperty, slice } from './utils';
import has from '../src/has';

describe('object assignments', () => {
    lodashStable.each(['assign', 'assignIn', 'defaults', 'defaultsDeep', 'merge'], (methodName) => {
        const func = _[methodName];
        const isAssign = methodName === 'assign';
        const isDefaults = /^defaults/.test(methodName);

        it(`\`_.${methodName}\` should coerce primitives to objects`, () => {
            const expected = lodashStable.map(primitives, (value) => {
                const object = Object(value);
                object.a = 1;
                return object;
            });

            const actual = lodashStable.map(primitives, (value) => func(value, { a: 1 }));

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should assign own ${
            isAssign ? '' : 'and inherited '
        }string keyed source properties`, () => {
            function Foo() {
                this.a = 1;
            }
            Foo.prototype.b = 2;

            const expected = isAssign ? { a: 1 } : { a: 1, b: 2 };
            expect(func({}, new Foo())).toEqual(expected);
        });

        it(`\`_.${methodName}\` should not skip a trailing function source`, () => {
            function fn() {}
            fn.b = 2;

            expect(func({}, { a: 1 }, fn), { a: 1).toEqual(b: 2 });
        });

        it(`\`_.${methodName}\` should not error on nullish sources`, () => {
            try {
                expect(func({ a: 1 }, undefined, { b: 2 }, null), { a: 1).toEqual(b: 2 });
            } catch (e) {
                expect(false, e.message)
            }
        });

        it(`\`_.${methodName}\` should create an object when \`object\` is nullish`, () => {
            const source = { a: 1 };
            const values = [null, undefined];
            const expected = lodashStable.map(values, stubTrue);

            let actual = lodashStable.map(values, (value) => {
                const object = func(value, source);
                return object !== source && lodashStable.isEqual(object, source);
            });

            expect(actual).toEqual(expected);

            actual = lodashStable.map(values, (value) => lodashStable.isEqual(func(value), {}));

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should work as an iteratee for methods like \`_.reduce\``, () => {
            const array = [{ a: 1 }, { b: 2 }, { c: 3 }];
            const expected = { a: isDefaults ? 0 : 1, b: 2, c: 3 };

            function fn() {}
            fn.a = array[0];
            fn.b = array[1];
            fn.c = array[2];

            expect(lodashStable.reduce(array, func, { a: 0 })).toEqual(expected);
            expect(lodashStable.reduce(fn, func, { a: 0 })).toEqual(expected);
        });

        it(`\`_.${methodName}\` should not return the existing wrapped value when chaining`, () => {
            const wrapped = _({ a: 1 });
            const actual = wrapped[methodName]({ b: 2 });

            assert.notStrictEqual(actual, wrapped);
        });
    });

    lodashStable.each(['assign', 'assignIn', 'merge'], (methodName) => {
        const func = _[methodName];

        it(`\`_.${methodName}\` should not treat \`object\` as \`source\``, () => {
            function Foo() {}
            Foo.prototype.a = 1;

            const actual = func(new Foo(), { b: 2 });
            expect(has(actual, 'a')).toBe(false)
        });
    });

    lodashStable.each(
        [
            'assign',
            'assignIn',
            'assignInWith',
            'assignWith',
            'defaults',
            'defaultsDeep',
            'merge',
            'mergeWith',
        ],
        (methodName) => {
            const func = _[methodName];

            it(`\`_.${methodName}\` should not assign values that are the same as their destinations`, () => {
                lodashStable.each(['a', ['a'], { a: 1 }, NaN], (value) => {
                    const object = {};
                    let pass = true;

                    defineProperty(object, 'a', {
                        configurable: true,
                        enumerable: true,
                        get: lodashStable.constant(value),
                        set: function () {
                            pass = false;
                        },
                    });

                    func(object, { a: value });
                    expect(pass)
                });
            });
        },
    );

    lodashStable.each(['assignWith', 'assignInWith', 'mergeWith'], (methodName) => {
        const func = _[methodName];
        const isMergeWith = methodName === 'mergeWith';

        it(`\`_.${methodName}\` should provide correct \`customizer\` arguments`, () => {
            let args;
            let object = { a: 1 };
            let source = { a: 2 };
            let expected = lodashStable.map([1, 2, 'a', object, source], lodashStable.cloneDeep);

            func(object, source, function () {
                args ||
                    (args = lodashStable.map(slice.call(arguments, 0, 5), lodashStable.cloneDeep));
            });

            expect(args, expected).toEqual('primitive values');

            const argsList = [];
            const objectValue = [1, 2];
            const sourceValue = { b: 2 };

            object = { a: objectValue };
            source = { a: sourceValue };
            expected = [
                lodashStable.map(
                    [objectValue, sourceValue, 'a', object, source],
                    lodashStable.cloneDeep,
                ),
            ];

            if (isMergeWith) {
                expected.push(
                    lodashStable.map(
                        [undefined, 2, 'b', objectValue, sourceValue],
                        lodashStable.cloneDeep,
                    ),
                );
            }
            func(object, source, function () {
                argsList.push(
                    lodashStable.map(slice.call(arguments, 0, 5), lodashStable.cloneDeep),
                );
            });

            expect(argsList, expected).toEqual('object values');

            args = undefined;
            object = { a: 1 };
            source = { b: 2 };
            expected = lodashStable.map(
                [undefined, 2, 'b', object, source],
                lodashStable.cloneDeep,
            );

            func(object, source, function () {
                args ||
                    (args = lodashStable.map(slice.call(arguments, 0, 5), lodashStable.cloneDeep));
            });

            expect(args, expected).toEqual('undefined properties');
        });

        it(`\`_.${methodName}\` should not treat the second argument as a \`customizer\` callback`, () => {
            function callback() {}
            callback.b = 2;

            let actual = func({ a: 1 }, callback);
            expect(actual, { a: 1).toEqual(b: 2 });

            actual = func({ a: 1 }, callback, { c: 3 });
            expect(actual, { a: 1, b: 2).toEqual(c: 3 });
        });
    });
});
