/**
 * Modifies the array in place by moving one of its items to a new position.
 * The function will return the array unchanged if the `oldIndex` is out of
 * bounds or there is no action to perform. The function will cap the `newIndex`
 * between `0` and `array.length - 1`.
 *
 * @since 4.17.15
 * @category Array
 * @param {Array} array The array to modify.
 * @param {number} oldIndex The index of the item to move.
 * @param {number} newIndex The index to move the item to.
 * @returns {Array} Always returns the same array reference, with the applied move when possible.
 */
function move(array, oldIndex, newIndex) {
  const length = array.length

  if (
    length === 0 ||
    oldIndex === newIndex ||
    oldIndex < 0 ||
    oldIndex >= length
  ) {
    return array
  }

  if (newIndex >= length) {
    newIndex = length - 1
  } else if (newIndex < 0) {
    newIndex = 0
  }

  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0])

  return array
}

export default move
