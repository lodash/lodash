var LodashWrapper = require('../internal/LodashWrapper'),
    arrayCopy = require('../internal/arrayCopy'),
    isArray = require('../lang/isArray'),
    isObjectLike = require('../internal/isObjectLike');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates a `lodash` object which wraps `value` to enable intuitive chaining.
 * Methods that operate on and return arrays, collections, and functions can
 * be chained together. Methods that return a boolean or single value will
 * automatically end the chain returning the unwrapped value. Explicit chaining
 * may be enabled using `_.chain`. The execution of chained methods is lazy,
 * that is, execution is deferred until `_#value` is implicitly or explicitly
 * called.
 *
 * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
 * fusion is an optimization that merges iteratees to avoid creating intermediate
 * arrays and reduce the number of iteratee executions.
 *
 * Chaining is supported in custom builds as long as the `_#value` method is
 * directly or indirectly included in the build.
 *
 * In addition to lodash methods, wrappers also have the following `Array` methods:
 * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
 * and `unshift`
 *
 * The wrapper functions that support shortcut fusion are:
 * `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`, `first`,
 * `initial`, `last`, `map`, `pluck`, `reject`, `rest`, `reverse`, `slice`,
 * `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `where`
 *
 * The chainable wrapper functions are:
 * `after`, `ary`, `assign`, `at`, `before`, `bind`, `bindAll`, `bindKey`,
 * `callback`, `chain`, `chunk`, `compact`, `concat`, `constant`, `countBy`,
 * `create`, `curry`, `debounce`, `defaults`, `defer`, `delay`, `difference`,
 * `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`, `flatten`,
 * `flattenDeep`, `flow`, `flowRight`, `forEach`, `forEachRight`, `forIn`,
 * `forInRight`, `forOwn`, `forOwnRight`, `functions`, `groupBy`, `indexBy`,
 * `initial`, `intersection`, `invert`, `invoke`, `keys`, `keysIn`, `map`,
 * `mapValues`, `matches`, `memoize`, `merge`, `mixin`, `negate`, `noop`,
 * `omit`, `once`, `pairs`, `partial`, `partialRight`, `partition`, `pick`,
 * `pluck`, `property`, `propertyOf`, `pull`, `pullAt`, `push`, `range`,
 * `rearg`, `reject`, `remove`, `rest`, `reverse`, `shuffle`, `slice`, `sort`,
 * `sortBy`, `sortByAll`, `splice`, `take`, `takeRight`, `takeRightWhile`,
 * `takeWhile`, `tap`, `throttle`, `thru`, `times`, `toArray`, `toPlainObject`,
 * `transform`, `union`, `uniq`, `unshift`, `unzip`, `values`, `valuesIn`,
 * `where`, `without`, `wrap`, `xor`, `zip`, and `zipObject`
 *
 * The wrapper functions that are **not** chainable by default are:
 * `attempt`, `camelCase`, `capitalize`, `clone`, `cloneDeep`, `deburr`,
 * `endsWith`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`,
 * `findLast`, `findLastIndex`, `findLastKey`, `findWhere`, `first`, `has`,
 * `identity`, `includes`, `indexOf`, `isArguments`, `isArray`, `isBoolean`,
 * `isDate`, `isElement`, `isEmpty`, `isEqual`, `isError`, `isFinite`,
 * `isFunction`, `isMatch` , `isNative`, `isNaN`, `isNull`, `isNumber`,
 * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`,
 * `isTypedArray`, `join`, `kebabCase`, `last`, `lastIndexOf`, `max`, `min`,
 * `noConflict`, `now`, `pad`, `padLeft`, `padRight`, `parseInt`, `pop`,
 * `random`, `reduce`, `reduceRight`, `repeat`, `result`, `runInContext`,
 * `shift`, `size`, `snakeCase`, `some`, `sortedIndex`, `sortedLastIndex`,
 * `startsWith`, `template`, `trim`, `trimLeft`, `trimRight`, `trunc`,
 * `unescape`, `uniqueId`, `value`, and `words`
 *
 * The wrapper function `sample` will return a wrapped value when `n` is provided,
 * otherwise an unwrapped value is returned.
 *
 * @name _
 * @constructor
 * @category Chain
 * @param {*} value The value to wrap in a `lodash` instance.
 * @returns {Object} Returns a `lodash` instance.
 * @example
 *
 * var wrapped = _([1, 2, 3]);
 *
 * // returns an unwrapped value
 * wrapped.reduce(function(sum, n) { return sum + n; });
 * // => 6
 *
 * // returns a wrapped value
 * var squares = wrapped.map(function(n) { return n * n; });
 *
 * _.isArray(squares);
 * // => false
 *
 * _.isArray(squares.value());
 * // => true
 */
function lodash(value) {
  if (isObjectLike(value) && !isArray(value)) {
    if (value instanceof LodashWrapper) {
      return value;
    }
    if (hasOwnProperty.call(value, '__wrapped__')) {
      return new LodashWrapper(value.__wrapped__, value.__chain__, arrayCopy(value.__actions__));
    }
  }
  return new LodashWrapper(value);
}

// Ensure `new LodashWrapper` is an instance of `lodash`.
LodashWrapper.prototype = lodash.prototype;

module.exports = lodash;
