import assert from 'assert';
import without from '../without.js';

describe('without', function() {
  it('should return the difference of values', function() {
    var actual = without([2, 1, 2, 3], 1, 2);
    assert.deepStrictEqual(actual, [3]);
  });

  it('should use strict equality to determine the values to reject', function() {
    var object1 = { 'a': 1 },
        object2 = { 'b': 2 },
        array = [object1, object2];

    assert.deepStrictEqual(without(array, { 'a': 1 }), array);
    assert.deepStrictEqual(without(array, object1), [object2]);
  });

  it('should remove all occurrences of each value from an array', function() {
    var array = [1, 2, 3, 1, 2, 3];
    assert.deepStrictEqual(without(array, 1, 2), [3, 3]);
  });
});
