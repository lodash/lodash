import castSlice from './.internal/castSlice.js';
import charsEndIndex from './.internal/charsEndIndex.js';
import stringToArray from './.internal/stringToArray.js';

const methodName = ''.trimRight ? 'trimRight' : 'trimEnd';

/**
 * Removes trailing whitespace or specified characters from `string`.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @returns {string} Returns the trimmed string.
 * @see trim, trimStart
 * @example
 *
 * trimEnd('  abc  ')
 * // => '  abc'
 *
 * trimEnd('-_-abc-_-', '_-')
 * // => '-_-abc'
 */
function trimEnd(string, chars) {
    if (string && chars === undefined) {
        return string[methodName]();
    }
    if (!string || !chars) {
        return string || '';
    }
    const strSymbols = stringToArray(string);
    const end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
    return castSlice(strSymbols, 0, end).join('');
}

export default trimEnd;
