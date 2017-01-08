import isObject from './isObject.js';

/** Built-in value references. */
const objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
const baseCreate = (() => {
  function object() {}
  return proto => {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    const result = new object;
    object.prototype = undefined;
    return result;
  };
})();

export default baseCreate;
