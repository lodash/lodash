import assert from 'assert';
import lodashStable from 'lodash';
import { stubTrue, stubFalse, noop, numberProto } from './utils.js';
import matchesProperty from '../matchesProperty.js';

describe('matchesProperty', function() {
  it('should create a function that performs a deep comparison between a property value and `srcValue`', function() {
    var object = { 'a': 1, 'b': 2, 'c': 3 },
        matches = matchesProperty('a', 1);

    assert.strictEqual(matches.length, 1);
    assert.strictEqual(matches(object), true);

    matches = matchesProperty('b', 3);
    assert.strictEqual(matches(object), false);

    matches = matchesProperty('a', { 'a': 1, 'c': 3 });
    assert.strictEqual(matches({ 'a': object }), true);

    matches = matchesProperty('a', { 'c': 3, 'd': 4 });
    assert.strictEqual(matches(object), false);

    object = { 'a': { 'b': { 'c': 1, 'd': 2 }, 'e': 3 }, 'f': 4 };
    matches = matchesProperty('a', { 'b': { 'c': 1 } });

    assert.strictEqual(matches(object), true);
  });

  it('should support deep paths', function() {
    var object = { 'a': { 'b': 2 } };

    lodashStable.each(['a.b', ['a', 'b']], function(path) {
      var matches = matchesProperty(path, 2);
      assert.strictEqual(matches(object), true);
    });
  });

  it('should work with a non-string `path`', function() {
    var array = [1, 2, 3];

    lodashStable.each([1, [1]], function(path) {
      var matches = matchesProperty(path, 2);
      assert.strictEqual(matches(array), true);
    });
  });

  it('should preserve the sign of `0`', function() {
    var object1 = { '-0': 'a' },
        object2 = { '0': 'b' },
        pairs = [[object1, object2], [object1, object2], [object2, object1], [object2, object1]],
        props = [-0, Object(-0), 0, Object(0)],
        values = ['a', 'a', 'b', 'b'],
        expected = lodashStable.map(props, lodashStable.constant([true, false]));

    var actual = lodashStable.map(props, function(key, index) {
      var matches = matchesProperty(key, values[index]),
          pair = pairs[index];

      return [matches(pair[0]), matches(pair[1])];
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should coerce `path` to a string', function() {
    function fn() {}
    fn.toString = lodashStable.constant('fn');

    var object = { 'null': 1, 'undefined': 2, 'fn': 3, '[object Object]': 4 },
        paths = [null, undefined, fn, {}],
        expected = lodashStable.map(paths, stubTrue);

    lodashStable.times(2, function(index) {
      var actual = lodashStable.map(paths, function(path) {
        var matches = matchesProperty(index ? [path] : path, object[path]);
        return matches(object);
      });

      assert.deepStrictEqual(actual, expected);
    });
  });

  it('should match a key over a path', function() {
    var object = { 'a.b': 1, 'a': { 'b': 2 } };

    lodashStable.each(['a.b', ['a.b']], function(path) {
      var matches = matchesProperty(path, 1);
      assert.strictEqual(matches(object), true);
    });
  });

  it('should return `false` when `object` is nullish', function() {
    var values = [, null, undefined],
        expected = lodashStable.map(values, stubFalse);

    lodashStable.each(['constructor', ['constructor']], function(path) {
      var matches = matchesProperty(path, 1);

      var actual = lodashStable.map(values, function(value, index) {
        try {
          return index ? matches(value) : matches();
        } catch (e) {}
      });

      assert.deepStrictEqual(actual, expected);
    });
  });

  it('should return `false` for deep paths when `object` is nullish', function() {
    var values = [, null, undefined],
        expected = lodashStable.map(values, stubFalse);

    lodashStable.each(['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']], function(path) {
      var matches = matchesProperty(path, 1);

      var actual = lodashStable.map(values, function(value, index) {
        try {
          return index ? matches(value) : matches();
        } catch (e) {}
      });

      assert.deepStrictEqual(actual, expected);
    });
  });

  it('should return `false` if parts of `path` are missing', function() {
    var object = {};

    lodashStable.each(['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']], function(path) {
      var matches = matchesProperty(path, 1);
      assert.strictEqual(matches(object), false);
    });
  });

  it('should match inherited string keyed `srcValue` properties', function() {
    function Foo() {}
    Foo.prototype.b = 2;

    var object = { 'a': new Foo };

    lodashStable.each(['a', ['a']], function(path) {
      var matches = matchesProperty(path, { 'b': 2 });
      assert.strictEqual(matches(object), true);
    });
  });

  it('should not match by inherited `srcValue` properties', function() {
    function Foo() {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    var objects = [{ 'a': { 'a': 1 } }, { 'a': { 'a': 1, 'b': 2 } }],
        expected = lodashStable.map(objects, stubTrue);

    lodashStable.each(['a', ['a']], function(path) {
      assert.deepStrictEqual(lodashStable.map(objects, matchesProperty(path, new Foo)), expected);
    });
  });

  it('should compare a variety of values', function() {
    var object1 = { 'a': false, 'b': true, 'c': '3', 'd': 4, 'e': [5], 'f': { 'g': 6 } },
        object2 = { 'a': 0, 'b': 1, 'c': 3, 'd': '4', 'e': ['5'], 'f': { 'g': '6' } },
        matches = matchesProperty('a', object1);

    assert.strictEqual(matches({ 'a': object1 }), true);
    assert.strictEqual(matches({ 'a': object2 }), false);
  });

  it('should match `-0` as `0`', function() {
    var matches = matchesProperty('a', -0);
    assert.strictEqual(matches({ 'a': 0 }), true);

    matches = matchesProperty('a', 0);
    assert.strictEqual(matches({ 'a': -0 }), true);
  });

  it('should compare functions by reference', function() {
    var object1 = { 'a': lodashStable.noop },
        object2 = { 'a': noop },
        object3 = { 'a': {} },
        matches = matchesProperty('a', object1);

    assert.strictEqual(matches({ 'a': object1 }), true);
    assert.strictEqual(matches({ 'a': object2 }), false);
    assert.strictEqual(matches({ 'a': object3 }), false);
  });

  it('should work with a function for `srcValue`', function() {
    function Foo() {}
    Foo.a = 1;
    Foo.b = function() {};
    Foo.c = 3;

    var objects = [{ 'a': { 'a': 1 } }, { 'a': { 'a': 1, 'b': Foo.b, 'c': 3 } }],
        actual = lodashStable.map(objects, matchesProperty('a', Foo));

    assert.deepStrictEqual(actual, [false, true]);
  });

  it('should work with a non-plain `srcValue`', function() {
    function Foo(object) { lodashStable.assign(this, object); }

    var object = new Foo({ 'a': new Foo({ 'b': 1, 'c': 2 }) }),
        matches = matchesProperty('a', { 'b': 1 });

    assert.strictEqual(matches(object), true);
  });

  it('should partial match arrays', function() {
    var objects = [{ 'a': ['b'] }, { 'a': ['c', 'd'] }],
        actual = lodashStable.filter(objects, matchesProperty('a', ['d']));

    assert.deepStrictEqual(actual, [objects[1]]);

    actual = lodashStable.filter(objects, matchesProperty('a', ['b', 'd']));
    assert.deepStrictEqual(actual, []);

    actual = lodashStable.filter(objects, matchesProperty('a', ['d', 'b']));
    assert.deepStrictEqual(actual, []);
  });

  it('should partial match arrays with duplicate values', function() {
    var objects = [{ 'a': [1, 2] }, { 'a': [2, 2] }],
        actual = lodashStable.filter(objects, matchesProperty('a', [2, 2]));

    assert.deepStrictEqual(actual, [objects[1]]);
  });

  it('should partial match arrays of objects', function() {
    var objects = [
      { 'a': [{ 'a': 1, 'b': 2 }, { 'a': 4, 'b': 5, 'c': 6 }] },
      { 'a': [{ 'a': 1, 'b': 2 }, { 'a': 4, 'b': 6, 'c': 7 }] }
    ];

    var actual = lodashStable.filter(objects, matchesProperty('a', [{ 'a': 1 }, { 'a': 4, 'b': 5 }]));
    assert.deepStrictEqual(actual, [objects[0]]);
  });
  it('should partial match maps', function() {
    if (Map) {
      var objects = [{ 'a': new Map }, { 'a': new Map }];
      objects[0].a.set('a', 1);
      objects[1].a.set('a', 1);
      objects[1].a.set('b', 2);

      var map = new Map;
      map.set('b', 2);
      var actual = lodashStable.filter(objects, matchesProperty('a', map));

      assert.deepStrictEqual(actual, [objects[1]]);

      map.delete('b');
      actual = lodashStable.filter(objects, matchesProperty('a', map));

      assert.deepStrictEqual(actual, objects);

      map.set('c', 3);
      actual = lodashStable.filter(objects, matchesProperty('a', map));

      assert.deepStrictEqual(actual, []);
    }
  });

  it('should partial match sets', function() {
    if (Set) {
      var objects = [{ 'a': new Set }, { 'a': new Set }];
      objects[0].a.add(1);
      objects[1].a.add(1);
      objects[1].a.add(2);

      var set = new Set;
      set.add(2);
      var actual = lodashStable.filter(objects, matchesProperty('a', set));

      assert.deepStrictEqual(actual, [objects[1]]);

      set.delete(2);
      actual = lodashStable.filter(objects, matchesProperty('a', set));

      assert.deepStrictEqual(actual, objects);

      set.add(3);
      actual = lodashStable.filter(objects, matchesProperty('a', set));

      assert.deepStrictEqual(actual, []);
    }
  });

  it('should match `undefined` values', function() {
    var objects = [{ 'a': 1 }, { 'a': 1, 'b': 1 }, { 'a': 1, 'b': undefined }],
        actual = lodashStable.map(objects, matchesProperty('b', undefined)),
        expected = [false, false, true];

    assert.deepStrictEqual(actual, expected);

    objects = [{ 'a': { 'a': 1 } }, { 'a': { 'a': 1, 'b': 1 } }, { 'a': { 'a': 1, 'b': undefined } }];
    actual = lodashStable.map(objects, matchesProperty('a', { 'b': undefined }));

    assert.deepStrictEqual(actual, expected);
  });

  it('should match `undefined` values of nested objects', function() {
    var object = { 'a': { 'b': undefined } };

    lodashStable.each(['a.b', ['a', 'b']], function(path) {
      var matches = matchesProperty(path, undefined);
      assert.strictEqual(matches(object), true);
    });

    lodashStable.each(['a.a', ['a', 'a']], function(path) {
      var matches = matchesProperty(path, undefined);
      assert.strictEqual(matches(object), false);
    });
  });

  it('should match `undefined` values on primitives', function() {
    numberProto.a = 1;
    numberProto.b = undefined;

    try {
      var matches = matchesProperty('b', undefined);
      assert.strictEqual(matches(1), true);
    } catch (e) {
      assert.ok(false, e.message);
    }
    numberProto.a = { 'b': 1, 'c': undefined };
    try {
      matches = matchesProperty('a', { 'c': undefined });
      assert.strictEqual(matches(1), true);
    } catch (e) {
      assert.ok(false, e.message);
    }
    delete numberProto.a;
    delete numberProto.b;
  });

  it('should return `true` when comparing a `srcValue` of empty arrays and objects', function() {
    var objects = [{ 'a': [1], 'b': { 'c': 1 } }, { 'a': [2, 3], 'b': { 'd': 2 } }],
        matches = matchesProperty('a', { 'a': [], 'b': {} });

    var actual = lodashStable.filter(objects, function(object) {
      return matches({ 'a': object });
    });

    assert.deepStrictEqual(actual, objects);
  });

  it('should not change behavior if `srcValue` is modified', function() {
    lodashStable.each([{ 'a': { 'b': 2, 'c': 3 } }, { 'a': 1, 'b': 2 }, { 'a': 1 }], function(source, index) {
      var object = lodashStable.cloneDeep(source),
          matches = matchesProperty('a', source);

      assert.strictEqual(matches({ 'a': object }), true);

      if (index) {
        source.a = 2;
        source.b = 1;
        source.c = 3;
      } else {
        source.a.b = 1;
        source.a.c = 2;
        source.a.d = 3;
      }
      assert.strictEqual(matches({ 'a': object }), true);
      assert.strictEqual(matches({ 'a': source }), false);
    });
  });
});
