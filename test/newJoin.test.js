import assert from 'assert';
import newJoin from '../newJoin.js';

describe('until', () => {
  const arr = ["John", "Jack", "Anna"];
  it('should join array elements as normal & with last separator', () => {
    assert.strictEqual(newJoin(arr, ", "), "John, Jack, Anna");
    assert.strictEqual(newJoin(arr, ", ", " and "), "John, Jack and Anna");
  });
});
