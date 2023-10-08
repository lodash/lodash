import upperFirst from './upperFirst.js';
import camelCase from './camelCase.js';

/**
 * Converts `string` to [pascal case](https://en.wikipedia.org/wiki/Camel_case).
 *
 * @since 5.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the pascal cased string.
 * @see camelCase, lowerCase, kebabCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * pascalCase('Foo Bar')
 * // => 'FooBar'
 *
 * pascalCase('--foo-bar--')
 * // => 'FooBar'
 *
 * pascalCase('__FOO_BAR__')
 * // => 'FooBar'
 */
const pascalCase = (string) => upperFirst(camelCase(string));

export default pascalCase;
