import baseAssignValue from './.internal/baseAssignValue';
import reduce from './reduce';

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Partitions a collection into two arrays: one for elements that satisfy
 * the predicate and one for elements that do not.
 *
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The predicate function to determine the grouping.
 * @returns {Object} Returns an object with two properties: 'true' and 'false'.
 * Each property holds an array of elements that satisfy or do not satisfy the predicate.
 * @example
 *
 * partitionBy([1, 2, 3, 4, 5], n => n % 2 === 0);
 * => { 'true': [2, 4], 'false': [1, 3, 5] }
 */

type Predicate<T> = (value: T) => boolean;

type PartitionResult<T> = {
    true: T[];
    false: T[];
};

function partitionBy<T>(collection: T[], predicate: Predicate<T>): PartitionResult<T> {
    return reduce(
        collection,
        (result: { [x: string]: any[] }, value: T) => {
            const key = predicate(value) ? 'true' : 'false';
            if (hasOwnProperty.call(result, key)) {
                result[key].push(value);
            } else {
                baseAssignValue(result, key, [value]);
            }
            return result;
        },
        {} as PartitionResult<T>,
    );
}

export default partitionBy;
