import assert from 'assert';
import lodashStable from 'lodash';
import { identity, stubTrue, stubFalse } from './utils.js';
import partition from '../partition.js';

describe('partition', function() {
  var array = [1, 0, 1];

  it('should split elements into two groups by `predicate`', function() {
    assert.deepStrictEqual(partition([], identity), [[], []]);
    assert.deepStrictEqual(partition(array, stubTrue), [array, []]);
    assert.deepStrictEqual(partition(array, stubFalse), [[], array]);
  });

  it('should use `_.identity` when `predicate` is nullish', function() {
    var values = [, null, undefined],
        expected = lodashStable.map(values, lodashStable.constant([[1, 1], [0]]));

    var actual = lodashStable.map(values, function(value, index) {
      return index ? partition(array, value) : partition(array);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with `_.property` shorthands', function() {
    var objects = [{ 'a': 1 }, { 'a': 1 }, { 'b': 2 }],
        actual = partition(objects, 'a');

    assert.deepStrictEqual(actual, [objects.slice(0, 2), objects.slice(2)]);
  });

  it('should work with a number for `predicate`', function() {
    var array = [
      [1, 0],
      [0, 1],
      [1, 0]
    ];

    assert.deepStrictEqual(partition(array, 0), [[array[0], array[2]], [array[1]]]);
    assert.deepStrictEqual(partition(array, 1), [[array[1]], [array[0], array[2]]]);
  });

  it('should work with an object for `collection`', function() {
    var actual = partition({ 'a': 1.1, 'b': 0.2, 'c': 1.3 }, Math.floor);
    assert.deepStrictEqual(actual, [[1.1, 1.3], [0.2]]);
  });
});
