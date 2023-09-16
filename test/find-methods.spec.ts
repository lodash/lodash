import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, empties, LARGE_ARRAY_SIZE, slice } from './utils';
import each from '../src/each';

describe('find methods', () => {
    lodashStable.each(
        ['find', 'findIndex', 'findKey', 'findLast', 'findLastIndex', 'findLastKey'],
        (methodName) => {
            const array = [1, 2, 3, 4],
                func = _[methodName];

            const objects = [
                { a: 0, b: 0 },
                { a: 1, b: 1 },
                { a: 2, b: 2 },
            ];

            const expected = {
                find: [objects[1], undefined, objects[2]],
                findIndex: [1, -1, 2],
                findKey: ['1', undefined, '2'],
                findLast: [objects[2], undefined, objects[2]],
                findLastIndex: [2, -1, 2],
                findLastKey: ['2', undefined, '2'],
            }[methodName];

            it(`\`_.${methodName}\` should return the found value`, () => {
                assert.strictEqual(
                    func(objects, (object) => object.a),
                    expected[0],
                );
            });

            it(`\`_.${methodName}\` should return \`${expected[1]}\` if value is not found`, () => {
                assert.strictEqual(
                    func(objects, (object) => object.a === 3),
                    expected[1],
                );
            });

            it(`\`_.${methodName}\` should work with \`_.matches\` shorthands`, () => {
                assert.strictEqual(func(objects, { b: 2 }), expected[2]);
            });

            it(`\`_.${methodName}\` should work with \`_.matchesProperty\` shorthands`, () => {
                assert.strictEqual(func(objects, ['b', 2]), expected[2]);
            });

            it(`\`_.${methodName}\` should work with \`_.property\` shorthands`, () => {
                assert.strictEqual(func(objects, 'b'), expected[0]);
            });

            it(`\`_.${methodName}\` should return \`${expected[1]}\` for empty collections`, () => {
                const emptyValues = lodashStable.endsWith(methodName, 'Index')
                        ? lodashStable.reject(empties, lodashStable.isPlainObject)
                        : empties,
                    expecting = lodashStable.map(emptyValues, lodashStable.constant(expected[1]));

                const actual = lodashStable.map(emptyValues, (value) => {
                    try {
                        return func(value, { a: 3 });
                    } catch (e) {}
                });

                assert.deepStrictEqual(actual, expecting);
            });

            it(`\`_.${methodName}\` should return an unwrapped value when implicitly chaining`, () => {
                const expected = {
                    find: 1,
                    findIndex: 0,
                    findKey: '0',
                    findLast: 4,
                    findLastIndex: 3,
                    findLastKey: '3',
                }[methodName];

                assert.strictEqual(_(array)[methodName](), expected);
            });

            it(`\`_.${methodName}\` should return a wrapped value when explicitly chaining`, () => {
                assert.ok(_(array).chain()[methodName]() instanceof _);
            });

            it(`\`_.${methodName}\` should not execute immediately when explicitly chaining`, () => {
                const wrapped = _(array).chain()[methodName]();
                assert.strictEqual(wrapped.__wrapped__, array);
            });

            it(`\`_.${methodName}\` should work in a lazy sequence`, () => {
                const largeArray = lodashStable.range(1, LARGE_ARRAY_SIZE + 1),
                    smallArray = array;

                lodashStable.times(2, (index) => {
                    const array = index ? largeArray : smallArray,
                        wrapped = _(array).filter(isEven);

                    assert.strictEqual(
                        wrapped[methodName](),
                        func(lodashStable.filter(array, isEven)),
                    );
                });
            });
        },
    ),
        function () {
            each(['find', 'findIndex', 'findLast', 'findLastIndex'], (methodName) => {
                const func = _[methodName];

                it(`\`_.${methodName}\` should provide correct \`predicate\` arguments for arrays`, () => {
                    let args,
                        array = ['a'];

                    func(array, function () {
                        args || (args = slice.call(arguments));
                    });

                    assert.deepStrictEqual(args, ['a', 0, array]);
                });
            });

            each(['find', 'findKey', 'findLast', 'findLastKey'], (methodName) => {
                const func = _[methodName];

                it(`\`_.${methodName}\` should work with an object for \`collection\``, () => {
                    const actual = func({ a: 1, b: 2, c: 3 }, (n) => n < 3);

                    const expected = {
                        find: 1,
                        findKey: 'a',
                        findLast: 2,
                        findLastKey: 'b',
                    }[methodName];

                    assert.strictEqual(actual, expected);
                });

                it(`\`_.${methodName}\` should provide correct \`predicate\` arguments for objects`, () => {
                    let args,
                        object = { a: 1 };

                    func(object, function () {
                        args || (args = slice.call(arguments));
                    });

                    assert.deepStrictEqual(args, [1, 'a', object]);
                });
            });
        };
});
