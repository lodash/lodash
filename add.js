import createMathOperation from './.internal/createMathOperation.js'

/**
 * Adds two numbers.
 *
 * @since 3.4.0
 * @category Math
 * @param {number} augend The first number in an addition.
 * @param {number} addend The second number in an addition.
 * @returns {number} Returns the total.
 * @example
 *
 * add(6, 4)
 * // => 10
 */
const add = createMathOperation((augend)=> {
  var sum = augend; 
   var addNext = (addend)=> {
   if(addend){
      sum += addend
      return addNext
   }
    else 
      return sum;
  }
  addNext.toString = () => {return sum }
  return addNext;
}, 0)

export default add
