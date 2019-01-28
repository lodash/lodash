import assert from 'assert';
import lodashStable from 'lodash';
import { _, LARGE_ARRAY_SIZE, isEven } from './utils.js';
import sortBy from '../sortBy.js';

describe('uniq methods', function() {
  lodashStable.each(['uniq', 'uniqBy', 'uniqWith', 'sortedUniq', 'sortedUniqBy'], function(methodName) {
    var func = _[methodName],
        isSorted = /^sorted/.test(methodName),
        objects = [{ 'a': 2 }, { 'a': 3 }, { 'a': 1 }, { 'a': 2 }, { 'a': 3 }, { 'a': 1 }];

    if (isSorted) {
      objects = sortBy(objects, 'a');
    }
    else {
      it('`_.' + methodName + '` should return unique values of an unsorted array', function() {
        var array = [2, 1, 2];
        assert.deepStrictEqual(func(array), [2, 1]);
      });
    }
    it('`_.' + methodName + '` should return unique values of a sorted array', function() {
      var array = [1, 2, 2];
      assert.deepStrictEqual(func(array), [1, 2]);
    });

    it('`_.' + methodName + '` should treat object instances as unique', function() {
      assert.deepStrictEqual(func(objects), objects);
    });

    it('`_.' + methodName + '` should treat `-0` as `0`', function() {
      var actual = lodashStable.map(func([-0, 0]), lodashStable.toString);
      assert.deepStrictEqual(actual, ['0']);
    });

    it('`_.' + methodName + '` should match `NaN`', function() {
      assert.deepStrictEqual(func([NaN, NaN]), [NaN]);
    });

    it('`_.' + methodName + '` should work with large arrays', function() {
      var largeArray = [],
          expected = [0, {}, 'a'],
          count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

      lodashStable.each(expected, function(value) {
        lodashStable.times(count, function() {
          largeArray.push(value);
        });
      });

      assert.deepStrictEqual(func(largeArray), expected);
    });

    it('`_.' + methodName + '` should work with large arrays of `-0` as `0`', function() {
      var largeArray = lodashStable.times(LARGE_ARRAY_SIZE, function(index) {
        return isEven(index) ? -0 : 0;
      });

      var actual = lodashStable.map(func(largeArray), lodashStable.toString);
      assert.deepStrictEqual(actual, ['0']);
    });

    it('`_.' + methodName + '` should work with large arrays of boolean, `NaN`, and nullish values', function() {
      var largeArray = [],
          expected = [null, undefined, false, true, NaN],
          count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

      lodashStable.each(expected, function(value) {
        lodashStable.times(count, function() {
          largeArray.push(value);
        });
      });

      assert.deepStrictEqual(func(largeArray), expected);
    });

    it('`_.' + methodName + '` should work with large arrays of symbols', function() {
      if (Symbol) {
        var largeArray = lodashStable.times(LARGE_ARRAY_SIZE, Symbol);
        assert.deepStrictEqual(func(largeArray), largeArray);
      }
    });

    it('`_.' + methodName + '` should work with large arrays of well-known symbols', function() {
      // See http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols.
      if (Symbol) {
        var expected = [
          Symbol.hasInstance, Symbol.isConcatSpreadable, Symbol.iterator,
          Symbol.match, Symbol.replace, Symbol.search, Symbol.species,
          Symbol.split, Symbol.toPrimitive, Symbol.toStringTag, Symbol.unscopables
        ];

        var largeArray = [],
            count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

        expected = lodashStable.map(expected, function(symbol) {
          return symbol || {};
        });

        lodashStable.each(expected, function(value) {
          lodashStable.times(count, function() {
            largeArray.push(value);
          });
        });

        assert.deepStrictEqual(func(largeArray), expected);
      }
    });

    it('`_.' + methodName + '` should distinguish between numbers and numeric strings', function() {
      var largeArray = [],
          expected = ['2', 2, Object('2'), Object(2)],
          count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

      lodashStable.each(expected, function(value) {
        lodashStable.times(count, function() {
          largeArray.push(value);
        });
      });

      assert.deepStrictEqual(func(largeArray), expected);
    });
  });
});
