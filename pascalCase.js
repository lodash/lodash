var capitalize = require('./capitalize'),
    createCompounder = require('./_createCompounder');

/**
 * Converts `string` to pascal case
 *
 * @static
 * @memberOf _
 * @since 4.17.11
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the pascal cased string.
 * @example
 *
 * _.pascalCase('Foo Bar')
 * // => 'FooBar'
 *
 * _.pascalCase('--foo-bar--')
 * // => 'FooBar'
 *
 * _.pascalCase('__FOO_BAR__')
 * // => 'FooBar'
 */
var pascalCase = createCompounder(function(result, word) {
    word = word.toLowerCase();
    return result + capitalize(word);
});

module.exports = pascalCase;
