import assert from 'assert';
import capitalize from '../capitalize.js';

describe('capitalize', function() {
  it('should capitalize the first character of a string', function() {
    assert.strictEqual(capitalize('fred'), 'Fred');
    assert.strictEqual(capitalize('Fred'), 'Fred');
    assert.strictEqual(capitalize(' fred'), ' fred');
    assert.strictEqual(capitalize('fRED'), 'Fred');
  });
  it('should handle locale information correctly', function() {
    assert.strictEqual(capitalize('iyi'), 'Iyi'); // Without specifying the locale, this is the correct behaviour
    assert.strictEqual(capitalize('iyi', 'tr-TR'), 'İyi');
    assert.strictEqual(capitalize('iyi', ['tr-TR']), 'İyi');
  });
});
