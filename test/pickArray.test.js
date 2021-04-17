import assert from 'assert';
import pickArray from '../pickArray.js';

describe('pickArray', function() {
  it('should work with objects as input', function() {
    var arr = [
      { 'a': 1, 'b': 2 },
      { 'a': 1, 'b': 3 },
      { 'a': 2, 'b': 4 }
    ]

    var actual = pickArray(arr, 'a')
    
    assert.deepStrictEqual(actual, [1, 1, 2])
  })

  it('should work with arrays as input', function() {
    var arr = [[1, 2], [1, 3], [2, 4]]

    var actual = pickArray(arr, 0)
    
    assert.deepStrictEqual(actual, [1, 1, 2])
  })
});
