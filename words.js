import asciiWords from './.internal/asciiWords.js';
import hasUnicodeWord from './.internal/hasUnicodeWord.js';
import toString from './toString.js';
import unicodeWords from './.internal/unicodeWords.js';

/**
 * Splits `string` into an array of its words.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

export default words;
