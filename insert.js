/**
 * Inserts the string at specified position.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] Given string.
 * @param {string} [string=''] The string to insert.
 * @param {number} [pos=0] at which position to insert.
 * @returns {string} Returns the inserted string.
 * @example
 *
 * insert('abcabc', 'de', 3)
 * // => 'abcdeabc'
 *
 * insert('sin()', 'cos()', 4)
 * // => 'sin(cos())'
 *
 * insert('abc', 'de', 0)
 * // => 'deabc'
 * 
 * insert("abc", "de", -1)
 * // => 'abdec'
 * 
 * insert('abc', '', 0)
 * // => 'abc'
 * 
 * insert('abc', '')
 * // => 'abc'
 * 
 */  

function insert(main_string, ins_string, pos) {
   if(typeof(pos) === "undefined") {
     pos = 0;
   }
    if(typeof(ins_string) === "undefined") {
     ins_string = '';
   }
    return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
}

export default insert
