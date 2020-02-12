import assert from 'assert';
import lodashStable from 'lodash';
import { _, falsey } from './utils.js';

describe('range methods', function() {
  lodashStable.each(['range', 'rangeRight'], function(methodName) {
    var func = _[methodName],
        isRange = methodName == 'range';

    function resolve(range) {
      return isRange ? range : range.reverse();
    }

    it('`_.' + methodName + '` should infer the sign of `step` when only `end` is given', function() {
      assert.deepStrictEqual(func(4), resolve([0, 1, 2, 3]));
      assert.deepStrictEqual(func(-4), resolve([0, -1, -2, -3]));
    });

    it('`_.' + methodName + '` should infer the sign of `step` when only `start` and `end` are given', function() {
      assert.deepStrictEqual(func(1, 5), resolve([1, 2, 3, 4]));
      assert.deepStrictEqual(func(5, 1), resolve([5, 4, 3, 2]));
    });

    it('`_.' + methodName + '` should work with a `start`, `end`, and `step`', function() {
      assert.deepStrictEqual(func(0, -4, -1), resolve([0, -1, -2, -3]));
      assert.deepStrictEqual(func(5, 1, -1), resolve([5, 4, 3, 2]));
      assert.deepStrictEqual(func(0, 20, 5), resolve([0, 5, 10, 15]));
    });

    it('`_.' + methodName + '` should support a `step` of `0`', function() {
      assert.deepStrictEqual(func(1, 4, 0), [1, 1, 1]);
    });

    it('`_.' + methodName + '` should work with a `step` larger than `end`', function() {
      assert.deepStrictEqual(func(1, 5, 20), [1]);
    });

    it('`_.' + methodName + '` should work with a negative `step`', function() {
      assert.deepStrictEqual(func(0, -4, -1), resolve([0, -1, -2, -3]));
      assert.deepStrictEqual(func(21, 10, -3), resolve([21, 18, 15, 12]));
    });

    it('`_.' + methodName + '` should support `start` of `-0`', function() {
      var actual = func(-0, 1);
      assert.strictEqual(1 / actual[0], -Infinity);
    });

    it('`_.' + methodName + '` should treat falsey `start` as `0`', function() {
      lodashStable.each(falsey, function(value, index) {
        if (index) {
          assert.deepStrictEqual(func(value), []);
          assert.deepStrictEqual(func(value, 1), [0]);
        } else {
          assert.deepStrictEqual(func(), []);
        }
      });
    });

    it('`_.' + methodName + '` should coerce arguments to finite numbers', function() {
      var actual = [
        func('1'),
        func('0', 1),
        func(0, 1, '1'),
        func(NaN),
        func(NaN, NaN)
      ];

      assert.deepStrictEqual(actual, [[0], [0], [0], [], []]);
    });

    it('`_.' + methodName + '` should work as an iteratee for methods like `_.map`', function() {
      var array = [1, 2, 3],
          object = { 'a': 1, 'b': 2, 'c': 3 },
          expected = lodashStable.map([[0], [0, 1], [0, 1, 2]], resolve);

      lodashStable.each([array, object], function(collection) {
        var actual = lodashStable.map(collection, func);
        assert.deepStrictEqual(actual, expected);
      });
    });
  });
});
