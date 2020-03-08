import cycle from 'cycle';
/**
 * Invokes `func` with an additional parameter which
 * toggles on each call
 *
 * @since 
 * @category Function
 * @param {Function} func The function to execute.
 * @returns {Function} Returns the toggle wrapper.
 * @example
 *
 * let tw = toggleWrap(function(){return arguments[arguments.length-1]})
 * tw() // returns false
 * tw() // returns true
 * tw() // returns false
 * tw.freeze()
 * tw() // returns false
 * tw() // returns false
 * tw() // returns false
 * tw.unfreeze()
 * tw() // returns true
 * tw() // returns false
 */
function toggleWrap(func){
    let toggler = cycle(func, [false, true])
    toggler.freeze = toggler.setDirection.bind(this, 0)
    toggler.unfreeze = toggler.setDirection.bind(this, 1)
    return toggler
}
export default toggleWrap