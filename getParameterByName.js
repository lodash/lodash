/**
 * Get the parameter values of your current URL or string.
 *
 * @since 4.17.5
 * @category Util
 * @param {string} name Parameter name.
 * @param {string} url Alternative URL.
 * @returns {string} Returns `value`,
 * @example
 *
 * // current URL: http://example.com/?q=foo&page=4
 * getParameterByName('q')
 * // => 'foo'
 *
 * getParameterByName('page')
 * // => '4'
 *
 * getParameterByName('lang', 'http://other.com/?lang=javascript')
 * // => 'javascript'
 *
 */
function getParameterByName(name, url=window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default getParameterByName
