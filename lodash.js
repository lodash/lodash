/**
 * @license
 * lodash 3.10.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize modern exports="es" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
import array from './array';
import chain from './chain';
import collection from './collection';
import date from './date';
import func from './function';
import lang from './lang';
import math from './math';
import number from './number';
import object from './object';
import string from './string';
import utility from './utility';
import LazyWrapper from './internal/LazyWrapper';
import LodashWrapper from './internal/LodashWrapper';
import arrayEach from './internal/arrayEach';
import arrayPush from './internal/arrayPush';
import baseCallback from './internal/baseCallback';
import baseForOwn from './internal/baseForOwn';
import baseFunctions from './internal/baseFunctions';
import baseMatches from './internal/baseMatches';
import createHybridWrapper from './internal/createHybridWrapper';
import identity from './utility/identity';
import isArray from './lang/isArray';
import isObject from './lang/isObject';
import keys from './object/keys';
import last from './array/last';
import lazyClone from './internal/lazyClone';
import lazyReverse from './internal/lazyReverse';
import lazyValue from './internal/lazyValue';
import lodash from './chain/lodash';
import _mixin from './utility/mixin';
import property from './utility/property';
import realNames from './internal/realNames';
import support from './support';
import thru from './chain/thru';

/** Used as the semantic version number. */
var VERSION = '3.10.0';

/** Used to compose bitmasks for wrapper metadata. */
var BIND_KEY_FLAG = 2;

/** Used to indicate the type of lazy iteratees. */
var LAZY_MAP_FLAG = 2;

/** Used for native method references. */
var arrayProto = Array.prototype,
    stringProto = String.prototype;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeFloor = Math.floor,
    nativeMax = Math.max,
    nativeMin = Math.min;

/** Used as references for `-Infinity` and `Infinity`. */
var POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

// wrap `_.mixin` so it works when provided only one argument
var mixin = (function(func) {
  return function(object, source, options) {
    if (options == null) {
      var isObj = isObject(source),
          props = isObj && keys(source),
          methodNames = props && props.length && baseFunctions(source, props);

      if (!(methodNames ? methodNames.length : isObj)) {
        options = source;
        source = object;
        object = this;
      }
    }
    return func(object, source, options);
  };
}(_mixin));

// Add functions that return wrapped values when chaining.
lodash.after = func.after;
lodash.ary = func.ary;
lodash.assign = object.assign;
lodash.at = collection.at;
lodash.before = func.before;
lodash.bind = func.bind;
lodash.bindAll = func.bindAll;
lodash.bindKey = func.bindKey;
lodash.callback = utility.callback;
lodash.chain = chain.chain;
lodash.chunk = array.chunk;
lodash.compact = array.compact;
lodash.constant = utility.constant;
lodash.countBy = collection.countBy;
lodash.create = object.create;
lodash.curry = func.curry;
lodash.curryRight = func.curryRight;
lodash.debounce = func.debounce;
lodash.defaults = object.defaults;
lodash.defaultsDeep = object.defaultsDeep;
lodash.defer = func.defer;
lodash.delay = func.delay;
lodash.difference = array.difference;
lodash.drop = array.drop;
lodash.dropRight = array.dropRight;
lodash.dropRightWhile = array.dropRightWhile;
lodash.dropWhile = array.dropWhile;
lodash.fill = array.fill;
lodash.filter = collection.filter;
lodash.flatten = array.flatten;
lodash.flattenDeep = array.flattenDeep;
lodash.flow = func.flow;
lodash.flowRight = func.flowRight;
lodash.forEach = collection.forEach;
lodash.forEachRight = collection.forEachRight;
lodash.forIn = object.forIn;
lodash.forInRight = object.forInRight;
lodash.forOwn = object.forOwn;
lodash.forOwnRight = object.forOwnRight;
lodash.functions = object.functions;
lodash.groupBy = collection.groupBy;
lodash.indexBy = collection.indexBy;
lodash.initial = array.initial;
lodash.intersection = array.intersection;
lodash.invert = object.invert;
lodash.invoke = collection.invoke;
lodash.keys = keys;
lodash.keysIn = object.keysIn;
lodash.map = collection.map;
lodash.mapKeys = object.mapKeys;
lodash.mapValues = object.mapValues;
lodash.matches = utility.matches;
lodash.matchesProperty = utility.matchesProperty;
lodash.memoize = func.memoize;
lodash.merge = object.merge;
lodash.method = utility.method;
lodash.methodOf = utility.methodOf;
lodash.mixin = mixin;
lodash.modArgs = func.modArgs;
lodash.negate = func.negate;
lodash.omit = object.omit;
lodash.once = func.once;
lodash.pairs = object.pairs;
lodash.partial = func.partial;
lodash.partialRight = func.partialRight;
lodash.partition = collection.partition;
lodash.pick = object.pick;
lodash.pluck = collection.pluck;
lodash.property = property;
lodash.propertyOf = utility.propertyOf;
lodash.pull = array.pull;
lodash.pullAt = array.pullAt;
lodash.range = utility.range;
lodash.rearg = func.rearg;
lodash.reject = collection.reject;
lodash.remove = array.remove;
lodash.rest = array.rest;
lodash.restParam = func.restParam;
lodash.set = object.set;
lodash.shuffle = collection.shuffle;
lodash.slice = array.slice;
lodash.sortBy = collection.sortBy;
lodash.sortByAll = collection.sortByAll;
lodash.sortByOrder = collection.sortByOrder;
lodash.spread = func.spread;
lodash.take = array.take;
lodash.takeRight = array.takeRight;
lodash.takeRightWhile = array.takeRightWhile;
lodash.takeWhile = array.takeWhile;
lodash.tap = chain.tap;
lodash.throttle = func.throttle;
lodash.thru = thru;
lodash.times = utility.times;
lodash.toArray = lang.toArray;
lodash.toPlainObject = lang.toPlainObject;
lodash.transform = object.transform;
lodash.union = array.union;
lodash.uniq = array.uniq;
lodash.unzip = array.unzip;
lodash.unzipWith = array.unzipWith;
lodash.values = object.values;
lodash.valuesIn = object.valuesIn;
lodash.where = collection.where;
lodash.without = array.without;
lodash.wrap = func.wrap;
lodash.xor = array.xor;
lodash.zip = array.zip;
lodash.zipObject = array.zipObject;
lodash.zipWith = array.zipWith;

