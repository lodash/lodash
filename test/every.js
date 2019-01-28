import assert from 'assert';
import lodashStable from 'lodash';
import { identity, empties, stubTrue, stubFalse } from './utils.js';
import every from '../every.js';

describe('every', function() {
  it('should return `true` if `predicate` returns truthy for all elements', function() {
    assert.strictEqual(lodashStable.every([true, 1, 'a'], identity), true);
  });

  it('should return `true` for empty collections', function() {
    var expected = lodashStable.map(empties, stubTrue);

    var actual = lodashStable.map(empties, function(value) {
      try {
        return every(value, identity);
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should return `false` as soon as `predicate` returns falsey', function() {
    var count = 0;

    assert.strictEqual(every([true, null, true], function(value) {
      count++;
      return value;
    }), false);

    assert.strictEqual(count, 2);
  });

  it('should work with collections of `undefined` values (test in IE < 9)', function() {
    assert.strictEqual(every([undefined, undefined, undefined], identity), false);
  });

  it('should use `_.identity` when `predicate` is nullish', function() {
    var values = [, null, undefined],
        expected = lodashStable.map(values, stubFalse);

    var actual = lodashStable.map(values, function(value, index) {
      var array = [0];
      return index ? every(array, value) : every(array);
    });

    assert.deepStrictEqual(actual, expected);

    expected = lodashStable.map(values, stubTrue);
    actual = lodashStable.map(values, function(value, index) {
      var array = [1];
      return index ? every(array, value) : every(array);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with `_.property` shorthands', function() {
    var objects = [{ 'a': 0, 'b': 1 }, { 'a': 1, 'b': 2 }];
    assert.strictEqual(every(objects, 'a'), false);
    assert.strictEqual(every(objects, 'b'), true);
  });

  it('should work with `_.matches` shorthands', function() {
    var objects = [{ 'a': 0, 'b': 0 }, { 'a': 0, 'b': 1 }];
    assert.strictEqual(every(objects, { 'a': 0 }), true);
    assert.strictEqual(every(objects, { 'b': 1 }), false);
  });

  it('should work as an iteratee for methods like `_.map`', function() {
    var actual = lodashStable.map([[1]], every);
    assert.deepStrictEqual(actual, [true]);
  });
});
