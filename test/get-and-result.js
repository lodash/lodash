import assert from 'assert';
import lodashStable from 'lodash';
import { _, symbol, noop, numberProto, empties } from './utils.js';

describe('get and result', function() {
  lodashStable.each(['get', 'result'], function(methodName) {
    var func = _[methodName];

    it('`_.' + methodName + '` should get string keyed property values', function() {
      var object = { 'a': 1 };

      lodashStable.each(['a', ['a']], function(path) {
        assert.strictEqual(func(object, path), 1);
      });
    });

    it('`_.' + methodName + '` should preserve the sign of `0`', function() {
      var object = { '-0': 'a', '0': 'b' },
          props = [-0, Object(-0), 0, Object(0)];

      var actual = lodashStable.map(props, function(key) {
        return func(object, key);
      });

      assert.deepStrictEqual(actual, ['a', 'a', 'b', 'b']);
    });

    it('`_.' + methodName + '` should get symbol keyed property values', function() {
      if (Symbol) {
        var object = {};
        object[symbol] = 1;

        assert.strictEqual(func(object, symbol), 1);
      }
    });

    it('`_.' + methodName + '` should get deep property values', function() {
      var object = { 'a': { 'b': 2 } };

      lodashStable.each(['a.b', ['a', 'b']], function(path) {
        assert.strictEqual(func(object, path), 2);
      });
    });

    it('`_.' + methodName + '` should get a key over a path', function() {
      var object = { 'a.b': 1, 'a': { 'b': 2 } };

      lodashStable.each(['a.b', ['a.b']], function(path) {
        assert.strictEqual(func(object, path), 1);
      });
    });

    it('`_.' + methodName + '` should not coerce array paths to strings', function() {
      var object = { 'a,b,c': 3, 'a': { 'b': { 'c': 4 } } };
      assert.strictEqual(func(object, ['a', 'b', 'c']), 4);
    });

    it('`_.' + methodName + '` should not ignore empty brackets', function() {
      var object = { 'a': { '': 1 } };
      assert.strictEqual(func(object, 'a[]'), 1);
    });

    it('`_.' + methodName + '` should handle empty paths', function() {
      lodashStable.each([['', ''], [[], ['']]], function(pair) {
        assert.strictEqual(func({}, pair[0]), undefined);
        assert.strictEqual(func({ '': 3 }, pair[1]), 3);
      });
    });

    it('`_.' + methodName + '` should handle complex paths', function() {
      var object = { 'a': { '-1.23': { '["b"]': { 'c': { "['d']": { '\ne\n': { 'f': { 'g': 8 } } } } } } } };

      var paths = [
        'a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g',
        ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g']
      ];

      lodashStable.each(paths, function(path) {
        assert.strictEqual(func(object, path), 8);
      });
    });

    it('`_.' + methodName + '` should return `undefined` when `object` is nullish', function() {
      lodashStable.each(['constructor', ['constructor']], function(path) {
        assert.strictEqual(func(null, path), undefined);
        assert.strictEqual(func(undefined, path), undefined);
      });
    });

    it('`_.' + methodName + '` should return `undefined` for deep paths when `object` is nullish', function() {
      var values = [null, undefined],
          expected = lodashStable.map(values, noop),
          paths = ['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']];

      lodashStable.each(paths, function(path) {
        var actual = lodashStable.map(values, function(value) {
          return func(value, path);
        });

        assert.deepStrictEqual(actual, expected);
      });
    });

    it('`_.' + methodName + '` should return `undefined` if parts of `path` are missing', function() {
      var object = { 'a': [, null] };

      lodashStable.each(['a[1].b.c', ['a', '1', 'b', 'c']], function(path) {
        assert.strictEqual(func(object, path), undefined);
      });
    });

    it('`_.' + methodName + '` should be able to return `null` values', function() {
      var object = { 'a': { 'b': null } };

      lodashStable.each(['a.b', ['a', 'b']], function(path) {
        assert.strictEqual(func(object, path), null);
      });
    });

    it('`_.' + methodName + '` should follow `path` over non-plain objects', function() {
      var paths = ['a.b', ['a', 'b']];

      lodashStable.each(paths, function(path) {
        numberProto.a = { 'b': 2 };
        assert.strictEqual(func(0, path), 2);
        delete numberProto.a;
      });
    });

    it('`_.' + methodName + '` should return the default value for `undefined` values', function() {
      var object = { 'a': {} },
          values = empties.concat(true, new Date, 1, /x/, 'a'),
          expected = lodashStable.map(values, function(value) { return [value, value]; });

      lodashStable.each(['a.b', ['a', 'b']], function(path) {
        var actual = lodashStable.map(values, function(value) {
          return [func(object, path, value), func(null, path, value)];
        });

        assert.deepStrictEqual(actual, expected);
      });
    });

    it('`_.' + methodName + '` should return the default value when `path` is empty', function() {
      assert.strictEqual(func({}, [], 'a'), 'a');
    });
  });
});
