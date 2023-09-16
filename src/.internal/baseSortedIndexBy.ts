import isSymbol from '../isSymbol.js'

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295
const MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1

/**
 * The base implementation of `sortedIndexBy` and `sortedLastIndexBy`
 * which invokes `iteratee` for `value` and each element of `array` to compute
 * their sort ranking. The iteratee is invoked with one argument (value).
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} iteratee The iteratee invoked per element.
 * @param {boolean} [retHighest] Specify returning the highest qualified index.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function baseSortedIndexBy(array, value, iteratee, retHighest) {
  let low = 0
  let high = array == null ? 0 : array.length
  if (high == 0) {
    return 0
  }

  value = iteratee(value)

  const valIsNaN = value !== value
  const valIsNull = value === null
  const valIsSymbol = isSymbol(value)
  const valIsUndefined = value === undefined

  while (low < high) {
    let setLow
    const mid = Math.floor((low + high) / 2)
    const computed = iteratee(array[mid])
    const othIsDefined = computed !== undefined
    const othIsNull = computed === null
    const othIsReflexive = computed === computed
    const othIsSymbol = isSymbol(computed)

    if (valIsNaN) {
      setLow = retHighest || othIsReflexive
    } else if (valIsUndefined) {
      setLow = othIsReflexive && (retHighest || othIsDefined)
    } else if (valIsNull) {
      setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull)
    } else if (valIsSymbol) {
      setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol)
    } else if (othIsNull || othIsSymbol) {
      setLow = false
    } else {
      setLow = retHighest ? (computed <= value) : (computed < value)
    }
    if (setLow) {
      low = mid + 1
    } else {
      high = mid
    }
  }
  return Math.min(high, MAX_ARRAY_INDEX)
}

export default baseSortedIndexBy
