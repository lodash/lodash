import groupBy from './groupBy.js'
import values from './values.js'

/**
 * Creates an array of elements split into partitions based on given predicate function
 *
 * @since 4.17.15
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the array of grouped elements.
 * @see groupBy, values
 * @example
 *
 * const array = [10,10,20,20,30,40,40];
 * partitionsBy(array);
 * // => output : [[10,10],[20,20],[30],[40,40]]
 *
 * const employees = [
 *   { 'name': 'chirag',  'dept': 'sales',     'active': false }
 *   { 'name': 'barney',  'dept': 'finance',   'active': false },
 *   { 'name': 'fred',    'dept': 'marketing', 'active': true },
 *   { 'name': 'pebbles', 'dept': 'sales',     'active': false }
 * ]
 *
 * partitionsBy(users, ({ dept }) => dept)
 * // => objects for [['chirag','pebbles'], ['barney'], ['fred']]
 *
 */
function partitionsBy(collection, predicate) {
    if(!collection) return [[]];
    const partitions = groupBy(collection, predicate);
    return values(partitions);
}

export default partitionsBy
