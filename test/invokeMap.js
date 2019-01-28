import assert from 'assert';
import lodashStable from 'lodash';
import { slice, stubOne } from './utils.js';
import invokeMap from '../invokeMap.js';

describe('invokeMap', function() {
  it('should invoke a methods on each element of `collection`', function() {
    var array = ['a', 'b', 'c'],
        actual = invokeMap(array, 'toUpperCase');

    assert.deepStrictEqual(actual, ['A', 'B', 'C']);
  });

  it('should support invoking with arguments', function() {
    var array = [function() { return slice.call(arguments); }],
        actual = invokeMap(array, 'call', null, 'a', 'b', 'c');

    assert.deepStrictEqual(actual, [['a', 'b', 'c']]);
  });

  it('should work with a function for `methodName`', function() {
    var array = ['a', 'b', 'c'];

    var actual = invokeMap(array, function(left, right) {
      return left + this.toUpperCase() + right;
    }, '(', ')');

    assert.deepStrictEqual(actual, ['(A)', '(B)', '(C)']);
  });

  it('should work with an object for `collection`', function() {
    var object = { 'a': 1, 'b': 2, 'c': 3 },
        actual = invokeMap(object, 'toFixed', 1);

    assert.deepStrictEqual(actual, ['1.0', '2.0', '3.0']);
  });

  it('should treat number values for `collection` as empty', function() {
    assert.deepStrictEqual(invokeMap(1), []);
  });

  it('should not error on nullish elements', function() {
    var array = ['a', null, undefined, 'd'];

    try {
      var actual = invokeMap(array, 'toUpperCase');
    } catch (e) {}

    assert.deepStrictEqual(actual, ['A', undefined, undefined, 'D']);
  });

  it('should not error on elements with missing properties', function() {
    var objects = lodashStable.map([null, undefined, stubOne], function(value) {
      return { 'a': value };
    });

    var expected = lodashStable.map(objects, function(object) {
      return object.a ? object.a() : undefined;
    });

    try {
      var actual = invokeMap(objects, 'a');
    } catch (e) {}

    assert.deepStrictEqual(actual, expected);
  });

  it('should invoke deep property methods with the correct `this` binding', function() {
    var object = { 'a': { 'b': function() { return this.c; }, 'c': 1 } };

    lodashStable.each(['a.b', ['a', 'b']], function(path) {
      assert.deepStrictEqual(invokeMap([object], path), [1]);
    });
  });

  it('should return a wrapped value when chaining', function() {
    var array = ['a', 'b', 'c'],
        wrapped = _(array),
        actual = wrapped.invokeMap('toUpperCase');

    assert.ok(actual instanceof _);
    assert.deepEqual(actual.valueOf(), ['A', 'B', 'C']);

    actual = wrapped.invokeMap(function(left, right) {
      return left + this.toUpperCase() + right;
    }, '(', ')');

    assert.ok(actual instanceof _);
    assert.deepEqual(actual.valueOf(), ['(A)', '(B)', '(C)']);
  });

  it('should support shortcut fusion', function() {
    var count = 0,
        method = function() { count++; return this.index; };

    var array = lodashStable.times(LARGE_ARRAY_SIZE, function(index) {
      return { 'index': index, 'method': method };
    });

    var actual = _(array).invokeMap('method').take(1).value();

    assert.strictEqual(count, 1);
    assert.deepEqual(actual, [0]);
  });
});
