import assert from 'assert';
import lodashStable from 'lodash';
import { _, args, strictArgs } from './utils.js';

describe('values methods', function() {
  lodashStable.each(['values', 'valuesIn'], function(methodName) {
    var func = _[methodName],
        isValues = methodName == 'values';

    it('`_.' + methodName + '` should get string keyed values of `object`', function() {
      var object = { 'a': 1, 'b': 2 },
          actual = func(object).sort();

      assert.deepStrictEqual(actual, [1, 2]);
    });

    it('`_.' + methodName + '` should work with an object that has a `length` property', function() {
      var object = { '0': 'a', '1': 'b', 'length': 2 },
          actual = func(object).sort();

      assert.deepStrictEqual(actual, [2, 'a', 'b']);
    });

    it('`_.' + methodName + '` should ' + (isValues ? 'not ' : '') + 'include inherited string keyed property values', function() {
      function Foo() {
        this.a = 1;
      }
      Foo.prototype.b = 2;

      var expected = isValues ? [1] : [1, 2],
          actual = func(new Foo).sort();

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should work with `arguments` objects', function() {
      var values = [args, strictArgs],
          expected = lodashStable.map(values, lodashStable.constant([1, 2, 3]));

      var actual = lodashStable.map(values, function(value) {
        return func(value).sort();
      });

      assert.deepStrictEqual(actual, expected);
    });
  });
});
