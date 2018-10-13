

/**
 * 'eachElementCount' takes an array and tell you,
 * how many times each element in the array occured.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} takes an array and iterate twice and
 * and returns an object.
 * @returns {Object} Returns a object with key will be array element
 * and value will be number of times element occured in the array.
 * @example
 *
 * const colors = [ "yellow", "blue", "green", "green", "blue", "green","yellow"];
 *
 * colors.eachElementCount(colors);
 * // => { "yellow": 2, "blue": 2, "green": 3 };
 */
function eachElementCount(array) {
  var elementCount = {};
  array.forEach(function (element) {
    var count = 0;
    array.forEach(function (ele) {
      ele == element && count++;
    });
    (typeof(element) == 'object') ? elementCount[JSON.stringify(element)] = count : elementCount[element] = count;
  });
  return elementCount;
};

// module.eports = { eachElementCount }
