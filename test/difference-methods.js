import assert from 'assert';
import lodashStable from 'lodash';
import { _, LARGE_ARRAY_SIZE, stubOne, stubNaN, args } from './utils.js';

describe('difference methods', function() {
  lodashStable.each(['difference', 'differenceBy', 'differenceWith'], function(methodName) {
    var func = _[methodName];

    it('`_.' + methodName + '` should return the difference of two arrays', function() {
      var actual = func([2, 1], [2, 3]);
      assert.deepStrictEqual(actual, [1]);
    });

    it('`_.' + methodName + '` should return the difference of multiple arrays', function() {
      var actual = func([2, 1, 2, 3], [3, 4], [3, 2]);
      assert.deepStrictEqual(actual, [1]);
    });

    it('`_.' + methodName + '` should treat `-0` as `0`', function() {
      var array = [-0, 0];

      var actual = lodashStable.map(array, function(value) {
        return func(array, [value]);
      });

      assert.deepStrictEqual(actual, [[], []]);

      actual = lodashStable.map(func([-0, 1], [1]), lodashStable.toString);
      assert.deepStrictEqual(actual, ['0']);
    });

    it('`_.' + methodName + '` should match `NaN`', function() {
      assert.deepStrictEqual(func([1, NaN, 3], [NaN, 5, NaN]), [1, 3]);
    });

    it('`_.' + methodName + '` should work with large arrays', function() {
      var array1 = lodashStable.range(LARGE_ARRAY_SIZE + 1),
          array2 = lodashStable.range(LARGE_ARRAY_SIZE),
          a = {},
          b = {},
          c = {};

      array1.push(a, b, c);
      array2.push(b, c, a);

      assert.deepStrictEqual(func(array1, array2), [LARGE_ARRAY_SIZE]);
    });

    it('`_.' + methodName + '` should work with large arrays of `-0` as `0`', function() {
      var array = [-0, 0];

      var actual = lodashStable.map(array, function(value) {
        var largeArray = lodashStable.times(LARGE_ARRAY_SIZE, lodashStable.constant(value));
        return func(array, largeArray);
      });

      assert.deepStrictEqual(actual, [[], []]);

      var largeArray = lodashStable.times(LARGE_ARRAY_SIZE, stubOne);
      actual = lodashStable.map(func([-0, 1], largeArray), lodashStable.toString);
      assert.deepStrictEqual(actual, ['0']);
    });

    it('`_.' + methodName + '` should work with large arrays of `NaN`', function() {
      var largeArray = lodashStable.times(LARGE_ARRAY_SIZE, stubNaN);
      assert.deepStrictEqual(func([1, NaN, 3], largeArray), [1, 3]);
    });

    it('`_.' + methodName + '` should work with large arrays of objects', function() {
      var object1 = {},
          object2 = {},
          largeArray = lodashStable.times(LARGE_ARRAY_SIZE, lodashStable.constant(object1));

      assert.deepStrictEqual(func([object1, object2], largeArray), [object2]);
    });

    it('`_.' + methodName + '` should ignore values that are not array-like', function() {
      var array = [1, null, 3];

      assert.deepStrictEqual(func(args, 3, { '0': 1 }), [1, 2, 3]);
      assert.deepStrictEqual(func(null, array, 1), []);
      assert.deepStrictEqual(func(array, args, null), [null]);
    });
  });
});
