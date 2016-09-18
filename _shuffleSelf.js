import baseRandom from './_baseRandom.js';

/**
 * A specialized version of `arrayShuffle` which mutates `array`.
 *
 * @private
 * @param {Array} array The array to shuffle.
 * @returns {Array} Returns `array`.
 */
function shuffleSelf(array) {
  var index = -1,
      length = array.length,
      lastIndex = length - 1;

  while (++index < length) {
    var rand = baseRandom(index, lastIndex),
        value = array[rand];

    array[rand] = array[index];
    array[index] = value;
  }
  return array;
}

export default shuffleSelf;
