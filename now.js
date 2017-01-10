import root from './_root.js';

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * defer(function(stamp) {
 *   console.log(now() - stamp);
 * }, now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
const now = () => root.Date.now();

export default now;
