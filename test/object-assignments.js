import assert from 'assert';
import lodashStable from 'lodash';
import { _, primitives, stubTrue, defineProperty, slice } from './utils.js';
import has from '../has.js';

describe('object assignments', function() {
  lodashStable.each(['assign', 'assignIn', 'defaults', 'defaultsDeep', 'merge'], function(methodName) {
    var func = _[methodName],
        isAssign = methodName == 'assign',
        isDefaults = /^defaults/.test(methodName);

    it('`_.' + methodName + '` should coerce primitives to objects', function() {
      var expected = lodashStable.map(primitives, function(value) {
        var object = Object(value);
        object.a = 1;
        return object;
      });

      var actual = lodashStable.map(primitives, function(value) {
        return func(value, { 'a': 1 });
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should assign own ' + (isAssign ? '' : 'and inherited ') + 'string keyed source properties', function() {
      function Foo() {
        this.a = 1;
      }
      Foo.prototype.b = 2;

      var expected = isAssign ? { 'a': 1 } : { 'a': 1, 'b': 2 };
      assert.deepStrictEqual(func({}, new Foo), expected);
    });

    it('`_.' + methodName + '` should not skip a trailing function source', function() {
      function fn() {}
      fn.b = 2;

      assert.deepStrictEqual(func({}, { 'a': 1 }, fn), { 'a': 1, 'b': 2 });
    });

    it('`_.' + methodName + '` should not error on nullish sources', function() {
      try {
        assert.deepStrictEqual(func({ 'a': 1 }, undefined, { 'b': 2 }, null), { 'a': 1, 'b': 2 });
      } catch (e) {
        assert.ok(false, e.message);
      }
    });

    it('`_.' + methodName + '` should create an object when `object` is nullish', function() {
      var source = { 'a': 1 },
          values = [null, undefined],
          expected = lodashStable.map(values, stubTrue);

      var actual = lodashStable.map(values, function(value) {
        var object = func(value, source);
        return object !== source && lodashStable.isEqual(object, source);
      });

      assert.deepStrictEqual(actual, expected);

      actual = lodashStable.map(values, function(value) {
        return lodashStable.isEqual(func(value), {});
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should work as an iteratee for methods like `_.reduce`', function() {
      var array = [{ 'a': 1 }, { 'b': 2 }, { 'c': 3 }],
          expected = { 'a': isDefaults ? 0 : 1, 'b': 2, 'c': 3 };

      function fn() {}
      fn.a = array[0];
      fn.b = array[1];
      fn.c = array[2];

      assert.deepStrictEqual(lodashStable.reduce(array, func, { 'a': 0 }), expected);
      assert.deepStrictEqual(lodashStable.reduce(fn, func, { 'a': 0 }), expected);
    });

    it('`_.' + methodName + '` should not return the existing wrapped value when chaining', function() {
      var wrapped = _({ 'a': 1 }),
          actual = wrapped[methodName]({ 'b': 2 });

      assert.notStrictEqual(actual, wrapped);
    });
  });

  lodashStable.each(['assign', 'assignIn', 'merge'], function(methodName) {
    var func = _[methodName];

    it('`_.' + methodName + '` should not treat `object` as `source`', function() {
      function Foo() {}
      Foo.prototype.a = 1;

      var actual = func(new Foo, { 'b': 2 });
      assert.ok(!has(actual, 'a'));
    });
  });

  lodashStable.each(['assign', 'assignIn', 'assignInWith', 'assignWith', 'defaults', 'defaultsDeep', 'merge', 'mergeWith'], function(methodName) {
    var func = _[methodName];

    it('`_.' + methodName + '` should not assign values that are the same as their destinations', function() {
      lodashStable.each(['a', ['a'], { 'a': 1 }, NaN], function(value) {
        var object = {},
            pass = true;

        defineProperty(object, 'a', {
          'configurable': true,
          'enumerable': true,
          'get': lodashStable.constant(value),
          'set': function() { pass = false; }
        });

        func(object, { 'a': value });
        assert.ok(pass);
      });
    });
  });

  lodashStable.each(['assignWith', 'assignInWith', 'mergeWith'], function(methodName) {
    var func = _[methodName],
        isMergeWith = methodName == 'mergeWith';

    it('`_.' + methodName + '` should provide correct `customizer` arguments', function() {
      var args,
          object = { 'a': 1 },
          source = { 'a': 2 },
          expected = lodashStable.map([1, 2, 'a', object, source], lodashStable.cloneDeep);

      func(object, source, function() {
        args || (args = lodashStable.map(slice.call(arguments, 0, 5), lodashStable.cloneDeep));
      });

      assert.deepStrictEqual(args, expected, 'primitive values');

      var argsList = [],
          objectValue = [1, 2],
          sourceValue = { 'b': 2 };

      object = { 'a': objectValue };
      source = { 'a': sourceValue };
      expected = [lodashStable.map([objectValue, sourceValue, 'a', object, source], lodashStable.cloneDeep)];

      if (isMergeWith) {
        expected.push(lodashStable.map([undefined, 2, 'b', objectValue, sourceValue], lodashStable.cloneDeep));
      }
      func(object, source, function() {
        argsList.push(lodashStable.map(slice.call(arguments, 0, 5), lodashStable.cloneDeep));
      });

      assert.deepStrictEqual(argsList, expected, 'object values');

      args = undefined;
      object = { 'a': 1 };
      source = { 'b': 2 };
      expected = lodashStable.map([undefined, 2, 'b', object, source], lodashStable.cloneDeep);

      func(object, source, function() {
        args || (args = lodashStable.map(slice.call(arguments, 0, 5), lodashStable.cloneDeep));
      });

      assert.deepStrictEqual(args, expected, 'undefined properties');
    });

    it('`_.' + methodName + '` should not treat the second argument as a `customizer` callback', function() {
      function callback() {}
      callback.b = 2;

      var actual = func({ 'a': 1 }, callback);
      assert.deepStrictEqual(actual, { 'a': 1, 'b': 2 });

      actual = func({ 'a': 1 }, callback, { 'c': 3 });
      assert.deepStrictEqual(actual, { 'a': 1, 'b': 2, 'c': 3 });
    });
  });
});
