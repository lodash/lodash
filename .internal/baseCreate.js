import isObject from '../isObject.js';

/**
 * The base implementation of `create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? Object.create(proto) : {};
}

export default baseCreate;
