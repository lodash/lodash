import assert from 'assert';
import lodashStable from 'lodash';
import { _, symbol, defineProperty } from './utils.js';
import unset from '../unset.js';

describe('set methods', function() {
  lodashStable.each(['update', 'updateWith', 'set', 'setWith'], function(methodName) {
    var func = _[methodName],
        isUpdate = /^update/.test(methodName);

    var oldValue = 1,
        value = 2,
        updater = isUpdate ? lodashStable.constant(value) : value;

    it('`_.' + methodName + '` should set property values', function() {
      lodashStable.each(['a', ['a']], function(path) {
        var object = { 'a': oldValue },
            actual = func(object, path, updater);

        assert.strictEqual(actual, object);
        assert.strictEqual(object.a, value);
      });
    });

    it('`_.' + methodName + '` should preserve the sign of `0`', function() {
      var props = [-0, Object(-0), 0, Object(0)],
          expected = lodashStable.map(props, lodashStable.constant(value));

      var actual = lodashStable.map(props, function(key) {
        var object = { '-0': 'a', '0': 'b' };
        func(object, key, updater);
        return object[lodashStable.toString(key)];
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should unset symbol keyed property values', function() {
      if (Symbol) {
        var object = {};
        object[symbol] = 1;

        assert.strictEqual(unset(object, symbol), true);
        assert.ok(!(symbol in object));
      }
    });

    it('`_.' + methodName + '` should set deep property values', function() {
      lodashStable.each(['a.b', ['a', 'b']], function(path) {
        var object = { 'a': { 'b': oldValue } },
            actual = func(object, path, updater);

        assert.strictEqual(actual, object);
        assert.strictEqual(object.a.b, value);
      });
    });

    it('`_.' + methodName + '` should set a key over a path', function() {
      lodashStable.each(['a.b', ['a.b']], function(path) {
        var object = { 'a.b': oldValue },
            actual = func(object, path, updater);

        assert.strictEqual(actual, object);
        assert.deepStrictEqual(object, { 'a.b': value });
      });
    });

    it('`_.' + methodName + '` should not coerce array paths to strings', function() {
      var object = { 'a,b,c': 1, 'a': { 'b': { 'c': 1 } } };

      func(object, ['a', 'b', 'c'], updater);
      assert.strictEqual(object.a.b.c, value);
    });

    it('`_.' + methodName + '` should not ignore empty brackets', function() {
      var object = {};

      func(object, 'a[]', updater);
      assert.deepStrictEqual(object, { 'a': { '': value } });
    });

    it('`_.' + methodName + '` should handle empty paths', function() {
      lodashStable.each([['', ''], [[], ['']]], function(pair, index) {
        var object = {};

        func(object, pair[0], updater);
        assert.deepStrictEqual(object, index ? {} : { '': value });

        func(object, pair[1], updater);
        assert.deepStrictEqual(object, { '': value });
      });
    });

    it('`_.' + methodName + '` should handle complex paths', function() {
      var object = { 'a': { '1.23': { '["b"]': { 'c': { "['d']": { '\ne\n': { 'f': { 'g': oldValue } } } } } } } };

      var paths = [
        'a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g',
        ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g']
      ];

      lodashStable.each(paths, function(path) {
        func(object, path, updater);
        assert.strictEqual(object.a[-1.23]['["b"]'].c["['d']"]['\ne\n'].f.g, value);
        object.a[-1.23]['["b"]'].c["['d']"]['\ne\n'].f.g = oldValue;
      });
    });

    it('`_.' + methodName + '` should create parts of `path` that are missing', function() {
      var object = {};

      lodashStable.each(['a[1].b.c', ['a', '1', 'b', 'c']], function(path) {
        var actual = func(object, path, updater);

        assert.strictEqual(actual, object);
        assert.deepStrictEqual(actual, { 'a': [undefined, { 'b': { 'c': value } }] });
        assert.ok(!('0' in object.a));

        delete object.a;
      });
    });

    it('`_.' + methodName + '` should not error when `object` is nullish', function() {
      var values = [null, undefined],
          expected = [[null, null], [undefined, undefined]];

      var actual = lodashStable.map(values, function(value) {
        try {
          return [func(value, 'a.b', updater), func(value, ['a', 'b'], updater)];
        } catch (e) {
          return e.message;
        }
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should overwrite primitives in the path', function() {
      lodashStable.each(['a.b', ['a', 'b']], function(path) {
        var object = { 'a': '' };

        func(object, path, updater);
        assert.deepStrictEqual(object, { 'a': { 'b': 2 } });
      });
    });

    it('`_.' + methodName + '` should not create an array for missing non-index property names that start with numbers', function() {
      var object = {};

      func(object, ['1a', '2b', '3c'], updater);
      assert.deepStrictEqual(object, { '1a': { '2b': { '3c': value } } });
    });

    it('`_.' + methodName + '` should not assign values that are the same as their destinations', function() {
      lodashStable.each(['a', ['a'], { 'a': 1 }, NaN], function(value) {
        var object = {},
            pass = true,
            updater = isUpdate ? lodashStable.constant(value) : value;

        defineProperty(object, 'a', {
          'configurable': true,
          'enumerable': true,
          'get': lodashStable.constant(value),
          'set': function() { pass = false; }
        });

        func(object, 'a', updater);
        assert.ok(pass);
      });
    });
  });
});
