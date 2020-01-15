import assert from 'assert';
import intersperse from '../intersperse';

describe('intersperse', function () {
  it('should return new array with the sepreator between the elements', function (){
    const actual = intersperse(['a','b','c','d'], 'X')
    assert.deepEqual(actual, ['a','X','b','X','c','X','d'])
  })

  it('should reutrn empty array when get empty array', function (){
    const actual = intersperse([], 'X')
    assert.deepEqual(actual, [])
  })

  it('should not add seperator if only one element', function () {
    const actual = intersperse(['a'], 'X')
    assert.deepEqual(actual, ['a'])
  })
})
