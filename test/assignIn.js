import assert from 'assert';
import extend from '../extend.js';
import assignIn from '../assignIn.js';

describe('assignIn', function() {
  it('should be aliased', function() {
    assert.strictEqual(extend, assignIn);
  });
});
