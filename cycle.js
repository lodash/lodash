/**
 * Invokes `func` with an additional parameter which
 * toggles on each call
 *
 * @since 
 * @category Function
 * @param {Function} func The function to execute.
 * @param {Array} array The array to cycle over.
 * @returns {Function} Returns the cycled execution wrapper, which upon execution
 * executes func with the current extra argument.
 * @example
 *
 * let cw = cycle(function(){return arguments[arguments.length-1]}, ['a','b','c'])
 * cw() //returns a
 * cw() //returns b
 * cw() //returns c
 * cw() //returns a
 * cw.setDirection(0)
 * cw() //returns a
 * cw() //returns a
 * cw() //returns a
 * cw.setDirection(-1)
 * cw() //returns c
 * cw() //returns b
 * cw() //returns a
 */
function cycle(func, array){
    let currentIndex = 0
    let dir = 1
    let len = array.length
    function setDirection( value ){
        dir = value !== undefined ? value: 1
    }
    function cycler(){
        return (currentIndex + dir + len) % len
    }
    function getCurrentValue(){
        return array[currentIndex]
    }
    function getNextValue(){
        let nextIndex = cycler()
        return array[nextIndex]
    }
    function runner(){
        currentIndex = cycler()
        return func.call(this, getCurrentValue(currentIndex))
    }
    runner.setDirection = setDirection
    runner.getCurrentValue = getCurrentValue
    runner.getNextValue = getNextValue
    return runner
}
export default cycle