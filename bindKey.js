import createWrap from './.internal/createWrap.js';
import getHolder from './.internal/getHolder.js';
import replaceHolders from './.internal/replaceHolders.js';

/** Used to compose bitmasks for function metadata. */
const WRAP_BIND_FLAG = 1;
const WRAP_BIND_KEY_FLAG = 2;
const WRAP_PARTIAL_FLAG = 32;

/**
 * Creates a function that invokes the method at `object[key]` with `partials`
 * prepended to the arguments it receives.
 *
 * This method differs from `bind` by allowing bound functions to reference
 * methods that may be redefined or don't yet exist. See
 * [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
 * for more details.
 *
 * The `bindKey.placeholder` value, which defaults to `_` in monolithic
 * builds, may be used as a placeholder for partially applied arguments.
 *
 * @since 0.10.0
 * @category Function
 * @param {Object} object The object to invoke the method on.
 * @param {string} key The key of the method.
 * @param {...*} [partials] The arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * const object = {
 *   'user': 'fred',
 *   'greet': function(greeting, punctuation) {
 *     return greeting + ' ' + this.user + punctuation;
 *   }
 * };
 *
 * const bound = bindKey(object, 'greet', 'hi');
 * bound('!');
 * // => 'hi fred!'
 *
 * object.greet = function(greeting, punctuation) {
 *   return greeting + 'ya ' + this.user + punctuation;
 * };
 *
 * bound('!');
 * // => 'hiya fred!'
 *
 * // Bound with placeholders.
 * const bound = bindKey(object, 'greet', _, '!');
 * bound('hi');
 * // => 'hiya fred!'
 */
function bindKey(object, key, ...partials) {
  let holders;
  let bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
  if (partials.length) {
    holders = replaceHolders(partials, getHolder(bindKey));
    bitmask |= WRAP_PARTIAL_FLAG;
  }
  return createWrap(key, bitmask, object, partials, holders);
}

// Assign default placeholders.
bindKey.placeholder = {};

export default bindKey;
