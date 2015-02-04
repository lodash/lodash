var baseMatches = require('../internal/baseMatches'),
    find = require('./find');

/**
 * Performs a deep comparison between each element in `collection` and the
 * source object, returning the first element that has equivalent property
 * values.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {Object} source The object of property values to match.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'status': 'busy' },
 *   { 'user': 'fred',   'age': 40, 'status': 'busy' }
 * ];
 *
 * _.result(_.findWhere(users, { 'status': 'busy' }), 'user');
 * // => 'barney'
 *
 * _.result(_.findWhere(users, { 'age': 40 }), 'user');
 * // => 'fred'
 */
function findWhere(collection, source) {
  return find(collection, baseMatches(source));
}

module.exports = findWhere;
