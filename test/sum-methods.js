import assert from 'assert';
import lodashStable from 'lodash';
import { _, empties, stubZero } from './utils.js';

describe('sum methods', function() {
  lodashStable.each(['sum', 'sumBy'], function(methodName) {
    var array = [6, 4, 2],
        func = _[methodName];

    it('`_.' + methodName + '` should return the sum of an array of numbers', function() {
      assert.strictEqual(func(array), 12);
    });

    it('`_.' + methodName + '` should return `0` when passing empty `array` values', function() {
      var expected = lodashStable.map(empties, stubZero);

      var actual = lodashStable.map(empties, function(value) {
        return func(value);
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should skip `undefined` values', function() {
      assert.strictEqual(func([1, undefined]), 1);
    });

    it('`_.' + methodName + '` should not skip `NaN` values', function() {
      assert.deepStrictEqual(func([1, NaN]), NaN);
    });

    it('`_.' + methodName + '` should not coerce values to numbers', function() {
      assert.strictEqual(func(['1', '2']), '12');
    });
  });
});
