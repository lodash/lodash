import isObjectLike from '../internal/isObjectLike';
import isPlainObject from './isPlainObject';
import support from '../support';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is a DOM element.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * _.isElement(document.body);
 * // => true
 *
 * _.isElement('<body>');
 * // => false
 */
function isElement(value) {
  return !!value && value.nodeType === 1 && isObjectLike(value) &&
    (objToString.call(value).indexOf('Element') > -1);
}
// Fallback for environments without DOM support.
if (!support.dom) {
  isElement = function(value) {
    return !!value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value);
  };
}

export default isElement;
