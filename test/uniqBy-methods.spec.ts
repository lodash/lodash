import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, LARGE_ARRAY_SIZE, slice } from './utils';
import sortBy from '../src/sortBy';

describe('uniqBy methods', () => {
    lodashStable.each(['uniqBy', 'sortedUniqBy'], (methodName) => {
        let func = _[methodName],
            isSorted = methodName == 'sortedUniqBy',
            objects = [{ a: 2 }, { a: 3 }, { a: 1 }, { a: 2 }, { a: 3 }, { a: 1 }];

        if (isSorted) {
            objects = sortBy(objects, 'a');
        }
        it(`\`_.${methodName}\` should work with an \`iteratee\``, () => {
            const expected = isSorted ? [{ a: 1 }, { a: 2 }, { a: 3 }] : objects.slice(0, 3);

            const actual = func(objects, (object) => object.a);

            assert.deepStrictEqual(actual, expected);
        });

        it('should work with large arrays', () => {
            const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, () => [1, 2]);

            const actual = func(largeArray, String);
            assert.strictEqual(actual[0], largeArray[0]);
            assert.deepStrictEqual(actual, [[1, 2]]);
        });

        it(`\`_.${methodName}\` should provide correct \`iteratee\` arguments`, () => {
            let args;

            func(objects, function () {
                args || (args = slice.call(arguments));
            });

            assert.deepStrictEqual(args, [objects[0]]);
        });

        it(`\`_.${methodName}\` should work with \`_.property\` shorthands`, () => {
            let expected = isSorted ? [{ a: 1 }, { a: 2 }, { a: 3 }] : objects.slice(0, 3),
                actual = func(objects, 'a');

            assert.deepStrictEqual(actual, expected);

            let arrays = [[2], [3], [1], [2], [3], [1]];
            if (isSorted) {
                arrays = lodashStable.sortBy(arrays, 0);
            }
            expected = isSorted ? [[1], [2], [3]] : arrays.slice(0, 3);
            actual = func(arrays, 0);

            assert.deepStrictEqual(actual, expected);
        });

        lodashStable.each(
            {
                'an array': [0, 'a'],
                'an object': { '0': 'a' },
                'a number': 0,
                'a string': '0',
            },
            (iteratee, key) => {
                it(`\`_.${methodName}\` should work with ${key} for \`iteratee\``, () => {
                    const actual = func([['a'], ['a'], ['b']], iteratee);
                    assert.deepStrictEqual(actual, [['a'], ['b']]);
                });
            },
        );
    });
});
