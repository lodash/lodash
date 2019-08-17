import assert from 'assert'
import multiply from '../multiply.js'

describe('multiply', () => {
  it('should multiply two numbers', () => {
    assert.strictEqual(multiply(6, 4), 24)
    assert.strictEqual(multiply(-6, 4), -24)
    assert.strictEqual(multiply(-6, -4), 24)
  })

  it('should coerce arguments to numbers', () => {
    assert.strictEqual(multiply('6', '4'), 24)
    assert.deepStrictEqual(multiply('x', 'y'), NaN)
  })
})
