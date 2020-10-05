import assert from 'assert'

import recursiveMap from '../recursiveMap.js'

function square(n) {
  return n * n
}

describe('recursiveMap', function() {
  it('should map values in `collection` to a new array', function() {
    const mapped = recursiveMap([[2, 4], 8], square);
    const expected = [[4, 16], 64];
    assert.deepStrictEqual(mapped, expected);
  })
})