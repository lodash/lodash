import assert from 'node:assert';
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
        const array = [1, 2, 3],
            func = _[methodName],
            isBy = /(^partition|By)$/.test(methodName),
            isFind = /^find/.test(methodName),
            isOmitPick = /^(?:omit|pick)By$/.test(methodName),
            isSome = methodName == 'some';

        it(`\`_.${methodName}\` should provide correct iteratee arguments`, () => {
            if (func) {
                let args,
                    expected = [1, 0, array];

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
                assert.deepStrictEqual(args, expected);
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

                assert.deepStrictEqual(argsList, expected);
            }
        });
    });

    lodashStable.each(lodashStable.difference(methods, objectMethods), (methodName) => {
        const array = [1, 2, 3],
            func = _[methodName],
            isEvery = methodName == 'every';

        array.a = 1;

        it(`\`_.${methodName}\` should not iterate custom properties on arrays`, () => {
            if (func) {
                const keys = [];
                func(array, (value, key) => {
                    keys.push(key);
                    return isEvery;
                });

                assert.ok(!lodashStable.includes(keys, 'a'));
            }
        });
    });

    lodashStable.each(lodashStable.difference(methods, unwrappedMethods), (methodName) => {
        const array = [1, 2, 3],
            isBaseEach = methodName == '_baseEach';

        it(`\`_.${methodName}\` should return a wrapped value when implicitly chaining`, () => {
            if (!(isBaseEach || isNpm)) {
                const wrapped = _(array)[methodName](noop);
                assert.ok(wrapped instanceof _);
            }
        });
    });

    lodashStable.each(unwrappedMethods, (methodName) => {
        const array = [1, 2, 3];

        it(`\`_.${methodName}\` should return an unwrapped value when implicitly chaining`, () => {
            const actual = _(array)[methodName](noop);
            assert.notOk(actual instanceof _);
        });

        it(`\`_.${methodName}\` should return a wrapped value when explicitly chaining`, () => {
            const wrapped = _(array).chain(),
                actual = wrapped[methodName](noop);

            assert.ok(actual instanceof _);
            assert.notStrictEqual(actual, wrapped);
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
                    assert.deepStrictEqual(values, [1]);
                }
            });
        },
    );

    lodashStable.each(iterationMethods, (methodName) => {
        const array = [1, 2, 3],
            func = _[methodName];

        it(`\`_.${methodName}\` should return the collection`, () => {
            if (func) {
                assert.strictEqual(func(array, Boolean), array);
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

                const values = [-1, '1', 1.1, Object(1), MAX_SAFE_INTEGER + 1],
                    expected = lodashStable.map(values, stubTrue);

                const actual = lodashStable.map(values, (length) =>
                    isIteratedAsObject({ length: length }),
                );

                const Foo = function (a) {};
                Foo.a = 1;

                assert.deepStrictEqual(actual, expected);
                assert.ok(isIteratedAsObject(Foo));
                assert.ok(!isIteratedAsObject({ length: 0 }));
            }
        });
    });

    lodashStable.each(methods, (methodName) => {
        const func = _[methodName],
            isFind = /^find/.test(methodName),
            isSome = methodName == 'some',
            isReduce = /^reduce/.test(methodName);

        it(`\`_.${methodName}\` should ignore changes to \`length\``, () => {
            if (func) {
                let count = 0,
                    array = [1];

                func(
                    array,
                    () => {
                        if (++count == 1) {
                            array.push(2);
                        }
                        return !(isFind || isSome);
                    },
                    isReduce ? array : null,
                );

                assert.strictEqual(count, 1);
            }
        });
    });

    lodashStable.each(
        lodashStable.difference(lodashStable.union(methods, collectionMethods), arrayMethods),
        (methodName) => {
            const func = _[methodName],
                isFind = /^find/.test(methodName),
                isSome = methodName == 'some',
                isReduce = /^reduce/.test(methodName);

            it(`\`_.${methodName}\` should ignore added \`object\` properties`, () => {
                if (func) {
                    let count = 0,
                        object = { a: 1 };

                    func(
                        object,
                        () => {
                            if (++count == 1) {
                                object.b = 2;
                            }
                            return !(isFind || isSome);
                        },
                        isReduce ? object : null,
                    );

                    assert.strictEqual(count, 1);
                }
            });
        },
    );
});
