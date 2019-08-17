import assert from 'assert'
import lowerFirst from '../lowerFirst.js'

describe('lowerFirst', () => {
  it('should lowercase only the first character', () => {
    assert.strictEqual(lowerFirst('fred'), 'fred')
    assert.strictEqual(lowerFirst('Fred'), 'fred')
    assert.strictEqual(lowerFirst('FRED'), 'fRED')
  })
})
