import baseRandom from './baseRandom.js';

/**
 * A specialized version of `shuffle` which mutates and sets the size of `array`.
 *
 * @private
 * @param {Array} array The array to shuffle.
 * @param {number} [size=array.length] The size of `array`.
 * @returns {Array} Returns `array`.
 */
function shuffleSelf(array, size) {
  let index = -1;
  const length = array.length;
  const lastIndex = length - 1;

  size = size === undefined ? length : size;
  while (++index < size) {
    const rand = baseRandom(index, lastIndex);
    const value = array[rand];

    array[rand] = array[index];
    array[index] = value;
  }
  array.length = size;
  return array;
}

export default shuffleSelf;
