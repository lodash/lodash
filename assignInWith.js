import copyObject from './.internal/copyObject.js';
import createAssigner from './.internal/createAssigner.js';
import keysIn from './keysIn.js';

/**
 * This method is like `assignIn` except that it accepts `customizer`
 * which is invoked to produce the assigned values. If `customizer` returns
 * `undefined`, assignment is handled by the method instead. The `customizer`
 * is invoked with five arguments: (objValue, srcValue, key, object, source).
 *
 * **Note:** This method mutates `object`.
 *
 * @since 4.0.0
 * @alias extendWith
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @see assignWith
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   return isUndefined(objValue) ? srcValue : objValue;
 * }
 *
 * const defaults = partialRight(assignInWith, customizer);
 *
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
const assignInWith = createAssigner((object, source, srcIndex, customizer) => {
  copyObject(source, keysIn(source), object, customizer);
});

export default assignInWith;
