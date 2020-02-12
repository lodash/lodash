import assert from 'assert';
import lodashStable from 'lodash';
import { _, falsey, stubObject, noop } from './utils.js';

describe('mapKeys and mapValues', function() {
  lodashStable.each(['mapKeys', 'mapValues'], function(methodName) {
    var func = _[methodName],
        object = { 'a': 1, 'b': 2 };

    it('`_.' + methodName + '` should iterate over own string keyed properties of objects', function() {
      function Foo() {
        this.a = 'a';
      }
      Foo.prototype.b = 'b';

      var actual = func(new Foo, function(value, key) { return key; });
      assert.deepStrictEqual(actual, { 'a': 'a' });
    });

    it('`_.' + methodName + '` should accept a falsey `object`', function() {
      var expected = lodashStable.map(falsey, stubObject);

      var actual = lodashStable.map(falsey, function(object, index) {
        try {
          return index ? func(object) : func();
        } catch (e) {}
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should return a wrapped value when chaining', function() {
      assert.ok(_(object)[methodName](noop) instanceof _);
    });
  });
});
