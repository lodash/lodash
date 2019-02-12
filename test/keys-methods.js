import assert from 'assert';
import lodashStable from 'lodash';

import {
  _,
  arrayProto,
  args,
  strictArgs,
  objectProto,
  stringProto,
  primitives,
  numberProto,
  stubArray,
} from './utils.js';

describe('keys methods', function() {
  lodashStable.each(['keys', 'keysIn'], function(methodName) {
    var func = _[methodName],
        isKeys = methodName == 'keys';

    it('`_.' + methodName + '` should return the string keyed property names of `object`', function() {
      var actual = func({ 'a': 1, 'b': 1 }).sort();

      assert.deepStrictEqual(actual, ['a', 'b']);
    });

    it('`_.' + methodName + '` should ' + (isKeys ? 'not ' : '') + 'include inherited string keyed properties', function() {
      function Foo() {
        this.a = 1;
      }
      Foo.prototype.b = 2;

      var expected = isKeys ? ['a'] : ['a', 'b'],
          actual = func(new Foo).sort();

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should treat sparse arrays as dense', function() {
      var array = [1];
      array[2] = 3;

      var actual = func(array).sort();

      assert.deepStrictEqual(actual, ['0', '1', '2']);
    });

    it('`_.' + methodName + '` should return keys for custom properties on arrays', function() {
      var array = [1];
      array.a = 1;

      var actual = func(array).sort();

      assert.deepStrictEqual(actual, ['0', 'a']);
    });

    it('`_.' + methodName + '` should ' + (isKeys ? 'not ' : '') + 'include inherited string keyed properties of arrays', function() {
      arrayProto.a = 1;

      var expected = isKeys ? ['0'] : ['0', 'a'],
          actual = func([1]).sort();

      assert.deepStrictEqual(actual, expected);

      delete arrayProto.a;
    });

    it('`_.' + methodName + '` should work with `arguments` objects', function() {
      var values = [args, strictArgs],
          expected = lodashStable.map(values, lodashStable.constant(['0', '1', '2']));

      var actual = lodashStable.map(values, function(value) {
        return func(value).sort();
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should return keys for custom properties on `arguments` objects', function() {
      var values = [args, strictArgs],
          expected = lodashStable.map(values, lodashStable.constant(['0', '1', '2', 'a']));

      var actual = lodashStable.map(values, function(value) {
        value.a = 1;
        var result = func(value).sort();
        delete value.a;
        return result;
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should ' + (isKeys ? 'not ' : '') + 'include inherited string keyed properties of `arguments` objects', function() {
      var values = [args, strictArgs],
          expected = lodashStable.map(values, lodashStable.constant(isKeys ? ['0', '1', '2'] : ['0', '1', '2', 'a']));

      var actual = lodashStable.map(values, function(value) {
        objectProto.a = 1;
        var result = func(value).sort();
        delete objectProto.a;
        return result;
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should work with string objects', function() {
      var actual = func(Object('abc')).sort();

      assert.deepStrictEqual(actual, ['0', '1', '2']);
    });

    it('`_.' + methodName + '` should return keys for custom properties on string objects', function() {
      var object = Object('a');
      object.a = 1;

      var actual = func(object).sort();

      assert.deepStrictEqual(actual, ['0', 'a']);
    });

    it('`_.' + methodName + '` should ' + (isKeys ? 'not ' : '') + 'include inherited string keyed properties of string objects', function() {
      stringProto.a = 1;

      var expected = isKeys ? ['0'] : ['0', 'a'],
          actual = func(Object('a')).sort();

      assert.deepStrictEqual(actual, expected);

      delete stringProto.a;
    });

    it('`_.' + methodName + '` should work with array-like objects', function() {
      var object = { '0': 'a', 'length': 1 },
          actual = func(object).sort();

      assert.deepStrictEqual(actual, ['0', 'length']);
    });

    it('`_.' + methodName + '` should coerce primitives to objects (test in IE 9)', function() {
      var expected = lodashStable.map(primitives, function(value) {
        return typeof value == 'string' ? ['0'] : [];
      });

      var actual = lodashStable.map(primitives, func);
      assert.deepStrictEqual(actual, expected);

      // IE 9 doesn't box numbers in for-in loops.
      numberProto.a = 1;
      assert.deepStrictEqual(func(0), isKeys ? [] : ['a']);
      delete numberProto.a;
    });

    it('`_.' + methodName + '` skips the `constructor` property on prototype objects', function() {
      function Foo() {}
      Foo.prototype.a = 1;

      var expected = ['a'];
      assert.deepStrictEqual(func(Foo.prototype), expected);

      Foo.prototype = { 'constructor': Foo, 'a': 1 };
      assert.deepStrictEqual(func(Foo.prototype), expected);

      var Fake = { 'prototype': {} };
      Fake.prototype.constructor = Fake;
      assert.deepStrictEqual(func(Fake.prototype), ['constructor']);
    });

    it('`_.' + methodName + '` should return an empty array when `object` is nullish', function() {
      var values = [, null, undefined],
          expected = lodashStable.map(values, stubArray);

      var actual = lodashStable.map(values, function(value, index) {
        objectProto.a = 1;
        var result = index ? func(value) : func();
        delete objectProto.a;
        return result;
      });

      assert.deepStrictEqual(actual, expected);
    });
  });
});
