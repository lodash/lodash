import assert from 'assert';
import upperFirst from '../upperFirst.js';

describe('upperFirst', function() {
  it('should uppercase only the first character', function() {
    assert.strictEqual(upperFirst('fred'), 'Fred');
    assert.strictEqual(upperFirst('Fred'), 'Fred');
    assert.strictEqual(upperFirst('FRED'), 'FRED');
  });
});
