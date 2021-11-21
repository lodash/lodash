import assert from 'assert';
import lodashStable from 'lodash';
import { _, stubFalse, stubTrue, empties } from './utils.js';
import conformsTo from '../conformsTo.js';

describe('conforms methods', function() {
  lodashStable.each(['conforms', 'conformsTo'], function(methodName) {
    var isConforms = methodName == 'conforms';

    function conforms(source) {
      return isConforms ? _.conforms(source) : function(object) {
        return conformsTo(object, source);
      };
    }

    it('`_.' + methodName + '` should check if `object` conforms to `source`', function() {
      var objects = [
        { 'a': 1, 'b': 8 },
        { 'a': 2, 'b': 4 },
        { 'a': 3, 'b': 16 }
      ];

      var par = conforms({
        'b': function(value) { return value > 4; }
      });

      var actual = lodashStable.filter(objects, par);
      assert.deepStrictEqual(actual, [objects[0], objects[2]]);

      par = conforms({
        'b': function(value) { return value > 8; },
        'a': function(value) { return value > 1; }
      });

      actual = lodashStable.filter(objects, par);
      assert.deepStrictEqual(actual, [objects[2]]);
    });

    it('`_.' + methodName + '` should not match by inherited `source` properties', function() {
      function Foo() {
        this.a = function(value) {
          return value > 1;
        };
      }
      Foo.prototype.b = function(value) {
        return value > 8;
      };

      var objects = [
        { 'a': 1, 'b': 8 },
        { 'a': 2, 'b': 4 },
        { 'a': 3, 'b': 16 }
      ];

      var par = conforms(new Foo),
          actual = lodashStable.filter(objects, par);

      assert.deepStrictEqual(actual, [objects[1], objects[2]]);
    });

    it('`_.' + methodName + '` should not invoke `source` predicates for missing `object` properties', function() {
      var count = 0;

      var par = conforms({
        'a': function() { count++; return true; }
      });

      assert.strictEqual(par({}), false);
      assert.strictEqual(count, 0);
    });

    it('`_.' + methodName + '` should work with a function for `object`', function() {
      function Foo() {}
      Foo.a = 1;

      function Bar() {}
      Bar.a = 2;

      var par = conforms({
        'a': function(value) { return value > 1; }
      });

      assert.strictEqual(par(Foo), false);
      assert.strictEqual(par(Bar), true);
    });

    it('`_.' + methodName + '` should work with a function for `source`', function() {
      function Foo() {}
      Foo.a = function(value) { return value > 1; };

      var objects = [{ 'a': 1 }, { 'a': 2 }],
          actual = lodashStable.filter(objects, conforms(Foo));

      assert.deepStrictEqual(actual, [objects[1]]);
    });

    it('`_.' + methodName + '` should work with a non-plain `object`', function() {
      function Foo() {
        this.a = 1;
      }
      Foo.prototype.b = 2;

      var par = conforms({
        'b': function(value) { return value > 1; }
      });

      assert.strictEqual(par(new Foo), true);
    });

    it('`_.' + methodName + '` should return `false` when `object` is nullish', function() {
      var values = [, null, undefined],
          expected = lodashStable.map(values, stubFalse);

      var par = conforms({
        'a': function(value) { return value > 1; }
      });

      var actual = lodashStable.map(values, function(value, index) {
        try {
          return index ? par(value) : par();
        } catch (e) {}
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should return `true` when comparing an empty `source` to a nullish `object`', function() {
      var values = [, null, undefined],
          expected = lodashStable.map(values, stubTrue),
          par = conforms({});

      var actual = lodashStable.map(values, function(value, index) {
        try {
          return index ? par(value) : par();
        } catch (e) {}
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should return `true` when comparing an empty `source`', function() {
      var object = { 'a': 1 },
          expected = lodashStable.map(empties, stubTrue);

      var actual = lodashStable.map(empties, function(value) {
        var par = conforms(value);
        return par(object);
      });

      assert.deepStrictEqual(actual, expected);
    });
  });
});
