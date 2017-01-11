import getRawTag from './getRawTag.js';
import objectToString from './objectToString.js';

/** `Object#toString` result references. */
const nullTag = '[object Null]';
const undefinedTag = '[object Undefined]';

/** Built-in value references. */
const symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

export default baseGetTag;
