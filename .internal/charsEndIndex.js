/**
 * Used by `trim` and `trimEnd` to get the index of the last string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the last unmatched string symbol.
 */
function charsEndIndex(strSymbols, chrSymbols) {
  const chrSymbolsDict = {}
  let index = chrSymbols.length
  while (index--) {
    chrSymbolsDict[chrSymbols[index]] = true
  }
  index = strSymbols.length

  while (index-- && chrSymbolsDict[strSymbols[index]] === true) {}
  return index
}

export default charsEndIndex
