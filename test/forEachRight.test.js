import assert from 'assert'
import eachRight from '../eachRight.js'
import forEachRight from '../forEachRight.js'

describe('forEachRight', () => {
  it('should be aliased', () => {
    assert.strictEqual(eachRight, forEachRight)
  })
})
