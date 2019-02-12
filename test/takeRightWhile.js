import assert from 'assert';
import lodashStable from 'lodash';
import { slice, LARGE_ARRAY_SIZE } from './utils.js';
import takeRightWhile from '../takeRightWhile.js';

describe('takeRightWhile', function() {
  var array = [1, 2, 3, 4];

  var objects = [
    { 'a': 0, 'b': 0 },
    { 'a': 1, 'b': 1 },
    { 'a': 2, 'b': 2 }
  ];

  it('should take elements while `predicate` returns truthy', function() {
    var actual = takeRightWhile(array, function(n) {
      return n > 2;
    });

    assert.deepStrictEqual(actual, [3, 4]);
  });

  it('should provide correct `predicate` arguments', function() {
    var args;

    takeRightWhile(array, function() {
      args = slice.call(arguments);
    });

    assert.deepStrictEqual(args, [4, 3, array]);
  });

  it('should work with `_.matches` shorthands', function() {
    assert.deepStrictEqual(takeRightWhile(objects, { 'b': 2 }), objects.slice(2));
  });

  it('should work with `_.matchesProperty` shorthands', function() {
    assert.deepStrictEqual(takeRightWhile(objects, ['b', 2]), objects.slice(2));
  });

  it('should work with `_.property` shorthands', function() {
    assert.deepStrictEqual(takeRightWhile(objects, 'b'), objects.slice(1));
  });

  it('should work in a lazy sequence', function() {
    var array = lodashStable.range(LARGE_ARRAY_SIZE),
        predicate = function(n) { return n > 2; },
        expected = takeRightWhile(array, predicate),
        wrapped = _(array).takeRightWhile(predicate);

    assert.deepEqual(wrapped.value(), expected);
    assert.deepEqual(wrapped.reverse().value(), expected.slice().reverse());
    assert.strictEqual(wrapped.last(), _.last(expected));
  });

  it('should provide correct `predicate` arguments in a lazy sequence', function() {
    var args,
        array = lodashStable.range(LARGE_ARRAY_SIZE + 1);

    var expected = [
      square(LARGE_ARRAY_SIZE),
      LARGE_ARRAY_SIZE - 1,
      lodashStable.map(array.slice(1), square)
    ];

    _(array).slice(1).takeRightWhile(function(value, index, array) {
      args = slice.call(arguments);
    }).value();

    assert.deepEqual(args, [LARGE_ARRAY_SIZE, LARGE_ARRAY_SIZE - 1, array.slice(1)]);

    _(array).slice(1).map(square).takeRightWhile(function(value, index, array) {
      args = slice.call(arguments);
    }).value();

    assert.deepEqual(args, expected);

    _(array).slice(1).map(square).takeRightWhile(function(value, index) {
      args = slice.call(arguments);
    }).value();

    assert.deepEqual(args, expected);

    _(array).slice(1).map(square).takeRightWhile(function(index) {
      args = slice.call(arguments);
    }).value();

    assert.deepEqual(args, [square(LARGE_ARRAY_SIZE)]);

    _(array).slice(1).map(square).takeRightWhile(function() {
      args = slice.call(arguments);
    }).value();

    assert.deepEqual(args, expected);
  });
});
