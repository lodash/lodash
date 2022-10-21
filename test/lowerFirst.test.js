import assert from 'assert';
import lowerFirst from '../lowerFirst.js';

describe('lowerFirst', function() {
  it('should lowercase only the first character', function() {
    assert.strictEqual(lowerFirst('fred'), 'fred');
    assert.strictEqual(lowerFirst('Fred'), 'fred');
    assert.strictEqual(lowerFirst('FRED'), 'fRED');
  });
  it('should handle locale information correctly', function() {
    assert.strictEqual(lowerFirst('İYİ'), 'i̇Yİ'); // Without specifying the locale, this is the correct behaviour
    assert.strictEqual(lowerFirst('İYİ', 'tr-TR'), 'iYİ');
    assert.strictEqual(lowerFirst('İYİ', ['tr-TR']), 'iYİ');
  });
});
