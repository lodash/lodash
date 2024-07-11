import asyncFlow from './asyncFlow.js';

/**
 * Composes a function that returns the result of invoking the given functions
 * with the `this` binding of the created function, where each successive
 * invocation is supplied the return value of the previous.
 *
 * @since 3.0.0
 * @category Util
 * @param {IncommingFunction[]} [funcs] The functions to invoke.
 * @returns {OutcomingFunction} Returns the new composite function.
 * @see asyncFlow
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
 *   const addSquare = asyncFlowRight(square, add)
 *
 *   const result = await addSquare(1, 2)
 *   console.log(result) => 9
 * })()
 */

type IncommingFunction = (...args: any[]) => Promise<any> | any;
type OutcomingFunction<T> = (...args: any[]) => Promise<T>;

export function asyncFlowRight<T>(funcs: IncommingFunction[]): OutcomingFunction<T> {
  return asyncFlow<T>([...funcs.reverse()]);
}

export default asyncFlowRight;
