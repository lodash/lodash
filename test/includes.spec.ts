import assert from 'node:assert';
import lodashStable from 'lodash';
import { empties, stubFalse } from './utils';
import includes from '../src/includes';

describe('includes', () => {
    (function () {
        lodashStable.each(
            {
                'an `arguments` object': arguments,
                'an array': [1, 2, 3, 4],
                'an object': { a: 1, b: 2, c: 3, d: 4 },
                'a string': '1234',
            },
            (collection, key) => {
                it(`should work with ${key} and  return \`true\` for  matched values`, () => {
                    assert.strictEqual(includes(collection, 3), true);
                });

                it(`should work with ${key} and  return \`false\` for unmatched values`, () => {
                    assert.strictEqual(includes(collection, 5), false);
                });

                it(`should work with ${key} and floor \`position\` values`, () => {
                    assert.strictEqual(includes(collection, 2, 1.2), true);
                });

                it(`should work with ${key} and return an unwrapped value implicitly when chaining`, () => {
                    assert.strictEqual(_(collection).includes(3), true);
                });

                it(`should work with ${key} and return a wrapped value when explicitly chaining`, () => {
                    assert.ok(_(collection).chain().includes(3) instanceof _);
                });
            },
        );

        lodashStable.each(
            {
                literal: 'abc',
                object: Object('abc'),
            },
            (collection, key) => {
                it(`should work with a string ${key} for \`collection\``, () => {
                    assert.strictEqual(includes(collection, 'bc'), true);
                    assert.strictEqual(includes(collection, 'd'), false);
                });
            },
        );

        it('should return `false` for empty collections', () => {
            const expected = lodashStable.map(empties, stubFalse);

            const actual = lodashStable.map(empties, (value) => {
                try {
                    return includes(value);
                } catch (e) {}
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('should work with a string and a `fromIndex` >= `length`', () => {
            const string = '1234',
                length = string.length,
                indexes = [4, 6, 2 ** 32, Infinity];

            const expected = lodashStable.map(indexes, (index) => [false, false, index === length]);

            const actual = lodashStable.map(indexes, (fromIndex) => [
                includes(string, 1, fromIndex),
                includes(string, undefined, fromIndex),
                includes(string, '', fromIndex),
            ]);

            assert.deepStrictEqual(actual, expected);
        });

        it('should match `NaN`', () => {
            assert.strictEqual(includes([1, NaN, 3], NaN), true);
        });

        it('should match `-0` as `0`', () => {
            assert.strictEqual(includes([-0], 0), true);
            assert.strictEqual(includes([0], -0), true);
        });

        it('should work as an iteratee for methods like `_.every`', () => {
            const array = [2, 3, 1],
                values = [1, 2, 3];

            assert.ok(lodashStable.every(values, lodashStable.partial(includes, array)));
        });
    })(1, 2, 3, 4);
});
