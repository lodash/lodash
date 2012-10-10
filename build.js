#!/usr/bin/env node
;(function() {
  'use strict';

  /** Load modules */
  var fs = require('fs'),
      path = require('path'),
      vm = require('vm'),
      minify = require(path.join(__dirname, 'build', 'minify')),
      _ = require(path.join(__dirname, 'lodash'));

  /** The current working directory */
  var cwd = process.cwd();

  /** Shortcut to native `Array.prototype` */
  var ArrayProto = Array.prototype;

  /** Shortcut used to push arrays of values to an array */
  var push = ArrayProto.push;

  /** Shortcut used to convert array-like objects to arrays */
  var slice = ArrayProto.slice;

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
    'bind': ['isFunction'],
    'bindAll': ['bind', 'isFunction'],
    'chain': ['mixin'],
    'clone': ['extend', 'forEach', 'forOwn', 'isArguments', 'isPlainObject'],
    'compact': [],
    'compose': [],
    'contains': [],
    'countBy': ['identity'],
    'debounce': [],
    'defaults': ['isArguments'],
    'defer': [],
    'delay': [],
    'difference': ['indexOf'],
    'escape': [],
    'every': ['identity'],
    'extend': ['isArguments'],
    'filter': ['identity'],
    'find': ['identity'],
    'first': [],
    'flatten': ['isArray'],
    'forEach': ['identity'],
    'forIn': ['identity', 'isArguments'],
    'forOwn': ['identity', 'isArguments'],
    'functions': ['isArguments', 'isFunction'],
    'groupBy': ['identity'],
    'has': [],
    'identity': [],
    'indexOf': ['sortedIndex'],
    'initial': [],
    'intersection': ['indexOf'],
    'invert': [],
    'invoke': [],
    'isArguments': [],
    'isArray': [],
    'isBoolean': [],
    'isDate': [],
    'isElement': [],
    'isEmpty': ['isArguments', 'isFunction'],
    'isEqual': ['isArguments', 'isFunction'],
    'isFinite': [],
    'isFunction': [],
    'isNaN': [],
    'isNull': [],
    'isNumber': [],
    'isObject': [],
    'isPlainObject': ['forIn', 'isArguments', 'isFunction'],
    'isRegExp': [],
    'isString': [],
    'isUndefined': [],
    'keys': ['isArguments'],
    'last': [],
    'lastIndexOf': [],
    'lateBind': ['isFunction'],
    'map': ['identity'],
    'max': ['forEach'],
    'memoize': [],
    'merge': ['isArray', 'isPlainObject'],
    'min': ['forEach'],
    'mixin': ['forEach', 'functions'],
    'noConflict': [],
    'object': [],
    'omit': ['indexOf', 'isArguments'],
    'once': [],
    'pairs': [],
    'partial': ['isFunction'],
    'pick': [],
    'pluck': [],
    'random': [],
    'range': [],
    'reduce': ['identity'],
    'reduceRight': ['forEach', 'keys'],
    'reject': ['identity'],
    'rest': [],
    'result': ['isFunction'],
    'shuffle': ['forEach'],
    'size': ['keys'],
    'some': ['identity'],
    'sortBy': ['identity'],
    'sortedIndex': ['identity'],
    'tap': ['mixin'],
    'template': ['escape'],
    'throttle': [],
    'times': [],
    'toArray': ['isFunction', 'values'],
    'unescape': [],
    'union': ['indexOf'],
    'uniq': ['identity', 'indexOf'],
    'uniqueId': [],
    'value': ['mixin'],
    'values': ['isArguments'],
    'where': ['forIn'],
    'without': ['indexOf'],
    'wrap': [],
    'zip': ['max', 'pluck']
  };

  /** Used to inline `iteratorTemplate` */
  var iteratorOptions = [
    'args',
    'array',
    'arrayBranch',
    'beforeLoop',
    'bottom',
    'firstArg',
    'hasDontEnumBug',
    'inLoop',
    'init',
    'isKeysFast',
    'object',
    'objectBranch',
    'noArgsEnum',
    'noCharByIndex',
    'shadowed',
    'top',
    'useHas',
    'useStrict'
  ];

  /** List of all Lo-Dash methods */
  var allMethods = _.keys(dependencyMap);

  /** List Backbone's Lo-Dash dependencies */
  var backboneDependencies = [
    'bind',
    'bindAll',
    'clone',
    'contains',
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
    'keys',
    'last',
    'lastIndexOf',
    'lateBind',
    'map',
    'max',
    'min',
    'mixin',
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
    'without'
  ];

  /** List of methods used by Underscore */
  var underscoreMethods = _.without.apply(_, [allMethods].concat([
    'forIn',
    'forOwn',
    'isPlainObject',
    'lateBind',
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
   * Compiles template files matched by the given file path `pattern` into a
   * single source, extending `_.templates` with precompiled templates named after
   * each template file's basename.
   *
   * @private
   * @param {String} [pattern='<cwd>/*.jst'] The file path pattern.
   * @param {Object} [options=_.templateSettings] The options object.
   * @returns {String} Returns the compiled source.
   */
  function buildTemplate(pattern, options) {
    pattern || (pattern = path.join(cwd, '*.jst'));
    options || (options = _.templateSettings);

    var directory = path.dirname(pattern);

    var moduleName = 'lodash';

    var source = [
      ';(function(window) {',
      "  var freeExports = typeof exports == 'object' && exports &&",
      "    (typeof global == 'object' && global && global == global.global && (window = global), exports);",
      '',
      '  var templates = {};',
      '',
      '  var _ = window._;',
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

        source.push("  templates['" + prop + "'] = " + precompiled + ';');
      }
    });

    source.push(
      '',
      "  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {",
      "    define(['" + moduleName + "'], function(lodash) {",
      '      _ = lodash;',
      '      _.templates = _.extend(_.templates || {}, templates);',
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
      '    lodash strict        Build with `_.bindAll`, `_.defaults`, & `_.extend` in strict mode',
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
    return (source.match(/lodash\.VERSION *= *[\s\S]+?\/\*-+\*\/\n/) || [''])[0];
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
    // the dependencies of its dependencies, and so on.
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
    return (source.match(/(?:\s*\/\/.*)*\n( +)if *\(noArgsClass\)[\s\S]+?};\n\1}/) || [''])[0];
  }

  /**
   * Gets the `_.isFunction` fallback from `source`.
   *
   * @private
   * @param {String} source The source to inspect.
   * @returns {String} Returns the `isFunction` fallback.
   */
  function getIsFunctionFallback(source) {
    return (source.match(/(?:\s*\/\/.*)*\n( +)if *\(isFunction\(\/x\/[\s\S]+?};\n\1}/) || [''])[0];
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
      '( +)function ' + funcName + '\\b[\\s\\S]+?\\n\\1}|' +
      // match a variable declaration with `createIterator`
      ' +var ' + funcName + ' *=.*?createIterator\\((?:{|[a-zA-Z])[\\s\\S]+?\\);|' +
      // match a variable declaration with function expression
      '( +)var ' + funcName + ' *=.*?function[\\s\\S]+?\\n\\2};' +
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
   * @returns {String} Returns the source with the function removed.
   */
  function removeFunction(source, funcName) {
    var modified,
        snippet = matchFunction(source, funcName);

    // exit early if function is not found
    if (!snippet) {
      return source;
    }
    // remove function
    source = source.replace(snippet, '');

    // grab the method assignments snippet
    snippet = getMethodAssignments(source);

    // remove assignment and aliases
    modified = getAliases(funcName).concat(funcName).reduce(function(result, otherName) {
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
   * @returns {String} Returns the source with the `isArguments` fallback removed.
   */
  function removeIsArgumentsFallback(source) {
    return source.replace(getIsArgumentsFallback(source), '');
  }

  /**
   * Removes the `_.isFunction` fallback from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the source with the `isFunction` fallback removed.
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
    return removeVar(source, 'isKeysFast')
      // remove optimized branch in `iteratorTemplate`
      .replace(/(?: *\/\/.*\n)* *'( *)<% *if *\(isKeysFast[\s\S]+?'\1<% *} *else *\{ *%>.+\n([\s\S]+?) *'\1<% *} *%>.+/, "'\\n' +\n$2")
      // remove `isKeysFast` from `beforeLoop.object` of `mapIteratorOptions`
      .replace(/=\s*'\s*\+\s*\(isKeysFast.+/, "= []'")
      // remove `isKeysFast` from `inLoop.object` of `mapIteratorOptions`, `invoke`, `pairs`, `pluck`, and `sortBy`
      .replace(/'\s*\+\s*\(isKeysFast[^)]+?\)\s*\+\s*'/g, '.push')
      // remove data object property assignment in `createIterator`
      .replace(/ *'isKeysFast':.+\n/, '');
  }

  /**
   * Removes all `noArgsClass` references from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeNoArgsClass(source) {
    return removeVar(source, 'noArgsClass')
      // remove `noArgsClass` from `_.clone` and `_.isEqual`
      .replace(/ *\|\| *\(noArgsClass *&&[^)]+?\)\)/g, '')
      // remove `noArgsClass` from `_.isEqual`
      .replace(/if *\(noArgsClass[^}]+?}\n/, '\n');
  }

  /**
   * Removes all `noNodeClass` references from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeNoNodeClass(source) {
    return source
      // remove `noNodeClass` assignment
      .replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n *try *\{(?:\s*\/\/.*)*\n *var noNodeClass[\s\S]+?catch[^}]+}\n/, '')
      // remove `noNodeClass` from `isPlainObject`
      .replace(/\(!noNodeClass *\|\|[\s\S]+?\)\) *&&/, '')
      // remove `noNodeClass` from `_.isEqual`
      .replace(/ *\|\| *\(noNodeClass *&&[\s\S]+?\)\)\)/, '');
  }

  /**
   * Removes a given variable from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @param {String} varName The name of the variable to remove.
   * @returns {String} Returns the source with the variable removed.
   */
  function removeVar(source, varName) {
    // simplify `arrayLikeClasses` and `cloneableClasses`
    if (/^(?:arrayLike|cloneable)Classes$/.test(varName)) {
      source = source.replace(RegExp('(var ' + varName + ' *=)[\\s\\S]+?(true;\\n)'), '$1$2');
    }
    source = source.replace(RegExp(
      // match multi-line comment block
      '(?:\\n +/\\*[^*]*\\*+(?:[^/][^*]*\\*+)*/)?\\n' +
      // match a variable declaration that's not part of a declaration list
      '( +)var ' + varName + ' *= *(?:.+?(?:;|&&\\n[^;]+;)|(?:\\w+\\(|{)[\\s\\S]+?\\n\\1.+?;)\\n|' +
      // match a variable in a declaration list
      '\\n +' + varName + ' *=.+?,'
    ), '');

    // remove a varaible at the start of a variable declaration list
    source = source.replace(RegExp('(var +)' + varName + ' *=.+?,\\s+'), '$1');

    // remove a variable at the end of a variable declaration list
    source = source.replace(RegExp(',\\s*' + varName + ' *=.+?;'), ';');

    // remove variable reference from `arrayLikeClasses` and `cloneableClasses` assignments
    source = source.replace(RegExp('(?:arrayLikeClasses|cloneableClasses)\\[' + varName + '\\] *= *(?:false|true)?', 'g'), '');

    return removeFromCreateIterator(source, varName);
  }

  /**
   * Searches `source` for a `varName` variable declaration and replaces its
   * assigned value with `varValue`.
   *
   * @private
   * @param {String} source The source to inspect.
   * @param {String} varName The name of the variable to replace.
   * @returns {String} Returns the source with the variable replaced.
   */
  function replaceVar(source, varName, varValue) {
    // replace a variable that's not part of a declaration list
    var result = source.replace(RegExp(
      '(( +)var ' + varName + ' *= *)' +
      '(?:.+?;|(?:Function\\(.+?|.*?[^,])\\n[\\s\\S]+?\\n\\2.+?;)\\n'
    ), '$1' + varValue + ';\n');

    if (source == result) {
      // replace a varaible at the start or middle of a declaration list
      result = source.replace(RegExp('((?:var|\\n) +' + varName + ' *=).+?,'), '$1 ' + varValue + ',');
    }
    if (source == result) {
      // replace a variable at the end of a variable declaration list
      result = source.replace(RegExp('(,\\s*' + varName + ' *=).+?;'), '$1 ' + varValue + ';');
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
    // remove `isStrictFast` assignment
    return removeVar(source, 'isStrictFast')
      // replace `useStrict` branch in `value` with hard-coded option
      .replace(/(?: *\/\/.*\n)*(\s*)' *<% *if *\(useStrict\).+/, value ? "$1'\\'use strict\\';\\n' +" : '')
      // remove `useStrict` from iterator options
      .replace(/ *'useStrict': *false,\n/g, '')
      // remove `useStrict` data object property assignment in `createIterator`
      .replace(/ *'useStrict':.+\n/, '');
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a debug and minified build, executing the `callback` for each.
   * The `callback` is invoked with 2 arguments; (filePath, source)
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
          /^(?:category|exclude|exports|iife|include|minus|plus|settings|template)=.*$/.test(value)) {
        return true;
      }
      return [
        'backbone',
        'csp',
        'legacy',
        'mobile',
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

    // flag used to specify writing output to standard output
    var isStdOut = options.indexOf('-c') > -1 || options.indexOf('--stdout') > -1;

    // flag used to specify skipping status updates normally logged to the console
    var isSilent = isStdOut || options.indexOf('-s') > -1 || options.indexOf('--silent') > -1;

    // flag used to specify `_.bindAll`, `_.extend`, and `_.defaults` are
    // constructed using the "use strict" directive
    var isStrict = options.indexOf('strict') > -1;

    // used to specify the ways to export the `lodash` function
    var exportsOptions = options.reduce(function(result, value) {
      return /exports/.test(value) ? optionToArray(value).sort() : result;
    }, isUnderscore
      ? ['commonjs', 'global', 'node']
      : exportsAll.slice()
    );

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
        ? Function('return {' + match[1].replace(/^{|}$/g, '') + '}')()
        : result;
    }, _.clone(_.templateSettings));

    // flag used to specify a template build
    var isTemplate = !!templatePattern;

    // the lodash.js source
    var source = fs.readFileSync(path.join(__dirname, 'lodash.js'), 'utf8');

    // flag used to specify if the build should include the "use strict" directive
    var useStrict = isStrict || !(isLegacy || isMobile);

    // flag used to specify replacing Lo-Dash's `_.clone` with Underscore's
    var useUnderscoreClone = isUnderscore;

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

      // use Lo-Dash's clone if explicitly requested
      if (result && result.indexOf('clone') > -1) {
        useUnderscoreClone = false;
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

      // init `result` if it hasn't been inited
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
        'setTimeout': setTimeout
      });

      if (isStrict) {
        source = setUseStrictOption(source, true);
      } else {
        // remove "use strict" directive
        source = source.replace(/(["'])use strict\1;( *\n)?/, '');
        if (!useStrict) {
          source = setUseStrictOption(source, false);
        }
      }
      if (isLegacy) {
        _.each(['getPrototypeOf', 'isBindFast', 'isKeysFast', 'isStrictFast', 'nativeBind', 'nativeIsArray', 'nativeKeys'], function(varName) {
          source = replaceVar(source, varName, 'false');
        });

        source = replaceVar(source, 'noArgsClass', 'true');
        source = removeKeysOptimization(source);
      }
      else if (isUnderscore) {
        // update dependencies
        dependencyMap.isEqual = ['isArray', 'isFunction'];
        dependencyMap.isEmpty = ['isArray'];

        // remove unneeded variables
        source = removeVar(source, 'arrayLikeClasses');
        source = removeVar(source, 'cloneableClasses');

        // remove large array optimizations
        source = removeFunction(source, 'cachedContains');
        source = removeVar(source, 'largeArraySize');

        // replace `_.clone`
        if (useUnderscoreClone) {
          dependencyMap.clone = ['extend', 'isArray'];
          source = source.replace(/^( +)function clone[\s\S]+?\n\1}/m, [
            '  function clone(value) {',
            '    return value && objectTypes[typeof value]',
            '      ? (isArray(value) ? slice.call(value) : extend({}, value))',
            '      : value',
            '  }'
          ].join('\n'));
        }

        // replace `_.difference`
        source = source.replace(/^( +)function difference[\s\S]+?\n\1}/m, [
          '  function difference(array) {',
          '    var index = -1,',
          '        length = array.length,',
          '        flattened = concat.apply(ArrayProto, arguments),',
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
        source = source.replace(/^( +)function intersection[\s\S]+?\n\1}/m, [
          '  function intersection(array) {',
          '    var argsLength = arguments.length,',
          '        index = -1,',
          '        length = array.length,',
          '        result = [];',
          '',
          '    array: while (++index < length) {',
          '      var value = array[index]',
          '      if (indexOf(result, value) < 0) {',
          '        for (var argsIndex = 1; argsIndex < argsLength; argsIndex++) {',
          '          if (indexOf(arguments[argsIndex], value) < 0) {',
          '            continue array;',
          '          }',
          '        }',
          '        result.push(value);',
          '      }',
          '    }',
          '    return result',
          '  }'
        ].join('\n'));

        // replace `_.without`
        source = source.replace(/^( +)function without[\s\S]+?\n\1}/m, [
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

        // replace `arrayLikeClasses` in `_.isEmpty`
        source = source.replace(/'if *\(arrayLikeClasses[\s\S]+?' \|\|\\n/, "'if (isArray(value) || className == stringClass ||");

        // replace `arrayLikeClasses` in `_.isEqual`
        source = source.replace(/(?: *\/\/.*\n)*( +)var isArr *= *arrayLikeClasses[^}]+}/, '$1var isArr = isArray(a);');

        // remove "exit early" feature from `_.each`
        source = source.replace(/( +)var baseIteratorOptions *=[\s\S]+?\n\1.+?;/, function(match) {
          return match.replace(/if *\(callback[^']+/, 'callback(value, index, collection)');
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

        // remove `prototype` [[Enumerable]] fix from `_.keys`
        source = source.replace(/(?:\s*\/\/.*)*\n( +)if *\(.+?propertyIsEnumerable[\s\S]+?\n\1}/, '');

        // remove `prototype` [[Enumerable]] fix from `iteratorTemplate`
        source = source
          .replace(/(?: *\/\/.*\n)* *' *(?:<% *)?if *\(!hasDontEnumBug *(?:&&|\))[\s\S]+?<% *} *(?:%>|').+/g, '')
          .replace(/!hasDontEnumBug *\|\|/g, '');
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
        _.each(['isBindFast', 'nativeBind', 'nativeIsArray', 'nativeKeys'], function(varName) {
          source = removeVar(source, varName);
        });

        _.each(['bind', 'isArray'], function(methodName) {
          var snippet = matchFunction(source, methodName),
              modified = snippet;

          // remove native `Function#bind` branch in `_.bind`
          if (methodName == 'bind') {
            modified = modified.replace(/(?:\s*\/\/.*)*\s*return isBindFast[^:]+:\s*/, 'return ');
          }
          // remove native `Array.isArray` branch in `_.isArray`
          else {
            modified = modified.replace(/nativeIsArray * \|\|/, '');
          }
          source = source.replace(snippet, modified);
        });

        // replace `_.keys` with `shimKeys`
        if (!isRemoved(source, 'keys')) {
          source = source.replace(
            matchFunction(source, 'keys').replace(/[\s\S]+?var keys *=/, ''),
            matchFunction(source, 'shimKeys').replace(/[\s\S]+?var shimKeys *=/, '')
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

        source = removeVar(source, 'reNative');
        source = removeFromCreateIterator(source, 'nativeKeys');
      }

      /*----------------------------------------------------------------------*/

      if (isMobile) {
        // inline all functions defined with `createIterator`
        _.functions(lodash).forEach(function(methodName) {
          // match `methodName` with pseudo private `_` prefixes removed to allow matching `shimKeys`
          var reFunc = RegExp('(\\bvar ' + methodName.replace(/^_/, '') + ' *= *)createIterator\\(((?:{|[a-zA-Z])[\\s\\S]+?)\\);\\n');

          // skip if not defined with `createIterator`
          if (!reFunc.test(source)) {
            return;
          }
          // extract, format, and inject the compiled function's source code
          source = source.replace(reFunc, '$1' + getFunctionSource(lodash[methodName]) + ';\n');
        });

        // replace `callee` in `_.merge` with `merge`
        source = source.replace(matchFunction(source, 'merge'), function(match) {
          return match.replace(/\bcallee\b/g, 'merge');
        });

        if (isUnderscore) {
          // remove "compiled template cleanup" from `_.template`
          source = source.replace(/(?:\s*\/\/.*)*\n *source *=.+?isEvaluating.+?reEmptyStringLeading[\s\S]+?\);/, '');
          source = removeVar(source, 'reEmptyStringLeading');
          source = removeVar(source, 'reEmptyStringMiddle');
          source = removeVar(source, 'reEmptyStringTrailing');

          // replace `isArguments` and its fallback
          (function() {
            var snippet = matchFunction(source, 'isArguments')
              .replace(/function isArguments/, 'lodash.isArguments = function');

            source = removeFunction(source, 'isArguments');

            source = source.replace(getIsArgumentsFallback(source), function(match) {
              return snippet + '\n' + match
                .replace(/\bisArguments\b/g, 'lodash.$&')
                .replace(/\bnoArgsClass\b/g, '!lodash.isArguments(arguments)');
            });
          }());
        }
        else {
          source = removeIsArgumentsFallback(source);

          // remove `hasDontEnumBug`, `hasObjectSpliceBug`, `iteratesOwnLast`, `noArgsEnum` assignment
          source = source.replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n *var hasDontEnumBug\b[\s\S]+?}\(1\)\);\n/, '');

          // remove `hasObjectSpliceBug` fix from the mutator Array functions mixin
          source = source.replace(/(?:\s*\/\/.*)*\n( +)if *\(hasObjectSpliceBug[\s\S]+?\n\1}/, '');
        }

        // remove `iteratesOwnLast` from `isPlainObject`
        source = source.replace(/(?:\s*\/\/.*)*\n( +)if *\(iteratesOwnLast[\s\S]+?\n\1}/, '');

        // remove JScript [[DontEnum]] fix from `_.isEqual`
        source = source.replace(/(?:\s*\/\/.*)*\n( +)if *\(hasDontEnumBug[\s\S]+?\n\1}/, '');

        // remove `noArraySliceOnStrings` from `_.toArray`
        source = source.replace(/noArraySliceOnStrings *\?[^:]+: *([^)]+)/g, '$1');

        // remove `noCharByIndex` from `_.reduceRight`
        source = source.replace(/}\s*else if *\(noCharByIndex[^}]+/, '');

        source = removeVar(source, 'extendIteratorOptions');
        source = removeVar(source, 'iteratorTemplate');
        source = removeVar(source, 'noArraySliceOnStrings');
        source = removeVar(source, 'noCharByIndex');
        source = removeNoArgsClass(source);
        source = removeNoNodeClass(source);
      }
      else {
        // inline `iteratorTemplate` template
        source = source.replace(/(( +)var iteratorTemplate *= *)[\s\S]+?\n\2.+?;\n/, (function() {
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

          return '$1' + snippet + ';\n';
        }()));
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
        source = source.replace(/(?: *\/\/.*\n)*( +)if *\(typeof +define[\s\S]+?else /, '$1');
      }
      if (!isNode) {
        source = source.replace(/(?: *\/\/.*\n)*( +)if *\(typeof +module[\s\S]+?else *{([\s\S]+?\n)\1}\n/, '$1$2');
      }
      if (!isCommonJS) {
        source = source.replace(/(?: *\/\/.*\n)*(?:( +)else *{)?\s*freeExports\.\w+ *=[\s\S]+?(?:\n\1})?\n/, '');
      }
      if (!isGlobal) {
        source = source.replace(/(?:( +)(})? *else(?: *if *\(_\))? *{)?(?:\s*\/\/.*)*\s*(?:window\._|_\.templates) *=[\s\S]+?(?:\n\1})?\n/g, '$1$2\n');
      }
      // remove `if (freeExports) {...}` if it's empty
      if (isAMD && isGlobal) {
        source = source.replace(/(?: *\/\/.*\n)* *(?:else )?if *\(freeExports\) *{\s*}\n/, '');
      } else {
        source = source.replace(/(?: *\/\/.*\n)* *(?:else )?if *\(freeExports\) *{\s*}(?:\s*else *{([\s\S]+?) *})?\n/, '$1');
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
        // remove `lodash.prototype` additions
        source = source.replace(/(?:\s*\/\/.*)*\s*mixin\(lodash\)[\s\S]+?\/\*-+\*\//, '');
        // remove `hasObjectSpliceBug` assignment
        source = source.replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n *var hasObjectSpliceBug;|.+?hasObjectSpliceBug *=.+/g, '');
      }

      // remove pseudo private properties
      source = source.replace(/(?:(?:\s*\/\/.*)*\s*lodash\._[^=]+=.+\n)+/g, '\n');

      // assign debug source before further modifications that rely on the minifier
      // to remove unused variables and other dead code
      debugSource = source;

      // remove associated functions, variables, and code snippets that the minifier may miss
      if (isRemoved(source, 'clone')) {
        source = removeVar(source, 'cloneableClasses');
      }
      if (isRemoved(source, 'isArray')) {
        source = removeVar(source, 'nativeIsArray');
      }
      if (isRemoved(source, 'isPlainObject')) {
        source = removeVar(source, 'getPrototypeOf');
      }
      if (isRemoved(source, 'keys')) {
        source = removeFunction(source, 'shimKeys');
      }
      if (isRemoved(source, 'template')) {
        // remove `templateSettings` assignment
        source = source.replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n *lodash\.templateSettings[\s\S]+?};\n/, '');
      }
      if (isRemoved(source, 'toArray')) {
        source = removeVar(source, 'noArraySliceOnStrings');
      }
      if (isRemoved(source, 'clone', 'isArguments', 'isEmpty', 'isEqual')) {
        source = removeNoArgsClass(source);
      }
      if (isRemoved(source, 'isEqual', 'isPlainObject')) {
        source = removeNoNodeClass(source);
      }
      if ((source.match(/\bcreateIterator\b/g) || []).length < 2) {
        source = removeFunction(source, 'createIterator');
        source = source.replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n *var noArgsEnum;|.+?noArgsEnum *=.+/g, '');
      }
      if (isRemoved(source, 'createIterator', 'bind')) {
        source = removeVar(source, 'isBindFast');
        source = removeVar(source, 'isStrictFast');
        source = removeVar(source, 'nativeBind');
      }
      if (isRemoved(source, 'createIterator', 'bind', 'isArray', 'isPlainObject', 'keys')) {
        source = removeVar(source, 'reNative');
      }
      if (isRemoved(source, 'createIterator', 'isEmpty', 'isEqual')) {
        source = removeVar(source, 'arrayLikeClasses');
      }
      if (isRemoved(source, 'createIterator', 'isEqual')) {
        source = source.replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n *var hasDontEnumBug;|.+?hasDontEnumBug *=.+/g, '');
      }
      if (isRemoved(source, 'createIterator', 'isPlainObject')) {
        source = source.replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n *var iteratesOwnLast;|.+?iteratesOwnLast *=.+/g, '');
      }
      if (isRemoved(source, 'createIterator', 'keys')) {
        source = removeVar(source, 'nativeKeys');
        source = removeKeysOptimization(source);
      }
      if (!source.match(/var (?:hasDontEnumBug|hasObjectSpliceBug|iteratesOwnLast|noArgsEnum)\b/g)) {
        // remove `hasDontEnumBug`, `hasObjectSpliceBug`, `iteratesOwnLast`, and `noArgsEnum` assignment
        source = source.replace(/ *\(function\(\) *{[\s\S]+?}\(1\)\);/, '');
      }
    }

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
          // correct overly aggressive Closure Compiler minification
          source = source.replace(/prototype\s*=\s*{\s*valueOf\s*:\s*1\s*}/, 'prototype={valueOf:1,y:1}');

          // inject "use strict" directive
          if (isStrict) {
            source = source.replace(/^(\/\*![\s\S]+?\*\/\n;\(function[^)]+\){)([^'"])/, '$1"use strict";$2');
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
