import lodashStable from 'lodash';
import { _, empties } from './utils';

lodashStable.each(
    ['find', 'findIndex', 'findKey', 'findLast', 'findLastIndex', 'findLastKey'],
    (methodName) => {
        describe(`lodash.${methodName}`);

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

        it(`\`_.${methodName}\` should return an unwrapped value when implicitly chaining`, () => {
            const expected = {
                find: 1,
                findIndex: 0,
                findKey: '0',
                findLast: 4,
                findLastIndex: 3,
                findLastKey: '3',
            }[methodName];
        });

        it(`\`_.${methodName}\` should return a wrapped value when explicitly chaining`, () => {});

        it(`\`_.${methodName}\` should not execute immediately when explicitly chaining`, () => {});

        it(`\`_.${methodName}\` should work in a lazy sequence`, () => {});
    },
);
