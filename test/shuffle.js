import assert from 'assert';
import lodashStable from 'lodash';
import shuffle from '../shuffle.js';

describe('shuffle', function() {
  var array = [1, 2, 3],
      object = { 'a': 1, 'b': 2, 'c': 3 };

  it('should return a new array', function() {
    assert.notStrictEqual(shuffle(array), array);
  });

  it('should contain the same elements after a collection is shuffled', function() {
    assert.deepStrictEqual(shuffle(array).sort(), array);
    assert.deepStrictEqual(shuffle(object).sort(), array);
  });

  it('should shuffle small collections', function() {
    var actual = lodashStable.times(1000, function() {
      return shuffle([1, 2]);
    });

    assert.deepStrictEqual(lodashStable.sortBy(lodashStable.uniqBy(actual, String), '0'), [[1, 2], [2, 1]]);
  });

  it('should treat number values for `collection` as empty', function() {
    assert.deepStrictEqual(shuffle(1), []);
  });
});
