/**
 * Modifies the array in place by moving one of its items to a new position.
 * The function will return the array unchanged if the `fromIndex` is out of
 * bounds or there is no action to perform. The function will cap the `newIndex`
 * between `0` and `array.length - 1`.
 *
 * @category Array
 * @param {Array} array The array to modify.
 * @param {number} fromIndex The index of the item to move.
 * @param {number} toIndex The index to move the item to.
 * @returns {Array} Always returns the same array reference, with the applied move when possible.
 */
function move<T>(array: T[], fromIndex: number, toIndex: number): T[] {
    const length = array.length;

    if (length === 0 || fromIndex === toIndex || fromIndex < 0 || fromIndex >= length) {
        return array;
    }

    if (toIndex >= length) {
        toIndex = length - 1;
    } else if (toIndex < 0) {
        toIndex = 0;
    }

    array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);

    return array;
}

export default move;
