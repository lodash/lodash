/**
 * Defers invoking the `func` until the current call stack has cleared. Any
 * additional arguments are provided to `func` when it's invoked.
 *
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to defer.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @returns {number} Returns the timer id.
 * @example
 *
 * defer(text => console.log(text), 'deferred')
 * // => Logs 'deferred' after one millisecond.
 */
function defer(func: Function, ...args: any[]) {
    if (typeof func !== 'function') {
        throw new TypeError('Expected a function');
    }
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    return setTimeout(func, 1, ...args);
}

export default defer;
