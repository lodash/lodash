import escape from './escape.js'
import reEscape from './.internal/reEscape.js'
import reEvaluate from './.internal/reEvaluate.js'
import reInterpolate from './.internal/reInterpolate.js'

/**
 * By default, the template delimiters used by lodash are like those in
 * embedded Ruby (ERB) as well as ES2015 template strings. Change the
 * following template settings to use alternative delimiters.
 *
 * @type {Object}
 */
const templateSettings = {

  /**
   * Used to detect `data` property values to be HTML-escaped.
   *
   * @memberOf templateSettings
   * @type {RegExp}
   */
  'escape': reEscape,

  /**
   * Used to detect code to be evaluated.
   *
   * @memberOf templateSettings
   * @type {RegExp}
   */
  'evaluate': reEvaluate,

  /**
   * Used to detect `data` property values to inject.
   *
   * @memberOf templateSettings
   * @type {RegExp}
   */
  'interpolate': reInterpolate,

  /**
   * Used to reference the data object in the template text.
   *
   * @memberOf templateSettings
   * @type {string}
   */
  'variable': '',

  /**
   * Used to import variables into the compiled template.
   *
   * @memberOf templateSettings
   * @type {Object}
   */
  'imports': {

    /**
     * A reference to the `lodash` function.
     *
     * @memberOf templateSettings.imports
     * @type {Function}
     */
    '_': { 'escape': escape }
  }
}

export default templateSettings
