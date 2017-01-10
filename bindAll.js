import arrayEach from './.internal/arrayEach.js';
import baseAssignValue from './.internal/baseAssignValue.js';
import bind from './bind.js';
import toKey from './.internal/toKey.js';

/**
 * Binds methods of an object to the object itself, overwriting the existing
 * method.
 *
 * **Note:** This method doesn't set the "length" property of bound functions.
 *
 * @since 0.1.0
 * @category Util
 * @param {Object} object The object to bind and assign the bound methods to.
 * @param {...(string|string[])} methodNames The object method names to bind.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var view = {
 *   'label': 'docs',
 *   'click': function() {
 *     console.log('clicked ' + this.label);
 *   }
 * };
 *
 * bindAll(view, ['click']);
 * jQuery(element).on('click', view.click);
 * // => Logs 'clicked docs' when clicked.
 */
function bindAll(object, ...methodNames) {
  arrayEach(methodNames, key => {
    key = toKey(key);
    baseAssignValue(object, key, bind(object[key], object));
  });
  return object;
}

export default bindAll;
