import assert from 'assert';
import lodashStable from 'lodash';
import { _ } from './utils.js';

describe('extremum methods', function() {
  lodashStable.each(['max', 'maxBy', 'min', 'minBy'], function(methodName) {
    var func = _[methodName],
        isMax = /^max/.test(methodName);

    it('`_.' + methodName + '` should work with Date objects', function() {
      var curr = new Date,
          past = new Date(0);

      assert.strictEqual(func([curr, past]), isMax ? curr : past);
    });

    it('`_.' + methodName + '` should work with extremely large arrays', function() {
      var array = lodashStable.range(0, 5e5);
      assert.strictEqual(func(array), isMax ? 499999 : 0);
    });

    it('`_.' + methodName + '` should work when chaining on an array with only one value', function() {
      var actual = _([40])[methodName]();
      assert.strictEqual(actual, 40);
    });
  });

  lodashStable.each(['maxBy', 'minBy'], function(methodName) {
    var array = [1, 2, 3],
        func = _[methodName],
        isMax = methodName == 'maxBy';

    it('`_.' + methodName + '` should work with an `iteratee`', function() {
      var actual = func(array, function(n) {
        return -n;
      });

      assert.strictEqual(actual, isMax ? 1 : 3);
    });

    it('should work with `_.property` shorthands', function() {
      var objects = [{ 'a': 2 }, { 'a': 3 }, { 'a': 1 }],
          actual = func(objects, 'a');

      assert.deepStrictEqual(actual, objects[isMax ? 1 : 2]);

      var arrays = [[2], [3], [1]];
      actual = func(arrays, 0);

      assert.deepStrictEqual(actual, arrays[isMax ? 1 : 2]);
    });

    it('`_.' + methodName + '` should work when `iteratee` returns +/-Infinity', function() {
      var value = isMax ? -Infinity : Infinity,
          object = { 'a': value };

      var actual = func([object, { 'a': value }], function(object) {
        return object.a;
      });

      assert.strictEqual(actual, object);
    });
  });
});
