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
	 * Converts `lodash` to an auto-curried iteratee-first data-last version.
	 *
	 * @param {Function} lodash The lodash function.
	 * @returns {Function} Returns the converted lodash function.
	 */
	function browserConvert(lodash) {
	  return baseConvert(lodash, lodash);
	}

	module.exports = browserConvert;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var mapping = __webpack_require__(2),
	    mutateMap = mapping.mutateMap;

	/**
	 * The base implementation of `convert` which accepts a `util` object of methods
	 * required to perform conversions.
	 *
	 * @param {Object} util The util object.
	 * @param {string} name The name of the function to wrap.
	 * @param {Function} func The function to wrap.
	 * @returns {Function|Object} Returns the converted function or object.
	 */
	function baseConvert(util, name, func) {
	  if (typeof func != 'function') {
	    func = name;
	    name = undefined;
	  }
	  if (func == null) {
	    throw new TypeError;
	  }
	  var isLib = name === undefined && typeof func.VERSION == 'string';

	  var _ = isLib ? func : {
	    'ary': util.ary,
	    'cloneDeep': util.cloneDeep,
	    'curry': util.curry,
	    'forEach': util.forEach,
	    'isFunction': util.isFunction,
	    'iteratee': util.iteratee,
	    'keys': util.keys,
	    'rearg': util.rearg
	  };

	  var ary = _.ary,
	      cloneDeep = _.cloneDeep,
	      curry = _.curry,
	      each = _.forEach,
	      isFunction = _.isFunction,
	      keys = _.keys,
	      rearg = _.rearg;

	  var baseAry = function(func, n) {
	    return function() {
	      var args = arguments,
	          length = Math.min(args.length, n);

	      switch (length) {
	        case 1: return func(args[0]);
	        case 2: return func(args[0], args[1]);
	      }
	      args = Array(length);
	      while (length--) {
	        args[length] = arguments[length];
	      }
	      return func.apply(undefined, args);
	    };
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
	      return function(func, arity) {
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
	        return baseConvert(util, runInContext(context));
	      };
	    }
	  };

	  var wrap = function(name, func) {
	    var wrapper = wrappers[name];
	    if (wrapper) {
	      return wrapper(func);
	    }
	    if (mutateMap.array[name]) {
	      func = immutWrap(func, cloneArray);
	    }
	    else if (mutateMap.object[name]) {
	      func = immutWrap(func, createCloner(func));
	    }
	    else if (mutateMap.set[name]) {
	      func = immutWrap(func, cloneDeep);
	    }
	    var result;
	    each(mapping.caps, function(cap) {
	      each(mapping.aryMethodMap[cap], function(otherName) {
	        if (name == otherName) {
	          result = ary(func, cap);
	          if (cap > 1 && !mapping.skipReargMap[name]) {
	            result = rearg(result, mapping.methodReargMap[name] || mapping.aryReargMap[cap]);
	          }
	          var n = !isLib && mapping.aryIterateeMap[name];
	          if (n) {
	            result = iterateeAry(result, n);
	          }
	          if (cap > 1) {
	            result = curry(result, cap);
	          }
	          return false;
	        }
	      });
	      return !result;
	    });
	    return result || func;
	  };

	  if (!isLib) {
	    return wrap(name, func);
	  }
	  // Iterate over methods for the current ary cap.
	  var pairs = [];
	  each(mapping.caps, function(cap) {
	    each(mapping.aryMethodMap[cap], function(key) {
	      var func = _[mapping.keyMap[key] || key];
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
	    each(mapping.aliasMap[key] || [], function(alias) {
	      _[alias] = _[key];
	    });
	  });

	  return _;
	}

	module.exports = baseConvert;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {

	  /** Used to map method names to their aliases. */
	  'aliasMap': {
	    'ary': ['nAry'],
	    'overEvery': ['allPass'],
	    'overSome': ['somePass'],
	    'filter': ['whereEq'],
	    'flatten': ['unnest'],
	    'flow': ['pipe'],
	    'flowRight': ['compose'],
	    'forEach': ['each'],
	    'forEachRight': ['eachRight'],
	    'get': ['path'],
	    'getOr': ['pathOr'],
	    'head': ['first'],
	    'includes': ['contains'],
	    'initial': ['init'],
	    'isEqual': ['equals'],
	    'mapValues': ['mapObj'],
	    'matchesProperty': ['pathEq'],
	    'overArgs': ['useWith'],
	    'omit': ['dissoc', 'omitAll'],
	    'pick': ['pickAll'],
	    'property': ['prop'],
	    'propertyOf': ['propOf'],
	    'rest': ['unapply'],
	    'some': ['all'],
	    'spread': ['apply'],
	    'zipObject': ['zipObj']
	  },

	  /** Used to map method names to their iteratee ary. */
	  'aryIterateeMap': {
	    'assignWith': 2,
	    'cloneDeepWith': 1,
	    'cloneWith': 1,
	    'dropRightWhile': 1,
	    'dropWhile': 1,
	    'every': 1,
	    'extendWith': 2,
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
	  },

	  /** Used to map ary to method names. */
	  'aryMethodMap': {
	    1: (
	      'attempt,ceil,create,curry,curryRight,floor,fromPairs,iteratee,invert,over,' +
	      'overEvery,overSome,memoize,method,methodOf,mixin,rest,reverse,round,' +
	      'runInContext,template,trim,trimLeft,trimRight,uniqueId,words').split(','),
	    2: (
	      'add,ary,assign,at,bind,bindKey,cloneDeepWith,cloneWith,concat,countBy,curryN,' +
	      'curryRightN,debounce,defaults,defaultsDeep,delay,difference,drop,dropRight,' +
	      'dropRightWhile,dropWhile,endsWith,eq,every,extend,filter,find,find,findIndex,' +
	      'findKey,findLast,findLastIndex,findLastKey,flatMap,forEach,forEachRight,' +
	      'forIn,forInRight,forOwn,forOwnRight,get,groupBy,includes,indexBy,indexOf,' +
	      'intersection,invoke,invokeMap,isMatch,lastIndexOf,map,mapKeys,mapValues,' +
	      'matchesProperty,maxBy,mean,minBy,merge,omit,orderBy,overArgs,pad,padLeft,' +
	      'padRight,parseInt,partition,pick,pull,pullAll,pullAt,random,range,rangeRight,' +
	      'rearg,reject,remove,repeat,result,sampleSize,some,sortBy,sortedIndexBy,' +
	      'sortedLastIndexBy,sortedUniqBy,startsWith,subtract,sumBy,take,takeRight,' +
	      'takeRightWhile,takeWhile,throttle,times,truncate,union,uniqBy,without,wrap,' +
	      'xor,zip,zipObject').split(','),
	    3: (
	      'assignWith,clamp,differenceBy,extendWith,getOr,inRange,intersectionBy,' +
	      'isEqualWith,isMatchWith,mergeWith,omitBy,pickBy,pullAllBy,reduce,' +
	      'reduceRight,set,slice,transform,unionBy,xorBy,zipWith').split(','),
	    4:
	      ['fill', 'setWith']
	  },

	  /** Used to map ary to rearg configs by method ary. */
	  'aryReargMap': {
	    2: [1, 0],
	    3: [2, 1, 0],
	    4: [3, 2, 0, 1]
	  },

	  /** Used to map ary to rearg configs by method names. */
	  'methodReargMap': {
	    'clamp': [2, 0, 1],
	    'reduce': [2, 0, 1],
	    'reduceRight': [2, 0, 1],
	    'setWith': [3, 2, 1, 0],
	    'slice': [2, 0, 1],
	    'transform': [2, 0, 1]
	  },

	  /** Used to iterate `mapping.aryMethodMap` keys. */
	  'caps': [1, 2, 3, 4],

	  /** Used to map keys to other keys. */
	  'keyMap': {
	    'curryN': 'curry',
	    'curryRightN': 'curryRight',
	    'getOr': 'get'
	  },

	  /** Used to identify methods which mutate arrays or objects. */
	  'mutateMap': {
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
	      'assignWith': true,
	      'defaults': true,
	      'defaultsDeep': true,
	      'extend': true,
	      'extendWith': true,
	      'merge': true,
	      'mergeWith': true
	    },
	    'set': {
	      'set': true,
	      'setWith': true
	    }
	  },

	  /** Used to track methods that skip `_.rearg`. */
	  'skipReargMap': {
	    'difference': true,
	    'matchesProperty': true,
	    'random': true,
	    'range': true,
	    'rangeRight': true,
	    'zip': true,
	    'zipObject': true
	  }
	};


/***/ }
/******/ ])
});
;