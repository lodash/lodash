import assert from 'assert';
import capitalize from '../capitalize.js';

describe('capitalize', function() {
  it('should capitalize the first character of a string', function() {
    assert.strictEqual(capitalize('fred'), 'Fred');
    assert.strictEqual(capitalize('Fred'), 'Fred');
    assert.strictEqual(capitalize(' fred'), ' fred');
  });
});
