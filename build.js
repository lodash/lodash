#!/usr/bin/env node
;(function() {
  'use strict';

  /** Load modules */
  var fs = require('fs'),
      path = require('path'),
      vm = require('vm'),
      minify = require(path.join(__dirname, 'build', 'minify.js')),
      _ = require(path.join(__dirname, 'lodash.js'));

  /** The current working directory */
  var cwd = process.cwd();

  /** Used for array method references */
  var arrayRef = [];

  /** Shortcut used to push arrays of values to an array */
  var push = arrayRef.push;

  /** Shortcut used to convert array-like objects to arrays */
  var slice = arrayRef.slice;

  /** Shortcut to the `stdout` object */
  var stdout = process.stdout;

  /** Used to associate aliases with their real names */
  var aliasToRealMap = {
    'all': 'every',
    'any': 'some',
    'collect': 'map',
    'detect': 'find',
    'drop': 'rest',
    'each': 'forEach',
    'extend': 'assign',
    'foldl': 'reduce',
    'foldr': 'reduceRight',
    'head': 'first',
    'include': 'contains',
    'inject': 'reduce',
    'methods': 'functions',
    'select': 'filter',
    'tail': 'rest',
    'take': 'first',
    'unique': 'uniq'
  };

  /** Used to associate real names with their aliases */
  var realToAliasMap = {
    'assign': ['extend'],
    'contains': ['include'],
    'every': ['all'],
    'filter': ['select'],
    'find': ['detect'],
    'first': ['head', 'take'],
    'forEach': ['each'],
    'functions': ['methods'],
    'map': ['collect'],
    'reduce': ['foldl', 'inject'],
    'reduceRight': ['foldr'],
    'rest': ['drop', 'tail'],
    'some': ['any'],
    'uniq': ['unique']
  };

  /** Used to track function dependencies */
  var dependencyMap = {
    'after': [],
    'assign': ['isArguments'],
    'bind': ['isFunction', 'isObject'],
    'bindAll': ['bind', 'functions'],
    'bindKey': ['isFunction', 'isObject'],
    'clone': ['assign', 'forEach', 'forOwn', 'isArray', 'isObject'],
    'cloneDeep': ['clone'],
    'compact': [],
    'compose': [],
    'contains': ['indexOf', 'isString'],
    'countBy': ['forEach'],
    'debounce': [],
    'defaults': ['isArguments'],
    'defer': [],
    'delay': [],
    'difference': ['indexOf'],
    'escape': [],
    'every': ['isArray'],
    'filter': ['isArray'],
    'find': ['forEach'],
    'first': [],
    'flatten': ['isArray'],
    'forEach': ['identity', 'isArguments', 'isArray', 'isString'],
    'forIn': ['identity', 'isArguments'],
    'forOwn': ['identity', 'isArguments'],
    'functions': ['forIn', 'isFunction'],
    'groupBy': ['forEach'],
    'has': [],
    'identity': [],
    'indexOf': ['sortedIndex'],
    'initial': [],
    'intersection': ['indexOf'],
    'invert': ['forOwn'],
    'invoke': ['forEach'],
    'isArguments': [],
    'isArray': [],
    'isBoolean': [],
    'isDate': [],
    'isElement': [],
    'isEmpty': ['forOwn', 'isArguments', 'isFunction'],
    'isEqual': ['forIn', 'isArguments', 'isFunction'],
    'isFinite': [],
    'isFunction': [],
    'isNaN': ['isNumber'],
    'isNull': [],
    'isNumber': [],
    'isObject': [],
    'isPlainObject': ['forIn', 'isArguments', 'isFunction'],
    'isRegExp': [],
    'isString': [],
    'isUndefined': [],
    'keys': ['forOwn', 'isArguments', 'isObject'],
    'last': [],
    'lastIndexOf': [],
    'map': ['isArray'],
    'max': ['isArray', 'isString'],
    'memoize': [],
    'merge': ['forOwn', 'isArray', 'isPlainObject'],
    'min': ['isArray', 'isString'],
    'mixin': ['forEach', 'forOwn', 'functions'],
    'noConflict': [],
    'object': [],
    'omit': ['forIn', 'indexOf'],
    'once': [],
    'pairs': ['forOwn'],
    'partial': ['isFunction', 'isObject'],
    'pick': ['forIn'],
    'pluck': ['map'],
    'random': [],
    'range': [],
    'reduce': ['isArray'],
    'reduceRight': ['forEach', 'isString', 'keys'],
    'reject': ['filter'],
    'rest': [],
    'result': ['isFunction'],
    'shuffle': ['forEach'],
    'size': ['keys'],
    'some': ['isArray'],
    'sortBy': ['forEach'],
    'sortedIndex': ['identity'],
    'tap': ['mixin'],
    'template': ['escape'],
    'throttle': [],
    'times': [],
    'toArray': ['isString', 'values'],
    'unescape': [],
    'union': ['uniq'],
    'uniq': ['identity', 'indexOf'],
    'uniqueId': [],
    'value': ['mixin'],
    'values': ['forOwn'],
    'where': ['filter', 'keys'],
    'without': ['indexOf'],
    'wrap': [],
    'zip': ['max', 'pluck'],

    // method used by the `backbone` and `underscore` builds
    'chain': ['mixin']
  };

  /** Used to inline `iteratorTemplate` */
  var iteratorOptions = [
    'args',
    'arrayLoop',
    'bottom',
    'firstArg',
    'hasDontEnumBug',
    'isKeysFast',
    'objectLoop',
    'nonEnumArgs',
    'noCharByIndex',
    'shadowed',
    'top',
    'useHas',
    'useStrict'
  ];

  /** List of all Lo-Dash methods */
  var allMethods = _.keys(dependencyMap);

  /** List of Backbone's Lo-Dash dependencies */
  var backboneDependencies = [
    'bind',
    'bindAll',
    'chain',
    'clone',
    'contains',
    'countBy',
    'defaults',
    'escape',
    'every',
    'extend',
    'filter',
    'find',
    'first',
    'forEach',
    'groupBy',
    'has',
    'indexOf',
    'initial',
    'invoke',
    'isArray',
    'isEmpty',
    'isEqual',
    'isFunction',
    'isObject',
    'isRegExp',
    'isString',
    'keys',
    'last',
    'lastIndexOf',
    'map',
    'max',
    'min',
    'mixin',
    'once',
    'pick',
    'reduce',
    'reduceRight',
    'reject',
    'rest',
    'result',
    'shuffle',
    'size',
    'some',
    'sortBy',
    'sortedIndex',
    'toArray',
    'uniqueId',
    'value',
    'without'
  ];

  /** List of methods used by Underscore */
  var underscoreMethods = _.without.apply(_, [allMethods].concat([
    'bindKey',
    'cloneDeep',
    'forIn',
    'forOwn',
    'isPlainObject',
    'merge',
    'partial'
  ]));

  /** List of ways to export the `lodash` function */
  var exportsAll = [
    'amd',
    'commonjs',
    'global',
    'node'
  ];

  /*--------------------------------------------------------------------------*/

  /**
   * Adds support for Underscore style chaining to the `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function addChainMethods(source) {
    // add `_.chain`
    source = source.replace(matchFunction(source, 'tap'), function(match) {
      return [
        '',
        '  /**',
        '   * Creates a `lodash` object that wraps the given `value`.',
        '   *',
        '   * @static',
        '   * @memberOf _',
        '   * @category Chaining',
        '   * @param {Mixed} value The value to wrap.',
        '   * @returns {Object} Returns the wrapper object.',
        '   * @example',
        '   *',
        '   * var stooges = [',
        "   *   { 'name': 'moe', 'age': 40 },",
        "   *   { 'name': 'larry', 'age': 50 },",
        "   *   { 'name': 'curly', 'age': 60 }",
        '   * ];',
        '   *',
        '   * var youngest = _.chain(stooges)',
        '   *     .sortBy(function(stooge) { return stooge.age; })',
        "   *     .map(function(stooge) { return stooge.name + ' is ' + stooge.age; })",
        '   *     .first();',
        "   * // => 'moe is 40'",
        '   */',
        '  function chain(value) {',
        '    value = new lodash(value);',
        '    value.__chain__ = true;',
        '    return value;',
        '  }',
        '',
        match
      ].join('\n');
    });

    // add `wrapperChain`
    source = source.replace(matchFunction(source, 'wrapperToString'), function(match) {
      return [
        '',
        '  /**',
        '   * Enables method chaining on the wrapper object.',
        '   *',
        '   * @name chain',
        '   * @memberOf _',
        '   * @category Chaining',
        '   * @returns {Mixed} Returns the wrapper object.',
        '   * @example',
        '   *',
        '   * var sum = _([1, 2, 3])',
        '   *     .chain()',
        '   *     .reduce(function(sum, num) { return sum + num; })',
        '   *     .value()',
        '   * // => 6`',
        '   */',
        '  function wrapperChain() {',
        '    this.__chain__ = true;',
        '    return this;',
        '  }',
        '',
        match
      ].join('\n');
    });

    // add `lodash.chain` assignment
    source = source.replace(getMethodAssignments(source), function(match) {
      return match.replace(/^(?: *\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/\n)?( *)lodash\.VERSION *=/m, '$1lodash.chain = chain;\n\n$&');
    });

    // add `lodash.prototype.chain` assignment
    source = source.replace(/^( *)lodash\.prototype\.value *=.+\n/m, '$1lodash.prototype.chain = wrapperChain;\n$&');

    // remove `lodash.prototype.toString` and `lodash.prototype.valueOf` assignments
    source = source.replace(/^ *lodash\.prototype\.(?:toString|valueOf) *=.+\n/gm, '');

    // remove `lodash.prototype` batch method assignments
    source = source.replace(/(?:\s*\/\/.*)*\n( *)forOwn\(lodash, *function\(func, *methodName\)[\s\S]+?\n\1}.+/g, '');

    // move `mixin(lodash)` to after the method assignments
    source = source.replace(/(?:\s*\/\/.*)*\s*mixin\(lodash\).+/, '');
    source = source.replace(getMethodAssignments(source), function(match) {
      return match + [
        '',
        '',
        '  // add functions to `lodash.prototype`',
        '  mixin(lodash);'
      ].join('\n');
    });

    // add `__chain__` checks to `_.mixin`
    source = source.replace(matchFunction(source, 'mixin'), function(match) {
      return match.replace(/^( *)return new lodash.+/m, function() {
        var indent = arguments[1];
        return indent + [
          'if (this.__chain__) {',
          '  result = new lodash(result);',
          '  result.__chain__ = true;',
          '}',
          'return result;'
        ].join('\n' + indent);
      });
    });

    // replace wrapper `Array` method assignments
    source = source.replace(/^(?: *\/\/.*\n)*( *)each\(\['[\s\S]+?\n\1}$/m, function() {
      return [
        '  // add `Array` mutator functions to the wrapper',
        "  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {",
        '    var func = arrayRef[methodName];',
        '    lodash.prototype[methodName] = function() {',
        '      var value = this.__wrapped__;',
        '      func.apply(value, arguments);',
        '',
        '      // avoid array-like object bugs with `Array#shift` and `Array#splice`',
        '      // in Firefox < 10 and IE < 9',
        '      if (hasObjectSpliceBug && value.length === 0) {',
        '        delete value[0];',
        '      }',
        '      return this;',
        '    };',
        '  });',
        '',
        '  // add `Array` accessor functions to the wrapper',
        "  each(['concat', 'join', 'slice'], function(methodName) {",
        '    var func = arrayRef[methodName];',
        '    lodash.prototype[methodName] = function() {',
        '      var value = this.__wrapped__,',
        '          result = func.apply(value, arguments);',
        '',
        '      if (this.__chain__) {',
        '        result = new lodash(result);',
        '        result.__chain__ = true;',
        '      }',
        '      return result;',
        '    };',
        '  });'
      ].join('\n');
    });

    return source;
  }

  /**
   * Adds build `commands` to the copyright/license header of the `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @param {Array} [commands=[]] An array of commands.
   * @returns {String} Returns the modified source.
   */
  function addCommandsToHeader(source, commands) {
    return source.replace(/(\/\*!\n)( \*)?( *Lo-Dash [\w.-]+)(.*)/, function() {
      // convert unmatched groups to empty strings
      var parts = _.map(slice.call(arguments, 1), function(part) {
        return part || '';
      });

      // remove `node path/to/build.js` from `commands`
      if (commands[0] == 'node') {
        commands.splice(0, 2);
      }
      // add quotes to commands with spaces or equals signs
      commands = _.map(commands, function(command) {
        var separator = (command.match(/[= ]/) || [''])[0];
        if (separator) {
          var pair = command.split(separator);
          command = pair[0] + separator + '"' + pair[1] + '"';
        }
        return command;
      });
      // add build commands to copyright/license header
      return (
        parts[0] +
        parts[1] + parts[2] + ' (Custom Build)' + parts[3] + '\n' +
        parts[1] + ' Build: `lodash ' + commands.join(' ') + '`'
      );
    });
  }

  /**
   * Compiles template files matched by the given file path `pattern` into a
   * single source, extending `_.templates` with precompiled templates named after
   * each template file's basename.
   *
   * @private
   * @param {String} [pattern='<cwd>/*.jst'] The file path pattern.
   * @param {Object} options The options object.
   * @returns {String} Returns the compiled source.
   */
  function buildTemplate(pattern, options) {
    pattern || (pattern = path.join(cwd, '*.jst'));

    var directory = path.dirname(pattern);

    var source = [
      ';(function(window) {',
      "  var freeExports = typeof exports == 'object' && exports &&",
      "    (typeof global == 'object' && global && global == global.global && (window = global), exports);",
      '',
      '  var templates = {},',
      '      _ = window._;',
      ''
    ];

    // convert to a regexp
    pattern = RegExp(
      path.basename(pattern)
        .replace(/[.+?^=!:${}()|[\]\/\\]/g, '\\$&')
        .replace(/\*/g, '.*?') + '$'
    );

    fs.readdirSync(directory).forEach(function(filename) {
      var filePath = path.join(directory, filename);
      if (pattern.test(filename)) {
        var text = fs.readFileSync(filePath, 'utf8'),
            precompiled = getFunctionSource(_.template(text, null, options)),
            prop = filename.replace(/\..*$/, '');

        source.push("  templates['" + prop.replace(/['\n\r\t]/g, '\\$&') + "'] = " + precompiled + ';', '');
      }
    });

    source.push(
      "  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {",
      "    define(['" + options.moduleId + "'], function(lodash) {",
      '      _ = lodash;',
      '      lodash.templates = lodash.extend(lodash.templates || {}, templates);',
      '    });',
      "  } else if (freeExports) {",
      "    if (typeof module == 'object' && module && module.exports == freeExports) {",
      '      (module.exports = templates).templates = templates;',
      '    } else {',
      '      freeExports.templates = templates;',
      '    }',
      '  } else if (_) {',
      '    _.templates = _.extend(_.templates || {}, templates);',
      '  }',
      '}(this));'
    );

    return source.join('\n');
  }

  /**
   * Removes unnecessary comments, whitespace, and pseudo private properties.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function cleanupSource(source) {
    return source
      // remove pseudo private properties
      .replace(/(?:(?:\s*\/\/.*)*\s*lodash\._[^=]+=.+\n)+/g, '\n')
      // remove lines with just whitespace and semicolons
      .replace(/^ *;\n/gm, '')
      // consolidate multiple newlines
      .replace(/\n{3,}/g, '\n\n')
      // consolidate consecutive horizontal rule comment separators
      .replace(/(?:\s*\/\*-+\*\/\s*){2,}/g, function(separators) {
        return separators.match(/^\s*/)[0] + separators.slice(separators.lastIndexOf('/*'));
      });
  }

  /**
   * Writes the help message to standard output.
   *
   * @private
   */
  function displayHelp() {
    console.log([
      '',
      '  Commands:',
      '',
      '    lodash backbone      Build with only methods required by Backbone',
      '    lodash csp           Build supporting default Content Security Policy restrictions',
      '    lodash legacy        Build tailored for older browsers without ES5 support',
      '    lodash mobile        Build with IE < 9 bug fixes & method compilation removed',
      '    lodash strict        Build with `_.assign`, `_.bindAll`, & `_.defaults` in strict mode',
      '    lodash underscore    Build tailored for projects already using Underscore',
      '    lodash include=...   Comma separated method/category names to include in the build',
      '    lodash minus=...     Comma separated method/category names to remove from those included in the build',
      '    lodash plus=...      Comma separated method/category names to add to those included in the build',
      '    lodash category=...  Comma separated categories of methods to include in the build (case-insensitive)',
      '                         (i.e. “arrays”, “chaining”, “collections”, “functions”, “objects”, and “utilities”)',
      '    lodash exports=...   Comma separated names of ways to export the `lodash` function',
      '                         (i.e. “amd”, “commonjs”, “global”, “node”, and “none”)',
      '    lodash iife=...      Code to replace the immediately-invoked function expression that wraps Lo-Dash',
      '                         (e.g. `lodash iife="!function(window,undefined){%output%}(this)"`)',
      '',
      '    lodash template=...  File path pattern used to match template files to precompile',
      '                         (e.g. `lodash template=./*.jst`)',
      '    lodash settings=...  Template settings used when precompiling templates',
      '                         (e.g. `lodash settings="{interpolate:/\\\\{\\\\{([\\\\s\\\\S]+?)\\\\}\\\\}/g}"`)',
      '    lodash moduleId=...  The AMD module ID of Lo-Dash, which defaults to “lodash”, used by precompiled templates',
      '',
      '    All arguments, except `legacy` with `csp` or `mobile`, may be combined.',
      '    Unless specified by `-o` or `--output`, all files created are saved to the current working directory.',
      '',
      '  Options:',
      '',
      '    -c, --stdout   Write output to standard output',
      '    -d, --debug    Write only the debug output',
      '    -h, --help     Display help information',
      '    -m, --minify   Write only the minified output',
      '    -o, --output   Write output to a given path/filename',
      '    -s, --silent   Skip status updates normally logged to the console',
      '    -V, --version  Output current version of Lo-Dash',
      ''
    ].join('\n'));
  }

  /**
   * Gets the aliases associated with a given function name.
   *
   * @private
   * @param {String} methodName The name of the method to get aliases for.
   * @returns {Array} Returns an array of aliases.
   */
  function getAliases(methodName) {
    return realToAliasMap[methodName] || [];
  }

  /**
   * Gets the Lo-Dash method assignments snippet from `source`.
   *
   * @private
   * @param {String} source The source to inspect.
   * @returns {String} Returns the method assignments snippet.
   */
  function getMethodAssignments(source) {
    return (source.match(/\/\*-+\*\/\n(?:\s*\/\/.*)*\s*lodash\.\w+ *=[\s\S]+?lodash\.VERSION *=.+/) || [''])[0];
  }

  /**
   * Gets an array of depenants for a method by a given name.
   *
   * @private
   * @param {String} methodName The name of the method to query.
   * @returns {Array} Returns an array of method dependants.
   */
  function getDependants(methodName) {
    // iterate over the `dependencyMap`, adding the names of methods that
    // have `methodName` as a dependency
    return _.reduce(dependencyMap, function(result, dependencies, otherName) {
      if (_.contains(dependencies, methodName)) {
        result.push(otherName);
      }
      return result;
    }, []);
  }

  /**
   * Gets an array of dependencies for a given method name. If passed an array
   * of dependencies it will return an array containing the given dependencies
   * plus any additional detected sub-dependencies.
   *
   * @private
   * @param {Array|String} methodName A single method name or array of
   *  dependencies to query.
   * @returns {Array} Returns an array of method dependencies.
   */
  function getDependencies(methodName) {
    var dependencies = Array.isArray(methodName) ? methodName : dependencyMap[methodName];
    if (!dependencies) {
      return [];
    }
    // recursively accumulate the dependencies of the `methodName` function, and
    // the dependencies of its dependencies, and so on
    return _.uniq(dependencies.reduce(function(result, otherName) {
      result.push.apply(result, getDependencies(otherName).concat(otherName));
      return result;
    }, []));
  }

  /**
   * Gets the formatted source of the given function.
   *
   * @private
   * @param {Function} func The function to process.
   * @returns {String} Returns the formatted source.
   */
  function getFunctionSource(func) {
    var source = func.source || (func + '');

    // format leading whitespace
    return source.replace(/\n(?:.*)/g, function(match, index) {
      match = match.slice(1);
      return (
        match == '}' && source.indexOf('}', index + 2) == -1 ? '\n  ' : '\n    '
      ) + match;
    });
  }

  /**
   * Gets the `_.isArguments` fallback from `source`.
   *
   * @private
   * @param {String} source The source to inspect.
   * @returns {String} Returns the `isArguments` fallback.
   */
  function getIsArgumentsFallback(source) {
    return (source.match(/(?:\s*\/\/.*)*\n( *)if *\(noArgsClass\)[\s\S]+?};\n\1}/) || [''])[0];
  }

  /**
   * Gets the `_.isFunction` fallback from `source`.
   *
   * @private
   * @param {String} source The source to inspect.
   * @returns {String} Returns the `isFunction` fallback.
   */
  function getIsFunctionFallback(source) {
    return (source.match(/(?:\s*\/\/.*)*\n( *)if *\(isFunction\(\/x\/[\s\S]+?};\n\1}/) || [''])[0];
  }

  /**
   * Gets the `iteratorTemplate` from `source`.
   *
   * @private
   * @param {String} source The source to inspect.
   * @returns {String} Returns the `iteratorTemplate`.
   */
  function getIteratorTemplate(source) {
    return (source.match(/^( *)var iteratorTemplate *= *[\s\S]+?\n\1.+?;\n/m) || [''])[0];
  }

  /**
   * Gets the names of methods in `source` belonging to the given `category`.
   *
   * @private
   * @param {String} source The source to inspect.
   * @param {String} category The category to filter by.
   * @returns {Array} Returns a new array of method names belonging to the given category.
   */
  function getMethodsByCategory(source, category) {
    return allMethods.filter(function(methodName) {
      return category && RegExp('@category ' + category + '\\b').test(matchFunction(source, methodName));
    });
  }

  /**
   * Gets the real name, not alias, of a given method name.
   *
   * @private
   * @param {String} methodName The name of the method to resolve.
   * @returns {String} Returns the real method name.
   */
  function getRealName(methodName) {
    return aliasToRealMap[methodName] || methodName;
  }

  /**
   * Determines if all functions of the given names have been removed from `source`.
   *
   * @private
   * @param {String} source The source to inspect.
   * @param {String} [funcName1, funcName2, ...] The names of functions to check.
   * @returns {Boolean} Returns `true` if all functions have been removed, else `false`.
   */
  function isRemoved(source) {
    return slice.call(arguments, 1).every(function(funcName) {
      return !matchFunction(source, funcName);
    });
  }

  /**
   * Searches `source` for a `funcName` function declaration, expression, or
   * assignment and returns the matched snippet.
   *
   * @private
   * @param {String} source The source to inspect.
   * @param {String} funcName The name of the function to match.
   * @returns {String} Returns the matched function snippet.
   */
  function matchFunction(source, funcName) {
    var result = source.match(RegExp(
      // match multi-line comment block (could be on a single line)
      '(?:\\n +/\\*[^*]*\\*+(?:[^/][^*]*\\*+)*/\\n)?' +
      // begin non-capturing group
      '(?:' +
      // match a function declaration
      '( *)function ' + funcName + '\\b[\\s\\S]+?\\n\\1}|' +
      // match a variable declaration with `createIterator`
      ' +var ' + funcName + ' *=.*?createIterator\\((?:{|[a-zA-Z])[\\s\\S]+?\\);|' +
      // match a variable declaration with function expression
      '( *)var ' + funcName + ' *=.*?function[\\s\\S]+?\\n\\2};' +
      // end non-capturing group
      ')\\n'
    ));

    return result ? result[0] : '';
  }

  /**
   * Converts a comma separated options string into an array.
   *
   * @private
   * @param {String} value The option to convert.
   * @returns {Array} Returns the new converted array.
   */
  function optionToArray(value) {
    return value.match(/\w+=(.*)$/)[1].split(/, */);
  }

  /**
   * Converts a comma separated options string into an array containing
   * only real method names.
   *
   * @private
   * @param {String} source The source to inspect.
   * @param {String} value The option to convert.
   * @returns {Array} Returns the new converted array.
   */
  function optionToMethodsArray(source, value) {
    var methodNames = optionToArray(value);

    // convert categories to method names
    methodNames.forEach(function(category) {
      push.apply(methodNames, getMethodsByCategory(source, category));
    });

    // convert aliases to real method names
    methodNames = methodNames.map(getRealName);

    // remove nonexistent and duplicate method names
    return _.uniq(_.intersection(allMethods, methodNames));
  }

  /**
   * Removes the `createFunction` function from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeCreateFunction(source) {
    source = removeVar(source, 'isFirefox');
    return removeFunction(source, 'createFunction')
      .replace(/createFunction/g, 'Function')
      .replace(/(?:\s*\/\/.*)*\s*if *\(isIeOpera[^}]+}\n/, '');
  }

  /**
   * Removes the all references to `refName` from `createIterator` in `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @param {String} refName The name of the reference to remove.
   * @returns {String} Returns the modified source.
   */
  function removeFromCreateIterator(source, refName) {
    var snippet = matchFunction(source, 'createIterator');
    if (snippet) {
      // clip the snippet at the `factory` assignment
      snippet = snippet.match(/Function\([\s\S]+$/)[0];
      var modified = snippet.replace(RegExp('\\b' + refName + '\\b,? *', 'g'), '');
      source = source.replace(snippet, modified);
    }
    return source;
  }

  /**
   * Removes the `funcName` function declaration, expression, or assignment and
   * associated code from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @param {String} funcName The name of the function to remove.
   * @returns {String} Returns the modified source.
   */
  function removeFunction(source, funcName) {
    // remove function
    var snippet = matchFunction(source, funcName);
    if (snippet) {
      source = source.replace(snippet, '');
    }
    // grab the method assignments snippet
    snippet = getMethodAssignments(source);

    // remove assignment and aliases
    var modified = getAliases(funcName).concat(funcName).reduce(function(result, otherName) {
      return result.replace(RegExp('(?:\\n *//.*\\s*)* *lodash\\.' + otherName + ' *= *.+\\n'), '');
    }, snippet);

    // replace with the modified snippet
    source = source.replace(snippet, modified);

    return removeFromCreateIterator(source, funcName);
  }

  /**
   * Removes the `_.isArguments` fallback from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeIsArgumentsFallback(source) {
    return source.replace(getIsArgumentsFallback(source), '');
  }

  /**
   * Removes the `_.isFunction` fallback from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeIsFunctionFallback(source) {
    return source.replace(getIsFunctionFallback(source), '');
  }

  /**
   * Removes the `Object.keys` object iteration optimization from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeKeysOptimization(source) {
    source = removeVar(source, 'isKeysFast');

    // remove optimized branch in `iteratorTemplate`
    source = source.replace(getIteratorTemplate(source), function(match) {
      return match.replace(/(?: *\/\/.*\n)* *["']( *)<% *if *\(isKeysFast[\s\S]+?["']\1<% *} *else *\{ *%>.+\n([\s\S]+?) *["']\1<% *} *%>.+/, "'\\n' +\n$2");
    });

    // remove data object property assignment in `createIterator`
    source = source.replace(matchFunction(source, 'createIterator'), function(match) {
      return match.replace(/ *'isKeysFast':.+\n/, '');
    });

    return source;
  }

  /**
   * Removes all `argsAreObjects` references from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeArgsAreObjects(source) {
    source = removeVar(source, 'argsAreObjects');

    // remove `argsAreObjects` from `_.isArray`
    source = source.replace(matchFunction(source, 'isArray'), function(match) {
      return match.replace(/\(argsAreObjects && *([^)]+)\)/g, '$1');
    });

    // remove `argsAreObjects` from `_.isEqual`
    source = source.replace(matchFunction(source, 'isEqual'), function(match) {
      return match.replace(/!argsAreObjects[^:]+:\s*/g, '');
    });

    return source;
  }

  /**
   * Removes all `noArgsClass` references from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeNoArgsClass(source) {
    source = removeVar(source, 'noArgsClass');

    // remove `noArgsClass` from `_.isEmpty`
    source = source.replace(matchFunction(source, 'isEmpty'), function(match) {
      return match.replace(/ *\|\| *\(noArgsClass *&&[^)]+?\)\)/g, '');
    });

    return source;
  }

  /**
   * Removes all `noNodeClass` references from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeNoNodeClass(source) {
    // remove `noNodeClass` assignment
    source = source.replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n *try *\{(?:\s*\/\/.*)*\n *var noNodeClass[\s\S]+?catch[^}]+}\n/, '');

    // remove `noNodeClass` from `shimIsPlainObject`
    source = source.replace(matchFunction(source, 'shimIsPlainObject'), function(match) {
      return match.replace(/ *&& *\(!noNodeClass[\s\S]+?\)\)/, '');
    });

    // remove `noNodeClass` from `_.clone`
    source = source.replace(matchFunction(source, 'clone'), function(match) {
      return match.replace(/ *\|\| *\(noNodeClass[\s\S]+?\)\)/, '');
    });

    // remove `noNodeClass` from `_.isEqual`
    source = source.replace(matchFunction(source, 'isEqual'), function(match) {
      return match.replace(/ *\|\| *\(noNodeClass[\s\S]+?\)\)\)/, '');
    });

    return source;
  }

  /**
   * Removes all `hasObjectSpliceByg` references from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeHasObjectSpliceBug(source) {
    return removeVar(source, 'hasObjectSpliceBug')
      // remove `hasObjectSpliceBug` fix from the `Array` function mixins
      .replace(/(?:\s*\/\/.*)*\n( *)if *\(hasObjectSpliceBug[\s\S]+?(?:{\s*}|\n\1})/, '');
  }

  /**
   * Removes a given variable from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @param {String} varName The name of the variable to remove.
   * @returns {String} Returns the modified source.
   */
  function removeVar(source, varName) {
    // simplify `cloneableClasses`, `ctorByClass`, or `hasObjectSpliceBug`
    if (/^(?:cloneableClasses|ctorByClass|hasObjectSpliceBug)$/.test(varName)) {
      source = source.replace(RegExp('(var ' + varName + ' *=)[\\s\\S]+?\\n\\n'), '$1=null;\n\n');
    }
    source = source.replace(RegExp(
      // match multi-line comment block
      '(?:\\n +/\\*[^*]*\\*+(?:[^/][^*]*\\*+)*/)?\\n' +
      // match a variable declaration that's not part of a declaration list
      '( *)var ' + varName + ' *= *(?:.+?(?:;|&&\\n[^;]+;)|(?:\\w+\\(|{)[\\s\\S]+?\\n\\1.+?;)\\n|' +
      // match a variable in a declaration list
      '\\n +' + varName + ' *=.+?,'
    ), '');

    // remove a varaible at the start of a variable declaration list
    source = source.replace(RegExp('(var +)' + varName + ' *=.+?,\\s+'), '$1');

    // remove a variable at the end of a variable declaration list
    source = source.replace(RegExp(',\\s*' + varName + ' *=.+?;'), ';');

    return removeFromCreateIterator(source, varName);
  }

  /**
   * Replaces the `funcName` function body in `source` with `funcValue`.
   *
   * @private
   * @param {String} source The source to inspect.
   * @param {String} varName The name of the function to replace.
   * @returns {String} Returns the modified source.
   */
  function replaceFunction(source, funcName, funcValue) {
    var match = matchFunction(source, funcName);
    if (match) {
      // clip snippet after the JSDoc comment block
      match = match.replace(/^\s*(?:\/\/.*|\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)\n/, '');
      source = source.replace(match, function() {
        return funcValue.trimRight() + '\n';
      });
    }
    return source;
  }

  /**
   * Replaces the `varName` variable declaration value in `source` with `varValue`.
   *
   * @private
   * @param {String} source The source to inspect.
   * @param {String} varName The name of the variable to replace.
   * @returns {String} Returns the modified source.
   */
  function replaceVar(source, varName, varValue) {
    // replace a variable that's not part of a declaration list
    var result = source.replace(RegExp(
      '(( *)var ' + varName + ' *= *)' +
      '(?:.+?;|(?:Function\\(.+?|.*?[^,])\\n[\\s\\S]+?\\n\\2.+?;)\\n'
    ), function(match, captured) {
      return captured + varValue + ';\n';
    });

    if (source == result) {
      // replace a varaible at the start or middle of a declaration list
      result = source.replace(RegExp('((?:var|\\n) +' + varName + ' *=).+?,'), function(match, captured) {
        return captured + ' ' + varValue + ',';
      });
    }
    if (source == result) {
      // replace a variable at the end of a variable declaration list
      result = source.replace(RegExp('(,\\s*' + varName + ' *=).+?;'), function(match, captured) {
        return captured + ' ' + varValue + ';';
      });
    }
    return result;
  }

  /**
   * Hard-codes the `useStrict` template option value for `iteratorTemplate`.
   *
   * @private
   * @param {String} source The source to process.
   * @param {Boolean} value The value to set.
   * @returns {String} Returns the modified source.
   */
  function setUseStrictOption(source, value) {
    // inject "use strict"
    if (value) {
      source = source.replace(/^[\s\S]*?function[^{]+{/, "$&\n  'use strict';");
    }
    // replace `useStrict` branch in `iteratorTemplate` with hard-coded option
    source = source.replace(getIteratorTemplate(source), function(match) {
      return match.replace(/(?: *\/\/.*\n)*(\s*)["'] *<%.+?useStrict.+/, value ? '$1"\'use strict\';\\n" +' : '');
    });

    return source;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a debug and/or minified build, executing the `callback` for each.
   * The `callback` is invoked with two arguments; (filePath, outputSource).
   *
   * Note: For a list of commands see `displayHelp()` or run `lodash --help`.
   *
   * @param {Array} [options=[]] An array of commands.
   * @param {Function} callback The function called per build.
   */
  function build(options, callback) {
    options || (options = []);

    // the debug version of `source`
    var debugSource;

    // used to report invalid command-line arguments
    var invalidArgs = _.reject(options.slice(options[0] == 'node' ? 2 : 0), function(value, index, options) {
      if (/^(?:-o|--output)$/.test(options[index - 1]) ||
          /^(?:category|exclude|exports|iife|include|moduleId|minus|plus|settings|template)=.*$/i.test(value)) {
        return true;
      }
      return [
        'backbone',
        'csp',
        'legacy',
        'mobile',
        'modularize',
        'strict',
        'underscore',
        '-c', '--stdout',
        '-d', '--debug',
        '-h', '--help',
        '-m', '--minify',
        '-o', '--output',
        '-s', '--silent',
        '-V', '--version'
      ].indexOf(value) > -1;
    });

    // report invalid arguments
    if (invalidArgs.length) {
      console.log(
        '\n' +
        'Invalid argument' + (invalidArgs.length > 1 ? 's' : '') +
        ' passed: ' + invalidArgs.join(', ')
      );
      displayHelp();
      return;
    }

    // display help message
    if (_.find(options, function(arg) {
          return /^(?:-h|--help)$/.test(arg);
        })) {
      displayHelp();
      return;
    }

    // display `lodash.VERSION`
    if (_.find(options, function(arg) {
          return /^(?:-V|--version)$/.test(arg);
        })) {
      console.log(_.VERSION);
      return;
    }

    /*------------------------------------------------------------------------*/

    // backup `dependencyMap` to restore later
    var dependencyBackup = _.clone(dependencyMap, true);

    // used to specify a custom IIFE to wrap Lo-Dash
    var iife = options.reduce(function(result, value) {
      var match = value.match(/iife=(.*)/);
      return match ? match[1] : result;
    }, null);

    // flag used to specify a Backbone build
    var isBackbone = options.indexOf('backbone') > -1;

    // flag used to specify a Content Security Policy build
    var isCSP = options.indexOf('csp') > -1 || options.indexOf('CSP') > -1;

    // flag used to specify only creating the debug build
    var isDebug = options.indexOf('-d') > -1 || options.indexOf('--debug') > -1;

    // flag used to specify a legacy build
    var isLegacy = options.indexOf('legacy') > -1;

    // flag used to specify an Underscore build
    var isUnderscore = options.indexOf('underscore') > -1;

    // flag used to specify only creating the minified build
    var isMinify = !isDebug && options.indexOf('-m') > -1 || options.indexOf('--minify')> -1;

    // flag used to specify a mobile build
    var isMobile = !isLegacy && (isCSP || isUnderscore || options.indexOf('mobile') > -1);

    // flag used to specify a modularize build
    var isModularize = options.indexOf('modularize') > -1;

    // flag used to specify writing output to standard output
    var isStdOut = options.indexOf('-c') > -1 || options.indexOf('--stdout') > -1;

    // flag used to specify skipping status updates normally logged to the console
    var isSilent = isStdOut || options.indexOf('-s') > -1 || options.indexOf('--silent') > -1;

    // flag used to specify `_.assign`, `_.bindAll`, and `_.defaults` are
    // constructed using the "use strict" directive
    var isStrict = options.indexOf('strict') > -1;

    // used to specify the ways to export the `lodash` function
    var exportsOptions = options.reduce(function(result, value) {
      return /exports/.test(value) ? optionToArray(value).sort() : result;
    }, isUnderscore
      ? ['commonjs', 'global', 'node']
      : exportsAll.slice()
    );

    // used to specify the AMD module ID of Lo-Dash used by precompiled templates
    var moduleId = options.reduce(function(result, value) {
      var match = value.match(/moduleId=(.*)/);
      return match ? match[1] : result;
    }, 'lodash');

    // used to specify the output path for builds
    var outputPath = options.reduce(function(result, value, index) {
      if (/-o|--output/.test(value)) {
        result = options[index + 1];
        result = path.join(fs.realpathSync(path.dirname(result)), path.basename(result));
      }
      return result;
    }, '');

    // used to match external template files to precompile
    var templatePattern = options.reduce(function(result, value) {
      var match = value.match(/template=(.+)$/);
      return match
        ? path.join(fs.realpathSync(path.dirname(match[1])), path.basename(match[1]))
        : result;
    }, '');

    // used when precompiling template files
    var templateSettings = options.reduce(function(result, value) {
      var match = value.match(/settings=(.+)$/);
      return match
        ? _.assign(result, Function('return {' + match[1].replace(/^{|}$/g, '') + '}')())
        : result;
    }, _.assign(_.clone(_.templateSettings), {
      'moduleId': moduleId
    }));

    // flag used to specify a template build
    var isTemplate = !!templatePattern;

    // the lodash.js source
    var source = fs.readFileSync(path.join(__dirname, 'lodash.js'), 'utf8');

    // flag used to specify replacing Lo-Dash's `_.clone` with Underscore's
    var useUnderscoreClone = isUnderscore;

    // flags used to specify exposing Lo-Dash methods in an Underscore build
    var exposeAssign = !isUnderscore,
        exposeForIn = !isUnderscore,
        exposeForOwn = !isUnderscore,
        exposeIsPlainObject = !isUnderscore;

    /*------------------------------------------------------------------------*/

    // names of methods to include in the build
    var buildMethods = !isTemplate && (function() {
      var result;

      var minusMethods = options.reduce(function(accumulator, value) {
        return /exclude|minus/.test(value)
          ? _.union(accumulator, optionToMethodsArray(source, value))
          : accumulator;
      }, []);

      var plusMethods = options.reduce(function(accumulator, value) {
        return /plus/.test(value)
          ? _.union(accumulator, optionToMethodsArray(source, value))
          : accumulator;
      }, []);

      // add method names explicitly
      options.some(function(value) {
        return /include/.test(value) &&
          (result = getDependencies(optionToMethodsArray(source, value)));
      });

      // include Lo-Dash's methods if explicitly requested
      if (isUnderscore && result) {
        exposeAssign = result.indexOf('assign') > -1;
        exposeForIn = result.indexOf('forIn') > -1;
        exposeForOwn = result.indexOf('forOwn') > -1;
        exposeIsPlainObject = result.indexOf('isPlainObject') > -1;
        useUnderscoreClone = result.indexOf('clone') < 0;
      }
      // update dependencies
      if (isMobile) {
        dependencyMap.reduceRight = ['forEach', 'keys'];
      }
      if (isUnderscore) {
        dependencyMap.contains = ['indexOf'];
        dependencyMap.isEqual = ['isArray', 'isFunction'];
        dependencyMap.isEmpty = ['isArray', 'isString'];
        dependencyMap.max = ['isArray'];
        dependencyMap.min = ['isArray'];
        dependencyMap.pick = [];
        dependencyMap.template = ['defaults', 'escape'];

        if (useUnderscoreClone) {
          dependencyMap.clone = ['assign', 'isArray'];
        }
      }
      // add method names required by Backbone and Underscore builds
      if (isBackbone && !result) {
        result = getDependencies(backboneDependencies);
      }
      if (isUnderscore && !result) {
        result = getDependencies(underscoreMethods);
      }

      // add method names by category
      options.some(function(value) {
        if (!/category/.test(value)) {
          return false;
        }
        // resolve method names belonging to each category (case-insensitive)
        var methodNames = optionToArray(value).reduce(function(accumulator, category) {
          var capitalized = category[0].toUpperCase() + category.toLowerCase().slice(1);
          return accumulator.concat(getMethodsByCategory(source, capitalized));
        }, []);

        return (result = _.union(result || [], getDependencies(methodNames)));
      });

      if (!result) {
        result = allMethods.slice();
      }
      if (plusMethods.length) {
        result = _.union(result, getDependencies(plusMethods));
      }
      if (minusMethods.length) {
        result = _.without.apply(_, [result].concat(minusMethods, getDependants(result)));
      }
      return result;
    }());

    /*------------------------------------------------------------------------*/

    // load customized Lo-Dash module
    var lodash = !isTemplate && (function() {
      var context = vm.createContext({
        'clearTimeout': clearTimeout,
        'console': console,
        'setTimeout': setTimeout
      });

      source = setUseStrictOption(source, isStrict);

      if (isLegacy) {
        _.each(['getPrototypeOf', 'isBindFast', 'isKeysFast', 'nativeBind', 'nativeIsArray', 'nativeKeys'], function(varName) {
          source = replaceVar(source, varName, 'false');
        });

        source = replaceVar(source, 'noArgsClass', 'true');
        source = removeKeysOptimization(source);
      }
      if (isBackbone || isUnderscore) {
        // add Underscore style chaining
        source = addChainMethods(source);
      }
      if (isUnderscore) {
        // remove unneeded variables
        source = removeVar(source, 'cloneableClasses');
        source = removeVar(source, 'ctorByClass');

        // remove large array optimizations
        source = removeFunction(source, 'cachedContains');
        source = removeVar(source, 'largeArraySize');

        // replace `_.assign`
        source = replaceFunction(source, 'assign', [
          '  function assign(object) {',
          '    if (!object) {',
          '      return object;',
          '    }',
          '    for (var argsIndex = 1, argsLength = arguments.length; argsIndex < argsLength; argsIndex++) {',
          '      var iteratee = arguments[argsIndex];',
          '      if (iteratee) {',
          '        for (var key in iteratee) {',
          '          object[key] = iteratee[key];',
          '        }',
          '      }',
          '    }',
          '    return object;',
          '  }'
        ].join('\n'));

        // replace `_.clone`
        if (useUnderscoreClone) {
          source = replaceFunction(source, 'clone', [
            '  function clone(value) {',
            '    return value && objectTypes[typeof value]',
            '      ? (isArray(value) ? slice(value) : assign({}, value))',
            '      : value',
            '  }'
          ].join('\n'));
        }

        // replace `_.contains`
        source = replaceFunction(source, 'contains', [
          '  function contains(collection, target) {',
          '    var length = collection ? collection.length : 0,',
          '        result = false;',
          "    if (typeof length == 'number') {",
          '      result = indexOf(collection, target) > -1;',
          '    } else {',
          '      each(collection, function(value) {',
          '        return (result = value === target) && indicatorObject;',
          '      });',
          '    }',
          '    return result;',
          '  }'
        ].join('\n'));

        // replace `_.defaults`
        source = replaceFunction(source, 'defaults', [
          '  function defaults(object) {',
          '    if (!object) {',
          '      return object;',
          '    }',
          '    for (var argsIndex = 1, argsLength = arguments.length; argsIndex < argsLength; argsIndex++) {',
          '      var iteratee = arguments[argsIndex];',
          '      if (iteratee) {',
          '        for (var key in iteratee) {',
          '          if (object[key] == null) {',
          '            object[key] = iteratee[key];',
          '          }',
          '        }',
          '      }',
          '    }',
          '    return object;',
          '  }'
        ].join('\n'));

        // replace `_.difference`
        source = replaceFunction(source, 'difference', [
          '  function difference(array) {',
          '    var index = -1,',
          '        length = array.length,',
          '        flattened = concat.apply(arrayRef, arguments),',
          '        result = [];',
          '',
          '    while (++index < length) {',
          '      var value = array[index]',
          '      if (indexOf(flattened, value, length) < 0) {',
          '        result.push(value);',
          '      }',
          '    }',
          '    return result',
          '  }'
        ].join('\n'));

        // replace `_.intersection`
        source = replaceFunction(source, 'intersection', [
          '  function intersection(array) {',
          '    var args = arguments,',
          '        argsLength = args.length,',
          '        index = -1,',
          '        length = array ? array.length : 0,',
          '        result = [];',
          '',
          '    outer:',
          '    while (++index < length) {',
          '      var value = array[index];',
          '      if (indexOf(result, value) < 0) {',
          '        var argsIndex = argsLength;',
          '        while (--argsIndex) {',
          '          if (indexOf(args[argsIndex], value) < 0) {',
          '            continue outer;',
          '          }',
          '        }',
          '        result.push(value);',
          '      }',
          '    }',
          '    return result;',
          '  }'
        ].join('\n'));

        // replace `_.isEmpty`
        source = replaceFunction(source, 'isEmpty', [
          '  function isEmpty(value) {',
          '    if (!value) {',
          '      return true;',
          '    }',
          '    if (isArray(value) || isString(value)) {',
          '      return !value.length;',
          '    }',
          '    for (var key in value) {',
          '      if (hasOwnProperty.call(value, key)) {',
          '        return false;',
          '      }',
          '    }',
          '    return true;',
          '  }'
        ].join('\n'));

        // replace `_.omit`
        source = replaceFunction(source, 'omit', [
          '  function omit(object) {',
          '    var props = concat.apply(arrayRef, arguments),',
          '        result = {};',
          '',
          '    forIn(object, function(value, key) {',
          '      if (indexOf(props, key, 1) < 0) {',
          '        result[key] = value;',
          '      }',
          '    });',
          '    return result;',
          '  }'
        ].join('\n'));

        // replace `_.pick`
        source = replaceFunction(source, 'pick', [
          '  function pick(object) {',
          '    var index = 0,',
          '        props = concat.apply(arrayRef, arguments),',
          '        length = props.length,',
          '        result = {};',
          '',
          '    while (++index < length) {',
          '      var prop = props[index];',
          '      if (prop in object) {',
          '        result[prop] = object[prop];',
          '      }',
          '    }',
          '    return result;',
          '  }'
        ].join('\n'));

        // replace `_.template`
        source = replaceFunction(source, 'template', [
          '  function template(text, data, options) {',
          "    text || (text = '');",
          '    options = defaults({}, options, lodash.templateSettings);',
          '',
          '    var index = 0,',
          '        source = "__p += \'",',
          '        variable = options.variable;',
          '',
          '    var reDelimiters = RegExp(',
          "      (options.escape || reNoMatch).source + '|' +",
          "      (options.interpolate || reNoMatch).source + '|' +",
          "      (options.evaluate || reNoMatch).source + '|$'",
          "    , 'g');",
          '',
          '    text.replace(reDelimiters, function(match, escapeValue, interpolateValue, evaluateValue, offset) {',
          '      source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);',
          '      source +=',
          '        escapeValue ? "\' +\\n_.escape(" + escapeValue + ") +\\n\'" :',
          '        evaluateValue ? "\';\\n" + evaluateValue + ";\\n__p += \'" :',
          '        interpolateValue ? "\' +\\n((__t = (" + interpolateValue + ")) == null ? \'\' : __t) +\\n\'" : \'\';',
          '',
          '      index = offset + match.length;',
          '    });',
          '',
          '    source += "\';\\n";',
          '    if (!variable) {',
          "      variable = 'obj';",
          "      source = 'with (' + variable + ' || {}) {\\n' + source + '\\n}\\n';",
          '    }',
          "    source = 'function(' + variable + ') {\\n' +",
          '      "var __t, __p = \'\', __j = Array.prototype.join;\\n" +',
          '      "function print() { __p += __j.call(arguments, \'\') }\\n" +',
          '      source +',
          "      'return __p\\n}';",
          '',
          '    try {',
          "      var result = Function('_', 'return ' + source)(lodash);",
          '    } catch(e) {',
          '      e.source = source;',
          '      throw e;',
          '    }',
          '    if (data) {',
          '      return result(data);',
          '    }',
          '    result.source = source;',
          '    return result;',
          '  }'
        ].join('\n'));

        // replace `_.uniq`
        source = replaceFunction(source, 'uniq', [
          '  function uniq(array, isSorted, callback, thisArg) {',
          '    var index = -1,',
          '        length = array ? array.length : 0,',
          '        result = [],',
          '        seen = result;',
          '',
          "    if (typeof isSorted == 'function') {",
          '      thisArg = callback;',
          '      callback = isSorted;',
          '      isSorted = false;',
          '    }',
          '    if (callback) {',
          '      seen = [];',
          '      callback = createCallback(callback, thisArg);',
          '    }',
          '    while (++index < length) {',
          '      var value = array[index],',
          '          computed = callback ? callback(value, index, array) : value;',
          '',
          '      if (isSorted',
          '            ? !index || seen[seen.length - 1] !== computed',
          '            : indexOf(seen, computed) < 0',
          '          ) {',
          '        if (callback) {',
          '          seen.push(computed);',
          '        }',
          '        result.push(value);',
          '      }',
          '    }',
          '    return result;',
          '  }'
        ].join('\n'));

        // replace `_.uniqueId`
        source = replaceFunction(source, 'uniqueId', [
          '  function uniqueId(prefix) {',
          "    var id = ++idCounter + '';",
          '    return prefix ? prefix + id : id;',
          '  }'
        ].join('\n'));

        // replace `_.without`
        source = replaceFunction(source, 'without', [
          '  function without(array) {',
          '    var index = -1,',
          '        length = array.length,',
          '        result = [];',
          '',
          '    while (++index < length) {',
          '      var value = array[index]',
          '      if (indexOf(arguments, value, 1) < 0) {',
          '        result.push(value);',
          '      }',
          '    }',
          '    return result',
          '  }'
        ].join('\n'));

        // remove `arguments` object and `argsAreObjects` check from `_.isEqual`
        source = source.replace(matchFunction(source, 'isEqual'), function(match) {
          return match
            .replace(/^ *if *\(.+== argsClass[^}]+}\n/gm, '')
            .replace(/!argsAreObjects[^:]+:\s*/g, '');
        });

        // remove conditional `charCodeCallback` use from `_.max` and `_.min`
        _.each(['max', 'min'], function(methodName) {
          source = source.replace(matchFunction(source, methodName), function(match) {
            return match.replace(/!callback *&& *isString\(collection\)[\s\S]+?: */g, '');
          });
        });

        // remove unused features from `createBound`
        if (buildMethods.indexOf('partial') == -1) {
          source = source.replace(matchFunction(source, 'createBound'), function(match) {
            return match
              .replace(/(function createBound\([^{]+{)[\s\S]+?(\n *function bound)/, '$1$2')
              .replace(/thisBinding *=[^}]+}/, 'thisBinding = thisArg;\n');
          });
        }
      }
      if (isMobile) {
        source = replaceVar(source, 'isKeysFast', 'false');
        source = removeKeysOptimization(source);
        source = removeNoNodeClass(source);

        // remove `prototype` [[Enumerable]] fix from `_.keys`
        source = source.replace(matchFunction(source, 'keys'), function(match) {
          return match.replace(/(?:\s*\/\/.*)*(\s*return *).+?propertyIsEnumerable[\s\S]+?: */, '$1');
        });

        // remove `prototype` [[Enumerable]] fix from `iteratorTemplate`
        source = source.replace(getIteratorTemplate(source), function(match) {
          return match
            .replace(/(?: *\/\/.*\n)* *["'] *(?:<% *)?if *\(!hasDontEnumBug *(?:&&|\))[\s\S]+?<% *} *(?:%>|["']).+/g, '')
            .replace(/!hasDontEnumBug *\|\|/g, '');
        });
      }
      vm.runInContext(source, context);
      return context._;
    }());

    /*------------------------------------------------------------------------*/

    if (isTemplate) {
      source = buildTemplate(templatePattern, templateSettings);
    }
    else {
      // simplify template snippets by removing unnecessary brackets
      source = source.replace(
        RegExp("{(\\\\n' *\\+\\s*.*?\\+\\n\\s*' *)}(?:\\\\n)?' *([,\\n])", 'g'), "$1'$2"
      );

      source = source.replace(
        RegExp("{(\\\\n' *\\+\\s*.*?\\+\\n\\s*' *)}(?:\\\\n)?' *\\+", 'g'), "$1;\\n'+"
      );

      // remove methods from the build
      allMethods.forEach(function(otherName) {
        if (!_.contains(buildMethods, otherName)) {
          source = removeFunction(source, otherName);
        }
      });

      // remove `isArguments` fallback before `isArguments` is transformed by
      // other parts of the build process
      if (isRemoved(source, 'isArguments')) {
        source = removeIsArgumentsFallback(source);
      }

      /*----------------------------------------------------------------------*/

      if (isLegacy) {
        _.each(['isBindFast', 'isV8', 'nativeBind', 'nativeIsArray', 'nativeKeys', 'reNative'], function(varName) {
          source = removeVar(source, varName);
        });

        // remove native `Function#bind` branch in `_.bind`
        source = source.replace(matchFunction(source, 'bind'), function(match) {
          return match.replace(/(?:\s*\/\/.*)*\s*return isBindFast[^:]+:\s*/, 'return ');
        });

        // remove native `Array.isArray` branch in `_.isArray`
        source = source.replace(matchFunction(source, 'isArray'), function(match) {
          return match.replace(/nativeIsArray * \|\|/, '');
        });

        // replace `_.keys` with `shimKeys`
        if (!isRemoved(source, 'keys')) {
          source = source.replace(
            matchFunction(source, 'keys').replace(/[\s\S]+?var keys *= */, ''),
            matchFunction(source, 'shimKeys').replace(/[\s\S]+?function shimKeys/, 'function').replace(/}\n$/, '};\n')
          );

          source = removeFunction(source, 'shimKeys');
        }
        // replace `_.isArguments` with fallback
        if (!isRemoved(source, 'isArguments')) {
          source = source.replace(
            matchFunction(source, 'isArguments').replace(/[\s\S]+?function isArguments/, ''),
            getIsArgumentsFallback(source).match(/isArguments *= *function([\s\S]+?) *};/)[1] + '  }\n'
          );

          source = removeIsArgumentsFallback(source);
        }
        source = removeFromCreateIterator(source, 'nativeKeys');
        source = removeCreateFunction(source);
      }

      /*----------------------------------------------------------------------*/

      if (isMobile) {
        // inline all functions defined with `createIterator`
        _.functions(lodash).forEach(function(methodName) {
          // strip leading underscores to match pseudo private functions
          var reFunc = RegExp('(\\bvar ' + methodName.replace(/^_/, '') + ' *= *)createIterator\\(((?:{|[a-zA-Z])[\\s\\S]+?)\\);\\n');
          if (reFunc.test(source)) {
            // extract, format, and inject the compiled function's source code
            source = source.replace(reFunc, function(match, captured) {
              return captured + getFunctionSource(lodash[methodName]) + ';\n';
            });
          }
        });

        if (isUnderscore) {
          // remove `_.assign`, `_.forIn`, `_.forOwn`, and `_.isPlainObject` assignments
          (function() {
            var snippet = getMethodAssignments(source),
                modified = snippet;

            if (!exposeAssign) {
              modified = modified.replace(/^(?: *\/\/.*\s*)* *lodash\.assign *= *.+\n/m, '');
            }
            if (!exposeForIn) {
              modified = modified.replace(/^(?: *\/\/.*\s*)* *lodash\.forIn *= *.+\n/m, '');
            }
            if (!exposeForOwn) {
              modified = modified.replace(/^(?: *\/\/.*\s*)* *lodash\.forOwn *= *.+\n/m, '');
            }
            if (!exposeIsPlainObject) {
              modified = modified.replace(/^(?: *\/\/.*\s*)* *lodash\.isPlainObject *= *.+\n/m, '');
            }
            source = source.replace(snippet, modified);
          }());

          // replace `isArguments` and its fallback
          (function() {
            var snippet = matchFunction(source, 'isArguments').trimRight();
            snippet = snippet.replace(/function isArguments/, 'lodash.isArguments = function');

            source = removeFunction(source, 'isArguments');
            source = source.replace(getIsArgumentsFallback(source), function(match) {
              return snippet + '\n' + match
                .replace(/isArguments/g, 'lodash.$&')
                .replace(/noArgsClass/g, '!lodash.isArguments(arguments)');
            });
          }());

          // remove chainability from `each` and `_.forEach`
          _.each(['each', 'forEach'], function(methodName) {
            source = source.replace(matchFunction(source, methodName), function(match) {
              return match.replace(/\n *return .+?([};\s]+)$/, '$1');
            });
          });

          // unexpose "exit early" feature of `each`, `_.forEach`, `_.forIn`, and `_.forOwn`
          _.each(['each', 'forEach', 'forIn', 'forOwn'], function(methodName) {
            source = source.replace(matchFunction(source, methodName), function(match) {
              return match.replace(/=== *false\)/g, '=== indicatorObject)');
            });
          });

          // modify `_.every`, `_.find`, `_.isEqual`, and `_.some` to use the private `indicatorObject`
          _.each(['every', 'isEqual'], function(methodName) {
            source = source.replace(matchFunction(source, methodName), function(match) {
              return match.replace(/\(result *= *(.+?)\);/g, '!(result = $1) && indicatorObject;');
            });
          });

          source = source.replace(matchFunction(source, 'find'), function(match) {
            return match.replace(/return false/, 'return indicatorObject');
          });

          source = source.replace(matchFunction(source, 'some'), function(match) {
            return match.replace(/!\(result *= *(.+?)\);/, '(result = $1) && indicatorObject;');
          });
        }
        else {
          source = removeArgsAreObjects(source);
          source = removeHasObjectSpliceBug(source);
          source = removeIsArgumentsFallback(source);
        }

        // remove `thisArg` from unexposed `forIn` and `forOwn`
        _.each([
          { 'methodName': 'forIn', 'flag': exposeForIn },
          { 'methodName': 'forOwn', 'flag': exposeForOwn }
        ], function(data) {
          if (!data.flag) {
            source = source.replace(matchFunction(source, data.methodName), function(match) {
              return match
                .replace(/(callback), *thisArg/g, '$1')
                .replace(/^( *)callback *=.+/m, '$1callback || (callback = identity);')
            });
          }
        });

        // remove `hasDontEnumBug`, `iteratesOwnLast`, and `nonEnumArgs` declarations and assignments
        source = source
          .replace(/^ *\(function\(\) *{[\s\S]+?}\(1\)\);\n/m, '')
          .replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n *var (?:hasDontEnumBug|iteratesOwnLast|nonEnumArgs).+\n/g, '');

        // remove `iteratesOwnLast` from `shimIsPlainObject`
        source = source.replace(matchFunction(source, 'shimIsPlainObject'), function(match) {
          return match.replace(/(?:\s*\/\/.*)*\n( *)if *\(iteratesOwnLast[\s\S]+?\n\1}/, '');
        });

        // remove `noCharByIndex` from `_.reduceRight`
        source = source.replace(matchFunction(source, 'reduceRight'), function(match) {
          return match.replace(/}\s*else if *\(noCharByIndex[^}]+/, '');
        });

        // remove `noCharByIndex` from `_.toArray`
        source = source.replace(matchFunction(source, 'toArray'), function(match) {
          return match.replace(/noCharByIndex[^:]+:/, '');
        });

        source = removeVar(source, 'iteratorTemplate');
        source = removeCreateFunction(source);
        source = removeNoArgsClass(source);
        source = removeNoNodeClass(source);
      }
      else {
        // inline `iteratorTemplate` template
        source = source.replace(getIteratorTemplate(source), function() {
          var snippet = getFunctionSource(lodash._iteratorTemplate);

          // prepend data object references to property names to avoid having to
          // use a with-statement
          iteratorOptions.forEach(function(property) {
            snippet = snippet.replace(RegExp('([^\\w.])\\b' + property + '\\b', 'g'), '$1obj.' + property);
          });

          // remove unnecessary code
          snippet = snippet
            .replace(/var __t.+/, "var __p = '';")
            .replace(/function print[^}]+}/, '')
            .replace(/'(?:\\n|\s)+'/g, "''")
            .replace(/__p *\+= *' *';/g, '')
            .replace(/(__p *\+= *)' *' *\+/g, '$1')
            .replace(/(\{) *;|; *(\})/g, '$1$2')
            .replace(/\(\(__t *= *\( *([^)]+) *\)\) *== *null *\? *'' *: *__t\)/g, '($1)');

          // remove the with-statement
          snippet = snippet.replace(/ *with *\(.+?\) *{/, '\n').replace(/}([^}]*}[^}]*$)/, '$1');

          // minor cleanup
          snippet = snippet
            .replace(/obj *\|\| *\(obj *= *\{}\);/, '')
            .replace(/var __p = '';\s*__p \+=/, 'var __p =');

          // remove comments, including sourceURLs
          snippet = snippet.replace(/\s*\/\/.*(?:\n|$)/g, '');

          return '  var iteratorTemplate = ' + snippet + ';\n';
        });
      }
    }

    /*------------------------------------------------------------------------*/

    // customize Lo-Dash's IIFE
    (function() {
      if (typeof iife == 'string') {
        var token = '%output%',
            index = iife.indexOf(token);

        source = source.match(/\/\*![\s\S]+?\*\/\n/) +
          iife.slice(0, index) +
          source.replace(/^[\s\S]+?\(function[^{]+?{|}\(this\)\)[;\s]*$/g, '') +
          iife.slice(index + token.length);
      }
    }());

    /*------------------------------------------------------------------------*/

    // customize Lo-Dash's export bootstrap
    (function() {
      var isAMD = exportsOptions.indexOf('amd') > -1,
          isCommonJS = exportsOptions.indexOf('commonjs') > -1,
          isGlobal = exportsOptions.indexOf('global') > -1,
          isNode = exportsOptions.indexOf('node') > -1;

      if (!isAMD) {
        source = source.replace(/(?: *\/\/.*\n)*( *)if *\(typeof +define[\s\S]+?else /, '$1');
      }
      if (!isNode) {
        source = source.replace(/(?: *\/\/.*\n)*( *)if *\(typeof +module[\s\S]+?else *{([\s\S]+?\n)\1}\n/, '$1$2');
      }
      if (!isCommonJS) {
        source = source.replace(/(?: *\/\/.*\n)*(?:( *)else *{)?\s*freeExports\.\w+ *=[\s\S]+?(?:\n\1})?\n/, '');
      }
      if (!isGlobal) {
        source = source.replace(/(?:( *)(})? *else(?: *if *\(_\))? *{)?(?:\s*\/\/.*)*\s*(?:window\._|_\.templates) *=[\s\S]+?(?:\n\1})?\n/g, '$1$2\n');
      }
      // remove `if (freeExports) {...}` if it's empty
      if (isAMD && isGlobal) {
        source = source.replace(/(?: *\/\/.*\n)* *(?:else )?if *\(freeExports\) *{\s*}\n/, '');
      } else {
        source = source.replace(/(?: *\/\/.*\n)* *(?:else )?if *\(freeExports\) *{\s*}(?:\s*else *{([\s\S]+?) *})?\n/, '$1\n');
      }

      if ((source.match(/\bfreeExports\b/g) || []).length < 2) {
        source = removeVar(source, 'freeExports');
      }
    }());

    /*------------------------------------------------------------------------*/

    if (isTemplate) {
      debugSource = source;
    }
    else {
      // modify/remove references to removed methods/variables
      if (isRemoved(source, 'invert')) {
        source = replaceVar(source, 'htmlUnescapes', "{'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'\"','&#x27;':\"'\"}");
      }
      if (isRemoved(source, 'isArguments')) {
        source = replaceVar(source, 'noArgsClass', 'false');
      }
      if (isRemoved(source, 'isFunction')) {
        source = removeIsFunctionFallback(source);
      }
      if (isRemoved(source, 'mixin')) {
        source = removeHasObjectSpliceBug(source);

        // simplify the `lodash` function
        source = replaceFunction(source, 'lodash', [
          '  function lodash() {',
          '    // no operation performed',
          '  }'
        ].join('\n'));

        // remove all `lodash.prototype` additions
        source = source
          .replace(/(?:\s*\/\/.*)*\n( *)forOwn\(lodash, *function\(func, *methodName\)[\s\S]+?\n\1}.+/g, '')
          .replace(/(?:\s*\/\/.*)*\n( *)each\(\['[\s\S]+?\n\1}.+/g, '')
          .replace(/(?:\s*\/\/.*)*\s*lodash\.prototype.+\n/g, '')
          .replace(/(?:\s*\/\/.*)*\s*mixin\(lodash\).+\n/, '');
      }

      // assign debug source before further modifications that rely on the minifier
      // to remove unused variables and other dead code
      debugSource = cleanupSource(source);

      // remove associated functions, variables, and code snippets that the minifier may miss
      if (isRemoved(source, 'clone')) {
        source = removeVar(source, 'cloneableClasses');
        source = removeVar(source, 'ctorByClass');
      }
      if (isRemoved(source, 'isArray')) {
        source = removeVar(source, 'nativeIsArray');
      }
      if (isRemoved(source, 'isPlainObject')) {
        source = removeVar(source, 'getPrototypeOf');
        source = source.replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n *var iteratesOwnLast;|.+?iteratesOwnLast *=.+/g, '');
      }
      if (isRemoved(source, 'keys')) {
        source = removeFunction(source, 'shimKeys');
      }
      if (isRemoved(source, 'template')) {
        // remove `templateSettings` assignment
        source = source.replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n *lodash\.templateSettings[\s\S]+?};\n/, '');
      }
      if (isRemoved(source, 'isArguments', 'isEmpty')) {
        source = removeNoArgsClass(source);
      }
      if (isRemoved(source, 'clone', 'isEqual', 'isPlainObject')) {
        source = removeNoNodeClass(source);
      }
      if ((source.match(/\bcreateIterator\b/g) || []).length < 2) {
        source = removeFunction(source, 'createIterator');
        source = source.replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n *var hasDontEnumBug;|.+?hasDontEnumBug *=.+/g, '');
        source = source.replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n *var nonEnumArgs;|.+?nonEnumArgs *=.+/g, '');
      }
      if (isRemoved(source, 'createIterator', 'bind', 'keys', 'template')) {
        source = removeVar(source, 'isBindFast');
        source = removeVar(source, 'nativeBind');
      }
      if (isRemoved(source, 'createIterator', 'bind', 'isArray', 'isPlainObject', 'keys', 'template')) {
        source = removeVar(source, 'reNative');
      }
      if (isRemoved(source, 'createIterator', 'keys')) {
        source = removeVar(source, 'nativeKeys');
        source = removeKeysOptimization(source);
      }
      if (!source.match(/var (?:hasDontEnumBug|iteratesOwnLast|nonEnumArgs)\b/g)) {
        // remove `hasDontEnumBug`, `iteratesOwnLast`, and `nonEnumArgs` assignments
        source = source.replace(/ *\(function\(\) *{[\s\S]+?}\(1\)\);\n/, '');
      }
    }

    source = cleanupSource(source);

    /*------------------------------------------------------------------------*/

    // used to specify creating a custom build
    var isCustom = isBackbone || isLegacy || isMobile || isStrict || isUnderscore ||
      /(?:category|exclude|exports|iife|include|minus|plus)=/.test(options) ||
      !_.isEqual(exportsOptions, exportsAll);

    // used as the basename of the output path
    var basename = outputPath
      ? path.basename(outputPath, '.js')
      : 'lodash' + (isTemplate ? '.template' : isCustom ? '.custom' : '');

    // restore `dependencyMap`
    dependencyMap = dependencyBackup;

    // output debug build
    if (!isMinify && (isCustom || isDebug || isTemplate)) {
      if (isCustom) {
        debugSource = addCommandsToHeader(debugSource, options);
      }
      if (isDebug && isStdOut) {
        stdout.write(debugSource);
        callback(debugSource);
      } else if (!isStdOut) {
        callback(debugSource, (isDebug && outputPath) || path.join(cwd, basename + '.js'));
      }
    }
    // begin the minification process
    if (!isDebug) {
      outputPath || (outputPath = path.join(cwd, basename + '.min.js'));

      minify(source, {
        'isSilent': isSilent,
        'isTemplate': isTemplate,
        'outputPath': outputPath,
        'onComplete': function(source) {
          // inject "use strict" directive
          if (isStrict) {
            source = source.replace(/^([\s\S]*?function[^{]+{)([^"'])/, '$1"use strict";$2');
          }
          if (isCustom) {
            source = addCommandsToHeader(source, options);
          }
          if (isStdOut) {
            stdout.write(source);
            callback(source);
          } else {
            callback(source, outputPath);
          }
        }
      });
    }
  }

  /*--------------------------------------------------------------------------*/

  // expose `build`
  if (module != require.main) {
    module.exports = build;
  }
  else {
    // or invoked directly
    build(process.argv, function(source, filePath) {
      filePath && fs.writeFileSync(filePath, source, 'utf8');
    });
  }
}());
