import assert from 'assert';
import lodashStable from 'lodash';
import after from '../after.js';

describe('after', function() {
  function testAfter(n, times) {
    var count = 0;
    lodashStable.times(times, after(n, function() { count++; }));
    return count;
  }

  it('should create a function that invokes `func` after `n` calls', function() {
    assert.strictEqual(testAfter(5, 5), 1, 'after(n) should invoke `func` after being called `n` times');
    assert.strictEqual(testAfter(5, 4), 0, 'after(n) should not invoke `func` before being called `n` times');
    assert.strictEqual(testAfter(0, 0), 0, 'after(0) should not invoke `func` immediately');
    assert.strictEqual(testAfter(0, 1), 1, 'after(0) should invoke `func` when called once');
  });

  it('should coerce `n` values of `NaN` to `0`', function() {
    assert.strictEqual(testAfter(NaN, 1), 1);
  });

  it('should use `this` binding of function', function() {
    var afterFn = after(1, function() { return ++this.count; }),
        object = { 'after': afterFn, 'count': 0 };

    object.after();
    assert.strictEqual(object.after(), 2);
    assert.strictEqual(object.count, 2);
  });
});