// Add aliases.
lodash.backflow = func.flowRight;
lodash.collect = collection.map;
lodash.compose = func.flowRight;
lodash.each = collection.forEach;
lodash.eachRight = collection.forEachRight;
lodash.extend = object.assign;
lodash.iteratee = utility.callback;
lodash.methods = object.functions;
lodash.object = array.zipObject;
lodash.select = collection.filter;
lodash.tail = array.rest;
lodash.unique = array.uniq;

// Add functions to `lodash.prototype`.
mixin(lodash, lodash);

// Add functions that return unwrapped values when chaining.
lodash.add = math.add;
lodash.attempt = utility.attempt;
lodash.camelCase = string.camelCase;
lodash.capitalize = string.capitalize;
lodash.ceil = math.ceil;
lodash.clone = lang.clone;
lodash.cloneDeep = lang.cloneDeep;
lodash.deburr = string.deburr;
lodash.endsWith = string.endsWith;
lodash.escape = string.escape;
lodash.escapeRegExp = string.escapeRegExp;
lodash.every = collection.every;
lodash.find = collection.find;
lodash.findIndex = array.findIndex;
lodash.findKey = object.findKey;
lodash.findLast = collection.findLast;
lodash.findLastIndex = array.findLastIndex;
lodash.findLastKey = object.findLastKey;
lodash.findWhere = collection.findWhere;
lodash.first = array.first;
lodash.floor = math.floor;
lodash.get = object.get;
lodash.gt = lang.gt;
lodash.gte = lang.gte;
lodash.has = object.has;
lodash.identity = identity;
lodash.includes = collection.includes;
lodash.indexOf = array.indexOf;
lodash.inRange = number.inRange;
lodash.isArguments = lang.isArguments;
lodash.isArray = isArray;
lodash.isBoolean = lang.isBoolean;
lodash.isDate = lang.isDate;
lodash.isElement = lang.isElement;
lodash.isEmpty = lang.isEmpty;
lodash.isEqual = lang.isEqual;
lodash.isError = lang.isError;
lodash.isFinite = lang.isFinite;
lodash.isFunction = lang.isFunction;
lodash.isMatch = lang.isMatch;
lodash.isNaN = lang.isNaN;
lodash.isNative = lang.isNative;
lodash.isNull = lang.isNull;
lodash.isNumber = lang.isNumber;
lodash.isObject = isObject;
lodash.isPlainObject = lang.isPlainObject;
lodash.isRegExp = lang.isRegExp;
lodash.isString = lang.isString;
lodash.isTypedArray = lang.isTypedArray;
lodash.isUndefined = lang.isUndefined;
lodash.kebabCase = string.kebabCase;
lodash.last = last;
lodash.lastIndexOf = array.lastIndexOf;
lodash.lt = lang.lt;
lodash.lte = lang.lte;
lodash.max = math.max;
lodash.min = math.min;
lodash.noop = utility.noop;
lodash.now = date.now;
lodash.pad = string.pad;
lodash.padLeft = string.padLeft;
lodash.padRight = string.padRight;
lodash.parseInt = string.parseInt;
lodash.random = number.random;
lodash.reduce = collection.reduce;
lodash.reduceRight = collection.reduceRight;
lodash.repeat = string.repeat;
lodash.result = object.result;
lodash.round = math.round;
lodash.size = collection.size;
lodash.snakeCase = string.snakeCase;
lodash.some = collection.some;
lodash.sortedIndex = array.sortedIndex;
lodash.sortedLastIndex = array.sortedLastIndex;
lodash.startCase = string.startCase;
lodash.startsWith = string.startsWith;
lodash.sum = math.sum;
lodash.template = string.template;
lodash.trim = string.trim;
lodash.trimLeft = string.trimLeft;
lodash.trimRight = string.trimRight;
lodash.trunc = string.trunc;
lodash.unescape = string.unescape;
lodash.uniqueId = utility.uniqueId;
lodash.words = string.words;

