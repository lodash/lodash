import assert from 'assert';
import { slice } from './utils.js';
import dropRightWhile from '../dropRightWhile.js';

describe('dropRightWhile', function() {
  var array = [1, 2, 3, 4];

  var objects = [
    { 'a': 0, 'b': 0 },
    { 'a': 1, 'b': 1 },
    { 'a': 2, 'b': 2 }
  ];

  it('should drop elements while `predicate` returns truthy', function() {
    var actual = dropRightWhile(array, function(n) {
      return n > 2;
    });

    assert.deepStrictEqual(actual, [1, 2]);
  });

  it('should provide correct `predicate` arguments', function() {
    var args;

    dropRightWhile(array, function() {
      args = slice.call(arguments);
    });

    assert.deepStrictEqual(args, [4, 3, array]);
  });

  it('should work with `_.matches` shorthands', function() {
    assert.deepStrictEqual(dropRightWhile(objects, { 'b': 2 }), objects.slice(0, 2));
  });

  it('should work with `_.matchesProperty` shorthands', function() {
    assert.deepStrictEqual(dropRightWhile(objects, ['b', 2]), objects.slice(0, 2));
  });

  it('should work with `_.property` shorthands', function() {
    assert.deepStrictEqual(dropRightWhile(objects, 'b'), objects.slice(0, 1));
  });

  it('should return a wrapped value when chaining', function() {
    var wrapped = _(array).dropRightWhile(function(n) {
      return n > 2;
    });

    assert.ok(wrapped instanceof _);
    assert.deepEqual(wrapped.value(), [1, 2]);
  });
});
