import assert from 'assert';
import separate from '../separate';

describe('separate', function() {
  var array = ['a', 'b', 'c'];

  it('should return empty array if array not passed', function() {
    var actual = separate();
    assert.deepStrictEqual(actual, []);
  });

  it('should return array without change if seperator not passed', function() {
    var actual = separate(array);
    assert.deepStrictEqual(actual, ['a', undefined, 'b', undefined, 'c']);
  });

  it('should return array with seperator', function() {
    var actual = separate(array, '!');
    assert.deepStrictEqual(actual, ['a', '!', 'b', '!', 'c']);
  });
});
