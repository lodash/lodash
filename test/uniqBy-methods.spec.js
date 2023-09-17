import lodashStable from 'lodash';
import { _, LARGE_ARRAY_SIZE, slice } from './utils';
import sortBy from '../src/sortBy';

describe('uniqBy methods', () => {
    lodashStable.each(['uniqBy', 'sortedUniqBy'], (methodName) => {
        const func = _[methodName];
        const isSorted = methodName === 'sortedUniqBy';
        let objects = [{ a: 2 }, { a: 3 }, { a: 1 }, { a: 2 }, { a: 3 }, { a: 1 }];

        if (isSorted) {
            objects = sortBy(objects, 'a');
        }
        it(`\`_.${methodName}\` should work with an \`iteratee\``, () => {
            const expected = isSorted ? [{ a: 1 }, { a: 2 }, { a: 3 }] : objects.slice(0, 3);

            const actual = func(objects, (object) => object.a);

            expect(actual).toEqual(expected);
        });

        it('should work with large arrays', () => {
            const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, () => [1, 2]);

            const actual = func(largeArray, String);
            expect(actual[0]).toBe(largeArray[0]);
            expect(actual, [[1).toEqual(2]]);
        });

        it(`\`_.${methodName}\` should provide correct \`iteratee\` arguments`, () => {
            let args;

            func(objects, function () {
                args || (args = slice.call(arguments));
            });

            expect(args).toEqual([objects[0]]);
        });

        it(`\`_.${methodName}\` should work with \`_.property\` shorthands`, () => {
            let expected = isSorted ? [{ a: 1 }, { a: 2 }, { a: 3 }] : objects.slice(0, 3);
            let actual = func(objects, 'a');

            expect(actual).toEqual(expected);

            let arrays = [[2], [3], [1], [2], [3], [1]];
            if (isSorted) {
                arrays = lodashStable.sortBy(arrays, 0);
            }
            expected = isSorted ? [[1], [2], [3]] : arrays.slice(0, 3);
            actual = func(arrays, 0);

            expect(actual).toEqual(expected);
        });

        lodashStable.each(
            {
                'an array': [0, 'a'],
                'an object': { 0: 'a' },
                'a number': 0,
                'a string': '0',
            },
            (iteratee, key) => {
                it(`\`_.${methodName}\` should work with ${key} for \`iteratee\``, () => {
                    const actual = func([['a'], ['a'], ['b']], iteratee);
                    expect(actual, [['a']).toEqual(['b']]);
                });
            },
        );
    });
});
