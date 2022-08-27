import noop from './.internal/noop'
/**
 * Creates a function that will run `func` only after previous one was finished
 * and return results in a promise.
 *
 * @since 5.1.0
 * @category Function
 * @param {Function} func The function to sync.
 * @examples
 *  1) It will run call function only after previous calls are finilized(succeed or failed)
 *		const sendRequest = (delay) => {
 *			console.log('Triggered:', delay);
 *			return new Promise((resolve) => setTimeout(() => {
 *				console.log('Finished:', delay)
 *				resolve(delay)
 *			}, delay))
 *		}
 *		sendRequest(1000);
 *		sendRequest(100);
 *		sendRequest(500);
 *		const sendRequestSynced = sync(sendRequest);
 *		sendRequestSynced(1000);
 *		sendRequestSynced(100);
 *		sendRequestSynced(500);
 *
 *    sendRequestSynced   sendRequest
 *    Triggered: 1000     Triggered: 1000
 *    Triggered: 100      Triggered: 100
 *    Triggered: 500      Triggered: 500

 *    Finished: 1000      Finished: 100
 *    Finished: 100       Finished: 500
 *    Finished: 500       Finished: 1000
 * 2) If you pass not async function it will wrap results in the promise anyway
 *    const func = () => 1;
 *    sync(func)().then((res) => console.log(res))
 *    // => 1
 */
function sync(func) {
  let lastCallPromise = null

  function caller(...args) {
    const callPromise = new Promise((resolve, reject) => {
      const callFunc = function() {
        Promise.resolve(func(...args)).then(resolve).catch(reject)
      }
      if (lastCallPromise) {
        lastCallPromise.finally(callFunc).catch(noop)
      } else {
        callFunc()
      }
    })

    lastCallPromise = callPromise
    return callPromise
  }

  return caller
}

export default sync
