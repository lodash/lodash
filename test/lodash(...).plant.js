import assert from 'assert';
import lodashStable from 'lodash';
import { square, isNpm } from './utils.js';
import compact from '../compact.js';

describe('lodash(...).plant', function() {
  it('should clone the chained sequence planting `value` as the wrapped value', function() {
    var array1 = [5, null, 3, null, 1],
        array2 = [10, null, 8, null, 6],
        wrapped1 = _(array1).thru(compact).map(square).takeRight(2).sort(),
        wrapped2 = wrapped1.plant(array2);

    assert.deepEqual(wrapped2.value(), [36, 64]);
    assert.deepEqual(wrapped1.value(), [1, 9]);
  });

  it('should clone `chainAll` settings', function() {
    var array1 = [2, 4],
        array2 = [6, 8],
        wrapped1 = _(array1).chain().map(square),
        wrapped2 = wrapped1.plant(array2);

    assert.deepEqual(wrapped2.head().value(), 36);
  });

  it('should reset iterator data on cloned sequences', function() {
    if (!isNpm && Symbol && Symbol.iterator) {
      var array1 = [2, 4],
          array2 = [6, 8],
          wrapped1 = _(array1).map(square);

      assert.deepStrictEqual(lodashStable.toArray(wrapped1), [4, 16]);
      assert.deepStrictEqual(lodashStable.toArray(wrapped1), []);

      var wrapped2 = wrapped1.plant(array2);
      assert.deepStrictEqual(lodashStable.toArray(wrapped2), [36, 64]);
    }
  });
});
