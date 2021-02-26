import capitalize from './capitalize'

function asWord(word) {
  return `\\b${word}\\b`
}

/**
 * @category String
 * @param {string} string input string
 * @param {string} word word that will be capitalized
 * @returns {string} Returns a new string with all the words that match 2nd capitalized. Partially matches are ignore (e.g.:  capitalizeWord('github', 'git') will still return 'github')
 * @example
 * capitalizeWord('frank talks about it frankly', 'frank');
 * // => 'Frank talks about it frankly'
 */
const capitalizeWord = (string, word) => {
  const matchWordRegex = new RegExp(asWord(word), 'ig')
  const matchWord = string.match(matchWordRegex)
  if (!matchWord) {
    return string
  }

  const replaceWord = capitalize(matchWord[0])
  return string.replace(new RegExp(matchWordRegex), replaceWord)
}

export default capitalizeWord
