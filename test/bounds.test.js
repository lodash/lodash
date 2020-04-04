import assert from 'assert';
import bounds from '../bounds.js';

describe('bounds', function() {
  var integerArray = [0, 5, 3, 2, -1, 4, 1];
  var stringArray = ['beaver', 'alpaca', 'zebra', 'duck'];

  it('should return integer array bounds', function() {
    var actual = bound(integerArray);
    assert.deepStrictEqual(actual, [-1, 5]);
  });

  it('should return string array bounds', function() {
    var actual = bounds(stringArray);
    assert.deepStrictEqual(actual, ['alpaca', 'zebra']);
  });

  it('should return empty array when empty array is passed', function() {
    var actual = bounds([]);
    assert.deepStrictEqual(actual, []);
  });
});
