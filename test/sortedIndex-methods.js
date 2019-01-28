import assert from 'assert';
import lodashStable from 'lodash';
import { _ } from './utils.js';
import sortBy from '../sortBy.js';

describe('sortedIndex methods', function() {
  lodashStable.each(['sortedIndex', 'sortedLastIndex'], function(methodName) {
    var func = _[methodName],
        isSortedIndex = methodName == 'sortedIndex';

    it('`_.' + methodName + '` should return the insert index', function() {
      var array = [30, 50],
          values = [30, 40, 50],
          expected = isSortedIndex ? [0, 1, 1] : [1, 1, 2];

      var actual = lodashStable.map(values, function(value) {
        return func(array, value);
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should work with an array of strings', function() {
      var array = ['a', 'c'],
          values = ['a', 'b', 'c'],
          expected = isSortedIndex ? [0, 1, 1] : [1, 1, 2];

      var actual = lodashStable.map(values, function(value) {
        return func(array, value);
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should accept a nullish `array` and a `value`', function() {
      var values = [null, undefined],
          expected = lodashStable.map(values, lodashStable.constant([0, 0, 0]));

      var actual = lodashStable.map(values, function(array) {
        return [func(array, 1), func(array, undefined), func(array, NaN)];
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should align with `_.sortBy`', function() {
      var symbol1 = Symbol ? Symbol('a') : null,
          symbol2 = Symbol ? Symbol('b') : null,
          symbol3 = Symbol ? Symbol('c') : null,
          expected = [1, '2', {}, symbol1, symbol2, null, undefined, NaN, NaN];

      lodashStable.each([
        [NaN, symbol1, null, 1, '2', {}, symbol2, NaN, undefined],
        ['2', null, 1, symbol1, NaN, {}, NaN, symbol2, undefined]
      ], function(array) {
        assert.deepStrictEqual(sortBy(array), expected);
        assert.strictEqual(func(expected, 3), 2);
        assert.strictEqual(func(expected, symbol3), isSortedIndex ? 3 : (Symbol ? 5 : 6));
        assert.strictEqual(func(expected, null), isSortedIndex ? (Symbol ? 5 : 3) : 6);
        assert.strictEqual(func(expected, undefined), isSortedIndex ? 6 : 7);
        assert.strictEqual(func(expected, NaN), isSortedIndex ? 7 : 9);
      });
    });

    it('`_.' + methodName + '` should align with `_.sortBy` for nulls', function() {
      var array = [null, null];

      assert.strictEqual(func(array, null), isSortedIndex ? 0 : 2);
      assert.strictEqual(func(array, 1), 0);
      assert.strictEqual(func(array, 'a'), 0);
    });

    it('`_.' + methodName + '` should align with `_.sortBy` for symbols', function() {
      var symbol1 = Symbol ? Symbol('a') : null,
          symbol2 = Symbol ? Symbol('b') : null,
          symbol3 = Symbol ? Symbol('c') : null,
          array = [symbol1, symbol2];

      assert.strictEqual(func(array, symbol3), isSortedIndex ? 0 : 2);
      assert.strictEqual(func(array, 1), 0);
      assert.strictEqual(func(array, 'a'), 0);
    });
  });
});
