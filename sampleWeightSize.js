import sum from './sum.js'
/**
 * Gets `n` weighted random elements at unique keys from `array` up to the
 * size of `array`.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to sample.
 * @param {Array} weight The array to weight array to sample.
 * @param {number} [n=1] The number of elements to sample.
 * @returns {Array} Returns the random elements.
 * @example
 *
 * sampleWeightSize([1, 2, 3],[100, 50, 1], 2)
 * // => [1, 2]
 *
 * sampleWeightSize([1, 2, 3], [1, 1, 1], 3)
 * // => [1, 2, 3]
 */
function sampleWeightSize(array, weight, n) {
  const result = []
  let num = -1
  while (++num < n) {
    const idx = genRandomNum(weight)
    const randomNum = array[idx]
    result.push(randomNum)
  }
  return result
}

function genRandomNum(weight) {
  const max = sum(weight)
  const min = 1
  let weightRandom = Math.floor(Math.random() * (max - min) + min)
  for (let i = 0; i <= weight.length; i++) {
    weightRandom -= weight[i]
    if (weightRandom <= 0) {
      return i // return i + 1;
    }
  }
}

export default sampleWeightSize
