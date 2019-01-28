import assert from 'assert';
import lodashStable from 'lodash';
import { LARGE_ARRAY_SIZE } from './utils.js';
import last from '../last.js';

describe('last', function() {
  var array = [1, 2, 3, 4];

  it('should return the last element', function() {
    assert.strictEqual(last(array), 4);
  });

  it('should return `undefined` when querying empty arrays', function() {
    var array = [];
    array['-1'] = 1;

    assert.strictEqual(last([]), undefined);
  });

  it('should work as an iteratee for methods like `_.map`', function() {
    var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        actual = lodashStable.map(array, last);

    assert.deepStrictEqual(actual, [3, 6, 9]);
  });

  it('should return an unwrapped value when implicitly chaining', function() {
    assert.strictEqual(_(array).last(), 4);
  });

  it('should return a wrapped value when explicitly chaining', function() {
    assert.ok(_(array).chain().last() instanceof _);
  });

  it('should not execute immediately when explicitly chaining', function() {
    var wrapped = _(array).chain().last();
    assert.strictEqual(wrapped.__wrapped__, array);
  });

  it('should work in a lazy sequence', function() {
    var largeArray = lodashStable.range(LARGE_ARRAY_SIZE),
        smallArray = array;

    lodashStable.times(2, function(index) {
      var array = index ? largeArray : smallArray,
          wrapped = _(array).filter(isEven);

      assert.strictEqual(wrapped.last(), last(_.filter(array, isEven)));
    });
  });
});
