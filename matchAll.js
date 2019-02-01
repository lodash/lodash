import filter from './filter.js'

/**
 * Checks 'value' contains all the character strings in the array.
 *
 * @since 5.0.0
 * @category String
 * @param {String} value The value to check.
 * @param {Array} array Array of strings that you expect to be included.
 * @param {boolean} [matchCase] Specify distinguish uppercase and lowercase letters.
 * @returns {boolean} Returns `true` if all the elements in the array match.
 * @example
 *
 * matchAll('I love apple, banana, and strawberry.', ['apple', 'banana', 'strawberry'])
 * // => true
 *
 * matchAll('I love apple and strawberry.', ['apple', 'banana', 'strawberry'])
 * // => false
 *
 * matchAll('I love apple, banana, and strawberry.', ['APPLE', 'BANANA', 'STRAWBERRY'], true)
 * // => false
 */
function matchAll(value, array, matchCase) {
  var target = matchCase ? value : value.toUpperCase();

  const matched = filter(array, function (word) {
    return target.includes(matchCase ? word : word.toUpperCase());
  });

  return matched.length == array.length ? true : false;
}

export default matchAll
