/**
 * Used by `trim` and `trimStart` to get the index of the first string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the first unmatched string symbol.
 */
function charsStartIndex(strSymbols, chrSymbols) {
  const chrSymbolsDict = {}
  let index = chrSymbols.length
  while (index--) {
    chrSymbolsDict[chrSymbols[index]] = true
  }

  index = -1
  const length = strSymbols.length

  while (++index < length && chrSymbolsDict[strSymbols[index]] === true) {}
  return index
}

export default charsStartIndex
