import baseSortedIndexBy from './.internal/baseSortedIndexBy.js'

/**
 * This method returns index of a range that includes given value.
 * 
 * @category Array
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to find its position.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {number} Returns the index of range
 * @example
 *
 * sortedIndexByComparator([[0,10],[10,16],[16,20]], 15, compare )
 * // => 1
 */
function sortedIndexByComparator(ranges, value, compare) {
    let low = 0;
    let high = ranges.length;
    while (low < high) {
      const mid = low + ((high - low) / 2 | 0);
      const pos = compare(ranges[mid],value);
      if (pos > 0) {
        low = mid + 1;
      }
      else if(pos == 0){
        return mid;
      }
      else{
          high = mid - 1;
      }
    }
    return -1;
  }

export default sortedIndexBy
