import flattenDeep from './flattenDeep.js'

/**
 * Produces a random string from a given collection.
 *
 * @param {Array|string} [collection=''] The collection to generate the string from.
 * @param {number} [length=6] The length of the generated random string.
 * @returns {string} Returns the random string.
 * @example
 *
 * randomFrom('abcdefghijklmnopqrstuvwxyz !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~', 8)
 * // => '@d!9$#gk'
 *
 * randomFrom(['0123456789', 'ABCDEF'])
 * // => 'F6ABG9'
 *
 * randomFrom(['Ford', ['#b2fe94', ['!@(%)', ['42']]]], 16)
 * // => '#!)4dr(@!94e4)e@'
 */
function randomFrom(collection = '', length = 6) {
  let result = ''
  
  if (collection.length == 0) {
    return ''
  }
  
  if (typeof collection == 'object' && typeof collection.length == 'number') {
    collection = flattenDeep(collection).toString().replace(/,/g, '')
  }

  for (let i = 0; i < length; i++) {
    result += collection[Math.floor(Math.random() * collection.length)]
  }

  return result
}

export default randomFrom
