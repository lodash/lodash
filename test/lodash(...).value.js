import assert from 'assert';
import { isNpm } from './utils.js';
import prototype from '../prototype.js';

describe('lodash(...).value', function() {
  it('should execute the chained sequence and extract the unwrapped value', function() {
    var array = [1],
        wrapped = _(array).push(2).push(3);

    assert.deepEqual(array, [1]);
    assert.deepEqual(wrapped.value(), [1, 2, 3]);
    assert.deepEqual(wrapped.value(), [1, 2, 3, 2, 3]);
    assert.deepEqual(array, [1, 2, 3, 2, 3]);
  });

  it('should return the `valueOf` result of the wrapped value', function() {
    var wrapped = _(123);
    assert.strictEqual(Number(wrapped), 123);
  });

  it('should stringify the wrapped value when used by `JSON.stringify`', function() {
    if (!isNpm && JSON) {
      var wrapped = _([1, 2, 3]);
      assert.strictEqual(JSON.stringify(wrapped), '[1,2,3]');
    }
  });

  it('should be aliased', function() {
    var expected = prototype.value;
    assert.strictEqual(prototype.toJSON, expected);
    assert.strictEqual(prototype.valueOf, expected);
  });
});
