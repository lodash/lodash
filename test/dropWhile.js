import assert from 'assert';
import lodashStable from 'lodash';
import { slice, LARGE_ARRAY_SIZE } from './utils.js';
import dropWhile from '../dropWhile.js';

describe('dropWhile', function() {
  let array = [1, 2, 3, 4];

  let objects = [
    { 'a': 2, 'b': 2 },
    { 'a': 1, 'b': 1 },
    { 'a': 0, 'b': 0 }
  ];

  it('should drop elements while `predicate` returns truthy', function() {
    let actual = dropWhile(array, function(n) {
      return n < 3;
    });

    assert.deepStrictEqual(actual, [3, 4]);
  });

  it('should provide correct `predicate` arguments', function() {
    let args;

    dropWhile(array, function() {
      args = slice.call(arguments);
    });

    assert.deepStrictEqual(args, [1, 0, array]);
  });

  it('should work with `_.matches` shorthands', function() {
    assert.deepStrictEqual(dropWhile(objects, { 'b': 2 }), objects.slice(1));
  });

  it('should work with `_.matchesProperty` shorthands', function() {
    assert.deepStrictEqual(dropWhile(objects, ['b', 2]), objects.slice(1));
  });

  it('should work with `_.property` shorthands', function() {
    assert.deepStrictEqual(dropWhile(objects, 'b'), objects.slice(2));
  });

  it('should work in a lazy sequence', function() {
    let array = lodashStable.range(1, LARGE_ARRAY_SIZE + 3),
        predicate = function(n) { return n < 3; },
        expected = dropWhile(array, predicate),
        wrapped = _(array).dropWhile(predicate);

    assert.deepEqual(wrapped.value(), expected);
    assert.deepEqual(wrapped.reverse().value(), expected.slice().reverse());
    assert.strictEqual(wrapped.last(), _.last(expected));
  });

  it('should work in a lazy sequence with `drop`', function() {
    let array = lodashStable.range(1, LARGE_ARRAY_SIZE + 3);

    let actual = _(array)
      .dropWhile(function(n) { return n == 1; })
      .drop()
      .dropWhile(function(n) { return n == 3; })
      .value();

    assert.deepEqual(actual, array.slice(3));
  });
});
