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
  if (!func) {
    func = name;
    name = null;
  }
  if (func == null) {
    throw new TypeError;
  }
  var isLib = name == null && typeof func.VERSION == 'string';

  var _ = isLib ? func : {
    'ary': util.ary,
    'curry': util.curry,
    'forEach': util.forEach,
    'isFunction': util.isFunction,
    'iteratee': util.iteratee,
    'keys': util.keys,
    'rearg': util.rearg
  };

  var ary = _.ary,
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

  var immutArrayWrap = function(func) {
    return function() {
      var index = -1,
          length = arguments.length,
          args = Array(length);

      while (length--) {
        args[length] = arguments[length];
      }
      var array = args[0];
      length = array ? array.length : 0;

      args[0] = Array(length);
      while (++index < length) {
        args[0][index] = array[index];
      }
      func.apply(undefined, args);
      return args[0];
    };
  };

  var immutObjectWrap = function(func) {
    return function() {
      var index = -1,
          length = arguments.length,
          args = Array(length);

      while (++index < length) {
        args[index] = arguments[index];
      }
      args[0] = func({}, args[0]);
      func.apply(undefined, args);
      return args[0];
    };
  };

  var iterateeAry = function(func, n) {
    return function() {
      var length = arguments.length,
          args = Array(length);

      while (length--) {
        args[length] = arguments[length];
      }
      args[0] = baseAry(args[0], n);
      return func.apply(undefined, args);
    };
  };

  var wrappers = {
    'iteratee': function(iteratee) {
      return function(func, arity) {
        arity = arity > 2 ? (arity - 2) : 1;
        func = iteratee(func);
        var length = func.length;
        return length <= arity ? func : baseAry(func, arity);
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
      func = immutArrayWrap(func);
    }
    else if (mutateMap.object[name]) {
      func = immutObjectWrap(func);
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
    each(mapping.aryMethodMap[cap], function(name) {
      var func = _[mapping.keyMap[name] || name];
      if (func) {
        // Wrap the lodash method and its aliases.
        var wrapped = wrap(name, func);
        pairs.push([name, wrapped]);
        each(mapping.aliasMap[name] || [], function(alias) { pairs.push([alias, wrapped]); });
      }
    });
  });

  // Assign to `_` leaving `_.prototype` unchanged to allow chaining.
  each(pairs, function(pair) { _[pair[0]] = pair[1]; });
  return _;
}

module.exports = baseConvert;
