import capitalize from "./capitalize";

/**
 * Capitalizes each word in the `string`.
 * @category String
 * @param {string} [string=''] The string to titleize.
 * @returns {string} The titleized string.
 * @example
 *
 * titleize('HeLLo wOrLD')
 * // => 'Hello World'
 */

const titleize = (string = "") => {
  var splittedString = string.split(" ");
  for (let i = 0; i < splittedString.length; i++)
    splittedString[i] = splittedString[i].capitalize();
  return splittedString.join(" ");
};

export default titleize;
