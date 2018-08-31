/** Used to compose unicode character classes. */
const rsAstralRange = '\\ud800-\\udfff'
const rsComboMarksRange = '\\u0300-\\u036f'
const reComboHalfMarksRange = '\\ufe20-\\ufe2f'
const rsComboSymbolsRange = '\\u20d0-\\u20ff'
const rsComboMarksExtendedRange = '\\u1ab0-\\u1aff'
const rsComboMarksSupplementRange = '\\u1dc0-\\u1dff'
const rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange
const rsVarRange = '\\ufe0e\\ufe0f'

/** Used to compose unicode capture groups. */
const rsAstral = `[${rsAstralRange}]`
const rsCombo = `[${rsComboRange}]`
const rsFitz = '\\ud83c[\\udffb-\\udfff]'
const rsModifier = `(?:${rsCombo}|${rsFitz})`
const rsNonAstral = `[^${rsAstralRange}]`
const rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}'
const rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]'
const rsZWJ = '\\u200d'

/** Used to compose unicode regexes. */
const reOptMod = `${rsModifier}?`
const rsOptVar = `[${rsVarRange}]?`
const rsOptJoin = `(?:${rsZWJ}(?:${[rsNonAstral, rsRegional, rsSurrPair].join('|')})${rsOptVar + reOptMod})*`
const rsSeq = rsOptVar + reOptMod + rsOptJoin
const rsNonAstralCombo = `${rsNonAstral}${rsCombo}?`
const rsSymbol = `(?:${[rsNonAstralCombo, rsCombo, rsRegional, rsSurrPair, rsAstral].join('|')})`

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
const reUnicode = RegExp(`${rsFitz}(?=${rsFitz})|${rsSymbol + rsSeq}`, 'g')

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || []
}

export default unicodeToArray
