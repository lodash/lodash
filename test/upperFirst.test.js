import assert from 'assert';
import upperFirst from '../upperFirst.js';

describe('upperFirst', function() {
  it('should uppercase only the first character', function() {
    assert.strictEqual(upperFirst('fred'), 'Fred');
    assert.strictEqual(upperFirst('Fred'), 'Fred');
    assert.strictEqual(upperFirst('FRED'), 'FRED');
  });;
  it('should handle locale information correctly', function() {
    assert.strictEqual(upperFirst('iyi'), 'Iyi'); // Without specifying the locale, this is the correct behaviour
    assert.strictEqual(upperFirst('iyi', 'tr-TR'), 'İyi');
    assert.strictEqual(upperFirst('iyi', ['tr-TR']), 'İyi');
  });
});
