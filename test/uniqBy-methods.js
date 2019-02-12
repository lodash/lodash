import assert from 'assert';
import lodashStable from 'lodash';
import { _, LARGE_ARRAY_SIZE, slice } from './utils.js';
import sortBy from '../sortBy.js';

describe('uniqBy methods', function() {
  lodashStable.each(['uniqBy', 'sortedUniqBy'], function(methodName) {
    var func = _[methodName],
        isSorted = methodName == 'sortedUniqBy',
        objects = [{ 'a': 2 }, { 'a': 3 }, { 'a': 1 }, { 'a': 2 }, { 'a': 3 }, { 'a': 1 }];

    if (isSorted) {
      objects = sortBy(objects, 'a');
    }
    it('`_.' + methodName + '` should work with an `iteratee`', function() {
      var expected = isSorted ? [{ 'a': 1 }, { 'a': 2 }, { 'a': 3 }] : objects.slice(0, 3);

      var actual = func(objects, function(object) {
        return object.a;
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('should work with large arrays', function() {
      var largeArray = lodashStable.times(LARGE_ARRAY_SIZE, function() {
        return [1, 2];
      });

      var actual = func(largeArray, String);
      assert.strictEqual(actual[0], largeArray[0]);
      assert.deepStrictEqual(actual, [[1, 2]]);
    });

    it('`_.' + methodName + '` should provide correct `iteratee` arguments', function() {
      var args;

      func(objects, function() {
        args || (args = slice.call(arguments));
      });

      assert.deepStrictEqual(args, [objects[0]]);
    });

    it('`_.' + methodName + '` should work with `_.property` shorthands', function() {
      var expected = isSorted ? [{ 'a': 1 }, { 'a': 2 }, { 'a': 3 }] : objects.slice(0, 3),
          actual = func(objects, 'a');

      assert.deepStrictEqual(actual, expected);

      var arrays = [[2], [3], [1], [2], [3], [1]];
      if (isSorted) {
        arrays = lodashStable.sortBy(arrays, 0);
      }
      expected = isSorted ? [[1], [2], [3]] : arrays.slice(0, 3);
      actual = func(arrays, 0);

      assert.deepStrictEqual(actual, expected);
    });

    lodashStable.each({
      'an array': [0, 'a'],
      'an object': { '0': 'a' },
      'a number': 0,
      'a string': '0'
    },
    function(iteratee, key) {
      it('`_.' + methodName + '` should work with ' + key + ' for `iteratee`', function() {
        var actual = func([['a'], ['a'], ['b']], iteratee);
        assert.deepStrictEqual(actual, [['a'], ['b']]);
      });
    });
  });
});
