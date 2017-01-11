import baseForOwn from './baseForOwn.js';
import createBaseEach from './createBaseEach.js';

/**
 * The base implementation of `forEach`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
const baseEach = createBaseEach(baseForOwn);

export default baseEach;
