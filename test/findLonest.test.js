import assert from 'assert'
import last from '../findLongest'

describe('findLongest', function () {

  it('should return the longest element', function () {
    var array = ['abc', 'abcd', 'abcde']
    assert.strictEqual(last(array), 'abcde')
  })

  it('should return `undefined` if given an empty Array', function () {
    var array = [];
    assert.strictEqual(last(array), undefined)
  })


  it('should throw a TypeError  when the input is null', function () {
    var array = null;
    assert.throws(function () { last(array); }, TypeError);
  });

  it('should throw a TypeError  when the input is empty string', function () {
    var array = ""
    assert.throws(function () { last(array); }, TypeError);
  })

  it('should throw a TypeError  when the input is undefined', function () {
    var array = undefined
    assert.throws(function () { last(array); }, TypeError);
  })

})
