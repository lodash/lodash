import arrayFilter from './arrayFilter.js';
import isFunction from '../isFunction.js';

/**
 * The base implementation of `functions` which creates an array of
 * `object` function property names filtered from `props`.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Array} props The property names to filter.
 * @returns {Array} Returns the function names.
 */
function baseFunctions(object, props) {
  return arrayFilter(props, key => isFunction(object[key]));
}

export default baseFunctions;
