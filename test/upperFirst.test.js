import assert from 'assert'
import upperFirst from '../upperFirst.js'

describe('upperFirst', () => {
  it('should uppercase only the first character', () => {
    assert.strictEqual(upperFirst('fred'), 'Fred')
    assert.strictEqual(upperFirst('Fred'), 'Fred')
    assert.strictEqual(upperFirst('FRED'), 'FRED')
  })
})
