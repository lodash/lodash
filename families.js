import pullAt from './pullAt.js'
import flatMap from './flatMap.js'
import findIndex from './findIndex.js'
import some from './some.js'

/**
 * Creates an array of elements split into groups. For any elements x and y of the collection,
 * if predicate(x,y) returns truthy, x and y will end up in the same group. It is assumed that
 * predicate(x,y) returns the same as predicate(y,x).
 * 
 * @category Collection
 * @param {Array|Object} collection The collection to divide into groups.
 * @param {Function} predicate The function invoked to determine membership in the same group.
 * @returns {Array} Returns the array of grouped elements.
 * @see partition, groupBy, keyBy
 * @example
 * 
 * var numbers = [1,2,3,4,5,6,7];
 * 
 * families(numbers, function(x,y){return x - y == 2 || y - x == 2;})
 * // => [[1,3,5,7],[2,4,6]]
 * 
 * numbers = [1,2,3,100,101,102];
 * 
 * families(numbers, function(x,y){return x - y == 1 || y - x == 1;})
 * // => [[1,2,3],[100,101,102]]
 */

function families(collection, predicate){
	var unassigned = flatMap(collection);
	var result = [];
	var currentFamily, foundIndex, foundElement;
	while(unassigned.length){
		if(!currentFamily){
			currentFamily = pullAt(unassigned,[0]);
			result.push(currentFamily);
		}else{
			foundIndex = findIndex(unassigned, e => some(currentFamily, f => predicate(e,f)));
			if(foundIndex > -1){
				foundElement = pullAt(unassigned, [foundIndex])[0];
				currentFamily.push(foundElement);
			}else{
				currentFamily = pullAt(unassigned,[0]);
				result.push(currentFamily);
			}
		}
	}
	return result;
}

export default families

