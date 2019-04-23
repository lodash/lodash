import assert from 'assert'
import lodashStable from 'lodash'
import subSequenceExists from '../subSequenceExists'

/* globals describe, it */
describe('subSequenceExists', () => {
  it('should return true if the subsequence exists once in the parent string', () => {
    const parent = 'abcd142781234',
      subsequence = 'ad124'

    assert.equal(subSequenceExists(parent, subsequence), true)
  })

  it('should return true if the subsequence exists more than once in the parent string', () => {
    const parent = 'abcdefghabcdefghabcdefgh',
      subsequence = 'abeh'

    assert.equal(subSequenceExists(parent, subsequence), true)
  })

  it('should return true if the subsequence occurs in consecutive characters', () => {
    const parent = 'abcdefgh',
      subsequence = 'abcd'

    assert.equal(subSequenceExists(parent, subsequence), true)
  })

  it('should return true if the subsequence is same as the parent string', () => {
    const parent = 'abc',
      subsequence = 'abc'

    assert.equal(subSequenceExists(parent, subsequence), true)
  })

  it('should return false if the subsequence does not exist in the parent string', () => {
    const parent = 'abcdefgh12345678',
      subsequence = 'l9990000tyuio'

    assert.equal(subSequenceExists(parent, subsequence), false)
  })

  it('should return false if the subsequence partially exists in the parent string', () => {
    const parent = 'abcdefgh',
      subsequence = 'bcdefghi'

    assert.equal(subSequenceExists(parent, subsequence), false)
  })

  it('should return false if the parent string is shorter than the subsequence', () => {
    const parent = '123',
      subsequence = '123456789'

    assert.equal(subSequenceExists(parent, subsequence), false)
  })

  it('should return false if the parent string is empty', () => {
    const parent = '',
      subsequence = '123456789'

    assert.equal(subSequenceExists(parent, subsequence), false)
  })

  it('should return an error if the subsequence is an empty string', () => {
    const parent = 'afdskfj',
      subsequence = ''

    assert.throws(() => {
      subSequenceExists(parent, subsequence)
    }, TypeError)
  })

  it('should return an error if the parent is not a string', () => {
    const parent = { obj: 1 },
      subsequence = 'asdf'

    assert.throws(() => {
      subSequenceExists(parent, subsequence)
    }, TypeError)
  })

  it('should return an error if the subsequence is not a string', () => {
    const parent = 'asdf',
      subsequence = { obj: 1 }

    assert.throws(() => {
      subSequenceExists(parent, subsequence)
    }, TypeError)
  })
})
