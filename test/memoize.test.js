import assert from 'assert';
import lodashStable from 'lodash';
import { noop, stubTrue, identity } from './utils.js';
import memoize from '../memoize.js';
import isFunction from '../isFunction.js';

describe('memoize', function() {
  function CustomCache() {
    this.clear();
  }

  CustomCache.prototype = {
    'clear': function() {
      this.__data__ = [];
      return this;
    },
    'get': function(key) {
      var entry = lodashStable.find(this.__data__, ['key', key]);
      return entry && entry.value;
    },
    'has': function(key) {
      return lodashStable.some(this.__data__, ['key', key]);
    },
    'set': function(key, value) {
      this.__data__.push({ 'key': key, 'value': value });
      return this;
    }
  };

  function ImmutableCache() {
    this.__data__ = [];
  }

  ImmutableCache.prototype = lodashStable.create(CustomCache.prototype, {
    'constructor': ImmutableCache,
    'clear': function() {
      return new ImmutableCache;
    },
    'set': function(key, value) {
      var result = new ImmutableCache;
      result.__data__ = this.__data__.concat({ 'key': key, 'value': value });
      return result;
    }
  });

  it('should memoize results based on the first argument given', function() {
    var memoized = memoize(function(a, b, c) {
      return a + b + c;
    });

    assert.strictEqual(memoized(1, 2, 3), 6);
    assert.strictEqual(memoized(1, 3, 5), 6);
  });

  it('should support a `resolver`', function() {
    var fn = function(a, b, c) { return a + b + c; },
        memoized = memoize(fn, fn);

    assert.strictEqual(memoized(1, 2, 3), 6);
    assert.strictEqual(memoized(1, 3, 5), 9);
  });

  it('should use `this` binding of function for `resolver`', function() {
    var fn = function(a, b, c) { return a + this.b + this.c; },
        memoized = memoize(fn, fn);

    var object = { 'memoized': memoized, 'b': 2, 'c': 3 };
    assert.strictEqual(object.memoized(1), 6);

    object.b = 3;
    object.c = 5;
    assert.strictEqual(object.memoized(1), 9);
  });

  it('should throw a TypeError if `resolve` is truthy and not a function', function() {
    assert.throws(function() { memoize(noop, true); }, TypeError);
  });

  it('should not error if `resolver` is nullish', function() {
    var values = [, null, undefined],
        expected = lodashStable.map(values, stubTrue);

    var actual = lodashStable.map(values, function(resolver, index) {
      try {
        return isFunction(index ? memoize(noop, resolver) : memoize(noop));
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should check cache for own properties', function() {
    var props = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf'
    ];

    var memoized = memoize(identity);

    var actual = lodashStable.map(props, function(value) {
      return memoized(value);
    });

    assert.deepStrictEqual(actual, props);
  });

  it('should cache the `__proto__` key', function() {
    var array = [],
        key = '__proto__';

    lodashStable.times(2, function(index) {
      var count = 0,
          resolver = index ? identity : undefined;

      var memoized = memoize(function() {
        count++;
        return array;
      }, resolver);

      var cache = memoized.cache;

      memoized(key);
      memoized(key);

      assert.strictEqual(count, 1);
      assert.strictEqual(cache.get(key), array);
      assert.ok(!(cache.__data__ instanceof Array));
      assert.strictEqual(cache.delete(key), true);
    });
  });

  it('should allow `_.memoize.Cache` to be customized', function() {
    var oldCache = memoize.Cache;
    memoize.Cache = CustomCache;

    var memoized = memoize(function(object) {
      return object.id;
    });

    var cache = memoized.cache,
        key1 = { 'id': 'a' },
        key2 = { 'id': 'b' };

    assert.strictEqual(memoized(key1), 'a');
    assert.strictEqual(cache.has(key1), true);

    assert.strictEqual(memoized(key2), 'b');
    assert.strictEqual(cache.has(key2), true);

    memoize.Cache = oldCache;
  });

  it('should works with an immutable `_.memoize.Cache` ', function() {
    var oldCache = memoize.Cache;
    memoize.Cache = ImmutableCache;

    var memoized = memoize(function(object) {
      return object.id;
    });

    var key1 = { 'id': 'a' },
        key2 = { 'id': 'b' };

    memoized(key1);
    memoized(key2);

    var cache = memoized.cache;
    assert.strictEqual(cache.has(key1), true);
    assert.strictEqual(cache.has(key2), true);

    memoize.Cache = oldCache;
  });
});
