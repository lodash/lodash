import assert from 'assert';
import trimArray from '../trimArray.js';

describe('toUpper', function() {
  it('should should remove falsey values', function() {
    assert.deepStrictEqual(trimArray(['', '', '', 'a', 'b', '', 'c', 'd', '', '']), ['a', 'b', '', 'c', 'd']);
  });

  it('should should remove provided values', function() {
    assert.deepStrictEqual(trimArray([0, 0, 0, 'a', 'b', '', 'c', 'd', 0, 0], 0), ['a', 'b', '', 'c', 'd']);
    assert.deepStrictEqual(trimArray([0, 1, 2, 'a', 'b', '', 'c', 'd', 0, 1], [0, 1, 2]), ['a', 'b', '', 'c', 'd']);
  });
});
