/**
 * Finds if the given sub-sequence is present in the given parent string _at least once_.
 * @since 5.0.0
 * @category Function
 * @param {String} parentString - The string to find the sub-sequence in.
 * @param {String} subSequence - The sub-sequence to be found.
 * @returns {Boolean} - If the sub-sequence exists once or not.
 * @example
 *
 * const parent = 'ghsdjgkhiuih989hhjghijhwierhghrieuwdjgksd'
 * const exists = 'sk89ghd'
 * const doesNotExist = 'ghaaaaa'
 *
 * console.log(_.subSequenceExists(parent, exists))
 * // => Logs true.
 * console.log(_.subSequenceExists(parent, doesNotExist))
 * // => Logs false.
 */
function subSequenceExists(parentString, subSequence) {
  if (typeof parentString !== 'string' || typeof subSequence !== 'string') {
    throw new TypeError('Expected a string')
  }

  if (!subSequence.length) {
    throw new TypeError('Expected sub-sequence to not be empty')
  }

  let subSequenceIndex = 0

  for (const character of parentString) {
    if (subSequenceIndex >= subSequence.length) {
      break
    }

    if (character === subSequence[subSequenceIndex]) {
      subSequenceIndex++
    }
  }

  return subSequenceIndex === subSequence.length
}

export default subSequenceExists
