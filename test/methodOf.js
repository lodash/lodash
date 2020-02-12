import assert from 'assert';
import lodashStable from 'lodash';
import { stubOne, _, stubTwo, stubThree, stubFour, noop, slice } from './utils.js';
import constant from '../constant.js';

describe('methodOf', function() {
  it('should create a function that calls a method of a given key', function() {
    var object = { 'a': stubOne };

    lodashStable.each(['a', ['a']], function(path) {
      var methodOf = _.methodOf(object);
      assert.strictEqual(methodOf.length, 1);
      assert.strictEqual(methodOf(path), 1);
    });
  });

  it('should work with deep property values', function() {
    var object = { 'a': { 'b': stubTwo } };

    lodashStable.each(['a.b', ['a', 'b']], function(path) {
      var methodOf = _.methodOf(object);
      assert.strictEqual(methodOf(path), 2);
    });
  });

  it('should work with a non-string `path`', function() {
    var array = lodashStable.times(3, constant);

    lodashStable.each([1, [1]], function(path) {
      var methodOf = _.methodOf(array);
      assert.strictEqual(methodOf(path), 1);
    });
  });

  it('should coerce `path` to a string', function() {
    function fn() {}
    fn.toString = lodashStable.constant('fn');

    var expected = [1, 2, 3, 4],
        object = { 'null': stubOne, 'undefined': stubTwo, 'fn': stubThree, '[object Object]': stubFour },
        paths = [null, undefined, fn, {}];

    lodashStable.times(2, function(index) {
      var actual = lodashStable.map(paths, function(path) {
        var methodOf = _.methodOf(object);
        return methodOf(index ? [path] : path);
      });

      assert.deepStrictEqual(actual, expected);
    });
  });

  it('should work with inherited property values', function() {
    function Foo() {}
    Foo.prototype.a = stubOne;

    lodashStable.each(['a', ['a']], function(path) {
      var methodOf = _.methodOf(new Foo);
      assert.strictEqual(methodOf(path), 1);
    });
  });

  it('should use a key over a path', function() {
    var object = { 'a.b': stubOne, 'a': { 'b': stubTwo } };

    lodashStable.each(['a.b', ['a.b']], function(path) {
      var methodOf = _.methodOf(object);
      assert.strictEqual(methodOf(path), 1);
    });
  });

  it('should return `undefined` when `object` is nullish', function() {
    var values = [, null, undefined],
        expected = lodashStable.map(values, noop);

    lodashStable.each(['constructor', ['constructor']], function(path) {
      var actual = lodashStable.map(values, function(value, index) {
        var methodOf = index ? _.methodOf() : _.methodOf(value);
        return methodOf(path);
      });

      assert.deepStrictEqual(actual, expected);
    });
  });

  it('should return `undefined` for deep paths when `object` is nullish', function() {
    var values = [, null, undefined],
        expected = lodashStable.map(values, noop);

    lodashStable.each(['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']], function(path) {
      var actual = lodashStable.map(values, function(value, index) {
        var methodOf = index ? _.methodOf() : _.methodOf(value);
        return methodOf(path);
      });

      assert.deepStrictEqual(actual, expected);
    });
  });

  it('should return `undefined` if parts of `path` are missing', function() {
    var object = {},
        methodOf = _.methodOf(object);

    lodashStable.each(['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']], function(path) {
      assert.strictEqual(methodOf(path), undefined);
    });
  });

  it('should apply partial arguments to function', function() {
    var object = {
      'fn': function() {
        return slice.call(arguments);
      }
    };

    var methodOf = _.methodOf(object, 1, 2, 3);

    lodashStable.each(['fn', ['fn']], function(path) {
      assert.deepStrictEqual(methodOf(path), [1, 2, 3]);
    });
  });

  it('should invoke deep property methods with the correct `this` binding', function() {
    var object = { 'a': { 'b': function() { return this.c; }, 'c': 1 } },
        methodOf = _.methodOf(object);

    lodashStable.each(['a.b', ['a', 'b']], function(path) {
      assert.strictEqual(methodOf(path), 1);
    });
  });
});
