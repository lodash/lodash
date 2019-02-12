import assert from 'assert';
import lodashStable from 'lodash';
import { slice, LARGE_ARRAY_SIZE, square } from './utils.js';
import takeWhile from '../takeWhile.js';

describe('takeWhile', function() {
  var array = [1, 2, 3, 4];

  var objects = [
    { 'a': 2, 'b': 2 },
    { 'a': 1, 'b': 1 },
    { 'a': 0, 'b': 0 }
  ];

  it('should take elements while `predicate` returns truthy', function() {
    var actual = takeWhile(array, function(n) {
      return n < 3;
    });

    assert.deepStrictEqual(actual, [1, 2]);
  });

  it('should provide correct `predicate` arguments', function() {
    var args;

    takeWhile(array, function() {
      args = slice.call(arguments);
    });

    assert.deepStrictEqual(args, [1, 0, array]);
  });

  it('should work with `_.matches` shorthands', function() {
    assert.deepStrictEqual(takeWhile(objects, { 'b': 2 }), objects.slice(0, 1));
  });

  it('should work with `_.matchesProperty` shorthands', function() {
    assert.deepStrictEqual(takeWhile(objects, ['b', 2]), objects.slice(0, 1));
  });
  it('should work with `_.property` shorthands', function() {
    assert.deepStrictEqual(takeWhile(objects, 'b'), objects.slice(0, 2));
  });

  it('should work in a lazy sequence', function() {
    var array = lodashStable.range(LARGE_ARRAY_SIZE),
        predicate = function(n) { return n < 3; },
        expected = takeWhile(array, predicate),
        wrapped = _(array).takeWhile(predicate);

    assert.deepEqual(wrapped.value(), expected);
    assert.deepEqual(wrapped.reverse().value(), expected.slice().reverse());
    assert.strictEqual(wrapped.last(), _.last(expected));
  });

  it('should work in a lazy sequence with `take`', function() {
    var array = lodashStable.range(LARGE_ARRAY_SIZE);

    var actual = _(array)
      .takeWhile(function(n) { return n < 4; })
      .take(2)
      .takeWhile(function(n) { return n == 0; })
      .value();

    assert.deepEqual(actual, [0]);
  });

  it('should provide correct `predicate` arguments in a lazy sequence', function() {
    var args,
        array = lodashStable.range(LARGE_ARRAY_SIZE + 1),
        expected = [1, 0, lodashStable.map(array.slice(1), square)];

    _(array).slice(1).takeWhile(function(value, index, array) {
      args = slice.call(arguments);
    }).value();

    assert.deepEqual(args, [1, 0, array.slice(1)]);

    _(array).slice(1).map(square).takeWhile(function(value, index, array) {
      args = slice.call(arguments);
    }).value();

    assert.deepEqual(args, expected);

    _(array).slice(1).map(square).takeWhile(function(value, index) {
      args = slice.call(arguments);
    }).value();

    assert.deepEqual(args, expected);

    _(array).slice(1).map(square).takeWhile(function(value) {
      args = slice.call(arguments);
    }).value();

    assert.deepEqual(args, [1]);

    _(array).slice(1).map(square).takeWhile(function() {
      args = slice.call(arguments);
    }).value();

    assert.deepEqual(args, expected);
  });
});
