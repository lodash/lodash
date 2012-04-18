/*!
 * Lo-Dash v0.1.0 <https://github.com/bestiejs/lodash>
 * Copyright 2012 John-David Dalton <http://allyoucanleet.com/>
 * Based on Underscore.js 1.3.3, copyright 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
 * <http://documentcloud.github.com/underscore>
 * Available under MIT license <http://mths.be/mit>
 */
;(function(window, undefined) {
  'use strict';

  /** Used to assign each benchmark an incrimented id */
  var idCounter = 0;

  /** Detect free variable `exports` */
  var freeExports = typeof exports == 'object' && exports &&
    (typeof global == 'object' && global && global == global.global && (window = global), exports);

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  var oldDash = window._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype,
      ObjProto = Object.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var concat = ArrayProto.concat,
      hasOwnProperty = ObjProto.hasOwnProperty,
      push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      unshift = ArrayProto.unshift;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var nativeIsArray = Array.isArray,
      nativeIsFinite = window.isFinite,
      nativeKeys = Object.keys;

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /.^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    '\\': '\\',
    "'": "'",
    'r': '\r',
    'n': '\n',
    't': '\t',
    'u2028': '\u2028',
    'u2029': '\u2029'
  };

  for (var p in escapes) escapes[escapes[p]] = p;
  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  var unescaper = /\\(\\|'|r|n|t|u2028|u2029)/g;

  // Within an interpolation, evaluation, or escaping, remove HTML escaping
  // that had been previously added.
  var unescape = function(code) {
    return code.replace(unescaper, function(match, escape) {
      return escapes[escape];
    });
  };

  /*--------------------------------------------------------------------------*/

  /**
   * The Lodash function.
   *
   * @name _
   * @constructor
   * @param {Mixed} value The value to wrap in a chainable `lowdash` object.
   * @returns {Object} Returns a `lodash` instance.
   * @example
   */
  function lodash(value) {
    // allow invoking `lodash` without the `new` operator
    return new Wrapper(value);
  }

  /**
   * Creates a wrapped collection that can be used OO-style. This wrapper holds
   * altered versions of all the Lo-Dash functions. Wrapped objects may be chained.
   *
   * @private
   * @constructor
   * @param {Mixed} value The value to wrap in a chainable `lodash` object.
   * @example
   */
  function Wrapper(collection) {
    this._wrapped = collection;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Internal recursive comparison function
   *
   * @private
   * @param {Mixed} a A value.
   * @param {Mixed} b Another value.
   * @param {Array} stack Holds seen objects to avoid circular references.
   * @example
   */
  function eq(a, b, stack) {
    // identical objects are equal. `0 === -0`, but they aren't identical
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal
    if (a === b) {
      return a !== 0 || (1 / a == 1 / b);
    }
    // a strict comparison is necessary because `null == undefined`
    if (a == null || b == null) {
      return a === b;
    }
    // unwrap any wrapped objects
    if (a._chain) {
      a = a._wrapped;
    }
    if (b._chain) {
      b = b._wrapped;
    }
    // invoke a custom `isEqual` method if one is provided
    if (a.isEqual && isFunction(a.isEqual)) {
      return a.isEqual(b);
    }
    if (b.isEqual && isFunction(b.isEqual)) {
      return b.isEqual(a);
    }

    // compare `[[Class]]` names
    var className = toString.call(a);
    if (className != toString.call(b)) {
      return false;
    }
    switch (className) {
      // strings, numbers, dates, and booleans are compared by value
      case '[object String]':
        // primitives and their corresponding collection wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`
        return a == String(b);

      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive;
        // an `egal` comparison is performed for other numeric values
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);

      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values.
        // Dates are compared by their millisecond representations.
        // Note that invalid dates with millisecond representations of `NaN` are not equivalent.
        return +a == +b;

      // regexps are compared by their source and flags
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }

    if (typeof a != 'object' || typeof b != 'object') {
      return false;
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = stack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (stack[length] == a) {
        return true;
      }
    }

    // add the first collection to the stack of traversed objects
    stack.push(a);
    var size = 0, result = true;

    // recursively compare objects and arrays
    if (className == '[object Array]') {
      // compare array lengths to determine if a deep comparison is necessary
      size = a.length;
      result = size == b.length;

      if (result) {
        // deep compare the contents, ignoring non-numeric properties
        while (size--) {
          // ensure commutative equality for sparse arrays
          if (!(result = size in a == size in b && eq(a[size], b[size], stack))) {
            break;
          }
        }
      }
    } else {
      // objects with different constructors are not equivalent
      if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) {
        return false;
      }
      // deep compare objects
      for (var key in a) {
        if (hasOwnProperty.call(a, key)) {
          // count the expected number of properties
          size++;
          // deep compare each member
          if (!(result = hasOwnProperty.call(b, key) && eq(a[key], b[key], stack))) {
            break;
          }
        }
      }
      // ensure that both objects contain the same number of properties
      if (result) {
        for (key in b) {
          if (hasOwnProperty.call(b, key) && !(size--)) {
            break;
          }
        }
        result = !size;
      }
    }
    // remove the first collection from the stack of traversed objects
    stack.pop();
    return result;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Checks if a given `target` value is present in a `collection` using strict
   * equality for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @alias include
   * @category Collections
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Mixed} target The value to check for.
   * @returns {Boolean} Returns `true` if `target` value is found, else `false`.
   * @example
   *
   * _.contains([1, 2, 3], 3);
   * // => true
   */
  function contains(collection, target) {
    return collection == null
      ? false
      : some(collection, function(value) { return value === target; });
  }

  /**
   * Checks if the `callback` returns truthy for **all** values of a `collection`.
   * The `callback` is invoked with 3 arguments; for arrays they are
   * (value, index, array) and for objects they are (value, key, object).
   *
   * @static
   * @memberOf _
   * @alias all
   * @category Collections
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Boolean} Returns `true` if all values pass the callback check, else `false`.
   * @example
   *
   * _.every([true, 1, null, 'yes'], Boolean);
   * => false
   */
  function every(collection, callback, thisArg) {
    var result = true;
    if (collection == null) return result;
    forEach(collection, function(value, index, array) {
      if (!(result = result && callback.call(thisArg, value, index, array))) return breaker;
    });
    return !!result;
  }

  /**
   * Examines each value in a `collection`, returning an array of all values the
   * `callback` returns truthy for. The `callback` is invoked with 3 arguments;
   * for arrays they are (value, index, array) and for objects they are
   * (value, key, object).
   *
   * @static
   * @memberOf _
   * @alias select
   * @category Collections
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Array} Returns a new array of values that passed callback check.
   * @example
   *
   * var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
   * // => [2, 4, 6]
   */
  function filter(collection, callback, thisArg) {
    var result = [];
    if (collection == null) return result;
    forEach(collection, function(value, index, array) {
      if (callback.call(thisArg, value, index, array)) result[result.length] = value;
    });
    return result;
  }

  /**
   * Examines each value in a `collection`, returning the first one the `callback`
   * returns truthy for. The function returns as soon as it finds an acceptable
   * value, and does not iterate over the entire `collection`. The `callback` is
   * invoked with 3 arguments; for arrays they are (value, index, array) and for
   * objects they are (value, key, object).
   *
   * @static
   * @memberOf _
   * @alias detect
   * @category Collections
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Mixed} Returns the value that passed the callback check.
   * @example
   *
   * var even = _.find([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
   * // => 2
   */
  function find(collection, callback, thisArg) {
    var result;
    some(collection, function(value, index, array) {
      if (callback.call(thisArg, value, index, array)) {
        result = value;
        return true;
      }
    });
    return result;
  }

  /**
   * Iterates over a `collection`, executing the `callback` for each value in the
   * `collection`. The `callback` is bound to the `thisArg` value, if one is passed.
   * The `callback` is invoked with 3 arguments; for arrays they are
   * (value, index, array) and for objects they are (value, key, object).
   *
   * @static
   * @memberOf _
   * @alias each
   * @category Collections
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Array|Object} Returns the `collection`.
   * @example
   *
   * _.forforEach([1, 2, 3], function(num) { alert(num); });
   * // => alerts each number in turn...
   *
   * _.forforEach({ 'one': 1, 'two': 2, 'three': 3}, function(num) { alert(num); });
   * // => alerts each number in turn...
   */
  function forEach(collection, callback, thisArg) {
    if (collection != null) {
      if (collection.length === +collection.length) {
        for (var index = 0, length = collection.length; index < length; index++) {
          if (index in collection && callback.call(thisArg, collection[index], index, collection) === breaker) {
            break;
          }
        }
      } else {
        for (var key in collection) {
          if (hasOwnProperty.call(collection, key)) {
            if (callback.call(thisArg, collection[key], key, collection) === breaker) {
              break;
            }
          }
        }
      }
    }
    return collection;
  }

  /**
   * Splits a `collection` into sets, grouped by the result of running each value
   * through `callback`. The `callback` is invoked with 3 arguments; for arrays
   * they are (value, index, array) and for objects they are (value, key, object).
   * The `callback` argument may also be the name of a property to group by.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function|String} callback The function called per iteration or
   *  property name to group by.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Object} Returns an object of grouped values.
   * @example
   *
   * _.groupBy([1.3, 2.1, 2.4], function(num) { return Math.floor(num); });
   * // => { '1': [1.3], '2': [2.1, 2.4] }
   *
   * _.groupBy(['one', 'two', 'three'], 'length');
   * // => { '3': ['one', 'two'], '5': ['three'] }
   */
  function groupBy(collection, callback, thisArg) {
    var result = {};
    if (!isFunction(callback)) {
      var key = callback;
      callback = function(collection) { return collection[key]; };
    }
    forEach(collection, function(value, index) {
      var key = callback(value, index);
      (result[key] || (result[key] = [])).push(value);
    });
    return result;
  }

  /**
   * Calls the method named by `methodName` for each value of the `collection`.
   * Additional arguments will be passed to each invoked method.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object} collection The collection to iterate over.
   * @param {String} methodName The name of the method to invoke.
   * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the method with.
   * @returns {Array} Returns a new array of values returned from each invoked method.
   * @example
   *
   * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
   * // => [[1, 5, 7], [1, 2, 3]]
   */
  function invoke(collection, methodName) {
    var args = slice.call(arguments, 2),
        isFunc = isFunction(methodName);

    return map(collection, function(value) {
      return (isFunc ? methodName || value : value[methodName]).apply(value, args);
    });
  }

  /**
   * Produces a new array of values by mapping each value in the `collection`
   * through a transformation `callback`. The `callback` is bound to the `thisArg`
   * value, if one is passed. The `callback` is invoked with 3 arguments; for
   * arrays they are (value, index, array) and for objects they are (value, key, object).
   *
   * @static
   * @memberOf _
   * @alias collect
   * @category Collections
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Array} Returns a new array of values returned by the callback.
   * @example
   *
   * _.map([1, 2, 3], function(num) { return num * 3; });
   * // => [3, 6, 9]
   *
   * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
   * // => [3, 6, 9]
   */
  function map(collection, callback, thisArg) {
    var result = [];
    if (collection == null) {
      return result;
    }
    forEach(collection, function(value, index, array) {
      result[result.length] = callback.call(thisArg, value, index, array);
    });
    if (collection.length === +collection.length) result.length = collection.length;
    return result;
  }

  /**
   * Retrieves the maximum value of a `collection`. If `callback` is passed,
   * it will be executed for each value in the `collection` to generate the
   * criterion by which the value is ranked. The `callback` is invoked with 3
   * arguments; for arrays they are (value, index, array) and for objects they
   * are (value, key, object).
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [callback] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Mixed} Returns the maximum value.
   * @example
   *
   * var stooges = [
   *   { 'name': 'moe', 'age': 40 },
   *   { 'name': 'larry', 'age': 50 },
   *   { 'name': 'curly', 'age': 60 }
   * ];
   *
   * _.max(stooges, function(stooge) { return stooge.age; });
   * // => { 'name': 'curly', 'age': 60 };
   */
  function max(collection, callback, thisArg) {
    if (!callback) {
      if (isArray(collection) && collection[0] === +collection[0]) {
        return Math.max.apply(Math, collection);
      }
      if (isEmpty(collection)) {
        return -Infinity;
      }
    } else if (thisArg) {
      callback = bind(callback, thisArg);
    }
    var result = { 'computed': -Infinity };
    forEach(collection, function(value, index, array) {
      var computed = callback ? callback(value, index, array) : value;
      if (computed >= result.computed) {
        result = { 'computed': computed, 'value': value };
      }
    });
    return result.value;
  }

  /**
   * Retrieves the minimum value of a `collection`. If `callback` is passed,
   * it will be executed for each value in the `collection` to generate the
   * criterion by which the value is ranked. The `callback` is invoked with 3
   * arguments; for arrays they are (value, index, array) and for objects they
   * are (value, key, object).
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [callback] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Mixed} Returns the minimum value.
   * @example
   *
   * _.min([10, 5, 100, 2, 1000]);
   * // => 2
   */
  function min(collection, callback, thisArg) {
    if (!callback) {
      if (isArray(collection) && collection[0] === +collection[0]) {
        return Math.min.apply(Math, collection);
      }
      if (isEmpty(collection)) {
        return Infinity;
      }
    } else if (thisArg) {
      callback = bind(callback, thisArg);
    }
    var result = { 'computed': Infinity };
    forEach(collection, function(value, index, array) {
      var computed = callback ? callback(value, index, array) : value;
      if (computed < result.computed) {
        result = { 'computed': computed, 'value': value };
      }
    });
    return result.value;
  }

  /**
   * Retrieves the value of a specified property from all values in a `collection`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object} collection The collection to iterate over.
   * @param {String} property The property to pluck.
   * @returns {Array} Returns a new array of property values.
   * @example
   *
   * var stooges = [
   *   { 'name': 'moe', 'age': 40 },
   *   { 'name': 'larry', 'age': 50 },
   *   { 'name': 'curly', 'age': 60 }
   * ];
   *
   * _.pluck(stooges, 'name');
   * // => ['moe', 'larry', 'curly']
   */
  function pluck(collection, key) {
    return map(collection, function(value) { return value[key]; });
  }

  /**
   * Boils down a `collection` to a single value. The initial state of the
   * reduction is `accumulator` and each successive step of it should be returned
   * by the `callback`. The `callback` is bound to the `thisArg` value, if one is
   * passed. The `callback` is invoked with 4 arguments; for arrays they are
   * (accumulator, value, index, array) and for objects they are
   * (accumulator, value, key, object).
   *
   * @static
   * @memberOf _
   * @alias foldl, inject
   * @category Collections
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [accumulator] Initial value of the accumulator.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Mixed} Returns the accumulated value.
   * @example
   *
   * var sum = _.reduce([1, 2, 3], function(memo, num) { return memo + num; });
   * // => 6
   */
  function reduce(collection, callback, accumulator, thisArg) {
    var initial = arguments.length > 2;
    if (thisArg) {
      callback = bind(callback, thisArg);
    }
    forEach(collection, function(value, index) {
      if (!initial) {
        accumulator = value;
        initial = true;
      } else {
        accumulator = callback(accumulator, value, index, collection);
      }
    });
    return accumulator;
  }

  /**
   * The right-associative version of `_.reduce`. The `callback` is bound to the
   * `thisArg` value, if one is passed. The `callback` is invoked with 4 arguments;
   * for arrays they are (accumulator, value, index, array) and for objects they
   * are (accumulator, value, key, object).
   *
   * @static
   * @memberOf _
   * @alias foldr
   * @category Collections
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [accumulator] Initial value of the accumulator.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Mixed} Returns the accumulated value.
   * @example
   *
   * var list = [[0, 1], [2, 3], [4, 5]];
   * var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
   * // => [4, 5, 2, 3, 0, 1]
   */
  function reduceRight(collection, callback, accumulator, thisArg) {
    var initial = arguments.length > 2,
        reversed = toArray(collection).reverse();

    return initial ? reduce(reversed, callback, accumulator, thisArg) : reduce(reversed, callback);
  }

  /**
   * The opposite of `_.filter`, this method returns the values of a `collection`
   * that `callback` does **not** return truthy for. The `callback` is invoked
   * with 3 arguments; for arrays they are (value, index, array) and for objects
   * they are (value, key, object).
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Array} Returns a new array of values that did **not** pass the callback check.
   * @example
   *
   * var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
   * // => [1, 3, 5]
   */
  function reject(collection, callback, thisArg) {
    var result = [];
    if (collection == null) return result;
    forEach(collection, function(value, index, array) {
      if (!callback.call(thisArg, value, index, array)) result[result.length] = value;
    });
    return result;
  }

  /**
   * Produces a new array of shuffled `collection` values, using a version of the
   * Fisher-Yates shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object} collection The collection to shuffle.
   * @returns {Array} Returns a new shuffled array.
   * @example
   *
   * _.shuffle([1, 2, 3, 4, 5, 6]);
   * // => [4, 1, 6, 3, 5, 2]
   */
  function shuffle(collection) {
    var rand,
        result = [];

    forEach(collection, function(value, index, array) {
      rand = Math.floor(Math.random() * (index + 1));
      result[index] = result[rand];
      result[rand] = value;
    });
    return result;
  }

  /**
   * Gets the number of values in the `collection`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object} collection The collection inspect.
   * @returns {Number} Returns the number of values in the collection.
   * @example
   *
   * _.size({ 'one': 1, 'two': 2, 'three': 3 });
   * // => 3
   */
  function size(collection) {
    return isArray(collection) ? collection.length : keys(collection).length;
  }

  /**
   * Produces a new sorted array, ranked in ascending order by the results of
   * running each value of a `collection` through `callback`. The `callback` is
   * invoked with 3 arguments; for arrays they are (value, index, array) and for
   * objects they are (value, key, object). The `callback` argument may also be
   * the name of a property to sort by (e.g. 'length').
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function|String} callback The function called per iteration or
   *  property name to sort by.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Array} Returns a new array of sorted values.
   * @example
   *
   * _.sortBy([1, 2, 3, 4, 5, 6], function(num) { return Math.sin(num); });
   * // => [5, 4, 6, 3, 1, 2]
   */
  function sortBy(collection, callback, thisArg) {
    if (!isFunction(callback)) {
      var key = callback;
      callback = function(collection) { return collection[key]; };
    } else if (thisArg) {
      callback = bind(callback, thisArg);
    }
    return pluck(map(collection, function(value, index) {
      return {
        'criteria': callback(value, index, collection),
        'value': value
      };
    }).sort(function(left, right) {
      var a = left.criteria,
          b = right.criteria;

      if (a === undefined) {
        return 1;
      }
      if (b === undefined) {
        return -1;
      }
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  }

  /**
   * Checks if the `callback` returns truthy for **any** value of a `collection`.
   * The function returns as soon as it finds passing value, and does not iterate
   * over the entire `collection`. The `callback` is invoked with 3 arguments; for
   * arrays they are (value, index, array) and for objects they are
   * (value, key, object).
   *
   * @static
   * @memberOf _
   * @alias any
   * @category Collections
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Boolean} Returns `true` if any value passes the callback check, else `false`.
   * @example
   *
   * _.some([null, 0, 'yes', false]);
   * // => true
   */
  function some(collection, callback, thisArg) {
    var result = false;
    if (!callback) {
      callback = identity;
    } else if (thisArg) {
      callback = bind(callback, thisArg);
    }
    if (collection == null) return result;
    forEach(collection, function(value, index, array) {
      if (result || (result = callback.call(thisArg, value, index, array))) return breaker;
    });
    return !!result;
  }

  /**
   * Uses a binary search to determine the index at which the `value` should be
   * inserted into the `collection` in order to maintain the `collection`'s sorted
   * order. If `callback` is passed, it will be executed for each value in the
   * `collection` to compute their sort ranking. The `callback` is invoked with
   * 1 arguments.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array} array The array to iterate over.
   * @param {Mixed} value The value to evaluate.
   * @param {Function} [callback] The function called per iteration.
   * @returns {Number} Returns the index at which the value should be inserted
   *  into the collection.
   * @example
   *
   * _.sortedIndex([10, 20, 30, 40, 50], 35);
   * // => 3
   */
  function sortedIndex(array, object, callback) {
    var low = 0,
        high = array.length;

    callback || (callback = identity);
    while (low < high) {
      var mid = (low + high) >> 1;
      callback(array[mid]) < callback(object) ? (low = mid + 1) : (high = mid);
    }
    return low;
  }

  /**
   * Converts the `collection`, into an array. Useful for converting the
   * `arguments` object.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object} collection The collection to convert.
   * @returns {Array} Returns the new converted array.
   * @example
   *
   * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
   * // => [2, 3, 4]
   */
  function toArray(collection) {
    if (!collection) {
      return [];
    }
    if (isArray(collection) || isArguments(collection)) {
      return slice.call(collection);
    }
    if (isFunction(collection.toArray)) {
      return collection.toArray();
    }
    return values(collection);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Produces a new array with all falsey values of `array` removed. The values
   * `false`, `null`, `0`, `""`, `undefined` and `NaN` are all falsey.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to compact.
   * @returns {Array} Returns a new filtered array.
   * @example
   *
   * _.compact([0, 1, false, 2, '', 3]);
   * // => [1, 2, 3]
   */
  function compact(array) {
    return filter(array, Boolean);
  }

  /**
   * Produces a new array of `array` values not present in the other arrays
   * using strict equality for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to process.
   * @param {Mixed} [array1, array2, ...] Arrays to check.
   * @returns {Array} Returns a new array of `array` values not present in the
   *  other arrays.
   * @example
   *
   * _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
   * // => [1, 3, 4]
   */
  function difference(array) {
    var values = concat.apply([], slice.call(arguments, 1));
    return filter(array, function(value) { return indexOf(values, value) < 0; });
  }

  /**
   * Gets the first value of the `array`. Pass `n` to return the first `n` values
   * of the `array`.
   *
   * @static
   * @memberOf _
   * @alias head, take
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {Number} [n] The number of elements to return.
   * @param {Object} [guard] Used to allow the function to work with other iteration
   *  methods like `_.map` without using their callback `index` argument for `n`.
   * @returns {Mixed} Returns the first value or an array of the first `n`
   *  values of the `array`.
   * @example
   *
   * _.first([5, 4, 3, 2, 1]);
   * // => 5
   */
  function first(array, n, guard) {
    return (n == null || guard) ? array[0] : slice.call(array, 0, n);
  }

  /**
   * Flattens a nested array (the nesting can be to any depth). If `shallow` is
   * truthy, `array` will only be flattened a single level.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to compact.
   * @param {Boolean} shallow A flag to indicate only flattening a single level.
   * @returns {Array} Returns a new flattened array.
   * @example
   *
   * _.flatten([1, [2], [3, [[4]]]]);
   * // => [1, 2, 3, 4];
   *
   * _.flatten([1, [2], [3, [[4]]]], true);
   * // => [1, 2, 3, [[4]]];
   */
  function flatten(array, shallow) {
    if (shallow) {
      return concat.apply([], array);
    }
    return reduce(array, function(accumulator, value) {
      if (isArray(value)) {
        push.apply(accumulator, flatten(value));
        return accumulator;
      }
      accumulator.push(value);
      return accumulator;
    }, []);
  }

  /**
   * Gets the index at which the first occurrence of `value` is found using
   * strict equality for comparisons, i.e. `===`. If the `array` is already
   * sorted, passing `true` for `isSorted` will run a faster binary search.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to search.
   * @param {Mixed} value The value to search for.
   * @param {Boolean} [isSorted=false] A flag to indicate that the `array` is already sorted.
   * @returns {Number} Returns the index of the matched value or `-1`.
   * @example
   *
   * _.indexOf([1, 2, 3], 2);
   * // => 1
   */
  function indexOf(array, value, isSorted) {
    var index, length;
    if (array == null) {
      return -1;
    }
    if (isSorted) {
      index = sortedIndex(array, value);
      return array[index] === value ? index : -1;
    }
    for (index = 0, length = array.length; index < length; index++) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Gets all but the last value of the `array`. Pass `n` to exclude the last `n`
   * values from the result.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {Number} [n] The number of elements to return.
   * @param {Object} [guard] Used to allow the function to work with other iteration
   *  methods like `_.map` without using their callback `index` argument for `n`.
   * @returns {Array} Returns all but the last value or `n` values of the `array`.
   * @example
   *
   * _.initial([5, 4, 3, 2, 1]);
   * // => [5, 4, 3, 2]
   */
  function initial(array, n, guard) {
    return slice.call(array, 0, -((n == null || guard) ? 1 : n));
  }

  /**
   * Computes the intersection of all the passed-in arrays.
   *
   * @static
   * @memberOf _
   * @alias intersect
   * @category Arrays
   * @param {Mixed} [array1, array2, ...] Arrays to process.
   * @returns {Array} Returns a new array of unique values, in order, that are
   *  present in **all** of the arrays.
   * @example
   *
   * _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
   * // => [1, 2]
   */
  function intersection(array) {
    var rest = slice.call(arguments, 1);
    return filter(uniq(array), function(value) {
      return every(rest, function(other) {
        return indexOf(other, value) >= 0;
      });
    });
  }

  /**
   * Gets the last value of the `array`. Pass `n` to return the lasy `n` values
   * of the `array`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {Number} [n] The number of elements to return.
   * @param {Object} [guard] Used to allow the function to work with other iteration
   *  methods like `_.map` without using their callback `index` argument for `n`.
   * @returns {Array} Returns all but the last value or `n` values of the `array`.
   * @example
   *
   * _.last([5, 4, 3, 2, 1]);
   * // => 1
   */
  function last(array, n, guard) {
    var length = array.length;
    return (n == null || guard) ? array[length - 1] : slice.call(array, -n || length);
  }

  /**
   * Gets the index at which the last occurrence of `value` is found using
   * strict equality for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to search.
   * @param {Mixed} value The value to search for.
   * @returns {Number} Returns the index of the matched value or `-1`.
   * @example
   *
   * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
   * // => 4
   */
  function lastIndexOf(array, value) {
    if (array == null) {
      return -1;
    }
    var index = array.length;
    while (index--) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Creates an array of numbers (positive and/or negative) progressing from
   * `start` up to but not including `stop`. This method is a port of Python's
   * `range()` function. See http://docs.python.org/library/functions.html#range.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Number} [start=0] The start of the range.
   * @param {Number} end The end of the range.
   * @param {Number} [step=1] The value to increment or descrement by.
   * @returns {Array} Returns a new range array.
   * @example
   *
   * _.range(10);
   * // => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
   *
   * _.range(1, 11);
   * // => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   *
   * _.range(0, 30, 5);
   * // => [0, 5, 10, 15, 20, 25]
   *
   * _.range(0, -10, -1);
   * // => [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
   *
   * _.range(0);
   * // => []
   */
  function range(start, end, step) {
    step || (step = 1);
    if (arguments.length < 2) {
      end = start || 0;
      start = 0;
    }

    var idx = 0,
        length = Math.max(Math.ceil((end - start) / step), 0),
        result = Array(length);

    while (idx < length) {
      result[idx++] = start;
      start += step;
    }
    return result;
  }

  /**
   * The opposite of `_.initial`, this method gets all but the first value of
   * the `array`. Pass `n` to exclude the first `n` values from the result.
   *
   * @static
   * @memberOf _
   * @alias tail
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {Number} [n] The number of elements to return.
   * @param {Object} [guard] Used to allow the function to work with other iteration
   *  methods like `_.map` without using their callback `index` argument for `n`.
   * @returns {Array} Returns all but the first value or `n` values of the `array`.
   * @example
   *
   * _.rest([5, 4, 3, 2, 1]);
   * // => [4, 3, 2, 1]
   */
  function rest(array, index, guard) {
    return slice.call(array, (index == null || guard) ? 1 : index);
  }

  /**
   * Computes the union of the passed-in arrays.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Mixed} [array1, array2, ...] Arrays to process.
   * @returns {Array} Returns a new array of unique values, in order, that are
   *  present in one or more of the arrays.
   * @example
   *
   * _.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
   * // => [1, 2, 3, 101, 10]
   */
  function union() {
    return uniq(flatten(arguments, true));
  }

  /**
   * Produces a duplicate-value-free version of the `array` using strict equality
   * for comparisons, i.e. `===`. If the `array` is already sorted, passing `true`
   * for `isSorted` will run a faster algorithm. If `callback` is passed,
   * each value of `array` is passed through a transformation `callback` before
   * uniqueness is computed. The `callback` is invoked with 3 arguments;
   * (value, index, array).
   *
   * @static
   * @memberOf _
   * @alias unique
   * @category Arrays
   * @param {Array} array The array to process.
   * @param {Boolean} [isSorted=false] A flag to indicate that the `array` is already sorted.
   * @param {Function} [callback] A
   * @returns {Array} Returns a duplicate-value-free array.
   * @example
   *
   * _.uniq([1, 2, 1, 3, 1, 4]);
   * // => [1, 2, 3, 4]
   */
  function uniq(array, isSorted, callback) {
    var initial = callback ? map(array, callback) : array,
        result = [];

    // the `isSorted` flag is irrelevant if the array only contains two elements.
    if (array.length < 3) {
      isSorted = true;
    }
    reduce(initial, function(accumulator, value, index) {
      if (isSorted ? last(accumulator) !== value || !accumulator.length : indexOf(accumulator, value) < 0) {
        accumulator.push(value);
        result.push(array[index]);
      }
      return accumulator;
    }, []);

    return result;
  }

  /**
   * Produces a new array with all occurrences of the values removed using strict
   * equality for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to filter.
   * @param {Mixed} [value1, value2, ...] Values to remove.
   * @returns {Array} Returns a new filtered array.
   * @example
   *
   * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
   * // => [2, 3, 4]
   */
  function without(array) {
    return difference(array, slice.call(arguments, 1));
  }

  /**
   * Merges together the values of each of the arrays with the value at the
   * corresponding position. Useful for separate data sources that are coordinated
   * through matching array indexes. For a matrix of nested arrays, `_.zip.apply(...)`
   * can transpose the matrix in a similar fashion.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Mixed} [array1, array2, ...] Arrays to process.
   * @returns {Array} Returns a new array of merged arrays.
   * @example
   *
   * _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
   * // => [['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]
   */
  function zip() {
    var index = -1,
        length = max(pluck(arguments, 'length')),
        result = Array(length);

    while (++index < length) {
      result[index] = pluck(arguments, index);
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a new function that is restricted to executing only after it is
   * called a given number of `times`.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Number} times The number of times the function must be called before
   * it is executed.
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new restricted function.
   * @example
   *
   * var renderNotes = _.after(notes.length, render);
   * _.forEach(notes, function(note) {
   *   note.asyncSave({ 'success': renderNotes });
   * });
   * // renderNotes is run once, after all notes have saved.
   */
  function after(times, func) {
    if (times < 1) {
      return func();
    }
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  }

  /**
   * Creates a new function that, when called, invokes `func` with the `this`
   * binding of `thisArg` and prepends additional arguments to those passed to
   * the bound function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to bind.
   * @param @param {Mixed} [thisArg] The `this` binding of `func`.
   * @param {Mixed} [arg1, arg2, ...] Arguments to prepend to those passed to the bound function.
   * @returns {Function} Returns the new bound function.
   * @example
   *
   * var func = function(greeting) { return greeting + ': ' + this.name; };
   * func = _.bind(func, { 'name': 'moe' }, 'hi');
   * func();
   * // => 'hi: moe'
   */
  function bind(func, thisArg) {
    var args = slice.call(arguments, 2),
        argsLength = args.length;

    return function() {
      args.length = argsLength;
      push.apply(args, arguments);
      return func.apply(thisArg, args);
    };
  }

  /**
   * Binds methods on the `object` to the object, overwriting the non-bound method.
   * If no method names are provided, all the function properties of the `object`
   * will be bound.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Object} object The object to bind and assign the bound methods to.
   * @param {Mixed} [methodName1, methodName2, ...] Method names on the object to bind.
   * @returns {Object} Returns the `object`.
   * @example
   *
   * var buttonView = {
   *  'label': 'lodash',
   *  'onClick': function() { alert('clicked: ' + this.label); },
   *  'onHover': function() { console.log('hovering: ' + this.label); }
   * };
   *
   * _.bindAll(buttonView);
   * jQuery('#lodash_button').on('click', buttonView.onClick);
   * // => When the button is clicked, `this.label` will have the correct value
   */
  function bindAll(object) {
    var funcs = slice.call(arguments, 1);
    if (!funcs.length) {
      funcs = functions(object);
    }
    forEach(funcs, function(methodName) {
      object[methodName] = bind(object[methodName], object);
    });
    return object;
  }

  /**
   * Creates a new function that is the composition of the passed functions,
   * where each function consumes the return value of the function that follows.
   * In math terms, composing thefunctions `f()`, `g()`, and `h()` produces `f(g(h()))`.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Mixed} [func1, func2, ...] Functions to compose.
   * @returns {Function} Returns the new composed function.
   * @example
   *
   * var greet = function(name) { return 'hi: ' + name; };
   * var exclaim = function(statement) { return statement + '!'; };
   * var welcome = _.compose(exclaim, greet);
   * welcome('moe');
   * // => 'hi: moe!'
   */
  function compose() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var index = funcs.length - 1; index >= 0; index--) {
        args = [funcs[index].apply(this, args)];
      }
      return args[0];
    };
  }

  /**
   * Creates a new function that will postpone its execution until after `wait`
   * milliseconds have elapsed since the last time it was invoked. Pass `true`
   * for `immediate` to cause debounce to invoke the function on the leading,
   * intead of the trailing, edge of the wait timeout.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to debounce.
   * @param {Number} wait The number of milliseconds to postone.
   * @param {Boolean} immediate A flag to indicate execution is on the leading
   *  edge of the wait timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * var lazyLayout = _.debounce(calculateLayout, 300);
   * jQuery(window).on('resize', lazyLayout);
   */
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var args = arguments,
          thisArg = this;

      if (immediate && !timeout) {
        func.apply(thisArg, args);
      }
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        timeout = null;
        if (!immediate) {
          func.apply(thisArg, args);
        }
      }, wait);
    };
  }

  /**
   * Invokes the `func` function after `wait` milliseconds. Additional arguments
   * are passed `func` when it is invoked.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to delay.
   * @param {Number} wait The number of milliseconds to delay execution.
   * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the function with.
   * @returns {Number} Returns the `setTimeout` timeout id.
   * @example
   *
   * var log = _.bind(console.log, console);
   * _.delay(log, 1000, 'logged later');
   * // => 'logged later' (Appears after one second.)
   */
  function delay(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function() { return func.apply(null, args); }, wait);
  }

  /**
   * Defers invoking the `func` function until the current call stack has cleared.
   * Additional arguments are passed to `func` when it is invoked.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to defer.
   * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the function with.
   * @returns {Number} Returns the `setTimeout` timeout id.
   * @example
   *
   * _.defer(function() { alert('deferred'); });
   * // Returns from the function before the alert runs.
   */
  function defer(func) {
    var args = [func, 1];
    push.apply(args, slice.call(arguments, 1));
    return delay.apply(lodash, args);
  }

  /**
   * Creates a new function that memoizes the result of `func`. If `hasher` is
   * passed, it will be used to compute the hash key for storing the result,
   * based on the arguments to the original function. The default `hasher` uses
   * the first argument to the memoized function as the cache key.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to memoize the output of.
   * @param {Function} [hasher=_.identity] A function used to resolve the cache keyW.
   * @returns {Function} Returns the new memoizing function.
   * @example
   *
   * var fibonacci = _.memoize(function(n) {
   *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
   * });
   */
  function memoize(func, hasher) {
    var cache = {};
    hasher || (hasher = identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return hasOwnProperty.call(cache, key)
        ? cache[key]
        : (cache[key] = func.apply(this, arguments));
    };
  }

  /**
   * Creates a new function that is restricted to one execution. Repeat calls to
   * the function will return the value of the first call.
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
   * // Application is only created once.
   */
  function once(func) {
    var result,
        ran = false;

    return function() {
      if (ran) {
        return result;
      }
      ran = true;
      result = func.apply(this, arguments);
      return result;
    };
  }

  /**
   * Creates a new function that, when invoked, will only call the original
   * function at most once per every `wait` milliseconds.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to throttle.
   * @param {Number} wait The number of milliseconds to throttle executions to.
   * @returns {Function} Returns the new throttled function.
   * @example
   *
   * var throttled = _.throttle(updatePosition, 100);
   * jQuery(window).on('scroll', throttled);
   */
  function throttle(func, wait) {
    var args, more, result, thisArg, throttling, timeout,
        whenDone = debounce(function() { more = throttling = false; }, wait);

    return function() {
      args = arguments;
      thisArg = this;

      if (!timeout) {
        timeout = setTimeout(function() {
          timeout = null;
          if (more) {
            func.apply(thisArg, args);
          }
          whenDone();
        }, wait);
      }
      if (throttling) {
        more = true;
      } else {
        result = func.apply(thisArg, args);
      }
      whenDone();
      throttling = true;
      return result;
    };
  }

  /**
   * Create a new function that passes the `func` function to the `wrapper`
   * function as its first argument. Additional arguments are appended to those
   * passed to the `wrapper` function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to wrap.
   * @param {Function} wrapper The wrapper function.
   * @param {Mixed} [arg1, arg2, ...] Arguments to append to those passed to the wrapper.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var hello = function(name) { return 'hello: ' + name; };
   * hello = _.wrap(hello, function(func) {
   *   return 'before, ' + func('moe') + ', after';
   * });
   * hello();
   * // => 'before, hello: moe, after'
   */
  function wrap(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Create a shallow clone of the `value`. Any nested objects or arrays will be
   * assigned by reference and not cloned.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to clone.
   * @returns {Mixed} Returns the cloned `value`.
   * @example
   *
   * _.clone({ 'name': 'moe' });
   * // => { 'name': 'moe' };
   */
  function clone(value) {
    if (!isObject(value)) {
      return value;
    }
    return isArray(value) ? value.slice() : extend({}, value);
  }

  /**
   * Assigns missing properties in `object` with default values from the defaults
   * objects. As soon as a property is set, additional defaults of the same
   * property will be ignored.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to populate.
   * @param {Object} [defaults1, defaults2, ..] The defaults objects to apply to `object`.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var iceCream = { 'flavor': 'chocolate' };
   * _.defaults(iceCream, { 'flavor': 'vanilla', 'sprinkles': 'lots' });
   * // => { 'flavor': 'chocolate', 'sprinkles': 'lots' }
   */
  function defaults(object) {
    forEach(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (object[prop] == null) object[prop] = source[prop];
      }
    });
    return object;
  }

  /**
   * Copies enumerable properties from the source objects to the `destination` object.
   * Subsequent sources will overwrite propery assignments of previous sources.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} destination The destination object.
   * @param {Object} [source1, source2, ..] The source objects.
   * @returns {Object} Returns the `destination` object.
   * @example
   *
   * _.extend({ 'name': 'moe' }, { 'age': 40 });
   * // => { 'name': 'moe', 'age': 40 }
   */
  function extend(destination) {
    forEach(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        destination[prop] = source[prop];
      }
    });
    return destination;
  }

  /**
   * Produces a sorted array of the `object`'s enumerable own property names that
   * have function values.
   *
   * @static
   * @memberOf _
   * @alias methods
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns a new array of property names that have function values.
   * @example
   *
   * _.functions(_);
   * // => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
   */
  function functions(object) {
    var names = [];
    for (var key in object) {
      if (isFunction(object[key])) {
        names.push(key);
      }
    }
    return names.sort();
  }

  /**
   * Checks if an object has the specified key as a direct property.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to check.
   * @param {String} key The key to check for.
   * @returns {Boolean} Returns `true` if key is a direct property, else `false`.
   * @example
   *
   * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
   * // => true
   */
  function has(object, key) {
    return hasOwnProperty.call(object, key);
  }

  /**
   * Checks if a `value` is an `arguments` object.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is an `arguments` object, else `false`.
   * @example
   *
   * (function() { return _.isArguments(arguments); })(1, 2, 3);
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  function isArguments(value) {
    return toString.call(value) == '[object Arguments]';
  }

  /**
   * Checks if a `value` is an array.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is an array, else `false`.
   * @example
   *
   * (function() { return _.isArray(arguments); })();
   * // => false
   *
   * _.isArray([1, 2, 3]);
   * // => true
   */
  function isArray(value) {
    return toString.call(value) == '[object Array]';
  }

  /**
   * Checks if a `value` is a boolean (`true` or `false`) value.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a boolean value, else `false`.
   * @example
   *
   * _.isBoolean(null);
   * // => false
   */
  function isBoolean(value) {
    return value === true || value === false || toString.call(value) == '[object Boolean]';
  }

  /**
   * Checks if a `value` is a date.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a date, else `false`.
   * @example
   *
   * _.isDate(new Date);
   * // => true
   */
  function isDate(value) {
    return toString.call(value) == '[object Date]';
  }

  /**
   * Checks if a `value` is a DOM element.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a DOM element, else `false`.
   * @example
   *
   * _.isElement(document.body);
   * // => true
   */
  function isElement(value) {
    return !!(value && value.nodeType == 1);
  }

  /**
   * Checks if a `value` is empty. Arrays or strings with a length of 0 and
   * objects with no enumerable own properties are considered "empty".
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is empty, else `false`.
   * @example
   *
   * _.isEmpty([1, 2, 3]);
   * // => false
   *
   * _.isEmpty({});
   * // => true
   */
  function isEmpty(value) {
    if (value == null) {
      return true;
    }
    if (isArray(value) || isString(value)) {
      return value.length === 0;
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
   * equivalent to each other.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to compare.
   * @param {Mixed} other The other value to compare.
   * @returns {Boolean} Returns `true` if the values are equvalent, else `false`.
   * @example
   *
   * var moe = { 'name': 'moe', 'luckyNumbers': [13, 27, 34] };
   * var clone = { 'name': 'moe', 'luckyNumbers': [13, 27, 34] };
   *
   * moe == clone;
   * // => false
   *
   * _.isEqual(moe, clone);
   * // => true
   */
  function isEqual(value, other) {
    return eq(value, other, []);
  }

  /**
   * Checks if a `value` is a finite number.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a finite number, else `false`.
   * @example
   *
   * _.isFinite(-101);
   * // => true
   *
   * _.isFinite('10');
   * // => false
   *
   * _.isFinite(Infinity);
   * // => false
   */
  function isFinite(value) {
    return isNumber(value) && nativeIsFinite(value);
  }

  /**
   * Checks if a `value` is a function.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(''.concat);
   * // => true
   */
  function isFunction(value) {
    return toString.call(value) == '[object Function]';
  }

  /**
   * Checks if a `value` is an object.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject(1);
   * // => false
   */
  function isObject(value) {
    return value === Object(value);
  }

  /**
   * Checks if a `value` is `NaN`.
   * Note: this is not the same as native `isNaN`, which will return true for
   * `undefined` and other values. See http://es5.github.com/#x15.1.2.4.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is `NaN`, else `false`.
   * @example
   *
   * _.isNaN(NaN);
   * // => true
   *
   * isNaN(undefined);
   * // => true
   *
   * _.isNaN(undefined);
   * // => false
   */
  function isNaN(value) {
    // `NaN` is the only value for which `===` is not reflexive.
    return value !== value;
  }

  /**
   * Checks if a `value` is `null`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is `null`, else `false`.
   * @example
   *
   * _.isNull(null);
   * // => true
   *
   * _.isNull(undefined);
   * // => false
   */
  function isNull(value) {
    return value === null;
  }

  /**
   * Checks if a `value` is a number.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a number, else `false`.
   * @example
   *
   * _.isNumber(8.4 * 5;
   * // => true
   */
  function isNumber(value) {
    return toString.call(value) == '[object Number]';
  }

  /**
   * Checks if a `value` is a regular expression.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a regular expression, else `false`.
   * @example
   *
   * _.isRegExp(/moe/);
   * // => true
   */
  function isRegExp(value) {
    return toString.call(value) == '[object RegExp]';
  }

  /**
   * Checks if a `value` is a string.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a string, else `false`.
   * @example
   *
   * _.isString('moe');
   * // => true
   */
  function isString(value) {
    return toString.call(value) == '[object String]';
  }

  /**
   * Checks if a `value` is `undefined`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is `undefined`, else `false`.
   * @example
   *
   * _.isUndefined(void 0);
   * // => true
   */
  function isUndefined(value) {
    return value === void 0;
  }

  /**
   * Produces an array of the `object`'s enumerable own property names.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns a new array of property names.
   * @example
   *
   * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
   * // => ['one', 'two', 'three']
   */
  function keys(object) {
    if (object !== Object(object)) {
      throw TypeError();
    }
    var result = [];
    for (var key in object) {
      if (hasOwnProperty.call(object, key)) {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * Creates an object composed of the specified properties. Property names may
   * be specified as individual arguments or as arrays of property names.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to pluck.
   * @param {Object} [prop1, prop2, ..] The properties to pick.
   * @returns {Object} Returns an object composed of the picked properties.
   * @example
   *
   * _.pick({ 'name': 'moe', 'age': 40, 'userid': 'moe1' }, 'name', 'age');
   * // => { 'name': 'moe', 'age': 40 }
   */
  function pick(object) {
    var result = {};
    forEach(flatten(slice.call(arguments, 1)), function(key) {
      if (key in object) {
        result[key] = object[key];
      }
    });
    return result;
  }

  /**
   * Invokes `interceptor` with the `value` as the first argument, and then returns
   * `value`. The primary purpose of this method is to "tap into" a method chain,
   * in order to performoperations on intermediate results within the chain.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to pass to `callback`.
   * @param {Function} interceptor The function to invoke.
   * @returns {Mixed} Returns `value`.
   * @example
   *
   * _.chain([1,2,3,200])
   *  .filter(function(num) { return num % 2 == 0; })
   *  .tap(alert)
   *  .map(function(num) { return num * num })
   *  .value();
   * // => // [2, 200] (alerted)
   * // => [4, 40000]
   */
  function tap(value, interceptor) {
    interceptor(value);
    return value;
  }

  /**
   * Produces an array of the `object`'s enumerable own property values.
   *
   * @static
   * @memberOf _
   * @alias methods
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns a new array of property values.
   * @example
   *
   * _.values({ 'one': 1, 'two': 2, 'three': 3 });
   * // => [1, 2, 3]
   */
  function values(object) {
    return map(object, identity);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Escapes a string for insertion into HTML, replacing `&`, `<`, `>`, `"`, `'`,
   * and `/` characters.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {String} string The string to escape.
   * @returns {String} Returns the escaped string.
   * @example
   *
   * _.escape('Curly, Larry & Moe');
   * // => "Curly, Larry &amp; Moe"
   */
  function escape(string) {
    return (string + '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;').replace(/\//g,'&#x2F;');
  }

  /**
   * This function simply returns the first argument passed to it.
   * Note: It is used throughout Lodash as a default callback.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Mixed} value Any value.
   * @returns {Mixed} Returns `value`.
   * @example
   *
   * var moe = { 'name': 'moe' };
   * moe === _.identity(moe);
   * // => true
   */
  function identity(value) {
    return value;
  }

  /**
   * Adds functions properties of `object` to the `lodash` function and chainable
   * wrapper.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Object} object The object of function properties to add to `lodash`.
   * @example
   *
   * _.mixin({
   *   'capitalize': function(string) {
   *     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
   *   }
   * });
   *
   * _.capitalize('curly');
   * // => 'Curly'
   *
   * _('larry').capitalize();
   * // => 'Larry'
   */
  function mixin(object) {
    forEach(functions(object), function(methodName) {
      var func = lodash[methodName] = object[methodName];

      lodash.prototype[methodName] = function() {
        // In Opera < 9.50 and some older/beta Mobile Safari versions using `unshift()`
        // generically to augment the `arguments` object will pave the value at
        // index `0` without incrimenting the other values's indexes.
        // https://github.com/documentcloud/underscore/issues/9
        var args = slice.call(arguments);
        unshift.call(args, this._wrapped);

        var result = func.apply(lodash, args);
        return this._chain ? lodash(result).chain() : result;
      };
    });
  }

  /**
   * Reverts the '_' variable to its previous value and returns a reference to
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
    window['_'] = oldDash;
    return this;
  }

  /**
   * Resolves the value of `property` on `object`. If the property is a function
   * it will be invoked and its result returned, else the property value is returned.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Object} object The object to inspect.
   * @param {String} property The property to get the result of.
   * @returns {Mixed} Returns the resolved.
   * @example
   *
   * var object = {
   *   'cheese': 'crumpets',
   *   'stuff': function() {
   *     return 'nonsense';
   *   }
   * };
   *
   * _.result(object, 'cheese');
   * // => 'crumpets'
   *
   * _.result(object, 'stuff');
   * // => 'nonsense'
   */
  function result(object, property) {
    if (object == null) {
      return null;
    }
    var value = object[property];
    return isFunction(value) ? object[property]() : value;
  }

  /**
   * Executes the `callback` function `n` times.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Number} n The number of times to execute the callback.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @example
   *
   * _.times(3, function() { genie.grantWish(); });
   */
  function times(n, callback, thisArg) {
    if (thisArg) {
      callback = bind(callback, thisArg);
    }
    for (var index = 0; index < n; index++) {
      callback(index);
    }
  }

  /**
   * Generates a unique id. If `prefix` is passed, the id will be appended to it.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {String} [prefix] The value to prefix the id with.
   * @returns {Number|String} Returns a numeric id if no prefix is passed, else
   *  a string id may be returned.
   * @example
   *
   * _.uniqueId('contact_');
   * // => 'contact_104'
   */
  function uniqueId(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * JavaScript micro-templating, similar to John Resig's implementation.
   * Lo-Dash templating handles arbitrary delimiters, preserves whitespace,
   * and correctly escapes quotes within interpolated code.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {String} text The
   * @param {Obect} data The
   * @param {Object} settings
   * @returns {String} Returns....
   * @example
   *
   * var compiled = _.template('hello: <%= name %>');
   * compiled({ 'name': 'moe' });
   * // => 'hello: moe'
   *
   * var list = '% _.forEach(people, function(name) { %> <li><%= name %></li> <% }); %>';
   * _.template(list, { 'people': ['moe', 'curly', 'larry'] });
   * // => '<li>moe</li><li>curly</li><li>larry</li>'
   *
   * var template = _.template('<b><%- value %></b>');
   * template({ 'value': '<script>' });
   * // => '<b>&lt;script&gt;</b>'
   *
   *
   * var compiled = _.template('<% print("Hello " + epithet); %>');
   * compiled({ 'epithet': 'stooge' });
   * // => 'Hello stooge.'
   *
   *
   * _.templateSettings = {
   *   'interpolate': /\{\{(.+?)\}\}/g
   * };
   *
   * var template = _.template('Hello {{ name }}!');
   * template({ 'name': 'Mustache' });
   * // => 'Hello Mustache!'
   *
   *
   * _.template('<%= data.hasWith %>', { 'hasWith': 'no' }, { 'variable': 'data' });
   * // => 'no'
   *
   *
   * <script>
   *   JST.project = <%= _.template(jstText).source %>;
   * </script>
   */
  function template(text, data, settings) {
    settings = defaults(settings || {}, lodash.templateSettings);

    // Compile the template source, taking care to escape characters that
    // cannot be included in a string literal and then unescape them in code
    // blocks.
    var source = "__p+='" + text
      .replace(escaper, function(match) {
        return '\\' + escapes[match];
      })
      .replace(settings.escape || noMatch, function(match, code) {
        return "'+\n_.escape(" + unescape(code) + ")+\n'";
      })
      .replace(settings.interpolate || noMatch, function(match, code) {
        return "'+\n(" + unescape(code) + ")+\n'";
      })
      .replace(settings.evaluate || noMatch, function(match, code) {
        return "';\n" + unescape(code) + "\n;__p+='";
      }) + "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) {
      source = 'with(object||{}){\n' + source + '}\n';
    }

    source = "var __p='';" +
      "var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" +
      source + "return __p;\n";

    var render = Function(settings.variable || 'object', '_', source);
    if (data) {
      return render(data, lodash);
    }

    var template = function(data) {
      return render.call(this, data, lodash);
    };
    // Provide the compiled function source as a convenience for build time
    // precompilation.
    template.source = 'function(' + (settings.variable || 'object') + '){\n' +
      source + '}';

    return template;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Wraps the value in a `lodash` chainable object.
   *
   * @static
   * @memberOf _
   * @category Chaining
   * @param {Mixed} value The value to wrap.
   * @returns {Object} Returns the `lodash` chainable object.
   * @example
   *
   * var stooges = [
   *   { 'name': 'moe', 'age': 40 },
   *   { 'name': 'larry', 'age': 50 },
   *   { 'name': 'curly', 'age': 60 }
   * ];
   *
   * var youngest = _.chain(stooges)
   *     .sortBy(function(stooge) { return stooge.age; })
   *     .map(function(stooge) { return stooge.name + ' is ' + stooge.age; })
   *     .first()
   *     .value();
   * // => 'moe is 40'
   */
  function chain(value) {
    return lodash(value).chain();
  }

  /**
   * Extracts the value from a wrapped chainable object.
   *
   * @name chain
   * @memberOf _
   * @category Chaining
   * @returns {Mixed} Returns the wrapped object.
   * @example
   *
   * _([1, 2, 3]).value();
   * // => [1, 2, 3]
   */
  function chainWrapper() {
    this._chain = true;
    return this;
  }

  /**
   * Extracts the value from a wrapped chainable object.
   *
   * @memberOf _
   * @category Chaining
   * @returns {Mixed} Returns the wrapped object.
   * @example
   *
   * _([1, 2, 3]).value();
   * // => [1, 2, 3]
   */
  function value() {
    return this._wrapped;
  }

  /*--------------------------------------------------------------------------*/

  /*
  _.keys = nativeKeys ||

  _.isArray = nativeIsArray || function(collection) {
  if (!isArguments(arguments)) {
    _.isArguments = function(collection) {
      return !!(collection && hasOwnProperty.call(collection, 'callee'));
    };
  }
  */

  /*--------------------------------------------------------------------------*/

  /**
   * The semantic version number.
   *
   * @static
   * @memberOf _
   * @type String
   */
  lodash.VERSION = '1.3.3';

  /**
   * By default, Lodash uses ERB-style template delimiters, change the following
   * template settings to use alternative delimiters.
   *
   * @static
   * @memberOf _
   * @type Object
   */
  lodash.templateSettings = {
    'evaluate': /<%([\s\S]+?)%>/g,
    'interpolate': /<%=([\s\S]+?)%>/g,
    'escape': /<%-([\s\S]+?)%>/g
  };

  // assign static properties
  extend(lodash, {
    'after': after,
    'bind': bind,
    'bindAll': bindAll,
    'chain': chain,
    'clone': clone,
    'compact': compact,
    'compose': compose,
    'contains': contains,
    'debounce': debounce,
    'defaults': defaults,
    'defer': defer,
    'delay': delay,
    'difference': difference,
    'escape': escape,
    'every': every,
    'extend': extend,
    'filter': filter,
    'find': find,
    'first': first,
    'flatten': flatten,
    'forEach': forEach,
    'functions': functions,
    'groupBy': groupBy,
    'has': has,
    'identity': identity,
    'indexOf': indexOf,
    'initial': initial,
    'intersection': intersection,
    'invoke': invoke,
    'isArguments': isArguments,
    'isArray': isArray,
    'isBoolean': isBoolean,
    'isDate': isDate,
    'isElement': isElement,
    'isEmpty': isEmpty,
    'isEqual': isEqual,
    'isFinite': isFinite,
    'isFunction': isFunction,
    'isNaN': isNaN,
    'isNull': isNull,
    'isNumber': isNumber,
    'isObject': isObject,
    'isRegExp': isRegExp,
    'isString': isString,
    'isUndefined': isUndefined,
    'keys': keys,
    'last': last,
    'lastIndexOf': lastIndexOf,
    'map': map,
    'max': max,
    'memoize': memoize,
    'min': min,
    'mixin': mixin,
    'noConflict': noConflict,
    'once': once,
    'pick': pick,
    'pluck': pluck,
    'range': range,
    'reduce': reduce,
    'reduceRight': reduceRight,
    'reject': reject,
    'rest': rest,
    'result': result,
    'shuffle': shuffle,
    'size': size,
    'some': some,
    'sortBy': sortBy,
    'sortedIndex': sortedIndex,
    'tap': tap,
    'template': template,
    'throttle': throttle,
    'times': times,
    'toArray': toArray,
    'union': union,
    'uniq': uniq,
    'uniqueId': uniqueId,
    'values': values,
    'without': without,
    'wrap': wrap,
    'zip': zip
  });

  // assign aliases
  extend(lodash, {
    'all': every,
    'any': some,
    'collect': map,
    'detect': find,
    'each': forEach,
    'foldl': reduce,
    'foldr': reduceRight,
    'head': first,
    'include': contains,
    'inject': reduce,
    'intersect': intersection,
    'methods': functions,
    'select': filter,
    'tail': rest,
    'take': first,
    'unique': uniq
  });

  /*--------------------------------------------------------------------------*/

  // Expose `wrapper.prototype` as `_.prototype`
  lodash.prototype = Wrapper.prototype;

  // Add all of the Lo-Dash functions to the wrapper collection.
  lodash.mixin(lodash);

  // Add all mutator Array functions to the wrapper.
  forEach(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
    var func = ArrayProto[methodName];
    Wrapper.prototype[methodName] = function() {
      var wrapped = this._wrapped;
      func.apply(wrapped, arguments);

      // IE compatibility mode and IE < 9 have buggy Array `shift()` and `splice()`
      // functions that fail to remove the last element, `object[0]`, of
      // array-like-objects even though the `length` property is set to `0`.
      // The `shift()` method is buggy in IE 8 compatibility mode, while `splice()`
      // is buggy regardless of mode in IE < 9 and buggy in compatibility mode in IE 9.
      var length = wrapped.length;
      if (length === 0) {
        delete wrapped[0];
      }
      return this._chain ? lodash(wrapped).chain() : wrapped;
    };
  });

  // Add all accessor Array functions to the wrapper.
  forEach(['concat', 'join', 'slice'], function(methodName) {
    var func = ArrayProto[methodName];
    lodash.prototype[methodName] = function() {
      var result = func.apply(this._wrapped, arguments);
      return this._chain ? lodash(result).chain() : result;
    };
  });

  extend(lodash.prototype, {
    chain: chainWrapper,
    value: value
  });

  /*--------------------------------------------------------------------------*/

  // expose lodash
  if (freeExports) {
    // in Node.js or RingoJS v0.8.0+
    if (typeof module == 'object' && module && module.exports == freeExports) {
      (module.exports = lodash)._ = lodash;
    }
    // in Narwhal or RingoJS v0.7.0-
    else {
      freeExports._ = lodash;
    }
  }
  // via an AMD loader
  else if (typeof define == 'function' && typeof define.amd == 'object' && define.amd && define.amd.lodash) {
    define('lodash', function() {
      return lodash;
    });
  }
  // in a browser or Rhino
  else {
    // use square bracket notation so Closure Compiler won't munge `_`
    // http://code.google.com/closure/compiler/docs/api-tutorial3.html#export
    window['_'] = lodash;
  }
}(this));
