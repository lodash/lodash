import assert from 'assert';
import entriesIn from '../entriesIn.js';
import toPairsIn from '../toPairsIn.js';

describe('toPairsIn', function() {
  it('should be aliased', function() {
    assert.strictEqual(entriesIn, toPairsIn);
  });
});
