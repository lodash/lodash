import assert from 'assert'
import sync from '../sync.js'
import { noop } from './utils.js'

describe('sync', () => {
  it('should sync an async function', (done) => {
    function func(delay) {
      return new Promise((resolve) => setTimeout(() => resolve(delay)), delay)
    }
    const delayArg = 1000
    const sendRequestSynced = sync(func)
    const funcPromise = sendRequestSynced(delayArg)
    setTimeout(() => {
      funcPromise.then((res) => {
        assert.strictEqual(res, delayArg)
        done()
      }, delayArg)
    })
  })

  it('should sync not async function and wrap result in promise as well', (done) => {
    function func(...args) {
      return args
    }
    const args = [1, {}, '']
    const funcSynced = sync(func)

    const funcPromise = funcSynced(...args)

    funcPromise.then((res) => {
      assert.strictEqual(JSON.stringify(res), JSON.stringify(args))
      done()
    })
  })

  it('should run func only when previous one was succeed', (done) => {
    const delayArg1 = 1000
    const delayArg2 = 100
    const delayArg3 = 500

    const funcResolveMap = {
      [delayArg1]: false,
      [delayArg2]: false,
      [delayArg3]: false
    }

    function func(delay) {
      return new Promise((resolve) => setTimeout(() => { funcResolveMap[delay] = true; resolve(delay) }, delay))
    }

    const sendRequestSynced = sync(func)
    sendRequestSynced(delayArg1)
    sendRequestSynced(delayArg2)
    sendRequestSynced(delayArg3)

    setTimeout(() => {
      assert.strictEqual(funcResolveMap[delayArg1], true)
      assert.strictEqual(funcResolveMap[delayArg2], false)
      assert.strictEqual(funcResolveMap[delayArg3], false)
      setTimeout(() => {
        assert.strictEqual(funcResolveMap[delayArg1], true)
        assert.strictEqual(funcResolveMap[delayArg2], true)
        assert.strictEqual(funcResolveMap[delayArg3], false)
        setTimeout(() => {
          assert.strictEqual(funcResolveMap[delayArg1], true)
          assert.strictEqual(funcResolveMap[delayArg2], true)
          assert.strictEqual(funcResolveMap[delayArg3], true)
          done()
        }, delayArg3)
      }, delayArg2)
    }, delayArg1)
  })

  it('should run func when previous failed', (done) => {
    const delayArg1 = 1000
    const delayArg2 = 100
    const delayArg3 = 500

    const funcFailMap = {
      [delayArg1]: false,
      [delayArg2]: false,
      [delayArg3]: false
    }

    function funcError(delay) {
      return new Promise((_resolve, reject) => setTimeout(() => { funcFailMap[delay] = true; reject(delay) }, delay))
    }

    const funcErrorSynced = sync(funcError)

    funcErrorSynced(delayArg1).catch(noop)
    funcErrorSynced(delayArg2).catch(noop)
    funcErrorSynced(delayArg3).catch(noop)

    setTimeout(() => {
      assert.strictEqual(funcFailMap[delayArg1], true)
      assert.strictEqual(funcFailMap[delayArg2], false)
      assert.strictEqual(funcFailMap[delayArg3], false)
      setTimeout(() => {
        assert.strictEqual(funcFailMap[delayArg1], true)
        assert.strictEqual(funcFailMap[delayArg2], true)
        assert.strictEqual(funcFailMap[delayArg3], false)
        setTimeout(() => {
          assert.strictEqual(funcFailMap[delayArg1], true)
          assert.strictEqual(funcFailMap[delayArg2], true)
          assert.strictEqual(funcFailMap[delayArg3], true)
          done()
        }, delayArg3)
      }, delayArg2)
    }, delayArg1)
  })

  it('should behave the same as func on success', (done) => {
    function funcSuccess(...args) {
      return new Promise((resolve) => resolve(args))
    }
    const funcSuccessSynced = sync(funcSuccess)
    const args = [1, {}, []]

    funcSuccessSynced(...args).then((res) => {
      assert.strictEqual(JSON.stringify(res), JSON.stringify(args))
      done()
    })
  })

  it('should behave the same as func on failute', (done) => {
    function funcError(...args) {
      return new Promise((_resolve, reject) => reject(args))
    }

    const funcErrorSynced = sync(funcError)
    const args = [1, {}, []]

    funcErrorSynced(...args).catch((res) => {
      assert.strictEqual(JSON.stringify(res), JSON.stringify(args))
      done()
    })
  })
})
