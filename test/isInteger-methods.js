import assert from 'assert';
import lodashStable from 'lodash';
import { _, stubTrue, MAX_INTEGER, stubFalse, falsey, args, symbol } from './utils.js';

describe('isInteger methods', function() {
  lodashStable.each(['isInteger', 'isSafeInteger'], function(methodName) {
    var func = _[methodName],
        isSafe = methodName == 'isSafeInteger';

    it('`_.' + methodName + '` should return `true` for integer values', function() {
      var values = [-1, 0, 1],
          expected = lodashStable.map(values, stubTrue);

      var actual = lodashStable.map(values, function(value) {
        return func(value);
      });

      assert.deepStrictEqual(actual, expected);
      assert.strictEqual(func(MAX_INTEGER), !isSafe);
    });

    it('should return `false` for non-integer number values', function() {
      var values = [NaN, Infinity, -Infinity, Object(1), 3.14],
          expected = lodashStable.map(values, stubFalse);

      var actual = lodashStable.map(values, function(value) {
        return func(value);
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('should return `false` for non-numeric values', function() {
      var expected = lodashStable.map(falsey, function(value) {
        return value === 0;
      });

      var actual = lodashStable.map(falsey, function(value, index) {
        return index ? func(value) : func();
      });

      assert.deepStrictEqual(actual, expected);

      assert.strictEqual(func(args), false);
      assert.strictEqual(func([1, 2, 3]), false);
      assert.strictEqual(func(true), false);
      assert.strictEqual(func(new Date), false);
      assert.strictEqual(func(new Error), false);
      assert.strictEqual(func({ 'a': 1 }), false);
      assert.strictEqual(func(/x/), false);
      assert.strictEqual(func('a'), false);
      assert.strictEqual(func(symbol), false);
    });
  });
});
