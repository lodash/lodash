/**
 * This method returns a new empty object.
 *
 * @since 4.13.0
 * @category Util
 * @returns {Object} Returns the new empty object.
 * @example
 *
 * var objects = times(2, stubObject);
 *
 * console.log(objects);
 * // => [{}, {}]
 *
 * console.log(objects[0] === objects[1]);
 * // => false
 */
function stubObject() {
  return {};
}

export default stubObject;