// Add aliases.
lodash.all = collection.every;
lodash.any = collection.some;
lodash.contains = collection.includes;
lodash.eq = lang.isEqual;
lodash.detect = collection.find;
lodash.foldl = collection.reduce;
lodash.foldr = collection.reduceRight;
lodash.head = array.first;
lodash.include = collection.includes;
lodash.inject = collection.reduce;

mixin(lodash, (function() {
  var source = {};
  baseForOwn(lodash, function(func, methodName) {
    if (!lodash.prototype[methodName]) {
      source[methodName] = func;
    }
  });
  return source;
}()), false);

// Add functions capable of returning wrapped and unwrapped values when chaining.
lodash.sample = collection.sample;

lodash.prototype.sample = function(n) {
  if (!this.__chain__ && n == null) {
    return collection.sample(this.value());
  }
  return this.thru(function(value) {
    return collection.sample(value, n);
  });
};

/**
 * The semantic version number.
 *
 * @static
 * @memberOf _
 * @type string
 */
lodash.VERSION = VERSION;

lodash.support = support;
(lodash.templateSettings = string.templateSettings).imports._ = lodash;

// Assign default placeholders.
arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
  lodash[methodName].placeholder = lodash;
});

// Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
arrayEach(['drop', 'take'], function(methodName, index) {
  LazyWrapper.prototype[methodName] = function(n) {
    var filtered = this.__filtered__;
    if (filtered && !index) {
      return new LazyWrapper(this);
    }
    n = n == null ? 1 : nativeMax(nativeFloor(n) || 0, 0);

    var result = this.clone();
    if (filtered) {
      result.__takeCount__ = nativeMin(result.__takeCount__, n);
    } else {
      result.__views__.push({ 'size': n, 'type': methodName + (result.__dir__ < 0 ? 'Right' : '') });
    }
    return result;
  };

  LazyWrapper.prototype[methodName + 'Right'] = function(n) {
    return this.reverse()[methodName](n).reverse();
  };
});

// Add `LazyWrapper` methods that accept an `iteratee` value.
arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
  var type = index + 1,
      isFilter = type != LAZY_MAP_FLAG;

  LazyWrapper.prototype[methodName] = function(iteratee, thisArg) {
    var result = this.clone();
    result.__iteratees__.push({ 'iteratee': baseCallback(iteratee, thisArg, 1), 'type': type });
    result.__filtered__ = result.__filtered__ || isFilter;
    return result;
  };
});

// Add `LazyWrapper` methods for `_.first` and `_.last`.
arrayEach(['first', 'last'], function(methodName, index) {
  var takeName = 'take' + (index ? 'Right' : '');

  LazyWrapper.prototype[methodName] = function() {
    return this[takeName](1).value()[0];
  };
});

// Add `LazyWrapper` methods for `_.initial` and `_.rest`.
arrayEach(['initial', 'rest'], function(methodName, index) {
  var dropName = 'drop' + (index ? '' : 'Right');

  LazyWrapper.prototype[methodName] = function() {
    return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
  };
});

// Add `LazyWrapper` methods for `_.pluck` and `_.where`.
arrayEach(['pluck', 'where'], function(methodName, index) {
  var operationName = index ? 'filter' : 'map',
      createCallback = index ? baseMatches : property;

  LazyWrapper.prototype[methodName] = function(value) {
    return this[operationName](createCallback(value));
  };
});

LazyWrapper.prototype.compact = function() {
  return this.filter(identity);
};

