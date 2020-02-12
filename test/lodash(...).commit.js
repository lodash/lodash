import assert from 'assert';

describe('lodash(...).commit', function() {
  it('should execute the chained sequence and returns the wrapped result', function() {
    var array = [1],
        wrapped = _(array).push(2).push(3);

    assert.deepEqual(array, [1]);

    var otherWrapper = wrapped.commit();
    assert.ok(otherWrapper instanceof _);
    assert.deepEqual(otherWrapper.value(), [1, 2, 3]);
    assert.deepEqual(wrapped.value(), [1, 2, 3, 2, 3]);
  });

  it('should track the `__chain__` value of a wrapper', function() {
    var wrapped = _([1]).chain().commit().head();
    assert.ok(wrapped instanceof _);
    assert.strictEqual(wrapped.value(), 1);
  });
});
