import assert from 'assert';
import lodashStable from 'lodash';
import { noop, stubA, stubB, stubOne } from './utils.js';
import invoke from '../invoke.js';

describe('invoke', function() {
  it('should invoke a method on `object`', function() {
    var object = { 'a': lodashStable.constant('A') },
        actual = invoke(object, 'a');

    assert.strictEqual(actual, 'A');
  });

  it('should support invoking with arguments', function() {
    var object = { 'a': function(a, b) { return [a, b]; } },
        actual = invoke(object, 'a', 1, 2);

    assert.deepStrictEqual(actual, [1, 2]);
  });

  it('should not error on nullish elements', function() {
    var values = [null, undefined],
        expected = lodashStable.map(values, noop);

    var actual = lodashStable.map(values, function(value) {
      try {
        return invoke(value, 'a.b', 1, 2);
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should preserve the sign of `0`', function() {
    var object = { '-0': stubA, '0': stubB },
        props = [-0, Object(-0), 0, Object(0)];

    var actual = lodashStable.map(props, function(key) {
      return invoke(object, key);
    });

    assert.deepStrictEqual(actual, ['a', 'a', 'b', 'b']);
  });

  it('should support deep paths', function() {
    var object = { 'a': { 'b': function(a, b) { return [a, b]; } } };

    lodashStable.each(['a.b', ['a', 'b']], function(path) {
      var actual = invoke(object, path, 1, 2);
      assert.deepStrictEqual(actual, [1, 2]);
    });
  });

  it('should invoke deep property methods with the correct `this` binding', function() {
    var object = { 'a': { 'b': function() { return this.c; }, 'c': 1 } };

    lodashStable.each(['a.b', ['a', 'b']], function(path) {
      assert.deepStrictEqual(invoke(object, path), 1);
    });
  });

  it('should return an unwrapped value when implicitly chaining', function() {
    var object = { 'a': stubOne };
    assert.strictEqual(_(object).invoke('a'), 1);
  });

  it('should return a wrapped value when explicitly chaining', function() {
    var object = { 'a': stubOne };
    assert.ok(_(object).chain().invoke('a') instanceof _);
  });
});
