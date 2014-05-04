/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash underscore -o ./dist/lodash.underscore.js`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
;(function() {

  /** Used as a safe reference for `undefined` in pre ES5 environments */
  var undefined;

  /** Used to compose bitmasks for wrapper metadata */
  var BIND_FLAG = 1,
      BIND_KEY_FLAG = 2,
      CURRY_FLAG = 4,
      CURRY_BOUND_FLAG = 8,
      PARTIAL_FLAG = 16,
      PARTIAL_RIGHT_FLAG = 32;

  /** Used as the semantic version number */
  var version = '2.4.1';

  /** Used as the property name for wrapper metadata */
  var expando = '__lodash@' + version + '__';

  /** Used by methods to exit iteration */
  var breakIndicator = expando + 'breaker__';

  /** Used as the TypeError message for "Functions" methods */
  var funcErrorText = 'Expected a function';

  /** Used to generate unique IDs */
  var idCounter = 0;

  /** Used to match HTML entities and HTML characters */
  var reEscapedHtml = /&(?:amp|lt|gt|quot|#x27);/g,
      reUnescapedHtml = /[&<>"']/g;

  /** Used to match template delimiters */
  var reEscape = /<%-([\s\S]+?)%>/g,
      reEvaluate = /<%([\s\S]+?)%>/g,
      reInterpolate = /<%=([\s\S]+?)%>/g;

  /** Used to ensure capturing order of template delimiters */
  var reNoMatch = /($^)/;

  /**
   * Used to match `RegExp` special characters.
   * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
   * for more details.
   */
  var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g;

  /** Used to match unescaped characters in compiled string literals */
  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

  /** `Object#toString` result shortcuts */
  var argsClass = '[object Arguments]',
      arrayClass = '[object Array]',
      boolClass = '[object Boolean]',
      dateClass = '[object Date]',
      funcClass = '[object Function]',
      numberClass = '[object Number]',
      objectClass = '[object Object]',
      regexpClass = '[object RegExp]',
      stringClass = '[object String]';

  /**
   * Used to convert characters to HTML entities.
   *
   * Note: Though the ">" character is escaped for symmetry, characters like
   * ">", "`", and "/" don't require escaping in HTML and have no special meaning
   * unless they're part of a tag or unquoted attribute value.
   * See [Mathias' article](http://mathiasbynens.be/notes/ambiguous-ampersands)
   * (under "semi-related fun fact") for more details.
   */
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
  };

  /** Used to convert HTML entities to characters */
  var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'"
  };

  /** Used to determine if values are of the language type `Object` */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Used to escape characters for inclusion in compiled string literals */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /** Used as a reference to the global object */
  var root = (objectTypes[typeof window] && window) || this;

  /** Detect free variable `exports` */
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  /** Detect free variable `module` */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect free variable `global` from Node.js or Browserified code and use it as `root` */
  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }

  /** Detect the popular CommonJS extension `module.exports` */
  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

  /*--------------------------------------------------------------------------*/

  /**
   * The base implementation of `compareAscending` used to compare values and
   * sort them in ascending order without guaranteeing a stable sort.
   *
   * @private
   * @param {*} value The value to compare to `other`.
   * @param {*} other The value to compare to `value`.
   * @returns {number} Returns the sort order indicator for `value`.
   */
  function baseCompareAscending(value, other) {
    if (value !== other) {
      if (value > other || typeof value == 'undefined') {
        return 1;
      }
      if (value < other || typeof other == 'undefined') {
        return -1;
      }
    }
    return 0;
  }

  /**
   * The base implementation of `_.indexOf` without support for binary searches.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    var index = (fromIndex || 0) - 1,
        length = array ? array.length : 0;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Used by `_.sortBy` to compare transformed elements of a collection and stable
   * sort them in ascending order.
   *
   * @private
   * @param {Object} object The object to compare to `other`.
   * @param {Object} other The object to compare to `object`.
   * @returns {number} Returns the sort order indicator for `object`.
   */
  function compareAscending(object, other) {
    return baseCompareAscending(object.criteria, other.criteria) || object.index - other.index;
  }

  /**
   * Used by `_.escape` to convert characters to HTML entities.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeHtmlChar(chr) {
    return htmlEscapes[chr];
  }

  /**
   * Used by `_.template` to escape characters for inclusion in compiled
   * string literals.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeStringChar(chr) {
    return '\\' + stringEscapes[chr];
  }

  /**
   * Used by `_.unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {string} chr The matched character to unescape.
   * @returns {string} Returns the unescaped character.
   */
  function unescapeHtmlChar(chr) {
    return htmlUnescapes[chr];
  }

  /*--------------------------------------------------------------------------*/

  /** Used for native method references */
  var arrayRef = Array.prototype,
      objectProto = Object.prototype;

  /** Used to restore the original `_` reference in `_.noConflict` */
  var oldDash = root._;

  /**
   * Used as the maximum length of an array-like object.
   * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
   * for more details.
   */
  var maxSafeInteger = Math.pow(2, 53) - 1;

  /** Used to resolve the internal `[[Class]]` of values */
  var toString = objectProto.toString;

  /** Used to detect if a method is native */
  var reNative = RegExp('^' +
    escapeRegExp(toString)
    .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /** Native method shortcuts */
  var ceil = Math.ceil,
      floor = Math.floor,
      fnToString = Function.prototype.toString,
      hasOwnProperty = objectProto.hasOwnProperty,
      push = arrayRef.push,
      propertyIsEnumerable = objectProto.propertyIsEnumerable,
      splice = arrayRef.splice;

  /* Native method shortcuts for methods with the same name as other `lodash` methods */
  var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate,
      nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray,
      nativeIsFinite = root.isFinite,
      nativeIsNaN = root.isNaN,
      nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys,
      nativeMax = Math.max,
      nativeMin = Math.min,
      nativeNow = isNative(nativeNow = Date.now) && nativeNow,
      nativeRandom = Math.random;

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a `lodash` object which wraps the given value to enable intuitive
   * method chaining.
   *
   * In addition to Lo-Dash methods, wrappers also have the following `Array` methods:
   * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
   * and `unshift`
   *
   * Chaining is supported in custom builds as long as the `value` method is
   * implicitly or explicitly included in the build.
   *
   * The chainable wrapper functions are:
   * `after`, `assign`, `at`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`,
   * `compose`, `concat`, `constant`, `countBy`, `create`, `createCallback`,
   * `curry`, `debounce`, `defaults`, `defer`, `delay`, `difference`, `filter`,
   * `flatten`, `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`,
   * `forOwnRight`, `functions`, `groupBy`, `indexBy`, `initial`, `intersection`,
   * `invert`, `invoke`, `keys`, `map`, `mapValues`, `matches`, `max`, `memoize`,
   * `merge`, `min`, `mixin`, `noop`, `object`, `omit`, `once`, `pairs`, `partial`,
   * `partialRight`, `pick`, `pluck`, `property`, `pull`, `pullAt`, `push`,
   * `range`, `reject`, `remove`, `rest`, `reverse`, `shuffle`, `slice`, `sort`,
   * `sortBy`, `splice`, `tap`, `throttle`, `times`, `toArray`, `transform`,
   * `union`, `uniq`, `unshift`, `unzip`, `values`, `where`, `without`, `wrap`,
   * `xor`, and `zip`
   *
   * The non-chainable wrapper functions are:
   * `capitalize`, `clone`, `cloneDeep`, `contains`, `escape`, `every`, `find`,
   * `findIndex`, `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `has`,
   * `identity`, `indexOf`, `isArguments`, `isArray`, `isBoolean`, `isDate`,
   * `isElement`, `isEmpty`, `isEqual`, `isFinite`, `isFunction`, `isNaN`,
   * `isNull`, `isNumber`, `isObject`, `isPlainObject`, `isRegExp`, `isString`,
   * `isUndefined`, `join`, `lastIndexOf`, `noConflict`, `now`, `parseInt`,
   * `pop`, `random`, `reduce`, `reduceRight`, `result`, `shift`, `size`, `some`,
   * `sortedIndex`, `runInContext`, `template`, `trim`, `trimLeft`, `trimRight`,
   * `unescape`, `uniqueId`, and `value`
   *
   * The wrapper functions `first`, `last`, and `sample` return wrapped values
   * when `n` is provided, otherwise they return unwrapped values.
   *
   * Explicit chaining can be enabled by using the `_.chain` method.
   *
   * @name _
   * @constructor
   * @category Chaining
   * @param {*} value The value to wrap in a `lodash` instance.
   * @returns {Object} Returns a `lodash` instance.
   * @example
   *
   * var wrapped = _([1, 2, 3]);
   *
   * // returns an unwrapped value
   * wrapped.reduce(function(sum, num) {
   *   return sum + num;
   * });
   * // => 6
   *
   * // returns a wrapped value
   * var squares = wrapped.map(function(num) {
   *   return num * num;
   * });
   *
   * _.isArray(squares);
   * // => false
   *
   * _.isArray(squares.value());
   * // => true
   */
  function lodash(value) {
    return (value instanceof lodash)
      ? value
      : new lodashWrapper(value);
  }

  /**
   * A fast path for creating `lodash` wrapper objects.
   *
   * @private
   * @param {*} value The value to wrap in a `lodash` instance.
   * @param {boolean} [chainAll=false] A flag to enable chaining for all methods.
   * @returns {Object} Returns a `lodash` instance.
   */
  function lodashWrapper(value, chainAll) {
    this.__chain__ = !!chainAll;
    this.__wrapped__ = value;
  }
  // ensure `new lodashWrapper` is an instance of `lodash`
  lodashWrapper.prototype = lodash.prototype;

  /**
   * An object used to flag environments features.
   *
   * @static
   * @memberOf _
   * @type Object
   */
  var support = {};

  (function(x) {
    var object = { '0': 1, 'length': 1 };

    /**
     * Detect if `Array#shift` and `Array#splice` augment array-like objects
     * correctly.
     *
     * Firefox < 10, IE compatibility mode, and IE < 9 have buggy Array `shift()`
     * and `splice()` functions that fail to remove the last element, `value[0]`,
     * of array-like objects even though the `length` property is set to `0`.
     * The `shift()` method is buggy in IE 8 compatibility mode, while `splice()`
     * is buggy regardless of mode in IE < 9 and buggy in compatibility mode
     * in IE 9.
     *
     * @memberOf _.support
     * @type boolean
     */
    support.spliceObjects = (splice.call(object, 0, 1), !object[0]);
  }(0, 0));

  /**
   * By default, the template delimiters used by Lo-Dash are similar to those
   * in embedded Ruby (ERB). Change the following template settings to use
   * alternative delimiters.
   *
   * @static
   * @memberOf _
   * @type Object
   */
  lodash.templateSettings = {

    /**
     * Used to detect `data` property values to be HTML-escaped.
     *
     * @memberOf _.templateSettings
     * @type RegExp
     */
    'escape': reEscape,

    /**
     * Used to detect code to be evaluated.
     *
     * @memberOf _.templateSettings
     * @type RegExp
     */
    'evaluate': reEvaluate,

    /**
     * Used to detect `data` property values to inject.
     *
     * @memberOf _.templateSettings
     * @type RegExp
     */
    'interpolate': reInterpolate,

    /**
     * Used to reference the data object in the template text.
     *
     * @memberOf _.templateSettings
     * @type string
     */
    'variable': ''
  };

  /*--------------------------------------------------------------------------*/

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * callback shorthands or `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, callback) {
    var index = -1,
        length = array ? array.length : 0;

    while (++index < length) {
      if (callback(array[index], index, array) === breakIndicator) {
        break;
      }
    }
    return array;
  }

  /**
   * A specialized version of `_.map` for arrays without support for callback
   * shorthands or `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, callback) {
    var index = -1,
        length = array ? array.length >>> 0 : 0,
        result = Array(length);

    while (++index < length) {
      result[index] = callback(array[index], index, array);
    }
    return result;
  }

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} prototype The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  function baseCreate(prototype) {
    return isObject(prototype) ? nativeCreate(prototype) : {};
  }
  // fallback for environments without `Object.create`
  if (!nativeCreate) {
    baseCreate = (function() {
      function Object() {}
      return function(prototype) {
        if (isObject(prototype)) {
          Object.prototype = prototype;
          var result = new Object;
          Object.prototype = null;
        }
        return result || root.Object();
      };
    }());
  }

  /**
   * The base implementation of `_.createCallback` without support for creating
   * "_.pluck" or "_.where" style callbacks.
   *
   * @private
   * @param {*} [func=identity] The value to convert to a callback.
   * @param {*} [thisArg] The `this` binding of the created callback.
   * @param {number} [argCount] The number of arguments the callback accepts.
   * @returns {Function} Returns the new function.
   */
  function baseCreateCallback(func, thisArg, argCount) {
    if (typeof func != 'function') {
      return identity;
    }
    // exit early for no `thisArg` or already bound by `Function#bind`
    if (typeof thisArg == 'undefined' || !('prototype' in func)) {
      return func;
    }
    switch (argCount) {
      case 1: return function(value) {
        return func.call(thisArg, value);
      };
      case 2: return function(value, other) {
        return func.call(thisArg, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(thisArg, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(thisArg, accumulator, value, index, collection);
      };
    }
    return bind(func, thisArg);
  }

  /**
   * The base implementation of `createWrapper` that creates the wrapper and
   * sets its metadata.
   *
   * @private
   * @param {Array} data The metadata array.
   * @returns {Function} Returns the new function.
   */
  function baseCreateWrapper(data) {
    var func = data[0],
        bitmask = data[1],
        arity = data[2],
        thisArg = data[3],
        partialArgs = data[4],
        partialRightArgs = data[5],
        partialHolders = data[6];

    var isBind = bitmask & BIND_FLAG,
        isBindKey = bitmask & BIND_KEY_FLAG,
        isCurry = bitmask & CURRY_FLAG,
        isCurryBound = bitmask & CURRY_BOUND_FLAG,
        key = func;

    function bound() {
      var index = -1,
          length = arguments.length,
          args = Array(length);

      while (++index < length) {
        args[index] = arguments[index];
      }
      if (partialArgs) {
        args = composeArgs(partialArgs, partialHolders, args);
      }
      var thisBinding = isBind ? thisArg : this;
      if (this instanceof bound) {
        thisBinding = baseCreate(func.prototype);
        var result = func.apply(thisBinding, args);
        return isObject(result) ? result : thisBinding;
      }
      return func.apply(thisBinding, args);
    }
    return bound;
  }

  /**
   * The base implementation of `_.difference` that accepts a single array
   * of values to exclude.
   *
   * @private
   * @param {Array} array The array to process.
   * @param {Array} [values] The array of values to exclude.
   * @returns {Array} Returns the new array of filtered values.
   */
  function baseDifference(array, values) {
    var length = array ? array.length : 0;
    if (!length) {
      return [];
    }
    var index = -1,
        indexOf = getIndexOf(),
        result = [];

    while (++index < length) {
      var value = array[index];
      if (indexOf(values, value) < 0) {
        result.push(value);
      }
    }
    return result;
  }

  /**
   * The base implementation of `_.forEach` without support for callback
   * shorthands or `this` binding.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {Array|Object|string} Returns `collection`.
   */
  function baseEach(collection, callback) {
    var index = -1,
        iterable = collection,
        length = collection ? collection.length : 0;

    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
      while (++index < length) {
        if (callback(iterable[index], index, collection) === breakIndicator) {
          break;
        }
      }
    } else {
      baseForOwn(collection, callback);
    }
    return collection;
  }

  /**
   * The base implementation of `_.forEachRight` without support for callback
   * shorthands or `this` binding.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {Array|Object|string} Returns `collection`.
   */
  function baseEachRight(collection, callback) {
    var iterable = collection,
        length = collection ? collection.length : 0;

    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
      while (length--) {
        if (callback(iterable[length], length, collection) === breakIndicator) {
          break;
        }
      }
    } else {
      baseForOwnRight(collection, callback);
    }
    return collection;
  }

  /**
   * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`
   * without support for callback shorthands or `this` binding which iterates
   * over `collection` using the provided `eachFunc`.
   *
   * @private
   * @param {Array|Object|string} collection The collection to search.
   * @param {Function} predicate The function called per iteration.
   * @param {Function} eachFunc The function to iterate over the collection.
   * @param {boolean} [retKey=false] A flag to indicate returning the key of
   *  the found element instead of the element itself.
   * @returns {*} Returns the found element or its key, else `undefined`.
   */
  function baseFind(collection, predicate, eachFunc, retKey) {
    var result;

    eachFunc(collection, function(value, key, collection) {
      if (predicate(value, key, collection)) {
        result = retKey ? key : value;
        return breakIndicator;
      }
    });
    return result;
  }

  /**
   * The base implementation of `_.flatten` without support for callback
   * shorthands or `this` binding.
   *
   * @private
   * @param {Array} array The array to flatten.
   * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
   * @param {boolean} [isStrict=false] A flag to restrict flattening to arrays and `arguments` objects.
   * @param {number} [fromIndex=0] The index to start from.
   * @returns {Array} Returns the new flattened array.
   */
  function baseFlatten(array, isShallow, isStrict, fromIndex) {
    var index = (fromIndex || 0) - 1,
        length = array ? array.length : 0,
        result = [];

    while (++index < length) {
      var value = array[index];

      if (value && typeof value == 'object' && typeof value.length == 'number'
          && (isArray(value) || isArguments(value))) {
        // recursively flatten arrays (susceptible to call stack limits)
        if (!isShallow) {
          value = baseFlatten(value, isShallow, isStrict);
        }
        var valIndex = -1,
            valLength = value.length,
            resIndex = result.length;

        result.length += valLength;
        while (++valIndex < valLength) {
          result[resIndex++] = value[valIndex];
        }
      } else if (!isStrict) {
        result.push(value);
      }
    }
    return result;
  }

  /**
   * The base implementation of `baseForIn` and `baseForOwn` which iterates
   * over `object` properties returned by `keysFunc` executing the callback
   * for each property. Callbacks may exit iteration early by explicitly
   * returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  function baseFor(object, callback, keysFunc) {
    var index = -1,
        props = keysFunc(object),
        length = props.length;

    while (++index < length) {
      var key = props[index];
      if (callback(object[key], key, object) === breakIndicator) {
        break;
      }
    }
    return object;
  }

  /**
   * This function is like `baseFor` except that it iterates over properties
   * in the opposite order.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  function baseForRight(object, callback, keysFunc) {
    var props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[length];
      if (callback(object[key], key, object) === breakIndicator) {
        break;
      }
    }
    return object;
  }

  /**
   * The base implementation of `_.forIn` without support for callback
   * shorthands or `this` binding.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForIn(object, callback) {
    return baseFor(object, callback, keysIn);
  }

  /**
   * The base implementation of `_.forOwn` without support for callback
   * shorthands or `this` binding.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwn(object, callback) {
    return baseFor(object, callback, keys);
  }

  /**
   * The base implementation of `_.forOwnRight` without support for callback
   * shorthands or `this` binding.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwnRight(object, callback) {
    return baseForRight(object, callback, keys);
  }

  /**
   * The base implementation of `_.isEqual`, without support for `thisArg`
   * binding, that allows partial "_.where" style comparisons.
   *
   * @private
   * @param {*} value The value to compare to `other`.
   * @param {*} other The value to compare to `value`.
   * @param {Function} [callback] The function to customize comparing values.
   * @param {Function} [isWhere=false] A flag to indicate performing partial comparisons.
   * @param {Array} [stackA=[]] Tracks traversed `value` objects.
   * @param {Array} [stackB=[]] Tracks traversed `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */
  function baseIsEqual(value, other, stackA, stackB) {
    if (value === other) {
      return value !== 0 || (1 / value == 1 / other);
    }
    var valType = typeof value,
        othType = typeof other;

    if (value === value && (value == null || other == null ||
        (valType != 'function' && valType != 'object' && othType != 'function' && othType != 'object'))) {
      return false;
    }
    var valClass = toString.call(value),
        othClass = toString.call(other);

    if (valClass != othClass) {
      return false;
    }
    switch (valClass) {
      case boolClass:
      case dateClass:
        return +value == +other;

      case numberClass:
        return value != +value
          ? other != +other
          : (value == 0 ? (1 / value == 1 / other) : value == +other);

      case regexpClass:
      case stringClass:
        return value == String(other);
    }
    var isArr = valClass == arrayClass;
    if (!isArr) {
      if (valClass != objectClass) {
        return false;
      }
      var valWrapped = value instanceof lodash,
          othWrapped = other instanceof lodash;

      if (valWrapped || othWrapped) {
        return baseIsEqual(valWrapped ? value.__wrapped__ : value, othWrapped ? other.__wrapped__ : other, stackA, stackB);
      }
      var hasValCtor = hasOwnProperty.call(value, 'constructor'),
          hasOthCtor = hasOwnProperty.call(other, 'constructor');

      if (hasValCtor != hasOthCtor) {
        return false;
      }
      if (!hasValCtor) {
        var valCtor = value.constructor,
            othCtor = other.constructor;

        if (valCtor != othCtor &&
              !(isFunction(valCtor) && valCtor instanceof valCtor && isFunction(othCtor) && othCtor instanceof othCtor) &&
              ('constructor' in value && 'constructor' in other)
            ) {
          return false;
        }
      }
    }
    stackA || (stackA = []);
    stackB || (stackB = []);

    var length = stackA.length;
    while (length--) {
      if (stackA[length] == value) {
        return stackB[length] == other;
      }
    }
    var result = true,
        size = 0;

    stackA.push(value);
    stackB.push(other);

    if (isArr) {
      size = other.length;
      result = size == value.length;

      if (result) {
        while (size--) {
          if (!(result = baseIsEqual(value[size], other[size], stackA, stackB))) {
            break;
          }
        }
      }
    }
    else {
      baseForIn(other, function(othValue, key, other) {
        if (hasOwnProperty.call(other, key)) {
          size++;
          return !(result = hasOwnProperty.call(value, key) && baseIsEqual(value[key], othValue, stackA, stackB)) && breakIndicator;
        }
      });

      if (result) {
        baseForIn(value, function(valValue, key, value) {
          if (hasOwnProperty.call(value, key)) {
            return !(result = --size > -1) && breakIndicator;
          }
        });
      }
    }
    stackA.pop();
    stackB.pop();
    return result;
  }

  /**
   * The base implementation of `_.random` without argument juggling or support
   * for returning floating-point numbers.
   *
   * @private
   * @param {number} min The minimum possible value.
   * @param {number} max The maximum possible value.
   * @returns {number} Returns the random number.
   */
  function baseRandom(min, max) {
    return min + floor(nativeRandom() * (max - min + 1));
  }

  /**
   * The base implementation of `_.uniq` without support for callback shorthands
   * or `this` binding.
   *
   * @private
   * @param {Array} array The array to process.
   * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
   * @param {Function} [callback] The function called per iteration.
   * @returns {Array} Returns the new duplicate-value-free array.
   */
  function baseUniq(array, isSorted, callback) {
    var length = array ? array.length : 0;
    if (!length) {
      return [];
    }
    var index = -1,
        indexOf = getIndexOf(),
        result = [],
        seen = (callback && !isSorted) ? [] : result;

    while (++index < length) {
      var value = array[index],
          computed = callback ? callback(value, index, array) : value;

      if (isSorted) {
        if (!index || seen !== computed) {
          seen = computed;
          result.push(value);
        }
      }
      else if (indexOf(seen, computed) < 0) {
        if (callback) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
    return result;
  }

  /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * returned by `keysFunc`.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns the array of property values.
   */
  function baseValues(object, keysFunc) {
    var index = -1,
        props = keysFunc(object),
        length = props.length,
        result = Array(length);

    while (++index < length) {
      result[index] = object[props[index]];
    }
    return result;
  }

  /**
   * Creates an array that is the composition of partially applied arguments,
   * placeholders, and provided arguments into a single array of arguments.
   *
   * @private
   * @param {Array} partialArgs An array of arguments to prepend to those provided.
   * @param {Array} partialHolders An array of `partialArgs` placeholder indexes.
   * @param {Array|Object} args The provided arguments.
   * @returns {Array} Returns the new array of composed arguments.
   */
  function composeArgs(partialArgs, partialHolders, args) {
    var holdersLength = partialHolders.length,
        argsIndex = -1,
        argsLength = nativeMax(args.length - holdersLength, 0),
        leftIndex = -1,
        leftLength = partialArgs.length,
        result = Array(argsLength + leftLength);

    while (++leftIndex < leftLength) {
      result[leftIndex] = partialArgs[leftIndex];
    }
    while (++argsIndex < holdersLength) {
      result[partialHolders[argsIndex]] = args[argsIndex];
    }
    while (argsLength--) {
      result[leftIndex++] = args[argsIndex++];
    }
    return result;
  }

  /**
   * Creates a function that aggregates a collection, creating an accumulator
   * object composed from the results of running each element in the collection
   * through a callback. The given setter function sets the keys and values of
   * the accumulator object. If `initializer` is provided will be used to
   * initialize the accumulator object.
   *
   * @private
   * @param {Function} setter The function to set keys and values of the accumulator object.
   * @param {Function} [initializer] The function to initialize the accumulator object.
   * @returns {Function} Returns the new aggregator function.
   */
  function createAggregator(setter, initializer) {
    return function(collection, callback, thisArg) {
      var result = initializer ? initializer() : {};
      callback = createCallback(callback, thisArg, 3);

      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
        while (++index < length) {
          var value = collection[index];
          setter(result, value, callback(value, index, collection), collection);
        }
      } else {
        baseEach(collection, function(value, key, collection) {
          setter(result, value, callback(value, key, collection), collection);
        });
      }
      return result;
    };
  }

  /**
   * Creates a function that either curries or invokes `func` with an optional
   * `this` binding and partially applied arguments.
   *
   * @private
   * @param {Function|string} func The function or method name to reference.
   * @param {number} bitmask The bitmask of flags to compose.
   *  The bitmask may be composed of the following flags:
   *  1  - `_.bind`
   *  2  - `_.bindKey`
   *  4  - `_.curry`
   *  8  - `_.curry` (bound)
   *  16 - `_.partial`
   *  32 - `_.partialRight`
   * @param {number} [arity] The arity of `func`.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {Array} [partialArgs] An array of arguments to prepend to those
   *  provided to the new function.
   * @param {Array} [partialRightArgs] An array of arguments to append to those
   *  provided to the new function.
   * @returns {Function} Returns the new function.
   */
  function createWrapper(func, bitmask, arity, thisArg, partialArgs, partialRightArgs) {
    var isBind = bitmask & BIND_FLAG,
        isBindKey = bitmask & BIND_KEY_FLAG,
        isPartial = bitmask & PARTIAL_FLAG,
        isPartialRight = bitmask & PARTIAL_RIGHT_FLAG;

    if (!isFunction(func)) {
      throw new TypeError(funcErrorText);
    }
    if (isPartial && !partialArgs.length) {
      bitmask &= ~PARTIAL_FLAG;
      isPartial = partialArgs = false;
    }
    if (isPartial) {
      var partialHolders = getHolders(partialArgs);
    }
    if (arity == null) {
      arity = isBindKey ? 0 : func.length;
    }
    arity = nativeMax(arity, 0);

    // fast path for `_.bind`
    var data = [func, bitmask, arity, thisArg, partialArgs, partialRightArgs, partialHolders];
    return baseCreateWrapper(data);
  }

  /**
   * Finds the indexes of all placeholder elements in `array`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @returns {Array} Returns the new array of placeholder indexes.
   */
  function getHolders(array) {
    var index = -1,
        length = array.length,
        result = [];

    while (++index < length) {
      if (array[index] === lodash) {
        result.push(index);
      }
    }
    return result;
  }

  /**
   * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
   * customized this function returns the custom method, otherwise it returns
   * the `baseIndexOf` function.
   *
   * @private
   * @returns {Function} Returns the "indexOf" function.
   */
  function getIndexOf() {
    var result = lodash.indexOf || indexOf;
    return result === indexOf ? baseIndexOf : result;
  }

  /**
   * Checks if `value` is a native function.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
   */
  function isNative(value) {
    return typeof value == 'function' && reNative.test(fnToString.call(value));
  }

  /**
   * A fallback implementation of `Object.keys` which creates an array of the
   * own enumerable property names of `object`.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns the array of property names.
   */
  function shimKeys(object) {
    var index = -1,
        props = keysIn(object),
        length = props.length,
        result = [];

    while (++index < length) {
      var key = props[index];
      if (hasOwnProperty.call(object, key)) {
        result.push(key);
      }
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Creates an array with all falsey values removed. The values `false`, `null`,
   * `0`, `""`, `undefined`, and `NaN` are all falsey.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to compact.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * _.compact([0, 1, false, 2, '', 3]);
   * // => [1, 2, 3]
   */
  function compact(array) {
    var index = -1,
        length = array ? array.length : 0,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (value) {
        result[resIndex++] = value;
      }
    }
    return result;
  }

  /**
   * Creates an array excluding all values of the provided arrays using strict
   * equality for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to process.
   * @param {...Array} [values] The arrays of values to exclude.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * _.difference([1, 2, 3], [5, 2, 10]);
   * // => [1, 3]
   */
  function difference() {
    var index = -1,
        length = arguments.length;

    while (++index < length) {
      var value = arguments[index];
      if (isArray(value) || isArguments(value)) {
        break;
      }
    }
    return baseDifference(arguments[index], baseFlatten(arguments, true, true, ++index));
  }

  /**
   * Creates a slice of `array` with `n` elements dropped from the beginning.
   *
   * @static
   * @memberOf _
   * @type Function
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {number} [n=1] The number of elements to drop.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.drop([1, 2, 3], 1);
   * // => [2, 3]
   *
   * _.drop([1, 2, 3], 2);
   * // => [3]
   *
   * _.drop([1, 2, 3], 5);
   * // => []
   *
   * _.drop([1, 2, 3], 0);
   * // => [1, 2, 3]
   */
  var drop = rest;

  /**
   * This method is like `_.find` except that it returns the index of the first
   * element the predicate returns truthy for, instead of the element itself.
   *
   * If a property name is provided for `predicate` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `predicate` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to search.
   * @param {Function|Object|string} [predicate=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {number} Returns the index of the found element, else `-1`.
   * @example
   *
   * var characters = [
   *   { 'name': 'barney',  'age': 36 },
   *   { 'name': 'fred',    'age': 40, 'blocked': true },
   *   { 'name': 'pebbles', 'age': 1 }
   * ];
   *
   * _.findIndex(characters, function(chr) {
   *   return chr.age < 20;
   * });
   * // => 2
   *
   * // using "_.where" callback shorthand
   * _.findIndex(characters, { 'age': 36 });
   * // => 0
   *
   * // using "_.pluck" callback shorthand
   * _.findIndex(characters, 'blocked');
   * // => 1
   */
  function findIndex(array, predicate, thisArg) {
    var index = -1,
        length = array ? array.length : 0;

    predicate = createCallback(predicate, thisArg, 3);
    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Gets the first element of `array`.
   *
   * Note: The `n` and `predicate` arguments are deprecated; replace with
   * `_.take` and `_.takeWhile` respectively.
   *
   * @static
   * @memberOf _
   * @alias head
   * @category Arrays
   * @param {Array} array The array to query.
   * @returns {*} Returns the first element of `array`.
   * @example
   *
   * _.first([1, 2, 3]);
   * // => 1
   *
   * _.first([]);
   * // => undefined
   */
  function first(array, n, guard) {
    if (n == null || guard) {
      return array ? array[0] : undefined;
    }
    return slice(array, 0, n < 0 ? 0 : n);
  }

  /**
   * Flattens a nested array (the nesting can be to any depth). If `isShallow`
   * is truthy, the array will only be flattened a single level. If a callback
   * is provided each element of the array is passed through the callback before
   * flattening. The callback is bound to `thisArg` and invoked with three
   * arguments; (value, index, array).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to flatten.
   * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
   * @param {Function|Object|string} [callback] The function called per iteration.
   *  If a property name or object is provided it will be used to create a "_.pluck"
   *  or "_.where" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns the new flattened array.
   * @example
   *
   * _.flatten([1, [2], [3, [[4]]]]);
   * // => [1, 2, 3, 4];
   *
   * // using `isShallow`
   * _.flatten([1, [2], [3, [[4]]]], true);
   * // => [1, 2, 3, [[4]]];
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 30, 'pets': ['hoppy'] },
   *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.flatten(characters, 'pets');
   * // => ['hoppy', 'baby puss', 'dino']
   */
  function flatten(array, isShallow, guard) {
    var length = array ? array.length : 0;
    if (!length) {
      return [];
    }
    var type = typeof isShallow;
    if ((type == 'number' || type == 'string') && guard && guard[isShallow] === array) {
      isShallow = false;
    }
    return baseFlatten(array, isShallow);
  }

  /**
   * Gets the index at which the first occurrence of `value` is found using
   * strict equality for comparisons, i.e. `===`. If the array is already sorted
   * providing `true` for `fromIndex` will run a faster binary search.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {boolean|number} [fromIndex=0] The index to search from or `true`
   *  to perform a binary search on a sorted array.
   * @returns {number} Returns the index of the matched value, else `-1`.
   * @example
   *
   * _.indexOf([1, 2, 3, 1, 2, 3], 2);
   * // => 1
   *
   * // using `fromIndex`
   * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
   * // => 4
   *
   * // performing a binary search
   * _.indexOf([1, 1, 2, 2, 3, 3], 2, true);
   * // => 2
   */
  function indexOf(array, value, fromIndex) {
    var length = array ? array.length : 0;
    if (typeof fromIndex == 'number') {
      fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
    } else if (fromIndex) {
      var index = sortedIndex(array, value);
      return (length && array[index] === value) ? index : -1;
    }
    return baseIndexOf(array, value, fromIndex);
  }

  /**
   * Gets all but the last element of `array`.
   *
   * Note: The `n` and `predicate` arguments are deprecated; replace with
   * `_.dropRight` and `_.dropRightWhile` respectively.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to query.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.initial([1, 2, 3]);
   * // => [1, 2]
   */
  function initial(array, n, guard) {
    var length = array ? array.length : 0;
    if (n == null || guard) {
      n = 1;
    }
    n = length - (n || 0);
    return slice(array, 0, n < 0 ? 0 : n);
  }

  /**
   * Creates an array of unique values present in all provided arrays using
   * strict equality for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {...Array} [arrays] The arrays to inspect.
   * @returns {Array} Returns the new array of shared values.
   * @example
   *
   * _.intersection([1, 2, 3], [5, 2, 1, 4], [2, 1]);
   * // => [1, 2]
   */
  function intersection() {
    var args = [],
        argsIndex = -1,
        argsLength = arguments.length;

    while (++argsIndex < argsLength) {
      var value = arguments[argsIndex];
       if (isArray(value) || isArguments(value)) {
         args.push(value);
       }
    }
    argsLength = args.length;
    var array = args[0],
        index = -1,
        indexOf = getIndexOf(),
        length = array ? array.length : 0,
        result = [];

    outer:
    while (++index < length) {
      value = array[index];
      if (indexOf(result, value) < 0) {
        var argsIndex = argsLength;
        while (--argsIndex) {
          if (indexOf(args[argsIndex], value) < 0) {
            continue outer;
          }
        }
        result.push(value);
      }
    }
    return result;
  }

  /**
   * Gets the last element of `array`.
   *
   * Note: The `n` and `predicate` arguments are deprecated; replace with
   * `_.takeRight` and `_.takeRightWhile` respectively.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to query.
   * @returns {*} Returns the last element of `array`.
   * @example
   *
   * _.last([1, 2, 3]);
   * // => 3
   */
  function last(array, n, guard) {
    var length = array ? array.length : 0;
    if (n == null || guard) {
      return array ? array[length - 1] : undefined;
    }
    n = length - (n || 0);
    return slice(array, n < 0 ? 0 : n);
  }

  /**
   * Gets the index at which the last occurrence of `value` is found using
   * strict equality for comparisons, i.e. `===`. If `fromIndex` is negative,
   * it is used as the offset from the end of the collection.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {number} [fromIndex=array.length-1] The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   * @example
   *
   * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
   * // => 4
   *
   * // using `fromIndex`
   * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
   * // => 1
   */
  function lastIndexOf(array, value, fromIndex) {
    var index = array ? array.length : 0;
    if (typeof fromIndex == 'number') {
      index = (fromIndex < 0 ? nativeMax(index + fromIndex, 0) : nativeMin(fromIndex || 0, index - 1)) + 1;
    }
    while (index--) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Gets all but the first element of `array`.
   *
   * Note: The `n` and `predicate` arguments are deprecated; replace with
   * `_.drop` and `_.dropWhile` respectively.
   *
   * @static
   * @memberOf _
   * @alias tail
   * @category Arrays
   * @param {Array} array The array to query.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.rest([1, 2, 3]);
   * // => [2, 3]
   */
  function rest(array, n, guard) {
    if (n == null || guard) {
      n = 1;
    } else {
      n = n < 0 ? 0 : n;
    }
    return slice(array, n);
  }

  /**
   * Slices `array` from the `start` index up to, but not including, the `end` index.
   *
   * Note: This function is used instead of `Array#slice` to support node lists
   * in IE < 9 and to ensure dense arrays are returned.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start index.
   * @param {number} [end=array.length] The end index.
   * @returns {Array} Returns the slice of `array`.
   */
  function slice(array, start, end) {
    var index = -1,
        length = array ? array.length : 0;

    start = typeof start == 'undefined' ? 0 : (+start || 0);
    if (start < 0) {
      start = nativeMax(length + start, 0);
    } else if (start > length) {
      start = length;
    }
    end = typeof end == 'undefined' ? length : (+end || 0);
    if (end < 0) {
      end = nativeMax(length + end, 0);
    } else if (end > length) {
      end = length;
    }
    length = start > end ? 0 : (end - start);

    var result = Array(length);
    while (++index < length) {
      result[index] = array[start + index];
    }
    return result;
  }

  /**
   * Uses a binary search to determine the smallest index at which a value
   * should be inserted into a given sorted array in order to maintain the sort
   * order of the array. If a callback is provided it will be executed for
   * `value` and each element of `array` to compute their sort ranking. The
   * callback is bound to `thisArg` and invoked with one argument; (value).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to inspect.
   * @param {*} value The value to evaluate.
   * @param {Function|Object|string} [callback=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {number} Returns the index at which `value` should be inserted
   *  into `array`.
   * @example
   *
   * _.sortedIndex([20, 30, 50], 40);
   * // => 2
   *
   * var dict = {
   *   'wordToNumber': { 'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50 }
   * };
   *
   * // using `callback`
   * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'forty', function(word) {
   *   return dict.wordToNumber[word];
   * });
   * // => 2
   *
   * // using `callback` with `thisArg`
   * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'forty', function(word) {
   *   return this.wordToNumber[word];
   * }, dict);
   * // => 2
   *
   * // using "_.pluck" callback shorthand
   * _.sortedIndex([{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
   * // => 2
   */
  function sortedIndex(array, value, callback, thisArg) {
    var low = 0,
        high = array ? array.length : low;

    // explicitly reference `identity` for better inlining in Firefox
    callback = callback ? createCallback(callback, thisArg, 1) : identity;
    value = callback(value);

    while (low < high) {
      var mid = (low + high) >>> 1;
      (callback(array[mid]) < value)
        ? (low = mid + 1)
        : (high = mid);
    }
    return low;
  }

  /**
   * Creates a slice of `array` with `n` elements taken from the beginning.
   *
   * @static
   * @memberOf _
   * @type Function
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {number} [n=1] The number of elements to take.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.take([1, 2, 3], 1);
   * // => [1]
   *
   * _.take([1, 2, 3], 2);
   * // => [1, 2]
   *
   * _.take([1, 2, 3], 5);
   * // => [1, 2, 3]
   *
   * _.take([1, 2, 3], 0);
   * // => []
   */
  var take = first;

  /**
   * Creates an array of unique values, in order, of the provided arrays using
   * strict equality for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {...Array} [arrays] The arrays to inspect.
   * @returns {Array} Returns the new array of combined values.
   * @example
   *
   * _.union([1, 2, 3], [5, 2, 1, 4], [2, 1]);
   * // => [1, 2, 3, 5, 4]
   */
  function union() {
    return baseUniq(baseFlatten(arguments, true, true));
  }

  /**
   * Creates a duplicate-value-free version of an array using strict equality
   * for comparisons, i.e. `===`. If the array is sorted, providing `true` for
   * `isSorted` will use a faster algorithm. If a callback is provided it will
   * be executed for each value in the array to generate the criterion by which
   * uniqueness is computed. The callback is bound to `thisArg` and invoked with
   * three arguments; (value, index, array).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @alias unique
   * @category Arrays
   * @param {Array} array The array to process.
   * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
   * @param {Function|Object|string} [callback] The function called per iteration.
   *  If a property name or object is provided it will be used to create a "_.pluck"
   *  or "_.where" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns the new duplicate-value-free array.
   * @example
   *
   * _.uniq([1, 2, 1, 3, 1]);
   * // => [1, 2, 3]
   *
   * // using `isSorted`
   * _.uniq([1, 1, 2, 2, 3], true);
   * // => [1, 2, 3]
   *
   * // using `callback`
   * _.uniq(['A', 'b', 'C', 'a', 'B', 'c'], function(letter) { return letter.toLowerCase(); });
   * // => ['A', 'b', 'C']
   *
   * // using `callback` with `thisArg`
   * _.uniq([1, 2.5, 3, 1.5, 2, 3.5], function(num) { return this.floor(num); }, Math);
   * // => [1, 2.5, 3]
   *
   * // using "_.pluck" callback shorthand
   * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
   * // => [{ 'x': 1 }, { 'x': 2 }]
   */
  function uniq(array, isSorted, callback, thisArg) {
    var length = array ? array.length : 0;
    if (!length) {
      return [];
    }
    // juggle arguments
    var type = typeof isSorted;
    if (type != 'boolean' && isSorted != null) {
      thisArg = callback;
      callback = isSorted;
      isSorted = false;

      // enables use as a callback for functions like `_.map`
      if ((type == 'number' || type == 'string') && thisArg && thisArg[callback] === array) {
        callback = null;
      }
    }
    if (callback != null) {
      callback = createCallback(callback, thisArg, 3);
    }
    return baseUniq(array, isSorted, callback);
  }

  /**
   * Creates an array excluding all provided values using strict equality for
   * comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to filter.
   * @param {...*} [values] The values to exclude.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
   * // => [2, 3, 4]
   */
  function without() {
    return baseDifference(arguments[0], slice(arguments, 1));
  }

  /**
   * Creates an array of grouped elements, the first of which contains the first
   * elements of the given arrays, the second of which contains the second elements
   * of the given arrays, and so on. If a zipped value is provided its corresponding
   * unzipped value will be returned.
   *
   * @static
   * @memberOf _
   * @alias unzip
   * @category Arrays
   * @param {...Array} [arrays] The arrays to process.
   * @returns {Array} Returns the array of grouped elements.
   * @example
   *
   * _.zip(['fred', 'barney'], [30, 40], [true, false]);
   * // => [['fred', 30, true], ['barney', 40, false]]
   *
   * _.unzip([['fred', 30, true], ['barney', 40, false]]);
   * // => [['fred', 'barney'], [30, 40], [true, false]]
   */
  function zip() {
    var index = -1,
        length = max(pluck(arguments, 'length')),
        result = Array(length < 0 ? 0 : length);

    while (++index < length) {
      result[index] = pluck(arguments, index);
    }
    return result;
  }

  /**
   * Creates an object composed from arrays of `keys` and `values`. Provide
   * either a single two dimensional array, i.e. `[[key1, value1], [key2, value2]]`
   * or two arrays, one of `keys` and one of corresponding `values`.
   *
   * @static
   * @memberOf _
   * @alias object
   * @category Arrays
   * @param {Array} keys The array of keys.
   * @param {Array} [values=[]] The array of values.
   * @returns {Object} Returns the new object.
   * @example
   *
   * _.zipObject(['fred', 'barney'], [30, 40]);
   * // => { 'fred': 30, 'barney': 40 }
   */
  function zipObject(keys, values) {
    var index = -1,
        length = keys ? keys.length : 0,
        result = {};

    if (!values && length && !isArray(keys[0])) {
      values = [];
    }
    while (++index < length) {
      var key = keys[index];
      if (values) {
        result[key] = values[index];
      } else if (key) {
        result[key[0]] = key[1];
      }
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a `lodash` object that wraps `value` with explicit method
   * chaining enabled.
   *
   * @static
   * @memberOf _
   * @category Chaining
   * @param {*} value The value to wrap.
   * @returns {Object} Returns the new wrapper object.
   * @example
   *
   * var characters = [
   *   { 'name': 'barney',  'age': 36 },
   *   { 'name': 'fred',    'age': 40 },
   *   { 'name': 'pebbles', 'age': 1 }
   * ];
   *
   * var youngest = _.chain(characters)
   *     .sortBy('age')
   *     .map(function(chr) { return chr.name + ' is ' + chr.age; })
   *     .first()
   *     .value();
   * // => 'pebbles is 1'
   */
  function chain(value) {
    return new lodashWrapper(value, true);
  }

  /**
   * This method invokes `interceptor` and returns `value`. The interceptor is
   * bound to `thisArg` and invoked with one argument; (value). The purpose of
   * this method is to "tap into" a method chain in order to perform operations
   * on intermediate results within the chain.
   *
   * @static
   * @memberOf _
   * @category Chaining
   * @param {*} value The value to provide to `interceptor`.
   * @param {Function} interceptor The function to invoke.
   * @param {*} [thisArg] The `this` binding of `interceptor`.
   * @returns {*} Returns `value`.
   * @example
   *
   * _([1, 2, 3, 4])
   *  .tap(function(array) { array.pop(); })
   *  .reverse()
   *  .value();
   * // => [3, 2, 1]
   */
  function tap(value, interceptor) {
    interceptor(value);
    return value;
  }

  /**
   * Enables explicit method chaining on the wrapper object.
   *
   * @name chain
   * @memberOf _
   * @category Chaining
   * @returns {*} Returns the wrapper object.
   * @example
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40 }
   * ];
   *
   * // without explicit chaining
   * _(characters).first();
   * // => { 'name': 'barney', 'age': 36 }
   *
   * // with explicit chaining
   * _(characters).chain()
   *   .first()
   *   .pick('age')
   *   .value();
   * // => { 'age': 36 }
   */
  function wrapperChain() {
    this.__chain__ = true;
    return this;
  }

  /**
   * Extracts the wrapped value.
   *
   * @name valueOf
   * @memberOf _
   * @alias toJSON, value
   * @category Chaining
   * @returns {*} Returns the wrapped value.
   * @example
   *
   * _([1, 2, 3]).valueOf();
   * // => [1, 2, 3]
   */
  function wrapperValueOf() {
    return this.__wrapped__;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Checks if a given value is present in a collection using strict equality
   * for comparisons, i.e. `===`. If `fromIndex` is negative, it is used as the
   * offset from the end of the collection.
   *
   * @static
   * @memberOf _
   * @alias include
   * @category Collections
   * @param {Array|Object|string} collection The collection to search.
   * @param {*} target The value to check for.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {boolean} Returns `true` if a matching element is found, else `false`.
   * @example
   *
   * _.contains([1, 2, 3], 1);
   * // => true
   *
   * _.contains([1, 2, 3], 1, 2);
   * // => false
   *
   * _.contains({ 'name': 'fred', 'age': 40 }, 'fred');
   * // => true
   *
   * _.contains('pebbles', 'eb');
   * // => true
   */
  function contains(collection, target) {
    var indexOf = getIndexOf(),
        length = collection ? collection.length : 0;

    if (!(typeof length == 'number' && length > -1 && length <= maxSafeInteger)) {
      collection = values(collection);
    }
    return indexOf(collection, target) > -1;
  }

  /**
   * Creates an object composed of keys generated from the results of running
   * each element of `collection` through the callback. The corresponding value
   * of each key is the number of times the key was returned by the callback.
   * The callback is bound to `thisArg` and invoked with three arguments;
   * (value, index|key, collection).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [callback=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Object} Returns the composed aggregate object.
   * @example
   *
   * _.countBy([4.3, 6.1, 6.4], function(num) { return Math.floor(num); });
   * // => { '4': 1, '6': 2 }
   *
   * _.countBy([4.3, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
   * // => { '4': 1, '6': 2 }
   *
   * _.countBy(['one', 'two', 'three'], 'length');
   * // => { '3': 2, '5': 1 }
   */
  var countBy = createAggregator(function(result, value, key) {
    (hasOwnProperty.call(result, key) ? result[key]++ : result[key] = 1);
  });

  /**
   * Checks if the predicate returns truthy for **all** elements of a collection.
   * The predicate is bound to `thisArg` and invoked with three arguments;
   * (value, index|key, collection).
   *
   * If a property name is provided for `predicate` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `predicate` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @alias all
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [predicate=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {boolean} Returns `true` if all elements passed the predicate check,
   *  else `false`.
   * @example
   *
   * _.every([true, 1, null, 'yes']);
   * // => false
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40 }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.every(characters, 'age');
   * // => true
   *
   * // using "_.where" callback shorthand
   * _.every(characters, { 'age': 36 });
   * // => false
   */
  function every(collection, predicate, thisArg) {
    var result = true;
    predicate = createCallback(predicate, thisArg, 3);

    var index = -1,
        length = collection ? collection.length : 0;

    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
      while (++index < length) {
        if (!predicate(collection[index], index, collection)) {
          return false;
        }
      }
    } else {
      baseEach(collection, function(value, index, collection) {
        return !(result = !!predicate(value, index, collection)) && breakIndicator;
      });
    }
    return result;
  }

  /**
   * Iterates over elements of a collection returning an array of all elements
   * the predicate returns truthy for. The predicate is bound to `thisArg` and
   * invoked with three arguments; (value, index|key, collection).
   *
   * If a property name is provided for `predicate` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `predicate` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @alias select
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [predicate=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {Array} Returns the new filtered array.
   * @example
   *
   * var evens = _.filter([1, 2, 3, 4], function(num) { return num % 2 == 0; });
   * // => [2, 4]
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40, 'blocked': true }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.filter(characters, 'blocked');
   * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
   *
   * // using "_.where" callback shorthand
   * _.filter(characters, { 'age': 36 });
   * // => [{ 'name': 'barney', 'age': 36 }]
   */
  function filter(collection, predicate, thisArg) {
    var result = [];
    predicate = createCallback(predicate, thisArg, 3);

    var index = -1,
        length = collection ? collection.length : 0;

    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
      while (++index < length) {
        var value = collection[index];
        if (predicate(value, index, collection)) {
          result.push(value);
        }
      }
    } else {
      baseEach(collection, function(value, index, collection) {
        if (predicate(value, index, collection)) {
          result.push(value);
        }
      });
    }
    return result;
  }

  /**
   * Iterates over elements of a collection, returning the first element that
   * the predicate returns truthy for. The predicate is bound to `thisArg` and
   * invoked with three arguments; (value, index|key, collection).
   *
   * If a property name is provided for `predicate` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `predicate` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @alias detect
   * @category Collections
   * @param {Array|Object|string} collection The collection to search.
   * @param {Function|Object|string} [predicate=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {*} Returns the matched element, else `undefined`.
   * @example
   *
   * var characters = [
   *   { 'name': 'barney',  'age': 36 },
   *   { 'name': 'fred',    'age': 40, 'blocked': true },
   *   { 'name': 'pebbles', 'age': 1 }
   * ];
   *
   * _.find(characters, function(chr) {
   *   return chr.age < 40;
   * });
   * // => { 'name': 'barney', 'age': 36 }
   *
   * // using "_.where" callback shorthand
   * _.find(characters, { 'age': 1 });
   * // =>  { 'name': 'pebbles', 'age': 1 }
   *
   * // using "_.pluck" callback shorthand
   * _.find(characters, 'blocked');
   * // => { 'name': 'fred', 'age': 40, 'blocked': true }
   */
  function find(collection, predicate, thisArg) {
    var length = collection ? collection.length : 0;

    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
      var index = findIndex(collection, predicate, thisArg);
      return index > -1 ? collection[index] : undefined;
    }
    predicate = createCallback(predicate, thisArg, 3);
    return baseFind(collection, predicate, baseEach);
  }

  /**
   * Performs a deep comparison between each element in `collection` and the
   * source object, returning the first element that has equivalent property
   * values.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to search.
   * @param {Object} source The object of property values to match.
   * @returns {*} Returns the matched element, else `undefined`.
   * @example
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36, 'employer': 'slate' },
   *   { 'name': 'fred',   'age': 40, 'employer': 'slate' }
   * ];
   *
   * _.findWhere(characters, { 'employer': 'slate' });
   * // => { 'name': 'barney', 'age': 36, 'employer': 'slate' }
   *
   * _.findWhere(characters, { 'age': 40 });
   * // =>  { 'name': 'fred', 'age': 40, 'employer': 'slate' }
   */
  function findWhere(collection, source) {
    return find(collection, matches(source));
  }

  /**
   * Iterates over elements of a collection executing the callback for each
   * element. The callback is bound to `thisArg` and invoked with three arguments;
   * (value, index|key, collection). Callbacks may exit iteration early by
   * explicitly returning `false`.
   *
   * Note: As with other "Collections" methods, objects with a `length` property
   * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
   * may be used for object iteration.
   *
   * @static
   * @memberOf _
   * @alias each
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array|Object|string} Returns `collection`.
   * @example
   *
   * _([1, 2, 3]).forEach(function(num) { console.log(num); }).join(',');
   * // => logs each number and returns '1,2,3'
   *
   * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { console.log(num); });
   * // => logs each number and returns the object (property order is not guaranteed across environments)
   */
  function forEach(collection, callback, thisArg) {
    var length = collection ? collection.length : 0;
    callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);

    return (typeof length == 'number' && length > -1 && length <= maxSafeInteger)
      ? arrayEach(collection, callback)
      : baseEach(collection, callback);
  }

  /**
   * Creates an object composed of keys generated from the results of running
   * each element of a collection through the callback. The corresponding value
   * of each key is an array of the elements responsible for generating the key.
   * The callback is bound to `thisArg` and invoked with three arguments;
   * (value, index|key, collection).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [callback=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Object} Returns the composed aggregate object.
   * @example
   *
   * _.groupBy([4.2, 6.1, 6.4], function(num) { return Math.floor(num); });
   * // => { '4': [4.2], '6': [6.1, 6.4] }
   *
   * _.groupBy([4.2, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
   * // => { '4': [4.2], '6': [6.1, 6.4] }
   *
   * // using "_.pluck" callback shorthand
   * _.groupBy(['one', 'two', 'three'], 'length');
   * // => { '3': ['one', 'two'], '5': ['three'] }
   */
  var groupBy = createAggregator(function(result, value, key) {
    if (hasOwnProperty.call(result, key)) {
      result[key].push(value);
    } else {
      result[key] = [value];
    }
  });

  /**
   * Creates an object composed of keys generated from the results of running
   * each element of the collection through the given callback. The corresponding
   * value of each key is the last element responsible for generating the key.
   * The callback is bound to `thisArg` and invoked with three arguments;
   * (value, index|key, collection).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [callback=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Object} Returns the composed aggregate object.
   * @example
   *
   * var keyData = [
   *   { 'dir': 'left', 'code': 97 },
   *   { 'dir': 'right', 'code': 100 }
   * ];
   *
   * _.indexBy(keyData, 'dir');
   * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
   *
   * _.indexBy(keyData, function(object) { return String.fromCharCode(object.code); });
   * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
   *
   * _.indexBy(keyData, function(object) { return this.fromCharCode(object.code); }, String);
   * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
   */
  var indexBy = createAggregator(function(result, value, key) {
    result[key] = value;
  });

  /**
   * Invokes the method named by `methodName` on each element in the collection
   * returning an array of the results of each invoked method. Additional arguments
   * will be provided to each invoked method. If `methodName` is a function it
   * will be invoked for, and `this` bound to, each element in the collection.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|string} methodName The name of the method to invoke or
   *  the function invoked per iteration.
   * @param {...*} [args] Arguments to invoke the method with.
   * @returns {Array} Returns the array of results.
   * @example
   *
   * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
   * // => [[1, 5, 7], [1, 2, 3]]
   *
   * _.invoke([123, 456], String.prototype.split, '');
   * // => [['1', '2', '3'], ['4', '5', '6']]
   */
  function invoke(collection, methodName) {
    var args = slice(arguments, 2),
        index = -1,
        isFunc = typeof methodName == 'function',
        length = collection && collection.length,
        result = Array(length < 0 ? 0 : length >>> 0);

    baseEach(collection, function(value) {
      var func = isFunc ? methodName : (value != null && value[methodName]);
      result[++index] = func ? func.apply(value, args) : undefined;
    });
    return result;
  }

  /**
   * Creates an array of values by running each element in the collection
   * through the callback. The callback is bound to `thisArg` and invoked with
   * three arguments; (value, index|key, collection).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @alias collect
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [callback=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns the new mapped array.
   * @example
   *
   * _.map([1, 2, 3], function(num) { return num * 3; });
   * // => [3, 6, 9]
   *
   * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
   * // => [3, 6, 9] (property order is not guaranteed across environments)
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40 }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.map(characters, 'name');
   * // => ['barney', 'fred']
   */
  function map(collection, callback, thisArg) {
    var length = collection ? collection.length : 0;
    callback = createCallback(callback, thisArg, 3);

    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
      return arrayMap(collection, callback);
    }
    var index = -1,
        result = [];

    baseEach(collection, function(value, key, collection) {
      result[++index] = callback(value, key, collection);
    });
    return result;
  }

  /**
   * Retrieves the maximum value of a collection. If the collection is empty or
   * falsey `-Infinity` is returned. If a callback is provided it will be executed
   * for each value in the collection to generate the criterion by which the value
   * is ranked. The callback is bound to `thisArg` and invoked with three
   * arguments; (value, index, collection).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [callback] The function called per iteration.
   *  If a property name or object is provided it will be used to create a "_.pluck"
   *  or "_.where" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {*} Returns the maximum value.
   * @example
   *
   * _.max([4, 2, 8, 6]);
   * // => 8
   *
   * _.max([]);
   * // => -Infinity
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40 }
   * ];
   *
   * _.max(characters, function(chr) { return chr.age; });
   * // => { 'name': 'fred', 'age': 40 };
   *
   * // using "_.pluck" callback shorthand
   * _.max(characters, 'age');
   * // => { 'name': 'fred', 'age': 40 };
   */
  function max(collection, callback, thisArg) {
    var computed = -Infinity,
        result = computed,
        type = typeof callback;

    // enables use as a callback for functions like `_.map`
    if ((type == 'number' || type == 'string') && thisArg && thisArg[callback] === collection) {
      callback = null;
    }
    var index = -1,
        length = collection ? collection.length : 0;

    if (callback == null && typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
      while (++index < length) {
        var value = collection[index];
        if (value > result) {
          result = value;
        }
      }
    } else {
      callback = createCallback(callback, thisArg, 3);

      baseEach(collection, function(value, index, collection) {
        var current = callback(value, index, collection);
        if (current > computed || (current === -Infinity && current === result)) {
          computed = current;
          result = value;
        }
      });
    }
    return result;
  }

  /**
   * Retrieves the minimum value of a collection. If the collection is empty or
   * falsey `Infinity` is returned. If a callback is provided it will be executed
   * for each value in the collection to generate the criterion by which the value
   * is ranked. The callback is bound to `thisArg` and invoked with three
   * arguments; (value, index, collection).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [callback] The function called per iteration.
   *  If a property name or object is provided it will be used to create a "_.pluck"
   *  or "_.where" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {*} Returns the minimum value.
   * @example
   *
   * _.min([4, 2, 8, 6]);
   * // => 2
   *
   * _.min([]);
   * // => Infinity
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40 }
   * ];
   *
   * _.min(characters, function(chr) { return chr.age; });
   * // => { 'name': 'barney', 'age': 36 };
   *
   * // using "_.pluck" callback shorthand
   * _.min(characters, 'age');
   * // => { 'name': 'barney', 'age': 36 };
   */
  function min(collection, callback, thisArg) {
    var computed = Infinity,
        result = computed,
        type = typeof callback;

    // enables use as a callback for functions like `_.map`
    if ((type == 'number' || type == 'string') && thisArg && thisArg[callback] === collection) {
      callback = null;
    }
    var index = -1,
        length = collection ? collection.length : 0;

    if (callback == null && typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
      while (++index < length) {
        var value = collection[index];
        if (value < result) {
          result = value;
        }
      }
    } else {
      callback = createCallback(callback, thisArg, 3);

      baseEach(collection, function(value, index, collection) {
        var current = callback(value, index, collection);
        if (current < computed || (current === Infinity && current === result)) {
          computed = current;
          result = value;
        }
      });
    }
    return result;
  }

  /**
   * Creates an array of elements split into two groups, the first of which
   * contains elements the predicate returns truthy for, while the second of which
   * contains elements the predicate returns falsey for. The predicate is bound
   * to `thisArg` and invoked with three arguments; (value, index|key, collection).
   *
   * If a property name is provided for `predicate` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `predicate` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [predicate=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {Array} Returns the array of grouped elements.
   * @example
   *
   * _.partition([1, 2, 3], function(num) { return num % 2; });
   * // => [[1, 3], [2]]
   *
   * _.partition([1.2, 2.3, 3.4], function(num) { return this.floor(num) % 2; }, Math);
   * // => [[1, 3], [2]]
   *
   * var characters = [
   *   { 'name': 'barney',  'age': 36 },
   *   { 'name': 'fred',    'age': 40, 'blocked': true },
   *   { 'name': 'pebbles', 'age': 1 }
   * ];
   *
   * // using "_.where" callback shorthand
   * _.map(_.partition(characters, { 'age': 1 }), function(array) { return _.pluck(array, 'name'); });
   * // => [['pebbles'], ['barney', 'fred']]
   *
   * // using "_.pluck" callback shorthand
   * _.map(_.partition(characters, 'blocked'), function(array) { return _.pluck(array, 'name'); });
   * // => [['fred'], ['barney', 'pebbles']]
   */
  var partition = createAggregator(function(result, value, key) {
    result[key ? 0 : 1].push(value);
  }, function() { return [[], []]; });

  /**
   * Retrieves the value of a specified property from all elements in the collection.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {string} key The name of the property to pluck.
   * @returns {Array} Returns the property values.
   * @example
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40 }
   * ];
   *
   * _.pluck(characters, 'name');
   * // => ['barney', 'fred']
   */
  function pluck(collection, key) {
    return map(collection, property(key));
  }

  /**
   * Reduces a collection to a value which is the accumulated result of running
   * each element in the collection through the callback, where each successive
   * callback execution consumes the return value of the previous execution. If
   * `accumulator` is not provided the first element of the collection will be
   * used as the initial `accumulator` value. The callback is bound to `thisArg`
   * and invoked with four arguments; (accumulator, value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias foldl, inject
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {*} [accumulator] Initial value of the accumulator.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {*} Returns the accumulated value.
   * @example
   *
   * var sum = _.reduce([1, 2, 3], function(sum, num) {
   *   return sum + num;
   * });
   * // => 6
   *
   * var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
   *   result[key] = num * 3;
   *   return result;
   * }, {});
   * // => { 'a': 3, 'b': 6, 'c': 9 }
   */
  function reduce(collection, callback, accumulator, thisArg) {
    var noaccum = arguments.length < 3;
    callback = createCallback(callback, thisArg, 4);

    var index = -1,
        length = collection ? collection.length : 0;

    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
      if (noaccum && length) {
        accumulator = collection[++index];
      }
      while (++index < length) {
        accumulator = callback(accumulator, collection[index], index, collection);
      }
    } else {
      baseEach(collection, function(value, index, collection) {
        accumulator = noaccum
          ? (noaccum = false, value)
          : callback(accumulator, value, index, collection)
      });
    }
    return accumulator;
  }

  /**
   * This method is like `_.reduce` except that it iterates over elements of a
   * collection from right to left.
   *
   * @static
   * @memberOf _
   * @alias foldr
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {*} [accumulator] Initial value of the accumulator.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {*} Returns the accumulated value.
   * @example
   *
   * var array = [[0, 1], [2, 3], [4, 5]];
   * _.reduceRight(array, function(flattened, other) { return flattened.concat(other); }, []);
   * // => [4, 5, 2, 3, 0, 1]
   */
  function reduceRight(collection, callback, accumulator, thisArg) {
    var noaccum = arguments.length < 3;
    callback = createCallback(callback, thisArg, 4);

    baseEachRight(collection, function(value, index, collection) {
      accumulator = noaccum
        ? (noaccum = false, value)
        : callback(accumulator, value, index, collection);
    });
    return accumulator;
  }

  /**
   * The opposite of `_.filter`; this method returns the elements of a collection
   * the predicate does **not** return truthy for.
   *
   * If a property name is provided for `predicate` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `predicate` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [predicate=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {Array} Returns the new filtered array.
   * @example
   *
   * var odds = _.reject([1, 2, 3, 4], function(num) { return num % 2 == 0; });
   * // => [1, 3]
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40, 'blocked': true }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.reject(characters, 'blocked');
   * // => [{ 'name': 'barney', 'age': 36 }]
   *
   * // using "_.where" callback shorthand
   * _.reject(characters, { 'age': 36 });
   * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
   */
  function reject(collection, predicate, thisArg) {
    predicate = createCallback(predicate, thisArg, 3);
    return filter(collection, negate(predicate));
  }

  /**
   * Retrieves a random element or `n` random elements from a collection.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to sample.
   * @param {number} [n] The number of elements to sample.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
   * @returns {*} Returns the random sample(s).
   * @example
   *
   * _.sample([1, 2, 3, 4]);
   * // => 2
   *
   * _.sample([1, 2, 3, 4], 2);
   * // => [3, 1]
   */
  function sample(collection, n, guard) {
    if (collection && typeof collection.length != 'number') {
      collection = values(collection);
    }
    if (n == null || guard) {
      var length = collection ? collection.length : 0;
      return length > 0 ? collection[baseRandom(0, length - 1)] : undefined;
    }
    var result = shuffle(collection);
    result.length = nativeMin(n < 0 ? 0 : (+n || 0), result.length);
    return result;
  }

  /**
   * Creates an array of shuffled values, using a version of the Fisher-Yates
   * shuffle. See [Wikipedia](http://en.wikipedia.org/wiki/Fisher-Yates_shuffle)
   * for more details.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to shuffle.
   * @returns {Array} Returns the new shuffled array.
   * @example
   *
   * _.shuffle([1, 2, 3, 4]);
   * // => [4, 1, 3, 2]
   */
  function shuffle(collection) {
    var index = -1,
        length = collection && collection.length,
        result = Array(length < 0 ? 0 : length >>> 0);

    baseEach(collection, function(value) {
      var rand = baseRandom(0, ++index);
      result[index] = result[rand];
      result[rand] = value;
    });
    return result;
  }

  /**
   * Gets the size of the collection by returning `collection.length` for arrays
   * and array-like objects or the number of own enumerable properties for objects.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to inspect.
   * @returns {number} Returns `collection.length` or number of own enumerable properties.
   * @example
   *
   * _.size([1, 2]);
   * // => 2
   *
   * _.size({ 'one': 1, 'two': 2, 'three': 3 });
   * // => 3
   *
   * _.size('pebbles');
   * // => 7
   */
  function size(collection) {
    var length = collection ? collection.length : 0;
    return (typeof length == 'number' && length > -1 && length <= maxSafeInteger)
      ? length
      : keys(collection).length;
  }

  /**
   * Checks if the predicate returns truthy for **any** element of a collection.
   * The function returns as soon as it finds a passing value and does not iterate
   * over the entire collection. The predicate is bound to `thisArg` and invoked
   * with three arguments; (value, index|key, collection).
   *
   * If a property name is provided for `predicate` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `predicate` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @alias any
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [predicate=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {boolean} Returns `true` if any element passed the predicate check,
   *  else `false`.
   * @example
   *
   * _.some([null, 0, 'yes', false], Boolean);
   * // => true
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40, 'blocked': true }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.some(characters, 'blocked');
   * // => true
   *
   * // using "_.where" callback shorthand
   * _.some(characters, { 'age': 1 });
   * // => false
   */
  function some(collection, predicate, thisArg) {
    var result;
    predicate = createCallback(predicate, thisArg, 3);

    var index = -1,
        length = collection ? collection.length : 0;

    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
      while (++index < length) {
        if (predicate(collection[index], index, collection)) {
          return true;
        }
      }
    } else {
      baseEach(collection, function(value, index, collection) {
        return (result = predicate(value, index, collection)) && breakIndicator;
      });
    }
    return !!result;
  }

  /**
   * Creates an array of elements, sorted in ascending order by the results of
   * running each element in a collection through the callback. This method
   * performs a stable sort, that is, it will preserve the original sort order
   * of equal elements. The callback is bound to `thisArg` and invoked with
   * three arguments; (value, index|key, collection).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an array of property names is provided for `callback` the collection
   * will be sorted by each property value.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Array|Function|Object|string} [callback=identity] The function
   *  called per iteration. If a property name or object is provided it will
   *  be used to create a "_.pluck" or "_.where" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns the new sorted array.
   * @example
   *
   * _.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
   * // => [3, 1, 2]
   *
   * _.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);
   * // => [3, 1, 2]
   *
   * var characters = [
   *   { 'name': 'barney',  'age': 36 },
   *   { 'name': 'fred',    'age': 40 },
   *   { 'name': 'barney',  'age': 26 },
   *   { 'name': 'fred',    'age': 30 }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.map(_.sortBy(characters, 'age'), _.values);
   * // => [['barney', 26], ['fred', 30], ['barney', 36], ['fred', 40]]
   *
   * // sorting by multiple properties
   * _.map(_.sortBy(characters, ['name', 'age']), _.values);
   * // = > [['barney', 26], ['barney', 36], ['fred', 30], ['fred', 40]]
   */
  function sortBy(collection, callback, thisArg) {
    var index = -1,
        length = collection && collection.length,
        result = Array(length < 0 ? 0 : length >>> 0);

    callback = createCallback(callback, thisArg, 3);
    baseEach(collection, function(value, key, collection) {
      result[++index] = {
        'criteria': callback(value, key, collection),
        'index': index,
        'value': value
      };
    });

    length = result.length;
    result.sort(compareAscending);
    while (length--) {
      result[length] = result[length].value;
    }
    return result;
  }

  /**
   * Converts `collection` to an array.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to convert.
   * @returns {Array} Returns the new converted array.
   * @example
   *
   * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
   * // => [2, 3, 4]
   */
  function toArray(collection) {
    if (isArray(collection)) {
      return slice(collection);
    }
    if (collection && typeof collection.length == 'number') {
      return map(collection);
    }
    return values(collection);
  }

  /**
   * Performs a deep comparison between each element in `collection` and the
   * source object, returning an array of all elements that have equivalent
   * property values.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to search.
   * @param {Object} source The object of property values to match.
   * @returns {Array} Returns the new filtered array.
   * @example
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36, 'employer': 'slate', 'pets': ['hoppy'] },
   *   { 'name': 'fred',   'age': 40, 'employer': 'slate', 'pets': ['baby puss', 'dino'] }
   * ];
   *
   * _.pluck(_.where(characters, { 'age': 36 }), 'name');
   * // => ['barney']
   *
   * _.pluck(_.where(characters, { 'pets': ['dino'] }), 'name');
   * // => ['fred']
   *
   * _.pluck(_.where(characters, { 'employer': 'slate' }), 'name');
   * // => ['barney', 'fred']
   */
  function where(collection, source) {
    return filter(collection, matches(source));
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a function that executes `func`, with the `this` binding and
   * arguments of the created function, only after being called `n` times.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {number} n The number of times the function must be called before
   *  `func` is executed.
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new restricted function.
   * @example
   *
   * var saves = ['profile', 'settings'];
   *
   * var done = _.after(saves.length, function() {
   *   console.log('Done saving!');
   * });
   *
   * _.forEach(saves, function(type) {
   *   asyncSave({ 'type': type, 'complete': done });
   * });
   * // => logs 'Done saving!', after all saves have completed
   */
  function after(n, func) {
    if (!isFunction(func)) {
      throw new TypeError(funcErrorText);
    }
    n = nativeIsFinite(n = +n) ? n : 0;
    return function() {
      if (--n < 1) {
        return func.apply(this, arguments);
      }
    };
  }

  /**
   * Creates a function that invokes `func` with the `this` binding of `thisArg`
   * and prepends any additional `bind` arguments to those provided to the bound
   * function.
   *
   * Note: Unlike native `Function#bind` this method does not set the `length`
   * property of bound functions.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to bind.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {...*} [args] Arguments to be partially applied.
   * @returns {Function} Returns the new bound function.
   * @example
   *
   * var func = function(greeting) {
   *   return greeting + ' ' + this.name;
   * };
   *
   * func = _.bind(func, { 'name': 'fred' }, 'hi');
   * func();
   * // => 'hi fred'
   */
  function bind(func, thisArg) {
    return arguments.length < 3
      ? createWrapper(func, BIND_FLAG, null, thisArg)
      : createWrapper(func, BIND_FLAG | PARTIAL_FLAG, null, thisArg, slice(arguments, 2));
  }

  /**
   * Binds methods of an object to the object itself, overwriting the existing
   * method. Method names may be specified as individual arguments or as arrays
   * of method names. If no method names are provided all the function properties
   * of `object` will be bound.
   *
   * Note: This method does not set the `length` property of bound functions.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Object} object The object to bind and assign the bound methods to.
   * @param {...string} [methodNames] The object method names to bind, specified
   *  as individual method names or arrays of method names.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var view = {
   *   'label': 'docs',
   *   'onClick': function() { console.log('clicked ' + this.label); }
   * };
   *
   * _.bindAll(view);
   * jQuery('#docs').on('click', view.onClick);
   * // => logs 'clicked docs', when the button is clicked
   */
  function bindAll(object) {
    var funcs = arguments.length > 1 ? baseFlatten(arguments, true, false, 1) : functions(object),
        index = -1,
        length = funcs.length;

    while (++index < length) {
      var key = funcs[index];
      object[key] = createWrapper(object[key], BIND_FLAG, null, object);
    }
    return object;
  }

  /**
   * Creates a function that is the composition of the provided functions,
   * where each function consumes the return value of the function that follows.
   * For example, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`.
   * Each function is executed with the `this` binding of the composed function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {...Function} [funcs] Functions to compose.
   * @returns {Function} Returns the new composed function.
   * @example
   *
   * var realNameMap = {
   *   'pebbles': 'penelope'
   * };
   *
   * var format = function(name) {
   *   name = realNameMap[name.toLowerCase()] || name;
   *   return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
   * };
   *
   * var greet = function(formatted) {
   *   return 'Hiya ' + formatted + '!';
   * };
   *
   * var welcome = _.compose(greet, format);
   * welcome('pebbles');
   * // => 'Hiya Penelope!'
   */
  function compose() {
    var funcs = arguments,
        funcsLength = funcs.length,
        length = funcsLength;

    while (length--) {
      if (!isFunction(funcs[length])) {
        throw new TypeError(funcErrorText);
      }
    }
    return function() {
      var length = funcsLength - 1,
          result = funcs[length].apply(this, arguments);

      while (length--) {
        result = funcs[length].call(this, result);
      }
      return result;
    };
  }

  /**
   * Creates a function that will delay the execution of `func` until after
   * `wait` milliseconds have elapsed since the last time it was invoked.
   * Provide an options object to indicate that `func` should be invoked on
   * the leading and/or trailing edge of the `wait` timeout. Subsequent calls
   * to the debounced function will return the result of the last `func` call.
   *
   * Note: If `leading` and `trailing` options are `true`, `func` will be called
   * on the trailing edge of the timeout only if the the debounced function is
   * invoked more than once during the `wait` timeout.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to debounce.
   * @param {number} wait The number of milliseconds to delay.
   * @param {Object} [options] The options object.
   * @param {boolean} [options.leading=false] Specify execution on the leading edge of the timeout.
   * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's called.
   * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // avoid costly calculations while the window size is in flux
   * var lazyLayout = _.debounce(calculateLayout, 150);
   * jQuery(window).on('resize', lazyLayout);
   *
   * // execute `sendMail` when the click event is fired, debouncing subsequent calls
   * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * });
   *
   * // ensure `batchLog` is executed once after 1 second of debounced calls
   * var source = new EventSource('/stream');
   * source.addEventListener('message', _.debounce(batchLog, 250, {
   *   'maxWait': 1000
   * }, false);
   */
  function debounce(func, wait, options) {
    var args,
        maxTimeoutId,
        result,
        stamp,
        thisArg,
        timeoutId,
        trailingCall,
        lastCalled = 0,
        maxWait = false,
        trailing = true;

    if (!isFunction(func)) {
      throw new TypeError(funcErrorText);
    }
    wait = wait < 0 ? 0 : wait;
    if (options === true) {
      var leading = true;
      trailing = false;
    } else if (isObject(options)) {
      leading = options.leading;
      maxWait = 'maxWait' in options && nativeMax(wait, +options.maxWait || 0);
      trailing = 'trailing' in options ? options.trailing : trailing;
    }
    var delayed = function() {
      var remaining = wait - (now() - stamp);
      if (remaining <= 0 || remaining > wait) {
        if (maxTimeoutId) {
          clearTimeout(maxTimeoutId);
        }
        var isCalled = trailingCall;
        maxTimeoutId = timeoutId = trailingCall = undefined;
        if (isCalled) {
          lastCalled = now();
          result = func.apply(thisArg, args);
          if (!timeoutId && !maxTimeoutId) {
            args = thisArg = null;
          }
        }
      } else {
        timeoutId = setTimeout(delayed, remaining);
      }
    };

    var maxDelayed = function() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      maxTimeoutId = timeoutId = trailingCall = undefined;
      if (trailing || (maxWait !== wait)) {
        lastCalled = now();
        result = func.apply(thisArg, args);
        if (!timeoutId && !maxTimeoutId) {
          args = thisArg = null;
        }
      }
    };

    return function() {
      args = arguments;
      stamp = now();
      thisArg = this;
      trailingCall = trailing && (timeoutId || !leading);

      if (maxWait === false) {
        var leadingCall = leading && !timeoutId;
      } else {
        if (!maxTimeoutId && !leading) {
          lastCalled = stamp;
        }
        var remaining = maxWait - (stamp - lastCalled),
            isCalled = remaining <= 0 || remaining > maxWait;

        if (isCalled) {
          if (maxTimeoutId) {
            maxTimeoutId = clearTimeout(maxTimeoutId);
          }
          lastCalled = stamp;
          result = func.apply(thisArg, args);
        }
        else if (!maxTimeoutId) {
          maxTimeoutId = setTimeout(maxDelayed, remaining);
        }
      }
      if (isCalled && timeoutId) {
        timeoutId = clearTimeout(timeoutId);
      }
      else if (!timeoutId && wait !== maxWait) {
        timeoutId = setTimeout(delayed, wait);
      }
      if (leadingCall) {
        isCalled = true;
        result = func.apply(thisArg, args);
      }
      if (isCalled && !timeoutId && !maxTimeoutId) {
        args = thisArg = null;
      }
      return result;
    };
  }

  /**
   * Defers executing the `func` function until the current call stack has cleared.
   * Additional arguments will be provided to `func` when it is invoked.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to defer.
   * @param {...*} [args] Arguments to invoke the function with.
   * @returns {number} Returns the timer id.
   * @example
   *
   * _.defer(function(text) { console.log(text); }, 'deferred');
   * // logs 'deferred' after one or more milliseconds
   */
  function defer(func) {
    if (!isFunction(func)) {
      throw new TypeError(funcErrorText);
    }
    var args = slice(arguments, 1);
    return setTimeout(function() { func.apply(undefined, args); }, 1);
  }

  /**
   * Executes the `func` function after `wait` milliseconds. Additional arguments
   * will be provided to `func` when it is invoked.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to delay.
   * @param {number} wait The number of milliseconds to delay execution.
   * @param {...*} [args] Arguments to invoke the function with.
   * @returns {number} Returns the timer id.
   * @example
   *
   * _.delay(function(text) { console.log(text); }, 1000, 'later');
   * // => logs 'later' after one second
   */
  function delay(func, wait) {
    if (!isFunction(func)) {
      throw new TypeError(funcErrorText);
    }
    var args = slice(arguments, 2);
    return setTimeout(function() { func.apply(undefined, args); }, wait);
  }

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided it will be used to determine the cache key for storing the result
   * based on the arguments provided to the memoized function. By default, the
   * first argument provided to the memoized function is used as the cache key.
   * The `func` is executed with the `this` binding of the memoized function.
   * The result cache is exposed as the `cache` property on the memoized function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoizing function.
   * @example
   *
   * var fibonacci = _.memoize(function(n) {
   *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
   * });
   *
   * fibonacci(9)
   * // => 34
   *
   * var data = {
   *   'fred': { 'name': 'fred', 'age': 40 },
   *   'pebbles': { 'name': 'pebbles', 'age': 1 }
   * };
   *
   * // modifying the result cache
   * var get = _.memoize(function(name) { return data[name]; }, _.identity);
   * get('pebbles');
   * // => { 'name': 'pebbles', 'age': 1 }
   *
   * get.cache.pebbles.name = 'penelope';
   * get('pebbles');
   * // => { 'name': 'penelope', 'age': 1 }
   */
  function memoize(func, resolver) {
    if (!isFunction(func) || (resolver && !isFunction(resolver))) {
      throw new TypeError(funcErrorText);
    }
    var cache = {};
    return function() {
      var key = resolver ? resolver.apply(this, arguments) : '_' + arguments[0];
      return hasOwnProperty.call(cache, key)
        ? cache[key]
        : (cache[key] = func.apply(this, arguments));
    };
  }

  /**
   * Creates a function that negates the result of the predicate `func`. The
   * `func` function is executed with the `this` binding and arguments of the
   * created function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} predicate The predicate to negate.
   * @returns {Function} Returns the new function.
   * @example
   *
   * function isEven(num) {
   *   return num % 2 == 0;
   * }
   *
   * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
   * // => [1, 3, 5]
   */
  function negate(predicate) {
    if (!isFunction(predicate)) {
      throw new TypeError(funcErrorText);
    }
    return function() {
      return !predicate.apply(this, arguments);
    };
  }

  /**
   * Creates a function that is restricted to execute `func` once. Repeat calls to
   * the function will return the value of the first call. The `func` is executed
   * with the `this` binding of the created function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new restricted function.
   * @example
   *
   * var initialize = _.once(createApplication);
   * initialize();
   * initialize();
   * // `initialize` executes `createApplication` once
   */
  function once(func) {
    var ran,
        result;

    if (!isFunction(func)) {
      throw new TypeError(funcErrorText);
    }
    return function() {
      if (ran) {
        return result;
      }
      ran = true;
      result = func.apply(this, arguments);

      // clear the `func` variable so the function may be garbage collected
      func = null;
      return result;
    };
  }

  /**
   * Creates a function that invokes `func` with any additional `partial` arguments
   * prepended to those provided to the new function. This method is similar to
   * `_.bind` except it does **not** alter the `this` binding.
   *
   * Note: This method does not set the `length` property of partially applied
   * functions.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to partially apply arguments to.
   * @param {...*} [args] Arguments to be partially applied.
   * @returns {Function} Returns the new partially applied function.
   * @example
   *
   * var greet = function(greeting, name) { return greeting + ' ' + name; };
   * var hi = _.partial(greet, 'hi');
   * hi('fred');
   * // => 'hi fred'
   */
  function partial(func) {
    return createWrapper(func, PARTIAL_FLAG, null, null, slice(arguments, 1));
  }

  /**
   * Creates a function that, when executed, will only call the `func` function
   * at most once per every `wait` milliseconds. Provide an options object to
   * indicate that `func` should be invoked on the leading and/or trailing edge
   * of the `wait` timeout. Subsequent calls to the throttled function will
   * return the result of the last `func` call.
   *
   * Note: If `leading` and `trailing` options are `true`, `func` will be called
   * on the trailing edge of the timeout only if the the throttled function is
   * invoked more than once during the `wait` timeout.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to throttle.
   * @param {number} wait The number of milliseconds to throttle executions to.
   * @param {Object} [options] The options object.
   * @param {boolean} [options.leading=true] Specify execution on the leading edge of the timeout.
   * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
   * @returns {Function} Returns the new throttled function.
   * @example
   *
   * // avoid excessively updating the position while scrolling
   * var throttled = _.throttle(updatePosition, 100);
   * jQuery(window).on('scroll', throttled);
   *
   * // execute `renewToken` when the click event is fired, but not more than once every 5 minutes
   * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
   *   'trailing': false
   * }));
   */
  function throttle(func, wait, options) {
    var leading = true,
        trailing = true;

    if (!isFunction(func)) {
      throw new TypeError(funcErrorText);
    }
    if (options === false) {
      leading = false;
    } else if (isObject(options)) {
      leading = 'leading' in options ? options.leading : leading;
      trailing = 'trailing' in options ? options.trailing : trailing;
    }
    return debounce(func, wait, {
      'leading': leading,
      'maxWait': wait,
      'trailing': trailing
    });
  }

  /**
   * Creates a function that provides `value` to the wrapper function as its
   * first argument. Additional arguments provided to the function are appended
   * to those provided to the wrapper function. The wrapper is executed with
   * the `this` binding of the created function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {*} value The value to wrap.
   * @param {Function} wrapper The wrapper function.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var p = _.wrap(_.escape, function(func, text) {
   *   return '<p>' + func(text) + '</p>';
   * });
   *
   * p('fred, barney, & pebbles');
   * // => '<p>fred, barney, &amp; pebbles</p>'
   */
  function wrap(value, wrapper) {
    return createWrapper(wrapper, PARTIAL_FLAG, null, null, [value]);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Assigns own enumerable properties of source object(s) to the destination
   * object. Subsequent sources will overwrite property assignments of previous
   * sources. If a callback is provided it will be executed to produce the
   * assigned values. The callback is bound to `thisArg` and invoked with two
   * arguments; (objectValue, sourceValue).
   *
   * @static
   * @memberOf _
   * @alias extend
   * @category Objects
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @param {Function} [callback] The function to customize assigning values.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Object} Returns the destination object.
   * @example
   *
   * _.assign({ 'name': 'fred' }, { 'employer': 'slate' });
   * // => { 'name': 'fred', 'employer': 'slate' }
   *
   * var defaults = _.partialRight(_.assign, function(value, other) {
   *   return typeof value == 'undefined' ? other : value;
   * });
   *
   * defaults({ 'name': 'barney' }, { 'name': 'fred', 'employer': 'slate' });
   * // => { 'name': 'barney', 'employer': 'slate' }
   */
  function assign(object, source, guard) {
    if (!object) {
      return object;
    }
    var args = arguments,
        argsIndex = 0,
        argsLength = args.length,
        type = typeof guard;

    if ((type == 'number' || type == 'string') && args[3] && args[3][guard] === source) {
      argsLength = 2;
    }
    while (++argsIndex < argsLength) {
      source = args[argsIndex];
      for (var key in source) {
        object[key] = source[key];
      }
    }
    return object;
  }

  /**
   * Creates a clone of `value`. If `isDeep` is `true` nested objects will also
   * be cloned, otherwise they will be assigned by reference. If a callback
   * is provided it will be executed to produce the cloned values. If the
   * callback returns `undefined` cloning will be handled by the method instead.
   * The callback is bound to `thisArg` and invoked with one argument; (value).
   *
   * Note: This method is loosely based on the structured clone algorithm. Functions
   * and DOM nodes are **not** cloned. The enumerable properties of `arguments` objects and
   * objects created by constructors other than `Object` are cloned to plain `Object` objects.
   * See the [HTML5 specification](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm)
   * for more details.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to clone.
   * @param {boolean} [isDeep=false] Specify a deep clone.
   * @param {Function} [callback] The function to customize cloning values.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {*} Returns the cloned value.
   * @example
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40 }
   * ];
   *
   * var shallow = _.clone(characters);
   * shallow[0] === characters[0];
   * // => true
   *
   * var deep = _.clone(characters, true);
   * deep[0] === characters[0];
   * // => false
   *
   * _.mixin({
   *   'clone': _.partialRight(_.clone, function(value) {
   *     return _.isElement(value) ? value.cloneNode(false) : undefined;
   *   })
   * });
   *
   * var clone = _.clone(document.body);
   * clone.childNodes.length;
   * // => 0
   */
  function clone(value) {
    return isObject(value)
      ? (isArray(value) ? slice(value) : assign({}, value))
      : value;
  }

  /**
   * Assigns own enumerable properties of source object(s) to the destination
   * object for all destination properties that resolve to `undefined`. Once a
   * property is set, additional defaults of the same property will be ignored.
   *
   * Note: See the [documentation example of `_.partialRight`](http://lodash.com/docs#partialRight)
   * for a deep version of this method.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
   * @returns {Object} Returns the destination object.
   * @example
   *
   * _.defaults({ 'name': 'barney' }, { 'name': 'fred', 'employer': 'slate' });
   * // => { 'name': 'barney', 'employer': 'slate' }
   */
  function defaults(object, source, guard) {
    if (!object) {
      return object;
    }
    var args = arguments,
        argsIndex = 0,
        argsLength = args.length,
        type = typeof guard;

    if ((type == 'number' || type == 'string') && args[3] && args[3][guard] === source) {
      argsLength = 2;
    }
    while (++argsIndex < argsLength) {
      source = args[argsIndex];
      for (var key in source) {
        if (typeof object[key] == 'undefined') {
          object[key] = source[key];
        }
      }
    }
    return object;
  }

  /**
   * Creates a sorted array of property names of all enumerable properties,
   * own and inherited, of `object` that have function values.
   *
   * @static
   * @memberOf _
   * @alias methods
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns the new sorted array of property names.
   * @example
   *
   * _.functions(_);
   * // => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
   */
  function functions(object) {
    var result = [];

    baseForIn(object, function(value, key) {
      if (isFunction(value)) {
        result.push(key);
      }
    });
    return result.sort();
  }

  /**
   * Checks if the specified property name exists as a direct property of `object`,
   * instead of an inherited property.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to inspect.
   * @param {string} key The name of the property to check.
   * @returns {boolean} Returns `true` if key is a direct property, else `false`.
   * @example
   *
   * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
   * // => true
   */
  function has(object, key) {
    return object ? hasOwnProperty.call(object, key) : false;
  }

  /**
   * Creates an object composed of the inverted keys and values of the given
   * object. If the given object contains duplicate values, subsequent values
   * will overwrite property assignments of previous values unless `multiValue`
   * is `true`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to invert.
   * @param {boolean} [multiValue=false] Allow multiple values per key.
   * @returns {Object} Returns the new inverted object.
   * @example
   *
   * _.invert({ 'first': 'fred', 'second': 'barney' });
   * // => { 'fred': 'first', 'barney': 'second' }
   *
   * // without `multiValue`
   * _.invert({ 'first': 'fred', 'second': 'barney', 'third': 'fred' });
   * // => { 'fred': 'third', 'barney': 'second' }
   *
   * // with `multiValue`
   * _.invert({ 'first': 'fred', 'second': 'barney', 'third': 'fred' }, true);
   * // => { 'fred': ['first', 'third'], 'barney': ['second'] }
   */
  function invert(object) {
    var index = -1,
        props = keys(object),
        length = props.length,
        result = {};

    while (++index < length) {
      var key = props[index];
      result[object[key]] = key;
    }
    return result;
  }

  /**
   * Checks if `value` is an `arguments` object.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object, else `false`.
   * @example
   *
   * (function() { return _.isArguments(arguments); })();
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  function isArguments(value) {
    return (value && typeof value == 'object' && typeof value.length == 'number' &&
      toString.call(value) == argsClass) || false;
  }
  // fallback for environments without a `[[Class]]` for `arguments` objects
  if (!isArguments(arguments)) {
    isArguments = function(value) {
      return (value && typeof value == 'object' && typeof value.length == 'number' &&
        hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee')) || false;
    };
  }

  /**
   * Checks if `value` is an array.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * (function() { return _.isArray(arguments); })();
   * // => false
   */
  var isArray = nativeIsArray || function(value) {
    return (value && typeof value == 'object' && typeof value.length == 'number' &&
      toString.call(value) == arrayClass) || false;
  };

  /**
   * Checks if `value` is a boolean value.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a boolean value, else `false`.
   * @example
   *
   * _.isBoolean(false);
   * // => true
   *
   * _.isBoolean(null);
   * // => false
   */
  function isBoolean(value) {
    return (value === true || value === false ||
      value && typeof value == 'object' && toString.call(value) == boolClass) || false;
  }

  /**
   * Checks if `value` is a `Date` object.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
   * @example
   *
   * _.isDate(new Date);
   * // => true
   *
   * _.isDate('Mon April 23 2012');
   * // => false
   */
  function isDate(value) {
    return (value && typeof value == 'object' && toString.call(value) == dateClass) || false;
  }

  /**
   * Checks if `value` is a DOM element.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
   * @example
   *
   * _.isElement(document.body);
   * // => true
   *
   * _.isElement('<body>');
   * // => false
   */
  function isElement(value) {
    return (value && value.nodeType === 1) || false;
  }

  /**
   * Checks if a collection is empty. A value is considered empty unless it is
   * an array, array-like object, or string with a length greater than `0` or
   * an object with own properties.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Array|Object|string} value The value to inspect.
   * @returns {boolean} Returns `true` if `value` is empty, else `false`.
   * @example
   *
   * _.isEmpty(null);
   * // => true
   *
   * _.isEmpty(true);
   * // => true
   *
   * _.isEmpty(1);
   * // => true
   *
   * _.isEmpty([1, 2, 3]);
   * // => false
   *
   * _.isEmpty({ 'a': 1 });
   * // => false
   */
  function isEmpty(value) {
    if (!value) {
      return true;
    }
    var length = value.length;
    if ((length > -1 && length <= maxSafeInteger) &&
        (isArray(value) || isString(value) || isArguments(value))) {
      return !length;
    }
    for (var key in value) {
      if (hasOwnProperty.call(value, key)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Performs a deep comparison between two values to determine if they are
   * equivalent. If a callback is provided it will be executed to compare
   * values. If the callback returns `undefined` comparisons will be handled
   * by the method instead. The callback is bound to `thisArg` and invoked
   * with two arguments; (value, other).
   *
   * Note: This method supports comparing arrays, booleans, `Date` objects,
   * numbers, `Object` objects, regexes, and strings. Functions and DOM nodes
   * are **not** supported. A callback may be used to extend support for
   * comparing other values.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to compare to `other`.
   * @param {*} other The value to compare to `value`.
   * @param {Function} [callback] The function to customize comparing values.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'name': 'fred' };
   * var other = { 'name': 'fred' };
   *
   * object == other;
   * // => false
   *
   * _.isEqual(object, other);
   * // => true
   *
   * var words = ['hello', 'goodbye'];
   * var otherWords = ['hi', 'goodbye'];
   *
   * _.isEqual(words, otherWords, function() {
   *   return _.every(arguments, _.bind(RegExp.prototype.test, /^h(?:i|ello)$/)) || undefined;
   * });
   * // => true
   */
  function isEqual(value, other) {
    return baseIsEqual(value, other);
  }

  /**
   * Checks if `value` is, or can be coerced to, a finite number.
   *
   * Note: This method is not the same as native `isFinite` which will return
   * `true` for booleans and empty strings. See the [ES5 spec](http://es5.github.io/#x15.1.2.5)
   * for more details.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is finite, else `false`.
   * @example
   *
   * _.isFinite(-101);
   * // => true
   *
   * _.isFinite('10');
   * // => true
   *
   * _.isFinite(true);
   * // => false
   *
   * _.isFinite('');
   * // => false
   *
   * _.isFinite(Infinity);
   * // => false
   */
  function isFinite(value) {
    return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
  }

  /**
   * Checks if `value` is a function.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    return typeof value == 'function';
  }
  // fallback for older versions of Chrome and Safari
  if (isFunction(/x/)) {
    isFunction = function(value) {
      return typeof value == 'function' && toString.call(value) == funcClass;
    };
  }

  /**
   * Checks if `value` is the language type of `Object`.
   * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(1);
   * // => false
   */
  function isObject(value) {
    // check if the value is the ECMAScript language type of `Object`
    // http://es5.github.io/#x8
    // and avoid a V8 bug
    // https://code.google.com/p/v8/issues/detail?id=2291
    var type = typeof value;
    return type == 'function' || (value && type == 'object') || false;
  }

  /**
   * Checks if `value` is `NaN`.
   *
   * Note: This method is not the same as native `isNaN` which will return `true`
   * for `undefined` and other non-numeric values. See the [ES5 spec](http://es5.github.io/#x15.1.2.4)
   * for more details.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   * @example
   *
   * _.isNaN(NaN);
   * // => true
   *
   * _.isNaN(new Number(NaN));
   * // => true
   *
   * isNaN(undefined);
   * // => true
   *
   * _.isNaN(undefined);
   * // => false
   */
  function isNaN(value) {
    // `NaN` as a primitive is the only value that is not equal to itself
    // (perform the `[[Class]]` check first to avoid errors with some host objects in IE)
    return isNumber(value) && value != +value;
  }

  /**
   * Checks if `value` is `null`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
   * @example
   *
   * _.isNull(null);
   * // => true
   *
   * _.isNull(void 0);
   * // => false
   */
  function isNull(value) {
    return value === null;
  }

  /**
   * Checks if `value` is a `Number` primitive or object.
   *
   * Note: `NaN` is considered a number. See the [ES5 spec](http://es5.github.io/#x8.5)
   * for more details.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a number, else `false`.
   * @example
   *
   * _.isNumber(8.4);
   * // => true
   *
   * _.isNumber(NaN);
   * // => true
   *
   * _.isNumber('8.4');
   * // => false
   */
  function isNumber(value) {
    var type = typeof value;
    return type == 'number' ||
      (value && type == 'object' && toString.call(value) == numberClass) || false;
  }

  /**
   * Checks if `value` is a `RegExp` object.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a regexp object, else `false`.
   * @example
   *
   * _.isRegExp(/abc/);
   * // => true
   *
   * _.isRegExp('/abc/');
   * // => false
   */
  function isRegExp(value) {
    return (isObject(value) && toString.call(value) == regexpClass) || false;
  }

  /**
   * Checks if `value` is a `String` primitive or object.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a string, else `false`.
   * @example
   *
   * _.isString('abc');
   * // => true
   *
   * _.isString(1);
   * // => false
   */
  function isString(value) {
    return typeof value == 'string' ||
      (value && typeof value == 'object' && toString.call(value) == stringClass) || false;
  }

  /**
   * Checks if `value` is `undefined`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
   * @example
   *
   * _.isUndefined(void 0);
   * // => true
   *
   * _.isUndefined(null);
   * // => false
   */
  function isUndefined(value) {
    return typeof value == 'undefined';
  }

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Shape() {
   *   this.x = 0;
   *   this.y = 0;
   * }
   *
   * Shape.prototype.z = 0;
   *
   * _.keys(new Shape);
   * // => ['x', 'y'] (property order is not guaranteed across environments)
   */
  var keys = !nativeKeys ? shimKeys : function(object) {
    return isObject(object) ? nativeKeys(object) : [];
  };

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Shape() {
   *   this.x = 0;
   *   this.y = 0;
   * }
   *
   * Shape.prototype.z = 0;
   *
   * _.keysIn(new Shape);
   * // => ['x', 'y', 'z'] (property order is not guaranteed across environments)
   */
  function keysIn(object) {
    var result = [];
    if (!isObject(object)) {
      return result;
    }
    for (var key in object) {
      result.push(key);
    }
    return result;
  }

  /**
   * Creates a shallow clone of `object` excluding the specified properties.
   * Property names may be specified as individual arguments or as arrays of
   * property names. If a predicate is provided it will be executed for each
   * property of `object` omitting the properties the predicate returns truthy
   * for. The predicate is bound to `thisArg` and invoked with three arguments;
   * (value, key, object).
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The source object.
   * @param {Function|...(string|string[])} [predicate] The function called per
   *  iteration or property names to omit, specified as individual property
   *  names or arrays of property names.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {Object} Returns the new object.
   * @example
   *
   * _.omit({ 'name': 'fred', 'age': 40 }, 'age');
   * // => { 'name': 'fred' }
   *
   * _.omit({ 'name': 'fred', 'age': 40 }, function(value) {
   *   return typeof value == 'number';
   * });
   * // => { 'name': 'fred' }
   */
  function omit(object) {
    var omitProps = baseFlatten(arguments, true, false, 1),
        length = omitProps.length;

    while (length--) {
      omitProps[length] = String(omitProps[length]);
    }
    return pick(object, baseDifference(keysIn(object), omitProps));
  }

  /**
   * Creates a two dimensional array of a given object's key-value pairs,
   * i.e. `[[key1, value1], [key2, value2]]`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns the new array of key-value pairs.
   * @example
   *
   * _.pairs({ 'barney': 36, 'fred': 40 });
   * // => [['barney', 36], ['fred', 40]] (property order is not guaranteed across environments)
   */
  function pairs(object) {
    var index = -1,
        props = keys(object),
        length = props.length,
        result = Array(length);

    while (++index < length) {
      var key = props[index];
      result[index] = [key, object[key]];
    }
    return result;
  }

  /**
   * Creates a shallow clone of `object` composed of the specified properties.
   * Property names may be specified as individual arguments or as arrays of
   * property names. If a predicate is provided it will be executed for each
   * property of `object` picking the properties the predicate returns truthy
   * for. The predicate is bound to `thisArg` and invoked with three arguments;
   * (value, key, object).
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The source object.
   * @param {Function|...(string|string[])} [predicate] The function called per
   *  iteration or property names to pick, specified as individual property
   *  names or arrays of property names.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {Object} Returns the new object.
   * @example
   *
   * _.pick({ 'name': 'fred', '_userid': 'fred1' }, 'name');
   * // => { 'name': 'fred' }
   *
   * _.pick({ 'name': 'fred', '_userid': 'fred1' }, function(value, key) {
   *   return key.charAt(0) != '_';
   * });
   * // => { 'name': 'fred' }
   */
  function pick(object) {
    var index = -1,
        props = baseFlatten(arguments, true, false, 1),
        length = props.length,
        result = {};

    while (++index < length) {
      var key = props[index];
      if (key in object) {
        result[key] = object[key];
      }
    }
    return result;
  }

  /**
   * Creates an array of the own enumerable property values of `object`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns the array of property values.
   * @example
   *
   * function Shape(x, y) {
   *   this.x = x;
   *   this.y = y;
   * }
   *
   * Shape.prototype.z = 0;
   *
   * _.values(new Shape(2, 1));
   * // => [2, 1] (property order is not guaranteed across environments)
   */
  function values(object) {
    return baseValues(object, keys);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Converts the characters "&", "<", ">", '"', and "'" in `string` to
   * their corresponding HTML entities.
   *
   * Note: No other characters are escaped. To escape additional characters
   * use a third-party library like [_he_](http://mths.be/he).
   *
   * When working with HTML you should always quote attribute values to reduce
   * XSS vectors. See [Ryan Grove's article](http://wonko.com/post/html-escaping)
   * for more details.
   *
   * @static
   * @memberOf _
   * @category Strings
   * @param {string} [string=''] The string to escape.
   * @returns {string} Returns the escaped string.
   * @example
   *
   * _.escape('fred, barney, & pebbles');
   * // => 'fred, barney, &amp; pebbles'
   */
  function escape(string) {
    return string == null ? '' : String(string).replace(reUnescapedHtml, escapeHtmlChar);
  }

  /**
   * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
   * "+", "(", ")", "[", "]", "{" and "}" in `string`.
   *
   * @static
   * @memberOf _
   * @category Strings
   * @param {string} [string=''] The string to escape.
   * @returns {string} Returns the escaped string.
   * @example
   *
   * _.escapeRegExp('[lodash](http://lodash.com)');
   * // => '\[lodash\]\(http://lodash\.com\)'
   */
  function escapeRegExp(string) {
    return string == null ? '' : String(string).replace(reRegExpChars, '\\$&');
  }

  /**
   * Creates a compiled template function that can interpolate data properties
   * in "interpolate" delimiters, HTML-escaped interpolated data properties in
   * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. If
   * a data object is provided the interpolated template string will be returned.
   * Data properties may be accessed as free variables in the template. If a
   * settings object is provided it will override `_.templateSettings` for the
   * template.
   *
   * Note: In the development build, `_.template` utilizes `sourceURL`s for easier debugging.
   * See the [HTML5 Rocks article on sourcemaps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
   * for more details.
   *
   * For more information on precompiling templates see
   * [Lo-Dash's custom builds documentation](http://lodash.com/custom-builds).
   *
   * For more information on Chrome extension sandboxes see
   * [Chrome's extensions documentation](http://developer.chrome.com/stable/extensions/sandboxingEval.html).
   *
   * @static
   * @memberOf _
   * @category Strings
   * @param {string} [string=''] The template string.
   * @param {Object} [data] The data object used to populate the template string.
   * @param {Object} [options] The options object.
   * @param {RegExp} [options.escape] The HTML "escape" delimiter.
   * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
   * @param {Object} [options.imports] An object to import into the template as local variables.
   * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
   * @param {string} [options.sourceURL] The `sourceURL` of the template's compiled source.
   * @param {string} [options.variable] The data object variable name.
   * @returns {Function|string} Returns the interpolated string if a data object
   *  is provided, else the compiled template function.
   * @example
   *
   * // using the "interpolate" delimiter to create a compiled template
   * var compiled = _.template('hello <%= name %>');
   * compiled({ 'name': 'fred' });
   * // => 'hello fred'
   *
   * // using the HTML "escape" delimiter to escape data property values
   * _.template('<b><%- value %></b>', { 'value': '<script>' });
   * // => '<b>&lt;script&gt;</b>'
   *
   * // using the "evaluate" delimiter to execute JavaScript and generate HTML
   * var list = '<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>';
   * _.template(list, { 'people': ['fred', 'barney'] });
   * // => '<li>fred</li><li>barney</li>'
   *
   * // using the ES6 delimiter as an alternative to the default "interpolate" delimiter
   * _.template('hello ${ name }', { 'name': 'pebbles' });
   * // => 'hello pebbles'
   *
   * // using the internal `print` function in "evaluate" delimiters
   * _.template('<% print("hello " + name); %>!', { 'name': 'barney' });
   * // => 'hello barney!'
   *
   * // using a custom template delimiters
   * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
   * _.template('hello {{ name }}!', { 'name': 'mustache' });
   * // => 'hello mustache!'
   *
   * // using the `imports` option to import jQuery
   * var list = '<% jq.each(people, function(name) { %><li><%- name %></li><% }); %>';
   * _.template(list, { 'people': ['fred', 'barney'] }, { 'imports': { 'jq': jQuery } });
   * // => '<li>fred</li><li>barney</li>'
   *
   * // using the `sourceURL` option to specify a custom `sourceURL` for the template
   * var compiled = _.template('hello <%= name %>', null, { 'sourceURL': '/basic/greeting.jst' });
   * compiled(data);
   * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
   *
   * // using the `variable` option to ensure a with-statement isn't used in the compiled template
   * var compiled = _.template('hi <%= data.name %>!', null, { 'variable': 'data' });
   * compiled.source;
   * // => function(data) {
   *   var __t, __p = '', __e = _.escape;
   *   __p += 'hi ' + ((__t = ( data.name )) == null ? '' : __t) + '!';
   *   return __p;
   * }
   *
   * // using the `source` property to inline compiled templates for meaningful
   * // line numbers in error messages and a stack trace
   * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
   *   var JST = {\
   *     "main": ' + _.template(mainText).source + '\
   *   };\
   * ');
   */
  function template(string, data, options) {
    var _ = lodash,
        settings = _.templateSettings;

    string = String(string == null ? '' : string);
    options = defaults({}, options, settings);

    var index = 0,
        source = "__p += '",
        variable = options.variable;

    var reDelimiters = RegExp(
      (options.escape || reNoMatch).source + '|' +
      (options.interpolate || reNoMatch).source + '|' +
      (options.evaluate || reNoMatch).source + '|$'
    , 'g');

    string.replace(reDelimiters, function(match, escapeValue, interpolateValue, evaluateValue, offset) {
      source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
      if (escapeValue) {
        source += "' +\n_.escape(" + escapeValue + ") +\n'";
      }
      if (evaluateValue) {
        source += "';\n" + evaluateValue + ";\n__p += '";
      }
      if (interpolateValue) {
        source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
      }
      index = offset + match.length;
      return match;
    });

    source += "';\n";
    if (!variable) {
      source = 'with (obj || {}) {\n' + source + '\n}\n';
    }
    source = 'function(' + (variable || 'obj') + ') {\n' +
      "var __t, __p = '', __j = Array.prototype.join;\n" +
      "function print() { __p += __j.call(arguments, '') }\n" +
      source +
      'return __p\n}';

    try {
      var result = Function('_', 'return ' + source)(_);
    } catch(e) {
      e.source = source;
      throw e;
    }
    if (data) {
      return result(data);
    }
    result.source = source;
    return result;
  }

  /**
   * The inverse of `_.escape`; this method converts the HTML entities
   * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to their
   * corresponding characters.
   *
   * Note: No other HTML entities are unescaped. To unescape additional HTML
   * entities use a third-party library like [_he_](http://mths.be/he).
   *
   * @static
   * @memberOf _
   * @category Strings
   * @param {string} [string=''] The string to unescape.
   * @returns {string} Returns the unescaped string.
   * @example
   *
   * _.unescape('fred, barney &amp; pebbles');
   * // => 'fred, barney & pebbles'
   */
  function unescape(string) {
    if (string == null) {
      return '';
    }
    string = String(string);
    return string.indexOf(';') < 0 ? string : string.replace(reEscapedHtml, unescapeHtmlChar);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var object = { 'name': 'fred' };
   * var getter = _.constant(object);
   * getter() === object;
   * // => true
   */
  function constant(value) {
    return function() {
      return value;
    };
  }

  /**
   * Creates a function bound to an optional `thisArg`. If `func` is a property
   * name the created callback will return the property value for a given element.
   * If `func` is an object the created callback will return `true` for elements
   * that contain the equivalent object properties, otherwise it will return `false`.
   *
   * @static
   * @memberOf _
   * @alias callback
   * @category Utilities
   * @param {*} [func=identity] The value to convert to a callback.
   * @param {*} [thisArg] The `this` binding of the created callback.
   * @param {number} [argCount] The number of arguments the callback accepts.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40 }
   * ];
   *
   * // wrap to create custom callback shorthands
   * _.createCallback = _.wrap(_.createCallback, function(func, callback, thisArg) {
   *   var match = /^(.+?)__([gl]t)(.+)$/.exec(callback);
   *   return !match ? func(callback, thisArg) : function(object) {
   *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
   *   };
   * });
   *
   * _.filter(characters, 'age__gt38');
   * // => [{ 'name': 'fred', 'age': 40 }]
   */
  function createCallback(func, thisArg, argCount) {
    var type = typeof func;
    if (type == 'function' || func == null) {
      return (typeof thisArg == 'undefined' || !(func && 'prototype' in func)) &&
        func || baseCreateCallback(func, thisArg, argCount);
    }
    // handle "_.pluck" and "_.where" style callback shorthands
    return type == 'object' ? matches(func) : property(func);
  }

  /**
   * This method returns the first argument provided to it.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'name': 'fred' };
   * _.identity(object) === object;
   * // => true
   */
  function identity(value) {
    return value;
  }

  /**
   * Creates a "_.where" style predicate function which performs a deep comparison
   * between a given object and the `source` object, returning `true` if the given
   * object has equivalent property values, else `false`.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var characters = [
   *   { 'name': 'fred',   'age': 40 },
   *   { 'name': 'barney', 'age': 36 }
   * ];
   *
   * var matchesAge = _.matches({ 'age': 36 });
   *
   * _.filter(characters, matchesAge);
   * // => [{ 'name': 'barney', 'age': 36 }]
   *
   * _.find(characters, matchesAge);
   * // => { 'name': 'barney', 'age': 36 }
   */
  function matches(source) {
    var props = keys(source),
        propsLength = props.length;

    return function(object) {
      var length = propsLength;
      if (length && !object) {
        return false;
      }
      var result = true;
      while (length--) {
        var key = props[length];
        if (!(result = hasOwnProperty.call(object, key) &&
            object[key] === source[key])) {
          break;
        }
      }
      return result;
    };
  }

  /**
   * Adds function properties of a source object to the destination object.
   * If `object` is a function methods will be added to its prototype as well.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Function|Object} [object=this] object The destination object.
   * @param {Object} source The object of functions to add.
   * @param {Object} [options] The options object.
   * @param {boolean} [options.chain=true] Specify whether the functions added
   *  are chainable.
   * @returns {Function|Object} Returns `object`.
   * @example
   *
   * function vowels(string) {
   *   return _.filter(string, function(v) {
   *     return /[aeiou]/i.test(v);
   *   });
   * }
   *
   * _.mixin({ 'vowels': vowels });
   * _.vowels('fred');
   * // => ['e']
   *
   * _('fred').vowels().value();
   * // => ['e']
   *
   * _.mixin({ 'vowels': vowels }, { 'chain': false });
   * _('fred').vowels();
   * // => ['e']
   */
  function mixin(source) {
    var index = -1,
        methodNames = functions(source),
        length = methodNames.length;

    while (++index < length) {
      var methodName = methodNames[index];
      lodash.prototype[methodName] = (function() {
        var func = lodash[methodName] = source[methodName];
        return function() {
          var args = [this.__wrapped__];
          push.apply(args, arguments);

          var result = func.apply(lodash, args);
          return this.__chain__
            ? new lodashWrapper(result, true)
            : result;
        };
      }());
    }
  }

  /**
   * Reverts the `_` variable to its previous value and returns a reference to
   * the `lodash` function.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @returns {Function} Returns the `lodash` function.
   * @example
   *
   * var lodash = _.noConflict();
   */
  function noConflict() {
    root._ = oldDash;
    return this;
  }

  /**
   * Gets the number of milliseconds that have elapsed since the Unix epoch
   * (1 January 1970 00:00:00 UTC).
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @example
   *
   * var stamp = _.now();
   * _.defer(function() { console.log(_.now() - stamp); });
   * // => logs the number of milliseconds it took for the deferred function to be called
   */
  var now = nativeNow || function() {
    return new Date().getTime();
  };

  /**
   * Creates a "_.pluck" style function which returns the `key` value of a
   * given object.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {string} key The name of the property to retrieve.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var characters = [
   *   { 'name': 'fred',   'age': 40 },
   *   { 'name': 'barney', 'age': 36 }
   * ];
   *
   * var getName = _.property('name');
   *
   * _.map(characters, getName);
   * // => ['barney', 'fred']
   *
   * _.sortBy(characters, getName);
   * // => [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred',   'age': 40 }]
   */
  function property(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * Produces a random number between `min` and `max` (inclusive). If only one
   * argument is provided a number between `0` and the given number will be
   * returned. If `floating` is truthy or either `min` or `max` are floats a
   * floating-point number will be returned instead of an integer.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {number} [min=0] The minimum possible value.
   * @param {number} [max=1] The maximum possible value.
   * @param {boolean} [floating=false] Specify returning a floating-point number.
   * @returns {number} Returns the random number.
   * @example
   *
   * _.random(0, 5);
   * // => an integer between 0 and 5
   *
   * _.random(5);
   * // => also an integer between 0 and 5
   *
   * _.random(5, true);
   * // => a floating-point number between 0 and 5
   *
   * _.random(1.2, 5.2);
   * // => a floating-point number between 1.2 and 5.2
   */
  function random(min, max) {
    if (min == null && max == null) {
      max = 1;
    }
    min = +min || 0;
    if (max == null) {
      max = min;
      min = 0;
    } else {
      max = +max || 0;
    }
    return min + floor(nativeRandom() * (max - min + 1));
  }

  /**
   * Creates an array of numbers (positive and/or negative) progressing from
   * `start` up to but not including `end`. If `start` is less than `stop` a
   * zero-length range is created unless a negative `step` is specified.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {number} [start=0] The start of the range.
   * @param {number} end The end of the range.
   * @param {number} [step=1] The value to increment or decrement by.
   * @returns {Array} Returns the new array of numbers.
   * @example
   *
   * _.range(4);
   * // => [0, 1, 2, 3]
   *
   * _.range(1, 5);
   * // => [1, 2, 3, 4]
   *
   * _.range(0, 20, 5);
   * // => [0, 5, 10, 15]
   *
   * _.range(0, -4, -1);
   * // => [0, -1, -2, -3]
   *
   * _.range(1, 4, 0);
   * // => [1, 1, 1]
   *
   * _.range(0);
   * // => []
   */
  function range(start, end, step) {
    start = +start || 0;
    step = +step || 1;

    if (end == null) {
      end = start;
      start = 0;
    } else {
      end = +end || 0;
    }
    // use `Array(length)` so engines like Chakra and V8 avoid slower modes
    // http://youtu.be/XAqIpGU8ZZk#t=17m25s
    var index = -1,
        length = nativeMax(ceil((end - start) / (step || 1)), 0),
        result = Array(length);

    while (++index < length) {
      result[index] = start;
      start += step;
    }
    return result;
  }

  /**
   * Resolves the value of property `key` on `object`. If `key` is a function
   * it will be invoked with the `this` binding of `object` and its result
   * returned, else the property value is returned. If `object` is `null` or
   * `undefined` then `undefined` is returned. If a default value is provided
   * it will be returned if the property value resolves to `undefined`.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Object} object The object to inspect.
   * @param {string} key The name of the property to resolve.
   * @param {*} [defaultValue] The value returned if the property value
   *  resolves to `undefined`.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = {
   *   'name': 'fred',
   *   'age': function() {
   *     return 40;
   *   }
   * };
   *
   * _.result(object, 'name');
   * // => 'fred'
   *
   * _.result(object, 'age');
   * // => 40
   *
   * _.result(object, 'employer', 'slate');
   * // => 'slate'
   */
  function result(object, key) {
    if (object != null) {
      var value = object[key];
      return isFunction(value) ? object[key]() : value;
    }
  }

  /**
   * Executes the callback `n` times, returning an array of the results
   * of each callback execution. The callback is bound to `thisArg` and invoked
   * with one argument; (index).
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {number} n The number of times to execute the callback.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns the array of results.
   * @example
   *
   * var diceRolls = _.times(3, _.partial(_.random, 1, 6));
   * // => [3, 6, 4]
   *
   * _.times(3, function(n) { mage.castSpell(n); });
   * // => calls `mage.castSpell(n)` three times, passing `n` of `0`, `1`, and `2` respectively
   *
   * _.times(3, function(n) { this.cast(n); }, mage);
   * // => also calls `mage.castSpell(n)` three times
   */
  function times(n, callback, thisArg) {
    n = n < 0 ? 0 : n >>> 0;
    callback = baseCreateCallback(callback, thisArg, 1);

    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = callback(index);
    }
    return result;
  }

  /**
   * Generates a unique ID. If `prefix` is provided the ID will be appended to it.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {string} [prefix] The value to prefix the ID with.
   * @returns {string} Returns the unique ID.
   * @example
   *
   * _.uniqueId('contact_');
   * // => 'contact_104'
   *
   * _.uniqueId();
   * // => '105'
   */
  function uniqueId(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  }

  /*--------------------------------------------------------------------------*/

  // add functions that return wrapped values when chaining
  lodash.after = after;
  lodash.bind = bind;
  lodash.bindAll = bindAll;
  lodash.chain = chain;
  lodash.compact = compact;
  lodash.compose = compose;
  lodash.constant = constant;
  lodash.countBy = countBy;
  lodash.debounce = debounce;
  lodash.defaults = defaults;
  lodash.defer = defer;
  lodash.delay = delay;
  lodash.difference = difference;
  lodash.drop = drop;
  lodash.filter = filter;
  lodash.flatten = flatten;
  lodash.forEach = forEach;
  lodash.functions = functions;
  lodash.groupBy = groupBy;
  lodash.indexBy = indexBy;
  lodash.initial = initial;
  lodash.intersection = intersection;
  lodash.invert = invert;
  lodash.invoke = invoke;
  lodash.keys = keys;
  lodash.map = map;
  lodash.matches = matches;
  lodash.max = max;
  lodash.memoize = memoize;
  lodash.min = min;
  lodash.mixin = mixin;
  lodash.omit = omit;
  lodash.once = once;
  lodash.pairs = pairs;
  lodash.partial = partial;
  lodash.partition = partition;
  lodash.pick = pick;
  lodash.pluck = pluck;
  lodash.property = property;
  lodash.range = range;
  lodash.reject = reject;
  lodash.rest = rest;
  lodash.shuffle = shuffle;
  lodash.sortBy = sortBy;
  lodash.tap = tap;
  lodash.throttle = throttle;
  lodash.times = times;
  lodash.toArray = toArray;
  lodash.union = union;
  lodash.uniq = uniq;
  lodash.values = values;
  lodash.where = where;
  lodash.without = without;
  lodash.wrap = wrap;
  lodash.zip = zip;

  // add aliases
  lodash.collect = map;
  lodash.each = forEach;
  lodash.extend = assign;
  lodash.methods = functions;
  lodash.object = zipObject;
  lodash.select = filter;
  lodash.tail = rest;
  lodash.unique = uniq;

  /*--------------------------------------------------------------------------*/

  // add functions that return unwrapped values when chaining
  lodash.clone = clone;
  lodash.contains = contains;
  lodash.escape = escape;
  lodash.every = every;
  lodash.find = find;
  lodash.findWhere = findWhere;
  lodash.has = has;
  lodash.identity = identity;
  lodash.indexOf = indexOf;
  lodash.isArguments = isArguments;
  lodash.isArray = isArray;
  lodash.isBoolean = isBoolean;
  lodash.isDate = isDate;
  lodash.isElement = isElement;
  lodash.isEmpty = isEmpty;
  lodash.isEqual = isEqual;
  lodash.isFinite = isFinite;
  lodash.isFunction = isFunction;
  lodash.isNaN = isNaN;
  lodash.isNull = isNull;
  lodash.isNumber = isNumber;
  lodash.isObject = isObject;
  lodash.isRegExp = isRegExp;
  lodash.isString = isString;
  lodash.isUndefined = isUndefined;
  lodash.lastIndexOf = lastIndexOf;
  lodash.noConflict = noConflict;
  lodash.now = now;
  lodash.random = random;
  lodash.reduce = reduce;
  lodash.reduceRight = reduceRight;
  lodash.result = result;
  lodash.size = size;
  lodash.some = some;
  lodash.sortedIndex = sortedIndex;
  lodash.template = template;
  lodash.unescape = unescape;
  lodash.uniqueId = uniqueId;

  // add aliases
  lodash.all = every;
  lodash.any = some;
  lodash.detect = find;
  lodash.foldl = reduce;
  lodash.foldr = reduceRight;
  lodash.include = contains;
  lodash.inject = reduce;

  /*--------------------------------------------------------------------------*/

  // add functions capable of returning wrapped and unwrapped values when chaining
  lodash.first = first;
  lodash.last = last;
  lodash.sample = sample;
  lodash.take = take;

  // add aliases
  lodash.head = first;

  /*--------------------------------------------------------------------------*/

  // add functions to `lodash.prototype`
  mixin(assign({}, lodash));

  /**
   * The semantic version number.
   *
   * @static
   * @memberOf _
   * @type string
   */
  lodash.VERSION = version;

  // add "Chaining" functions to the wrapper
  lodash.prototype.chain = wrapperChain;
  lodash.prototype.value = wrapperValueOf;

    // add `Array` mutator functions to the wrapper
    arrayEach(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
      var func = arrayRef[methodName];
      lodash.prototype[methodName] = function() {
        var value = this.__wrapped__;
        func.apply(value, arguments);

        // avoid array-like object bugs with `Array#shift` and `Array#splice`
        // in Firefox < 10 and IE < 9
        if (!support.spliceObjects && value.length === 0) {
          delete value[0];
        }
        return this;
      };
    });

    // add `Array` accessor functions to the wrapper
    arrayEach(['concat', 'join', 'slice'], function(methodName) {
      var func = arrayRef[methodName];
      lodash.prototype[methodName] = function() {
        var value = this.__wrapped__,
            result = func.apply(value, arguments);

        if (this.__chain__) {
          result = new lodashWrapper(result);
          result.__chain__ = true;
        }
        return result;
      };
    });

  /*--------------------------------------------------------------------------*/

  // some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose Lo-Dash to the global object even when an AMD loader is present in
    // case Lo-Dash is loaded with a RequireJS shim config.
    // See http://requirejs.org/docs/api.html#config-shim
    root._ = lodash;

    // define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module
    define('underscore', function() {
      return lodash;
    });
  }
  // check for `exports` after `define` in case a build optimizer adds an `exports` object
  else if (freeExports && freeModule) {
    // in Node.js or RingoJS
    if (moduleExports) {
      (freeModule.exports = lodash)._ = lodash;
    }
    // in Narwhal or Rhino -require
    else {
      freeExports._ = lodash;
    }
  }
  else {
    // in a browser or Rhino
    root._ = lodash;
  }
}.call(this));
