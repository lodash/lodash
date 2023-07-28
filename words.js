import unicodeWords from './.internal/unicodeWords.js'

const hasUnicodeWord = RegExp.prototype.test.bind(
  /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/
)

/** Used to match words composed of alphanumeric characters. */
const reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g

function asciiWords(string) {
  return string.match(reAsciiWord)
}

/**
 * Splits `string` into an array of its words.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * When the pattern is not specified, words() will split the string at any
 * non-alphanumeric sequence (dropping those characters in the process).
 *
 *   words('fred, barney, & pebbles')
 *   // => ['fred', 'barney', 'pebbles']
 *
 * Sequences of same-cased characters will remain together unless the
 * character is the upper case start of a new word string.
 *
 *   words('XMLHttp')
 *   // => ['XML', 'Http']
 *
 * Additionally, numbers will be split from letters unless they are ordinal
 * values (e.g., 1st, 2nd, 3rd, 4th, etc).
 *
 *   words('Walked 6km on August 1st')
 *   // => ['Walked', '6', 'km', 'on', 'August', '1st']
 *
 * If a pattern is provided, only that pattern will be used to split the string.
 *
 *   words('fred, barney, & pebbles', /[^, ]+/g)
 *   // => ['fred', 'barney', '&', 'pebbles']
 *
 *   words('XMLHttp', /[^, ]+/g)
 *   // => ['XMLHttp']
 */
function words(string, pattern) {
  if (pattern === undefined) {
    const result = hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string)
    return result || []
  }
  return string.match(pattern) || []
}

export default words
