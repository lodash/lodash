import assert from 'assert';
import lodashStable from 'lodash';
import { identity, empties, stubFalse, stubTrue } from './utils.js';
import some from '../some.js';

describe('some', function() {
  it('should return `true` if `predicate` returns truthy for any element', function() {
    assert.strictEqual(some([false, 1, ''], identity), true);
    assert.strictEqual(some([null, 'a', 0], identity), true);
  });

  it('should return `false` for empty collections', function() {
    var expected = lodashStable.map(empties, stubFalse);

    var actual = lodashStable.map(empties, function(value) {
      try {
        return some(value, identity);
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should return `true` as soon as `predicate` returns truthy', function() {
    var count = 0;

    assert.strictEqual(some([null, true, null], function(value) {
      count++;
      return value;
    }), true);

    assert.strictEqual(count, 2);
  });

  it('should return `false` if `predicate` returns falsey for all elements', function() {
    assert.strictEqual(some([false, false, false], identity), false);
    assert.strictEqual(some([null, 0, ''], identity), false);
  });

  it('should use `_.identity` when `predicate` is nullish', function() {
    var values = [, null, undefined],
        expected = lodashStable.map(values, stubFalse);

    var actual = lodashStable.map(values, function(value, index) {
      var array = [0, 0];
      return index ? some(array, value) : some(array);
    });

    assert.deepStrictEqual(actual, expected);

    expected = lodashStable.map(values, stubTrue);
    actual = lodashStable.map(values, function(value, index) {
      var array = [0, 1];
      return index ? some(array, value) : some(array);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with `_.property` shorthands', function() {
    var objects = [{ 'a': 0, 'b': 0 }, { 'a': 0, 'b': 1 }];
    assert.strictEqual(some(objects, 'a'), false);
    assert.strictEqual(some(objects, 'b'), true);
  });

  it('should work with `_.matches` shorthands', function() {
    var objects = [{ 'a': 0, 'b': 0 }, { 'a': 1, 'b': 1}];
    assert.strictEqual(some(objects, { 'a': 0 }), true);
    assert.strictEqual(some(objects, { 'b': 2 }), false);
  });

  it('should work as an iteratee for methods like `_.map`', function() {
    var actual = lodashStable.map([[1]], some);
    assert.deepStrictEqual(actual, [true]);
  });
});
