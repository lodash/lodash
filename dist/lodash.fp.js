(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["fp"] = factory();
	else
		root["fp"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var baseConvert = __webpack_require__(1);

	/**
	 * Converts `lodash` to an immutable auto-curried iteratee-first data-last version.
	 *
	 * @param {Function} lodash The lodash function.
	 * @param {Object} [options] The options object. See `baseConvert` for more details.
	 * @returns {Function} Returns the converted `lodash`.
	 */
	function browserConvert(lodash, options) {
	  return baseConvert(lodash, lodash, undefined, options);
	}

	module.exports = browserConvert;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var mapping = __webpack_require__(2),
	    mutateMap = mapping.mutate,
	    placeholder = {};

	/**
	 * The base implementation of `convert` which accepts a `util` object of methods
	 * required to perform conversions.
	 *
	 * @param {Object} util The util object.
	 * @param {string} name The name of the function to wrap.
	 * @param {Function} func The function to wrap.
	 * @param {Object} [options] The options object.
	 * @param {boolean} [options.cap=true] Specify capping iteratee arguments.
	 * @param {boolean} [options.curry=true] Specify currying.
	 * @param {boolean} [options.fixed=true] Specify fixed arity.
	 * @param {boolean} [options.immutable=true] Specify immutable operations.
	 * @param {boolean} [options.rearg=true] Specify rearranging arguments.
	 * @returns {Function|Object} Returns the converted function or object.
	 */
	function baseConvert(util, name, func, options) {
	  options || (options = {});

	  if (typeof func != 'function') {
	    func = name;
	    name = undefined;
	  }
	  if (func == null) {
	    throw new TypeError;
	  }
	  var config = {
	    'cap': 'cap' in options ? options.cap : true,
	    'curry': 'curry' in options ? options.curry : true,
	    'fixed': 'fixed' in options ? options.fixed : true,
	    'immutable': 'immutable' in options ? options.immutable : true,
	    'rearg': 'rearg' in options ? options.rearg : true
	  };

	  var forceRearg = ('rearg' in options) && options.rearg;

	  var isLib = name === undefined && typeof func.VERSION == 'string';

	  var _ = isLib ? func : {
	    'ary': util.ary,
	    'cloneDeep': util.cloneDeep,
	    'curry': util.curry,
	    'forEach': util.forEach,
	    'isFunction': util.isFunction,
	    'iteratee': util.iteratee,
	    'keys': util.keys,
	    'rearg': util.rearg,
	    'spread': util.spread
	  };

	  var ary = _.ary,
	      cloneDeep = _.cloneDeep,
	      curry = _.curry,
	      each = _.forEach,
	      isFunction = _.isFunction,
	      keys = _.keys,
	      rearg = _.rearg,
	      spread = _.spread;

	  var baseArity = function(func, n) {
	    return n == 2
	      ? function(a, b) { return func.apply(undefined, arguments); }
	      : function(a) { return func.apply(undefined, arguments); };
	  };

	  var baseAry = function(func, n) {
	    return n == 2
	      ? function(a, b) { return func(a, b); }
	      : function(a) { return func(a); };
	  };

	  var cloneArray = function(array) {
	    var length = array ? array.length : 0,
	        result = Array(length);

	    while (length--) {
	      result[length] = array[length];
	    }
	    return result;
	  };

	  var createCloner = function(func) {
	    return function(object) {
	      return func({}, object);
	    };
	  };

	  var immutWrap = function(func, cloner) {
	    return overArg(func, cloner, true);
	  };

	  var iterateeAry = function(func, n) {
	    return overArg(func, function(func) {
	      return baseAry(func, n);
	    });
	  };

	  var iterateeRearg = function(func, indexes) {
	    return overArg(func, function(func) {
	      var n = indexes.length;
	      return baseArity(rearg(baseAry(func, n), indexes), n);
	    });
	  };

	  var overArg = function(func, iteratee, retArg) {
	    return function() {
	      var length = arguments.length,
	          args = Array(length);

	      while (length--) {
	        args[length] = arguments[length];
	      }
	      args[0] = iteratee(args[0]);
	      var result = func.apply(undefined, args);
	      return retArg ? args[0] : result;
	    };
	  };

	  var wrappers = {
	    'iteratee': function(iteratee) {
	      return function() {
	        var func = arguments[0],
	            arity = arguments[1];

	        if (!config.cap) {
	          return iteratee(func, arity);
	        }
	        arity = arity > 2 ? (arity - 2) : 1;
	        func = iteratee(func);
	        var length = func.length;
	        return (length && length <= arity) ? func : baseAry(func, arity);
	      };
	    },
	    'mixin': function(mixin) {
	      return function(source) {
	        var func = this;
	        if (!isFunction(func)) {
	          return mixin(func, Object(source));
	        }
	        var methods = [],
	            methodNames = [];

	        each(keys(source), function(key) {
	          var value = source[key];
	          if (isFunction(value)) {
	            methodNames.push(key);
	            methods.push(func.prototype[key]);
	          }
	        });

	        mixin(func, Object(source));

	        each(methodNames, function(methodName, index) {
	          var method = methods[index];
	          if (isFunction(method)) {
	            func.prototype[methodName] = method;
	          } else {
	            delete func.prototype[methodName];
	          }
	        });
	        return func;
	      };
	    },
	    'runInContext': function(runInContext) {
	      return function(context) {
	        return baseConvert(util, runInContext(context), undefined, options);
	      };
	    }
	  };

	  var wrap = function(name, func) {
	    name = mapping.aliasToReal[name] || name;
	    var wrapper = wrappers[name];
	    if (wrapper) {
	      return wrapper(func);
	    }
	    var wrapped = func;
	    if (config.immutable) {
	      if (mutateMap.array[name]) {
	        wrapped = immutWrap(func, cloneArray);
	      }
	      else if (mutateMap.object[name]) {
	        wrapped = immutWrap(func, createCloner(func));
	      }
	      else if (mutateMap.set[name]) {
	        wrapped = immutWrap(func, cloneDeep);
	      }
	    }
	    var result;
	    each(mapping.caps, function(cap) {
	      each(mapping.aryMethod[cap], function(otherName) {
	        if (name == otherName) {
	          var aryN = !isLib && mapping.iterateeAry[name],
	              reargIndexes = mapping.iterateeRearg[name],
	              spreadStart = mapping.methodSpread[name];

	          if (config.fixed) {
	            result = spreadStart === undefined
	              ? ary(wrapped, cap)
	              : spread(wrapped, spreadStart);
	          }
	          if (config.rearg && cap > 1 && (forceRearg || !mapping.skipRearg[name])) {
	            result = rearg(result, mapping.methodRearg[name] || mapping.aryRearg[cap]);
	          }
	          if (config.cap) {
	            if (reargIndexes) {
	              result = iterateeRearg(result, reargIndexes);
	            } else if (aryN) {
	              result = iterateeAry(result, aryN);
	            }
	          }
	          if (config.curry && cap > 1) {
	            result = curry(result, cap);
	          }
	          return false;
	        }
	      });
	      return !result;
	    });

	    result || (result = func);
	    if (mapping.placeholder[name]) {
	      func.placeholder = result.placeholder = placeholder;
	    }
	    return result;
	  };

	  if (!isLib) {
	    return wrap(name, func);
	  }
	  // Add placeholder.
	  _.placeholder = placeholder;

	  // Iterate over methods for the current ary cap.
	  var pairs = [];
	  each(mapping.caps, function(cap) {
	    each(mapping.aryMethod[cap], function(key) {
	      var func = _[mapping.rename[key] || key];
	      if (func) {
	        pairs.push([key, wrap(key, func)]);
	      }
	    });
	  });

	  // Assign to `_` leaving `_.prototype` unchanged to allow chaining.
	  each(pairs, function(pair) {
	    _[pair[0]] = pair[1];
	  });

	  // Wrap the lodash method and its aliases.
	  each(keys(_), function(key) {
	    each(mapping.realToAlias[key] || [], function(alias) {
	      _[alias] = _[key];
	    });
	  });

	  return _;
	}

	module.exports = baseConvert;


/***/ },
/* 2 */
/***/ function(module, exports) {

	/** Used to map aliases to their real names. */
	exports.aliasToReal = {
	  '__': 'placeholder',
	  'all': 'some',
	  'allPass': 'overEvery',
	  'apply': 'spread',
	  'assoc': 'set',
	  'assocPath': 'set',
	  'compose': 'flowRight',
	  'contains': 'includes',
	  'dissoc': 'unset',
	  'dissocPath': 'unset',
	  'each': 'forEach',
	  'eachRight': 'forEachRight',
	  'equals': 'isEqual',
	  'extend': 'assignIn',
	  'extendWith': 'assignInWith',
	  'first': 'head',
	  'init': 'initial',
	  'mapObj': 'mapValues',
	  'omitAll': 'omit',
	  'nAry': 'ary',
	  'path': 'get',
	  'pathEq': 'matchesProperty',
	  'pathOr': 'getOr',
	  'pickAll': 'pick',
	  'pipe': 'flow',
	  'prop': 'get',
	  'propOf': 'propertyOf',
	  'propOr': 'getOr',
	  'somePass': 'overSome',
	  'unapply': 'rest',
	  'unnest': 'flatten',
	  'useWith': 'overArgs',
	  'whereEq': 'filter',
	  'zipObj': 'zipObject'
	};

	/** Used to map ary to method names. */
	exports.aryMethod = {
	  1: [
	      'attempt', 'ceil', 'create', 'curry', 'curryRight', 'floor', 'fromPairs',
	      'invert', 'iteratee', 'memoize', 'method', 'methodOf', 'mixin', 'over',
	      'overEvery', 'overSome', 'rest', 'reverse', 'round', 'runInContext',
	      'spread', 'template', 'trim', 'trimEnd', 'trimStart', 'uniqueId', 'words'
	    ],
	  2: [
	      'add', 'after', 'ary', 'assign', 'assignIn', 'at', 'before', 'bind', 'bindKey',
	      'chunk', 'cloneDeepWith', 'cloneWith', 'concat', 'countBy', 'curryN',
	      'curryRightN', 'debounce', 'defaults', 'defaultsDeep', 'delay', 'difference',
	      'drop', 'dropRight', 'dropRightWhile', 'dropWhile', 'endsWith', 'eq', 'every',
	      'filter', 'find', 'find', 'findIndex', 'findKey', 'findLast', 'findLastIndex',
	      'findLastKey', 'flatMap', 'forEach', 'forEachRight', 'forIn', 'forInRight',
	      'forOwn', 'forOwnRight', 'get', 'groupBy', 'gt', 'gte', 'has', 'hasIn',
	      'includes', 'indexOf', 'intersection', 'invertBy', 'invoke', 'invokeMap',
	      'isEqual', 'isMatch', 'join', 'keyBy', 'lastIndexOf', 'lt', 'lte', 'map',
	      'mapKeys', 'mapValues', 'matchesProperty', 'maxBy', 'merge', 'minBy', 'omit',
	      'omitBy', 'orderBy', 'overArgs', 'pad', 'padEnd', 'padStart', 'parseInt',
	      'partial', 'partialRight', 'partition', 'pick', 'pickBy', 'pull', 'pullAll',
	      'pullAt', 'random', 'range', 'rangeRight', 'rearg', 'reject', 'remove',
	      'repeat', 'result', 'sampleSize', 'some', 'sortBy', 'sortedIndex',
	      'sortedIndexOf', 'sortedLastIndex', 'sortedLastIndexOf', 'sortedUniqBy',
	      'split', 'startsWith', 'subtract', 'sumBy', 'take', 'takeRight', 'takeRightWhile',
	      'takeWhile', 'tap', 'throttle', 'thru', 'times', 'trimChars', 'trimCharsEnd',
	      'trimCharsStart', 'truncate', 'union', 'uniqBy', 'uniqWith', 'unset',
	      'unzipWith', 'without', 'wrap', 'xor', 'zip', 'zipObject', 'zipObjectDeep'
	    ],
	  3: [
	      'assignInWith', 'assignWith', 'clamp', 'differenceBy', 'differenceWith',
	      'getOr', 'inRange', 'intersectionBy', 'intersectionWith', 'isEqualWith',
	      'isMatchWith', 'mergeWith', 'pullAllBy', 'reduce', 'reduceRight', 'replace',
	      'set', 'slice', 'sortedIndexBy', 'sortedLastIndexBy', 'transform', 'unionBy',
	      'unionWith', 'xorBy', 'xorWith', 'zipWith'
	    ],
	  4: [
	      'fill', 'setWith'
	    ]
	};

	/** Used to map ary to rearg configs. */
	exports.aryRearg = {
	  2: [1, 0],
	  3: [2, 1, 0],
	  4: [3, 2, 0, 1]
	};

	/** Used to iterate `mapping.aryMethod` keys. */
	exports.caps = [1, 2, 3, 4];

	/** Used to map method names to their iteratee ary. */
	exports.iterateeAry = {
	  'assignWith': 2,
	  'assignInWith': 2,
	  'cloneDeepWith': 1,
	  'cloneWith': 1,
	  'dropRightWhile': 1,
	  'dropWhile': 1,
	  'every': 1,
	  'filter': 1,
	  'find': 1,
	  'findIndex': 1,
	  'findKey': 1,
	  'findLast': 1,
	  'findLastIndex': 1,
	  'findLastKey': 1,
	  'flatMap': 1,
	  'forEach': 1,
	  'forEachRight': 1,
	  'forIn': 1,
	  'forInRight': 1,
	  'forOwn': 1,
	  'forOwnRight': 1,
	  'isEqualWith': 2,
	  'isMatchWith': 2,
	  'map': 1,
	  'mapKeys': 1,
	  'mapValues': 1,
	  'partition': 1,
	  'reduce': 2,
	  'reduceRight': 2,
	  'reject': 1,
	  'remove': 1,
	  'some': 1,
	  'takeRightWhile': 1,
	  'takeWhile': 1,
	  'times': 1,
	  'transform': 2
	};

	/** Used to map method names to iteratee rearg configs. */
	exports.iterateeRearg = {
	  'findKey': [1],
	  'findLastKey': [1],
	  'mapKeys': [1]
	};

	/** Used to map method names to rearg configs. */
	exports.methodRearg = {
	  'assignInWith': [1, 2, 0],
	  'assignWith': [1, 2, 0],
	  'clamp': [2, 0, 1],
	  'mergeWith': [1, 2, 0],
	  'reduce': [2, 0, 1],
	  'reduceRight': [2, 0, 1],
	  'set': [2, 0, 1],
	  'setWith': [3, 1, 2, 0],
	  'slice': [2, 0, 1],
	  'transform': [2, 0, 1]
	};

	/** Used to map method names to spread configs. */
	exports.methodSpread = {
	  'partial': 1,
	  'partialRight': 1
	};

	/** Used to identify methods which mutate arrays or objects. */
	exports.mutate = {
	  'array': {
	    'fill': true,
	    'pull': true,
	    'pullAll': true,
	    'pullAllBy': true,
	    'pullAt': true,
	    'remove': true,
	    'reverse': true
	  },
	  'object': {
	    'assign': true,
	    'assignIn': true,
	    'assignInWith': true,
	    'assignWith': true,
	    'defaults': true,
	    'defaultsDeep': true,
	    'merge': true,
	    'mergeWith': true
	  },
	  'set': {
	    'set': true,
	    'setWith': true,
	    'unset': true
	  }
	};

	/** Used to track methods with placeholder support */
	exports.placeholder = {
	  'bind': true,
	  'bindKey': true,
	  'curry': true,
	  'curryRight': true,
	  'partial': true,
	  'partialRight': true
	};

	/** Used to map real names to their aliases. */
	exports.realToAlias = (function() {
	  var hasOwnProperty = Object.prototype.hasOwnProperty,
	      object = exports.aliasToReal,
	      result = {};

	  for (var key in object) {
	    var value = object[key];
	    if (hasOwnProperty.call(result, value)) {
	      result[value].push(key);
	    } else {
	      result[value] = [key];
	    }
	  }
	  return result;
	}());

	/** Used to map method names to other names. */
	exports.rename = {
	  'curryN': 'curry',
	  'curryRightN': 'curryRight',
	  'getOr': 'get',
	  'trimChars': 'trim',
	  'trimCharsEnd': 'trimEnd',
	  'trimCharsStart': 'trimStart'
	};

	/** Used to track methods that skip `_.rearg`. */
	exports.skipRearg = {
	  'add': true,
	  'assign': true,
	  'assignIn': true,
	  'concat': true,
	  'difference': true,
	  'gt': true,
	  'gte': true,
	  'lt': true,
	  'lte': true,
	  'matchesProperty': true,
	  'merge': true,
	  'partial': true,
	  'partialRight': true,
	  'random': true,
	  'range': true,
	  'rangeRight': true,
	  'subtract': true,
	  'zip': true,
	  'zipObject': true
	};


/***/ }
/******/ ])
});
;