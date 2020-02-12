import assert from 'assert';
import { _ } from './utils.js';

describe('once', function() {
  it('should invoke `func` once', function() {
    var count = 0,
        once = _.once(function() { return ++count; });

    once();
    assert.strictEqual(once(), 1);
    assert.strictEqual(count, 1);
  });

  it('should ignore recursive calls', function() {
    var count = 0;

    var once = _.once(function() {
      once();
      return ++count;
    });

    assert.strictEqual(once(), 1);
    assert.strictEqual(count, 1);
  });

  it('should not throw more than once', function() {
    var once = _.once(function() {
      throw new Error;
    });

    assert.throws(once);

    once();
    assert.ok(true);
  });
});
