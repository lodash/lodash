/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  let index = -1;
  const result = Array(set.size);

  set.forEach(value => {
    result[++index] = value;
  });
  return result;
}

export default setToArray;
