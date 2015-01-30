/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseToString = require('lodash._basetostring');

/**
 * Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns)
 * and those outlined by [`EscapeRegExpPattern`](http://ecma-international.org/ecma-262/6.0/#sec-escaperegexppattern).
 */
var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/** Used to escape characters for inclusion in compiled regexes. */
var regexpEscapes = {
  '0': 'x30', '1': 'x31', '2': 'x32', '3': 'x33', '4': 'x34',
  '5': 'x35', '6': 'x36', '7': 'x37', '8': 'x38', '9': 'x39',
  'A': 'x41', 'B': 'x42', 'C': 'x43', 'D': 'x44', 'E': 'x45', 'F': 'x46',
  'a': 'x61', 'b': 'x62', 'c': 'x63', 'd': 'x64', 'e': 'x65', 'f': 'x66',
  'n': 'x6e', 'r': 'x72', 't': 'x74', 'u': 'x75', 'v': 'x76', 'x': 'x78'
};

/** Used to escape characters for inclusion in compiled string literals. */
var stringEscapes = {
  '\\': '\\',
  "'": "'",
  '\n': 'n',
  '\r': 'r',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};

/**
 * Used by `_.escapeRegExp` to escape characters for inclusion in compiled regexes.
 *
 * @private
 * @param {string} chr The matched character to escape.
 * @param {string} leadingChar The capture group for a leading character.
 * @param {string} whitespaceChar The capture group for a whitespace character.
 * @returns {string} Returns the escaped character.
 */
function escapeRegExpChar(chr, leadingChar, whitespaceChar) {
  if (leadingChar) {
    chr = regexpEscapes[chr];
  } else if (whitespaceChar) {
    chr = stringEscapes[chr];
  }
  return '\\' + chr;
}

/**
 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, escapeRegExpChar)
    : (string || '(?:)');
}

module.exports = escapeRegExp;
