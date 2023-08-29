import isObject from './isObject.js'
import isFunction from './isFunction.js'

// Define the deepKeyPrune function
// Overall Time Complexity: O(n), where n is the total number of keys in all nested objects
// Overall Space Complexity: O(n), for storing the filtered objects
const deepKeyPrune = (obj, predicates, globalPredicate = null) => {
  // Early exit: If the input 'obj' is not an object, return it as-is
  // Time Complexity: O(1)
  // Space Complexity: O(1)
  if (!isObject(obj)) {
    return obj
  }

  // Handle arrays: If the input 'obj' is an array, map over it and apply deepKeyPrune recursively
  // Time Complexity: O(n), where n is the number of items in the array
  // Space Complexity: O(n), for storing the mapped array
  if (Array.isArray(obj)) {
    return obj.map((item) => deepKeyPrune(item, predicates, globalPredicate))
  }

  // Initialize an empty object to store the filtered properties
  // Space Complexity: O(1) (initialization)
  const filteredObj = {}

  // Loop through each key in the object 'obj'
  // Time Complexity: O(n), where n is the number of keys in the object
  for (const key in obj) {
    // Make sure the key is not from the object's prototype chain
    // Time Complexity: O(1)
    if (obj.hasOwnProperty(key)) {
      // Get the value for the current key
      // Time Complexity: O(1)
      // Space Complexity: O(1)
      const value = obj[key]
      // Get the local predicate function for the current key, if it exists
      // Time Complexity: O(1)
      // Space Complexity: O(1)
      const localPredicate = predicates[key]

      // Initialize a flag to indicate if the current key-value pair should be included in the filtered object
      // Space Complexity: O(1)
      let shouldInclude = true

      // Apply the local predicate function if it exists and is a function
      // Time Complexity: O(1) (assuming predicate function has constant time)
      if (isFunction(localPredicate) && !localPredicate(value)) {
        shouldInclude = false
      }

      // Apply the global predicate function if it exists and is a function
      // This is only done if 'shouldInclude' is still true after applying the local predicate
      // Time Complexity: O(1) (assuming predicate function has constant time)
      if (shouldInclude && isFunction(globalPredicate) && !globalPredicate(key, value)) {
        shouldInclude = false
      }

      // If the key-value pair passed both the local and global predicates, add it to the filtered object
      // Time Complexity: O(1) for adding to object, but recursive call can take O(n) for nested objects
      // Space Complexity: O(1) for storing a single key-value pair, but O(n) for nested objects
      if (shouldInclude) {
        filteredObj[key] = deepKeyPrune(value, predicates, globalPredicate)
      }
    }
  }

  // Space Complexity: O(n) for the filtered object
  return filteredObj
}

export default deepKeyPrune
