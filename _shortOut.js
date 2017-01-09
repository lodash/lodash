/** Used to detect hot functions by number of calls within a span of milliseconds. */
const HOT_COUNT = 800;
const HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  let count = 0;
  let lastCalled = 0;

  return function(...args) {
    const stamp = nativeNow();
    const remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return args[0];
      }
    } else {
      count = 0;
    }
    return func(...args);
  };
}

export default shortOut;
