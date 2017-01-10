import baseGetTag from './.internal/baseGetTag.js';
import getPrototype from './.internal/getPrototype.js';
import isObjectLike from './isObjectLike.js';

/** `Object#toString` result references. */
const objectTag = '[object Object]';

/** Used to resolve the decompiled source of functions. */
const funcToString = Function.prototype.toString;

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/** Used to infer the `Object` constructor. */
const objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * isPlainObject(new Foo);
 * // => false
 *
 * isPlainObject([1, 2, 3]);
 * // => false
 *
 * isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  const proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  const Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

export default isPlainObject;