LazyWrapper.prototype.reject = function(predicate, thisArg) {
  predicate = baseCallback(predicate, thisArg, 1);
  return this.filter(function(value) {
    return !predicate(value);
  });
};

LazyWrapper.prototype.slice = function(start, end) {
  start = start == null ? 0 : (+start || 0);

  var result = this;
  if (result.__filtered__ && (start > 0 || end < 0)) {
    return new LazyWrapper(result);
  }
  if (start < 0) {
    result = result.takeRight(-start);
  } else if (start) {
    result = result.drop(start);
  }
  if (end !== undefined) {
    end = (+end || 0);
    result = end < 0 ? result.dropRight(-end) : result.take(end - start);
  }
  return result;
};

LazyWrapper.prototype.takeRightWhile = function(predicate, thisArg) {
  return this.reverse().takeWhile(predicate, thisArg).reverse();
};

LazyWrapper.prototype.toArray = function() {
  return this.take(POSITIVE_INFINITY);
};

// Add `LazyWrapper` methods to `lodash.prototype`.
baseForOwn(LazyWrapper.prototype, function(func, methodName) {
  var checkIteratee = /^(?:filter|map|reject)|While$/.test(methodName),
      retUnwrapped = /^(?:first|last)$/.test(methodName),
      lodashFunc = lodash[retUnwrapped ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName];

  if (!lodashFunc) {
    return;
  }
  lodash.prototype[methodName] = function() {
    var args = retUnwrapped ? [1] : arguments,
        chainAll = this.__chain__,
        value = this.__wrapped__,
        isHybrid = !!this.__actions__.length,
        isLazy = value instanceof LazyWrapper,
        iteratee = args[0],
        useLazy = isLazy || isArray(value);

    if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
      // Avoid lazy use if the iteratee has a "length" value other than `1`.
      isLazy = useLazy = false;
    }
    var interceptor = function(value) {
      return (retUnwrapped && chainAll)
        ? lodashFunc(value, 1)[0]
        : lodashFunc.apply(undefined, arrayPush([value], args));
    };

    var action = { 'func': thru, 'args': [interceptor], 'thisArg': undefined },
        onlyLazy = isLazy && !isHybrid;

    if (retUnwrapped && !chainAll) {
      if (onlyLazy) {
        value = value.clone();
        value.__actions__.push(action);
        return func.call(value);
      }
      return lodashFunc.call(undefined, this.value())[0];
    }
    if (!retUnwrapped && useLazy) {
      value = onlyLazy ? value : new LazyWrapper(this);
      var result = func.apply(value, args);
      result.__actions__.push(action);
      return new LodashWrapper(result, chainAll);
    }
    return this.thru(interceptor);
  };
});

// Add `Array` and `String` methods to `lodash.prototype`.
arrayEach(['join', 'pop', 'push', 'replace', 'shift', 'sort', 'splice', 'split', 'unshift'], function(methodName) {
  var func = (/^(?:replace|split)$/.test(methodName) ? stringProto : arrayProto)[methodName],
      chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
      retUnwrapped = /^(?:join|pop|replace|shift)$/.test(methodName);

  lodash.prototype[methodName] = function() {
    var args = arguments;
    if (retUnwrapped && !this.__chain__) {
      return func.apply(this.value(), args);
    }
    return this[chainName](function(value) {
      return func.apply(value, args);
    });
  };
});

// Map minified function names to their real names.
baseForOwn(LazyWrapper.prototype, function(func, methodName) {
  var lodashFunc = lodash[methodName];
  if (lodashFunc) {
    var key = lodashFunc.name,
        names = realNames[key] || (realNames[key] = []);

    names.push({ 'name': methodName, 'func': lodashFunc });
  }
});

realNames[createHybridWrapper(undefined, BIND_KEY_FLAG).name] = [{ 'name': 'wrapper', 'func': undefined }];

// Add functions to the lazy wrapper.
LazyWrapper.prototype.clone = lazyClone;
LazyWrapper.prototype.reverse = lazyReverse;
LazyWrapper.prototype.value = lazyValue;

// Add chaining functions to the `lodash` wrapper.
lodash.prototype.chain = chain.wrapperChain;
lodash.prototype.commit = chain.commit;
lodash.prototype.concat = chain.concat;
lodash.prototype.plant = chain.plant;
lodash.prototype.reverse = chain.reverse;
lodash.prototype.toString = chain.toString;
lodash.prototype.run = lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = chain.value;

// Add function aliases to the `lodash` wrapper.
lodash.prototype.collect = lodash.prototype.map;
lodash.prototype.head = lodash.prototype.first;
lodash.prototype.select = lodash.prototype.filter;
lodash.prototype.tail = lodash.prototype.rest;

export default lodash;
