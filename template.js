import assignInWith from './assignInWith.js'
import attempt from './attempt.js'
import baseValues from './.internal/baseValues.js'
import customDefaultsAssignIn from './.internal/customDefaultsAssignIn.js'
import isError from './isError.js'
import keys from './keys.js'
import reInterpolate from './.internal/reInterpolate.js'
import templateSettings from './templateSettings.js'

/** Used to match empty string literals in compiled template source. */
const reEmptyStringLeading = /\b__p \+= '';/g
const reEmptyStringMiddle = /\b(__p \+=) '' \+/g
const reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g

/**
 * Used to match
 * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
 */
const reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g

/** Used to ensure capturing order of template delimiters. */
const reNoMatch = /($^)/

/** Used to match unescaped characters in compiled string literals. */
const reUnescapedString = /['\n\r\u2028\u2029\\]/g

/** Used to escape characters for inclusion in compiled string literals. */
const stringEscapes = {
  '\\': '\\',
  "'": "'",
  '\n': 'n',
  '\r': 'r',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
}

/**
 * Creates a compiled template function that can interpolate data properties
 * in "interpolate" delimiters, HTML-escape interpolated data properties in
 * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
 * properties may be accessed as free variables in the template. If a setting
 * object is given, it takes precedence over `templateSettings` values.
 *
 * **Note:** In the development build `template` utilizes
 * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
 * for easier debugging.
 *
 * For more information on precompiling templates see
 * [lodash's custom builds documentation](https://lodash.com/custom-builds).
 *
 * For more information on Chrome extension sandboxes see
 * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
 *
 * @since 0.1.0
 * @category String
 * @param {string} [string=''] The template string.
 * @param {Object} [options={}] The options object.
 * @param {RegExp} [options.escape=templateSettings.escape]
 *  The HTML "escape" delimiter.
 * @param {RegExp} [options.evaluate=templateSettings.evaluate]
 *  The "evaluate" delimiter.
 * @param {Object} [options.imports=templateSettings.imports]
 *  An object to import into the template as free variables.
 * @param {RegExp} [options.interpolate=templateSettings.interpolate]
 *  The "interpolate" delimiter.
 * @param {string} [options.sourceURL='templateSources[n]']
 *  The sourceURL of the compiled template.
 * @param {string} [options.variable='obj']
 *  The data object variable name.
 * @returns {Function} Returns the compiled template function.
 * @example
 *
 * // Use the "interpolate" delimiter to create a compiled template.
 * let compiled = template('hello <%= user %>!')
 * compiled({ 'user': 'fred' })
 * // => 'hello fred!'
 *
 * // Use the HTML "escape" delimiter to escape data property values.
 * let compiled = template('<b><%- value %></b>')
 * compiled({ 'value': '<script>' })
 * // => '<b>&lt;script&gt;</b>'
 *
 * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
 * let compiled = template('<% forEach(users, function(user) { %><li><%- user %></li><% })%>')
 * compiled({ 'users': ['fred', 'barney'] })
 * // => '<li>fred</li><li>barney</li>'
 *
 * // Use the internal `print` function in "evaluate" delimiters.
 * let compiled = template('<% print("hello " + user)%>!')
 * compiled({ 'user': 'barney' })
 * // => 'hello barney!'
 *
 * // Use the ES template literal delimiter as an "interpolate" delimiter.
 * // Disable support by replacing the "interpolate" delimiter.
 * let compiled = template('hello ${ user }!')
 * compiled({ 'user': 'pebbles' })
 * // => 'hello pebbles!'
 *
 * // Use backslashes to treat delimiters as plain text.
 * let compiled = template('<%= "\\<%- value %\\>" %>')
 * compiled({ 'value': 'ignored' })
 * // => '<%- value %>'
 *
 * // Use the `imports` option to import `jQuery` as `jq`.
 * const text = '<% jq.each(users, function(user) { %><li><%- user %></li><% })%>'
 * let compiled = template(text, { 'imports': { 'jq': jQuery } })
 * compiled({ 'users': ['fred', 'barney'] })
 * // => '<li>fred</li><li>barney</li>'
 *
 * // Use the `sourceURL` option to specify a custom sourceURL for the template.
 * let compiled = template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' })
 * compiled(data)
 * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
 *
 * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
 * let compiled = template('hi <%= data.user %>!', { 'variable': 'data' })
 * compiled.source
 * // => function(data) {
 * //   const __t, __p = '';
 * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
 * //   return __p;
 * // }
 *
 * // Use custom template delimiters.
 * templateSettings.interpolate = /{{([\s\S]+?)}}/g
 * let compiled = template('hello {{ user }}!')
 * compiled({ 'user': 'mustache' })
 * // => 'hello mustache!'
 *
 * // Use the `source` property to inline compiled templates for meaningful
 * // line numbers in error messages and stack traces.
 * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
 *   const JST = {\
 *     "main": ' + template(mainText).source + '\
 *   };\
 * ')
 */
function template(string, options) {
  // Based on John Resig's `tmpl` implementation
  // (http://ejohn.org/blog/javascript-micro-templating/)
  // and Laura Doktorova's doT.js (https://github.com/olado/doT).
  const settings = templateSettings.imports.templateSettings || templateSettings

  options = assignInWith({}, options, settings, customDefaultsAssignIn)

  const imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn)
  const importsKeys = keys(imports)
  const importsValues = baseValues(imports, importsKeys)

  let isEscaping
  let isEvaluating
  let index = 0

  const interpolate = options.interpolate || reNoMatch
  let source = "__p += '"

  // Compile the regexp to match each delimiter.
  const reDelimiters = RegExp(`${[
    (options.escape || reNoMatch).source,
    interpolate.source,
    (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source,
    (options.evaluate || reNoMatch).source
  ].join('|')}|$`, 'g')

  // Use a sourceURL for easier debugging.
  const sourceURL = 'sourceURL' in options
    ? `//# sourceURL=${options.sourceURL}\n`
    : ''

  string.replace(reDelimiters, (
    match,
    escapeValue,
    interpolateValue,
    esTemplateValue,
    evaluateValue,
    offset
  ) => {
    interpolateValue || (interpolateValue = esTemplateValue)

    // Escape characters that can't be included in string literals.
    source += string
      .slice(index, offset)
      .replace(reUnescapedString, (chr) => `\\${stringEscapes[chr]}`)

    // Replace delimiters with snippets.
    if (escapeValue) {
      isEscaping = true
      source += `' +\n__e(${escapeValue}) +\n'`
    }
    if (evaluateValue) {
      isEvaluating = true
      source += `';\n${evaluateValue};\n__p += '`
    }
    if (interpolateValue) {
      source += `' +\n((__t = (${interpolateValue})) == null ? '' : __t) +\n'`
    }
    index = offset + match.length

    // The JS engine embedded in Adobe products needs `match` returned in
    // order to produce the correct `offset` value.
    return match
  })

  source += "';\n"

  // If `variable` is not specified wrap a with-statement around the generated
  // code to add the data object to the top of the scope chain.
  const variable = options.variable
  if (!variable) {
    source = `with (obj) {\n${source}\n}\n`
  }
  // Cleanup code by stripping empty strings.
  source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
    .replace(reEmptyStringMiddle, '$1')
    .replace(reEmptyStringTrailing, '$1;')

  // Frame code as the function body.
  source = `function(${variable || 'obj'}) {\n` +
    `${variable ? '' : 'obj || (obj = {});\n'}` +
    `var __t, __p = ''` +
    `${isEscaping ? ', __e = _.escape' : ''}` +
    `${isEvaluating ? ', __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, \'\') }\n' : ';\n'}` +
    `${source} return __p;\n}`

  const result = attempt(() => (
    Function(importsKeys, `${sourceURL}return ${source}`))(...importsValues)
  )

  // Provide the compiled function's source by its `toString` method or
  // the `source` property as a convenience for inlining compiled templates.
  result.source = source
  if (isError(result)) {
    throw result
  }
  return result
}

export default template
