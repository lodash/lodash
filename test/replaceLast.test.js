import assert from 'assert';
import replaceLast from '../replaceLast.js';

describe('replaceLast', () => {
  it('should replace the last matched pattern', () => {
    const string = 'ababc';
    assert.strictEqual(replaceLast(string, 'b', 'c'), 'abacc');
    assert.strictEqual(replaceLast(string, /[bd]/, 'c'), 'abacc');
  });
});
