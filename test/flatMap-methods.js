import assert from 'assert';
import lodashStable from 'lodash';
import { _, identity, falsey, stubArray } from './utils.js';

describe('flatMap methods', function() {
  lodashStable.each(['flatMap', 'flatMapDeep', 'flatMapDepth'], function(methodName) {
    var func = _[methodName],
        array = [1, 2, 3, 4];

    function duplicate(n) {
      return [n, n];
    }

    it('`_.' + methodName + '` should map values in `array` to a new flattened array', function() {
      var actual = func(array, duplicate),
          expected = lodashStable.flatten(lodashStable.map(array, duplicate));

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should work with `_.property` shorthands', function() {
      var objects = [{ 'a': [1, 2] }, { 'a': [3, 4] }];
      assert.deepStrictEqual(func(objects, 'a'), array);
    });

    it('`_.' + methodName + '` should iterate over own string keyed properties of objects', function() {
      function Foo() {
        this.a = [1, 2];
      }
      Foo.prototype.b = [3, 4];

      var actual = func(new Foo, identity);
      assert.deepStrictEqual(actual, [1, 2]);
    });

    it('`_.' + methodName + '` should use `_.identity` when `iteratee` is nullish', function() {
      var array = [[1, 2], [3, 4]],
          object = { 'a': [1, 2], 'b': [3, 4] },
          values = [, null, undefined],
          expected = lodashStable.map(values, lodashStable.constant([1, 2, 3, 4]));

      lodashStable.each([array, object], function(collection) {
        var actual = lodashStable.map(values, function(value, index) {
          return index ? func(collection, value) : func(collection);
        });

        assert.deepStrictEqual(actual, expected);
      });
    });

    it('`_.' + methodName + '` should accept a falsey `collection`', function() {
      var expected = lodashStable.map(falsey, stubArray);

      var actual = lodashStable.map(falsey, function(collection, index) {
        try {
          return index ? func(collection) : func();
        } catch (e) {}
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should treat number values for `collection` as empty', function() {
      assert.deepStrictEqual(func(1), []);
    });

    it('`_.' + methodName + '` should work with objects with non-number length properties', function() {
      var object = { 'length': [1, 2] };
      assert.deepStrictEqual(func(object, identity), [1, 2]);
    });
  });
});
