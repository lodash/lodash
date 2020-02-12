import assert from 'assert';
import extendWith from '../extendWith.js';
import assignInWith from '../assignInWith.js';

describe('assignInWith', function() {
  it('should be aliased', function() {
    assert.strictEqual(extendWith, assignInWith);
  });
});
