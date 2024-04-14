/**
 * Composes a function that returns the result of invoking the given functions
 * with the `this` binding of the created function, where each successive
 * invocation is supplied the return value of the previous.
 *
 * @since 3.0.0
 * @category Util
 * @param {Function[]} [funcs] The functions to invoke.
 * @returns {Function} Returns the new composite function.
 * @see flowRight
 * @example
 *
 * import add from 'lodash/add'
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * const addSquare = flow(add, square)
 * addSquare(1, 2)
 * // => 9
 */
function flow(...funcs: Function[]) {
    const length = funcs.length;
    let i = length;
    while (i--) {
        if (typeof funcs[i] !== 'function') {
            throw new TypeError('Expected a function');
        }
    }
    return function (this: any, ...args: any[]) {
        let j = 0;
        let result = length ? funcs[j].apply(this, args) : args[0];
        while (++j < length) {
            result = funcs[j].call(this, result);
        }
        return result;
    };
}

export default flow;
