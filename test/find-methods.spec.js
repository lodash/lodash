import lodashStable from 'lodash';
import { _, empties, LARGE_ARRAY_SIZE, slice } from './utils';
import each from '../src/each';

describe('find methods', () => {
    lodashStable.each(
        ['find', 'findIndex', 'findKey', 'findLast', 'findLastIndex', 'findLastKey'],
        (methodName) => {
            const array = [1, 2, 3, 4];
            const func = _[methodName];

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
                expect(
                    func(objects, (object) => object.a)
                ).toEqual(
                    expected[0]
                );
            });

            it(`\`_.${methodName}\` should return \`${expected[1]}\` if value is not found`, () => {
                expect(
                    func(objects, (object) => object.a === 3)
                ).toEqual(
                    expected[1]
                );
            });

            it(`\`_.${methodName}\` should work with \`_.matches\` shorthands`, () => {
                expect(func(objects, { b: 2 })).toBe(expected[2]);
            });

            it(`\`_.${methodName}\` should work with \`_.matchesProperty\` shorthands`, () => {
                expect(func(objects, ['b', 2])).toBe(expected[2]);
            });

            it(`\`_.${methodName}\` should work with \`_.property\` shorthands`, () => {
                expect(func(objects, 'b')).toBe(expected[0]);
            });

            it(`\`_.${methodName}\` should return \`${expected[1]}\` for empty collections`, () => {
                const emptyValues = lodashStable.endsWith(methodName, 'Index')
                    ? lodashStable.reject(empties, lodashStable.isPlainObject)
                    : empties;
                const expecting = lodashStable.map(emptyValues, lodashStable.constant(expected[1]));

                const actual = lodashStable.map(emptyValues, (value) => {
                    try {
                        return func(value, { a: 3 });
                    } catch (e) {}
                });

                expect(actual).toEqual(expecting);
            });
        },
    ),
        function () {
            each(['find', 'findIndex', 'findLast', 'findLastIndex'], (methodName) => {
                const func = _[methodName];

                it(`\`_.${methodName}\` should provide correct \`predicate\` arguments for arrays`, () => {
                    let args;
                    const array = ['a'];

                    func(array, function () {
                        args || (args = slice.call(arguments));
                    });

                    expect(args, ['a', 0).toEqual(array]);
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

                    expect(actual).toBe(expected);
                });

                it(`\`_.${methodName}\` should provide correct \`predicate\` arguments for objects`, () => {
                    let args;
                    const object = { a: 1 };

                    func(object, function () {
                        args || (args = slice.call(arguments));
                    });

                    expect(args, [1, 'a').toEqual(object]);
                });
            });
        };
});
