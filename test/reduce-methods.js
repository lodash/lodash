import assert from 'assert';
import lodashStable from 'lodash';
import { _, empties, noop, add } from './utils.js';

describe('reduce methods', function() {
  lodashStable.each(['reduce', 'reduceRight'], function(methodName) {
    var func = _[methodName],
        array = [1, 2, 3],
        isReduce = methodName == 'reduce';

    it('`_.' + methodName + '` should reduce a collection to a single value', function() {
      var actual = func(['a', 'b', 'c'], function(accumulator, value) {
        return accumulator + value;
      }, '');

      assert.strictEqual(actual, isReduce ? 'abc' : 'cba');
    });

    it('`_.' + methodName + '` should support empty collections without an initial `accumulator` value', function() {
      var actual = [],
          expected = lodashStable.map(empties, noop);

      lodashStable.each(empties, function(value) {
        try {
          actual.push(func(value, noop));
        } catch (e) {}
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should support empty collections with an initial `accumulator` value', function() {
      var expected = lodashStable.map(empties, lodashStable.constant('x'));

      var actual = lodashStable.map(empties, function(value) {
        try {
          return func(value, noop, 'x');
        } catch (e) {}
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should handle an initial `accumulator` value of `undefined`', function() {
      var actual = func([], noop, undefined);
      assert.strictEqual(actual, undefined);
    });

    it('`_.' + methodName + '` should return `undefined` for empty collections when no `accumulator` is given (test in IE > 9 and modern browsers)', function() {
      var array = [],
          object = { '0': 1, 'length': 0 };

      if ('__proto__' in array) {
        array.__proto__ = object;
        assert.strictEqual(func(array, noop), undefined);
      }
      assert.strictEqual(func(object, noop), undefined);
    });

    it('`_.' + methodName + '` should return an unwrapped value when implicitly chaining', function() {
      assert.strictEqual(_(array)[methodName](add), 6);
    });

    it('`_.' + methodName + '` should return a wrapped value when explicitly chaining', function() {
      assert.ok(_(array).chain()[methodName](add) instanceof _);
    });
  });
});
