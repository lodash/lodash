/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgs(args, partials, holders, isCurried) {
  const argsLength = args.length
  const holdersLength = holders.length
  const leftLength = partials.length

  let argsIndex = -1
  let leftIndex = -1
  let rangeLength = Math.max(argsLength - holdersLength, 0)

  const result = new Array(leftLength + rangeLength)
  const isUncurried = !isCurried

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex]
  }
  while (++argsIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[holders[argsIndex]] = args[argsIndex]
    }
  }
  while (rangeLength--) {
    result[leftIndex++] = args[argsIndex++]
  }
  return result
}

export default composeArgs
