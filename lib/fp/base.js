var mapping = require('./mapping.js'),
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
