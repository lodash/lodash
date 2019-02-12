import assert from 'assert';
import entries from '../entries.js';
import toPairs from '../toPairs.js';

describe('toPairs', function() {
  it('should be aliased', function() {
    assert.strictEqual(entries, toPairs);
  });
});
