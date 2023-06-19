/**
 * Converts the keys of an object to camel case recursively.
 * @param {object} obj - The input object to be processed.
 * @returns {object} - The object with camel case keys.
 */
const  camelCaseKeys = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(camelCaseKeys)
  }

  return Object.keys(obj).reduce((acc, key) => {
    const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
    acc[camelCaseKey] = camelCaseKeys(obj[key])
    return acc
  }, {})
}
export default camelCaseKeys
