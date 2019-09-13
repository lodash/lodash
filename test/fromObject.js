import assert from 'assert'

import fromObject from '../fromObject.js'

const example = {
  jim: {
    name: 'Jim',
    age: 20,
  },
  tim: {
    name: 'Tim',
    age: 22,
  },
}

describe('fromObject', function() {
  it('should not include the identifier', function() {
    assert.deepStrictEqual(fromObject(example), [
      { name: 'Jim', age: 20 },
      { name: 'Tim', age: 22 },
    ])
  })

  it('should include the identifier', function() {
    assert.deepStrictEqual(fromObject(example, 'id'), [
      { name: 'Jim', age: 20, id: 'jim' },
      { name: 'Tim', age: 22, id: 'tim' },
    ])
  })
})
