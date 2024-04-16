/**
 * Composes a function that returns the result of invoking the given functions
 * with the `this` binding of the created function, where each successive
 * invocation is supplied the return value of the previous.
 *
 * @since 3.0.0
 * @category Util
 * @param {IncommingFunction[]} [funcs] The functions to invoke.
 * @returns {OutcomingFunction} Returns the new composite function.
 * @see asyncFlowRight
 * @example
 *
 * import add from 'lodash/add'
 *
 * async function square(n) {
 *   const { resolve } = Promise.withResolvers()
 *   setTimeout(() => {
 *    resolve()
 *   }, 3000);
 * }
 *
 * (async () => {
 *   const addSquare = asyncFlow(add, square)
 *
 *   const result = await addSquare(1, 2)
 *   console.log(result) => 9
 * })()
 */

type IncommingFunction = (...args: any[]) => Promise<any> | any;
type OutcomingFunction<T> = (...args: any[]) => Promise<T>;

export function asyncFlow<T>(funcs: IncommingFunction[]): OutcomingFunction<T> {
  const length = funcs.length;
  let i = funcs.length;

  while (i--) {
    if (typeof funcs[i] !== 'function') {
      throw new TypeError('Expected a function');
    }
  }

  return async function (this: any, ...args: any[]) {
    let j = 0;
    let result = length ? await funcs[j].apply(this, args) : args[0];

    while (++j < length) {
      result = await funcs[j].call(this, await result);
    }

    return result;
  };
}

export default asyncFlow;
