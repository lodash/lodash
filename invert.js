import constant from './constant.js';
import createInverter from './_createInverter.js';
import identity from './identity.js';

/**
 * Creates an object composed of the inverted keys and values of `object`.
 * If `object` contains duplicate values, subsequent values overwrite
 * property assignments of previous values.
 *
 * @static
 * @since 0.7.0
 * @category Object
 * @param {Object} object The object to invert.
 * @returns {Object} Returns the new inverted object.
 * @example
 *
 * var object = { 'a': 1, 'b': 2, 'c': 1 };
 *
 * invert(object);
 * // => { '1': 'c', '2': 'b' }
 */
const invert = createInverter((result, value, key) => {
  result[value] = key;
});

export default invert;
