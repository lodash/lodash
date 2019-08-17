import assert from 'assert'
import subtract from '../subtract.js'

describe('subtract', () => {
  it('should subtract two numbers', () => {
    assert.strictEqual(subtract(6, 4), 2)
    assert.strictEqual(subtract(-6, 4), -10)
    assert.strictEqual(subtract(-6, -4), -2)
  })

  it('should coerce arguments to numbers', () => {
    assert.strictEqual(subtract('6', '4'), 2)
    assert.deepStrictEqual(subtract('x', 'y'), NaN)
  })
})
