import assert from 'assert';
import each from '../each.js';
import forEach from '../forEach.js';

describe('forEach', function() {
  it('should be aliased', function() {
    assert.strictEqual(each, forEach);
  });
});
