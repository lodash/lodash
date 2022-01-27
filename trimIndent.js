/**
 * Detects a common minimal indent of all the input lines from `string` and removes it from every line.
 *
 * @since 4.17.21
 * @category String
 * @param {string} [string=''] The string to trim.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * trimIndent(`
 *    Hey
 *      There
 * `)
 * // => `
 * // Hey
 * //   There
 * // `
 */
function trimIndent(string) {
  if (!string) {
    return ""
  }

  const lines = string.split("\n")
  const temp = lines.filter(it => it.trim() != "").map(it => it.length - it.trim().length).sort((a, b) => a - b)
  const indentation = temp.length == 0 ? 4 : temp[0]
  return lines.map(it => it.replace(" ".repeat(indentation), "")).join("\n")
}

export default trimIndent
