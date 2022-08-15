/**
 * 
 * Uses bubble sort to sort JSON Objects by value,
 * useing the condition defined in the callback
 * 
 * @category Object
 * @param {Object} obj The object that will be sorted
 * @param {Function} callback sorting condition
 * @returns {Object} Returns the sorted Object
 * 
 * 
 * @example
 * let testJson = {
 *   "a":2,
 *   "b":9,
 *   "c":3,
 *   "d":1,
 * }
 * objectSort(testJson, (a,b) => a > b)
 * //{ d: 1, a: 2, c: 3, b: 9 }
 */

function objectSort(obj, callback) {
    let keys = Object.keys(obj)
    let values = Object.values(obj)

    let len = values.length
    let checked;
    do {
        checked = false
        for (let i = 0; i < len; i++) {
            if (callback(values[i], values[i + 1])) {
                let tmp = values[i]
                values[i] = values[i + 1]
                values[i + 1] = tmp

                let tmpKeys = keys[i]
                keys[i] = keys[i + 1]
                keys[i + 1] = tmpKeys

                checked = true
            }
        }
    } while (checked)

    let newObj = {}

    for (let i = 0; i < keys.length; i++) {
        newObj[keys[i]]=values[i]   
    }
    return newObj
};


export default objectSort