const assert = require('assert')
const isUndefined = require('../isUndefined')

describe('isUndefined', () => {
  it('returns true if the value is undefined', () => {
    assert.equal(isUndefined(undefined), true)
  })

  it('returns false if the value is null', () => {
    assert.equal(isUndefined(null), false)
  })

  it('returns false if the value is a string', () => {
    assert.equal(isUndefined('hello'), false)
  })
})


