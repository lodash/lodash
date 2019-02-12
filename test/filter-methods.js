import assert from 'assert';
import lodashStable from 'lodash';
import { _, LARGE_ARRAY_SIZE, isEven, square } from './utils.js';

describe('filter methods', function() {
  lodashStable.each(['filter', 'reject'], function(methodName) {
    var array = [1, 2, 3, 4],
        func = _[methodName],
        isFilter = methodName == 'filter',
        objects = [{ 'a': 0 }, { 'a': 1 }];

    it('`_.' + methodName + '` should not modify the resulting value from within `predicate`', function() {
      var actual = func([0], function(value, index, array) {
        array[index] = 1;
        return isFilter;
      });

      assert.deepStrictEqual(actual, [0]);
    });

    it('`_.' + methodName + '` should work with `_.property` shorthands', function() {
      assert.deepStrictEqual(func(objects, 'a'), [objects[isFilter ? 1 : 0]]);
    });

    it('`_.' + methodName + '` should work with `_.matches` shorthands', function() {
      assert.deepStrictEqual(func(objects, objects[1]), [objects[isFilter ? 1 : 0]]);
    });

    it('`_.' + methodName + '` should not modify wrapped values', function() {
      var wrapped = _(array);

      var actual = wrapped[methodName](function(n) {
        return n < 3;
      });

      assert.deepEqual(actual.value(), isFilter ? [1, 2] : [3, 4]);

      actual = wrapped[methodName](function(n) {
        return n > 2;
      });

      assert.deepEqual(actual.value(), isFilter ? [3, 4] : [1, 2]);
    });

    it('`_.' + methodName + '` should work in a lazy sequence', function() {
      var array = lodashStable.range(LARGE_ARRAY_SIZE + 1),
          predicate = function(value) { return isFilter ? isEven(value) : !isEven(value); };

      var object = lodashStable.zipObject(lodashStable.times(LARGE_ARRAY_SIZE, function(index) {
        return ['key' + index, index];
      }));

      var actual = _(array).slice(1).map(square)[methodName](predicate).value();
      assert.deepEqual(actual, _[methodName](lodashStable.map(array.slice(1), square), predicate));

      actual = _(object).mapValues(square)[methodName](predicate).value();
      assert.deepEqual(actual, _[methodName](lodashStable.mapValues(object, square), predicate));
    });

    it('`_.' + methodName + '` should provide correct `predicate` arguments in a lazy sequence', function() {
      var args,
          array = lodashStable.range(LARGE_ARRAY_SIZE + 1),
          expected = [1, 0, lodashStable.map(array.slice(1), square)];

      _(array).slice(1)[methodName](function(value, index, array) {
        args || (args = slice.call(arguments));
      }).value();

      assert.deepEqual(args, [1, 0, array.slice(1)]);

      args = undefined;
      _(array).slice(1).map(square)[methodName](function(value, index, array) {
        args || (args = slice.call(arguments));
      }).value();

      assert.deepEqual(args, expected);

      args = undefined;
      _(array).slice(1).map(square)[methodName](function(value, index) {
        args || (args = slice.call(arguments));
      }).value();

      assert.deepEqual(args, expected);

      args = undefined;
      _(array).slice(1).map(square)[methodName](function(value) {
        args || (args = slice.call(arguments));
      }).value();

      assert.deepEqual(args, [1]);

      args = undefined;
      _(array).slice(1).map(square)[methodName](function() {
        args || (args = slice.call(arguments));
      }).value();

      assert.deepEqual(args, expected);
    });
  });
});
