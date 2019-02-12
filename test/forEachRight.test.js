import assert from 'assert';
import eachRight from '../eachRight.js';
import forEachRight from '../forEachRight.js';

describe('forEachRight', function() {
  it('should be aliased', function() {
    assert.strictEqual(eachRight, forEachRight);
  });
});
