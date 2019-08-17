import assert from 'assert'
import { slice } from './utils.js'
import defer from '../defer.js'

describe('defer', () => {
  it('should defer `func` execution', (done) => {
    let pass = false
    defer(() => { pass = true })

    setTimeout(() => {
      assert.ok(pass)
      done()
    }, 32)
  })

  it('should provide additional arguments to `func`', (done) => {
    let args

    defer(function() {
      args = slice.call(arguments)
    }, 1, 2)

    setTimeout(() => {
      assert.deepStrictEqual(args, [1, 2])
      done()
    }, 32)
  })

  it('should be cancelable', (done) => {
    let pass = true
    const  timerId = defer(() => { pass = false })

    clearTimeout(timerId)

    setTimeout(() => {
      assert.ok(pass)
      done()
    }, 32)
  })
})
