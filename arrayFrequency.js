/**
 * Check the number of times an item is present in the given array
 *
 * @param {Array<any>} array
 * @returns {{}}
 */
function arrayFrequency(array) {
  const frequencyMap = {}
  array.forEach((element) => {
    const key = typeof element === 'object' ? JSON.stringify(element) : element
    frequencyMap[key] = (frequencyMap[key] || 0) + 1
  })
  return frequencyMap
}

export default arrayFrequency

