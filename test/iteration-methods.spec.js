import lodashStable from 'lodash';
import { _, slice, isNpm, noop, MAX_SAFE_INTEGER, stubTrue } from './utils';

describe('iteration methods', () => {
    const methods = [
        '_baseEach',
        'countBy',
        'every',
        'filter',
        'find',
        'findIndex',
        'findKey',
        'findLast',
        'findLastIndex',
        'findLastKey',
        'forEach',
        'forEachRight',
        'forIn',
        'forInRight',
        'forOwn',
        'forOwnRight',
        'groupBy',
        'keyBy',
        'map',
        'mapKeys',
        'mapValues',
        'maxBy',
        'minBy',
        'omitBy',
        'partition',
        'pickBy',
        'reject',
        'some',
    ];

    const arrayMethods = ['findIndex', 'findLastIndex', 'maxBy', 'minBy'];

    const collectionMethods = [
        '_baseEach',
        'countBy',
        'every',
        'filter',
        'find',
        'findLast',
        'forEach',
        'forEachRight',
        'groupBy',
        'keyBy',
        'map',
        'partition',
        'reduce',
        'reduceRight',
        'reject',
        'some',
    ];

    const forInMethods = ['forIn', 'forInRight', 'omitBy', 'pickBy'];

    const iterationMethods = [
        '_baseEach',
        'forEach',
        'forEachRight',
        'forIn',
        'forInRight',
        'forOwn',
        'forOwnRight',
    ];

    const objectMethods = [
        'findKey',
        'findLastKey',
        'forIn',
        'forInRight',
        'forOwn',
        'forOwnRight',
        'mapKeys',
        'mapValues',
        'omitBy',
        'pickBy',
    ];

    const rightMethods = [
        'findLast',
        'findLastIndex',
        'findLastKey',
        'forEachRight',
        'forInRight',
        'forOwnRight',
    ];

    const unwrappedMethods = [
        'each',
        'eachRight',
        'every',
        'find',
        'findIndex',
        'findKey',
        'findLast',
        'findLastIndex',
        'findLastKey',
        'forEach',
        'forEachRight',
        'forIn',
        'forInRight',
        'forOwn',
        'forOwnRight',
        'max',
        'maxBy',
        'min',
        'minBy',
        'some',
    ];

    lodashStable.each(methods, (methodName) => {
        const array = [1, 2, 3];
        const func = _[methodName];
        const isBy = /(^partition|By)$/.test(methodName);
        const isFind = /^find/.test(methodName);
        const isOmitPick = /^(?:omit|pick)By$/.test(methodName);
        const isSome = methodName === 'some';

        it(`\`_.${methodName}\` should provide correct iteratee arguments`, () => {
            if (func) {
                let args;
                const expected = [1, 0, array];

                func(array, function () {
                    args || (args = slice.call(arguments));
                });

                if (lodashStable.includes(rightMethods, methodName)) {
                    expected[0] = 3;
                    expected[1] = 2;
                }
                if (lodashStable.includes(objectMethods, methodName)) {
                    expected[1] += '';
                }
                if (isBy) {
                    expected.length = isOmitPick ? 2 : 1;
                }
                expect(args).toEqual(expected);
            }
        });

        it(`\`_.${methodName}\` should treat sparse arrays as dense`, () => {
            if (func) {
                const array = [1];
                array[2] = 3;

                let expected = lodashStable.includes(objectMethods, methodName)
                    ? [
                          [1, '0', array],
                          [undefined, '1', array],
                          [3, '2', array],
                      ]
                    : [
                          [1, 0, array],
                          [undefined, 1, array],
                          [3, 2, array],
                      ];

                if (isBy) {
                    expected = lodashStable.map(expected, (args) =>
                        args.slice(0, isOmitPick ? 2 : 1),
                    );
                } else if (lodashStable.includes(objectMethods, methodName)) {
                    expected = lodashStable.map(expected, (args) => {
                        args[1] += '';
                        return args;
                    });
                }
                if (lodashStable.includes(rightMethods, methodName)) {
                    expected.reverse();
                }
                const argsList = [];
                func(array, function () {
                    argsList.push(slice.call(arguments));
                    return !(isFind || isSome);
                });

                expect(argsList).toEqual(expected);
            }
        });
    });

    lodashStable.each(lodashStable.difference(methods, objectMethods), (methodName) => {
        const array = [1, 2, 3];
        const func = _[methodName];
        const isEvery = methodName === 'every';

        array.a = 1;

        it(`\`_.${methodName}\` should not iterate custom properties on arrays`, () => {
            if (func) {
                const keys = [];
                func(array, (value, key) => {
                    keys.push(key);
                    return isEvery;
                });

                expect(lodashStable.includes(keys, 'a')).toBeFalsy();
            }
        });
    });

    lodashStable.each(lodashStable.difference(methods, unwrappedMethods), (methodName) => {
        const array = [1, 2, 3];
        const isBaseEach = methodName === '_baseEach';

        it(`\`_.${methodName}\` should return a wrapped value when implicitly chaining`, () => {
            if (!(isBaseEach || isNpm)) {
                const wrapped = _(array)[methodName](noop);
                expect(wrapped instanceof _).toBeTruthy();
            }
        });
    });

    lodashStable.each(unwrappedMethods, (methodName) => {
        const array = [1, 2, 3];

        it(`\`_.${methodName}\` should return an unwrapped value when implicitly chaining`, () => {
            const actual = _(array)[methodName](noop);
            expect(actual instanceof _).toBeFalsy();
        });

        it(`\`_.${methodName}\` should return a wrapped value when explicitly chaining`, () => {
            const wrapped = _(array).chain();
            const actual = wrapped[methodName](noop);

            expect(actual instanceof _).toBeTruthy();
            // FIXME: Work out a proper assertion.
            // expect(actual).toEqual(wrapped);
        });
    });

    lodashStable.each(
        lodashStable.difference(methods, arrayMethods, forInMethods),
        (methodName) => {
            const func = _[methodName];

            it(`\`_.${methodName}\` iterates over own string keyed properties of objects`, () => {
                function Foo() {
                    this.a = 1;
                }
                Foo.prototype.b = 2;

                if (func) {
                    const values = [];
                    func(new Foo(), (value) => {
                        values.push(value);
                    });
                    expect(values).toEqual([1]);
                }
            });
        },
    );

    lodashStable.each(iterationMethods, (methodName) => {
        const array = [1, 2, 3];
        const func = _[methodName];

        it(`\`_.${methodName}\` should return the collection`, () => {
            if (func) {
                expect(func(array, Boolean)).toBe(array);
            }
        });
    });

    lodashStable.each(collectionMethods, (methodName) => {
        const func = _[methodName];

        it(`\`_.${methodName}\` should use \`isArrayLike\` to determine whether a value is array-like`, () => {
            if (func) {
                const isIteratedAsObject = function (object) {
                    let result = false;
                    func(
                        object,
                        () => {
                            result = true;
                        },
                        0,
                    );
                    return result;
                };

                const values = [-1, '1', 1.1, Object(1), MAX_SAFE_INTEGER + 1];
                const expected = lodashStable.map(values, stubTrue);

                const actual = lodashStable.map(values, (length) =>
                    isIteratedAsObject({ length: length }),
                );

                const Foo = function (a) {};
                Foo.a = 1;

                expect(actual).toEqual(expected);
                expect(isIteratedAsObject(Foo)).toBeTruthy();
                expect(isIteratedAsObject({ length: 0 })).toBeFalsy();
            }
        });
    });

    lodashStable.each(methods, (methodName) => {
        const func = _[methodName];
        const isFind = /^find/.test(methodName);
        const isSome = methodName === 'some';
        const isReduce = /^reduce/.test(methodName);

        it(`\`_.${methodName}\` should ignore changes to \`length\``, () => {
            if (func) {
                let count = 0;
                const array = [1];

                func(
                    array,
                    () => {
                        if (++count === 1) {
                            array.push(2);
                        }
                        return !(isFind || isSome);
                    },
                    isReduce ? array : null,
                );

                expect(count).toBe(1);
            }
        });
    });

    lodashStable.each(
        lodashStable.difference(lodashStable.union(methods, collectionMethods), arrayMethods),
        (methodName) => {
            const func = _[methodName];
            const isFind = /^find/.test(methodName);
            const isSome = methodName === 'some';
            const isReduce = /^reduce/.test(methodName);

            it(`\`_.${methodName}\` should ignore added \`object\` properties`, () => {
                if (func) {
                    let count = 0;
                    const object = { a: 1 };

                    func(
                        object,
                        () => {
                            if (++count === 1) {
                                object.b = 2;
                            }
                            return !(isFind || isSome);
                        },
                        isReduce ? object : null,
                    );

                    expect(count).toBe(1);
                }
            });
        },
    );
});
