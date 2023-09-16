import assert from 'node:assert';
import lodashStable from 'lodash';
import { args, falsey } from './utils';
import findLast from '../src/findLast';

describe('findLast', () => {
    const resolve = lodashStable.curry(lodashStable.eq);

    lodashStable.each(
        {
            'an `arguments` object': args,
            'an array': [1, 2, 3],
        },
        (collection, key) => {
            const values = lodashStable.toArray(collection);

            it(`should work with ${key} and a positive \`fromIndex\``, () => {
                const expected = [values[1], undefined];

                const actual = [
                    findLast(collection, resolve(values[1]), 1),
                    findLast(collection, resolve(values[2]), 1),
                ];

                assert.deepStrictEqual(actual, expected);
            });

            it(`should work with ${key} and a \`fromIndex\` >= \`length\``, () => {
                const indexes = [4, 6, 2 ** 32, Infinity];

                const expected = lodashStable.map(
                    indexes,
                    lodashStable.constant([values[0], undefined, undefined]),
                );

                const actual = lodashStable.map(indexes, (fromIndex) => [
                    findLast(collection, resolve(1), fromIndex),
                    findLast(collection, resolve(undefined), fromIndex),
                    findLast(collection, resolve(''), fromIndex),
                ]);

                assert.deepStrictEqual(actual, expected);
            });

            it(`should work with ${key} and treat falsey \`fromIndex\` values correctly`, () => {
                const expected = lodashStable.map(falsey, (value) =>
                    value === undefined ? values[3] : undefined,
                );

                const actual = lodashStable.map(falsey, (fromIndex) =>
                    findLast(collection, resolve(values[3]), fromIndex),
                );

                assert.deepStrictEqual(actual, expected);
            });

            it(`should work with ${key} and coerce \`fromIndex\` to an integer`, () => {
                const expected = [values[0], values[0], undefined];

                const actual = [
                    findLast(collection, resolve(values[0]), 0.1),
                    findLast(collection, resolve(values[0]), NaN),
                    findLast(collection, resolve(values[2]), '1'),
                ];

                assert.deepStrictEqual(actual, expected);
            });

            it(`should work with ${key} and a negative \`fromIndex\``, () => {
                const expected = [values[1], undefined];

                const actual = [
                    findLast(collection, resolve(values[1]), -2),
                    findLast(collection, resolve(values[2]), -2),
                ];

                assert.deepStrictEqual(actual, expected);
            });

            it(`should work with ${key} and a negative \`fromIndex\` <= \`-length\``, () => {
                const indexes = [-4, -6, -Infinity],
                    expected = lodashStable.map(indexes, lodashStable.constant(values[0]));

                const actual = lodashStable.map(indexes, (fromIndex) =>
                    findLast(collection, resolve(values[0]), fromIndex),
                );

                assert.deepStrictEqual(actual, expected);
            });
        },
    );
});
