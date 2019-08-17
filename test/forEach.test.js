import assert from 'assert'
import each from '../each.js'
import forEach from '../forEach.js'

describe('forEach', () => {
  it('should be aliased', () => {
    assert.strictEqual(each, forEach)
  })
})
