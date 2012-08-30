#!/usr/bin/env node
;(function() {
  'use strict';

  /** The debug version of `source` */
  var debugSource;

  /** Load modules */
  var fs = require('fs'),
      path = require('path'),
      vm = require('vm'),
      minify = require(path.join(__dirname, 'build', 'minify'));

  /** The current working directory */
  var cwd = process.cwd();

  /** Flag used to specify a Backbone build */
  var isBackbone = process.argv.indexOf('backbone') > -1;

  /** Flag used to specify a Content Security Policy build */
  var isCSP = process.argv.indexOf('csp') > -1 || process.argv.indexOf('CSP') > -1;

  /** Flag used to specify a legacy build */
  var isLegacy = process.argv.indexOf('legacy') > -1;

  /** Flag used to specify an Underscore build */
  var isUnderscore = process.argv.indexOf('underscore') > -1;

  /** Flag used to specify a mobile build */
  var isMobile = !isLegacy && (isCSP || isUnderscore || process.argv.indexOf('mobile') > -1);

  /**
   * Flag used to specify `_.bindAll`, `_.extend`, and `_.defaults` are
   * constructed using the "use strict" directive.
   */
  var isStrict = process.argv.indexOf('strict') > -1;

  /** Flag used to specify if the build should include the "use strict" directive */
  var useStrict = isStrict || !(isLegacy || isMobile);

  /** Shortcut used to convert array-like objects to arrays */
  var slice = [].slice;

  /** The lodash.js source */
  var source = fs.readFileSync(path.join(__dirname, 'lodash.js'), 'utf8');

  /** Load customized Lo-Dash module */
  var lodash = (function() {
    var sandbox = {};

    if (isStrict) {
      source = setUseStrictOption(source, true);
    } else {
      source = removeUseStrictDirective(source);
      if (!useStrict) {
        source = setUseStrictOption(source, false);
      }
    }
    if (isLegacy) {
      source = replaceVar(source, 'noArgsClass', 'true');
      ['isBindFast', 'isKeysFast', 'isStrictFast', 'nativeBind', 'nativeIsArray', 'nativeKeys'].forEach(function(varName) {
        source = replaceVar(source, varName, 'false');
      });
    }
    else if (isUnderscore) {
      // remove `prototype` [[Enumerable]] fix from `iteratorTemplate`
      source = source
        .replace(/(?: *\/\/.*\n)*\s*' *(?:<% *)?if *\(!hasDontEnumBug *(?:&&|\))[\s\S]+?<% *} *(?:%>|').+/g, '')
        .replace(/!hasDontEnumBug *\|\|/g, '');
    }
    if (isMobile) {
      source = replaceVar(source, 'isKeysFast', 'false');
    }
    vm.runInNewContext(source, sandbox);
    return sandbox._;
  }());

  /** Used to associate aliases with their real names */
  var aliasToRealMap = {
    'all': 'every',
    'any': 'some',
    'collect': 'map',
    'detect': 'find',
    'each': 'forEach',
    'foldl': 'reduce',
    'foldr': 'reduceRight',
    'head': 'first',
    'include': 'contains',
    'inject': 'reduce',
    'methods': 'functions',
    'omit': 'drop',
    'select': 'filter',
    'tail': 'rest',
    'take': 'first',
    'unique': 'uniq'
  };

  /** Used to associate real names with their aliases */
  var realToAliasMap = {
    'contains': ['include'],
    'drop': ['omit'],
    'every': ['all'],
    'filter': ['select'],
    'find': ['detect'],
    'first': ['head', 'take'],
    'forEach': ['each'],
    'functions': ['methods'],
    'map': ['collect'],
    'reduce': ['foldl', 'inject'],
    'reduceRight': ['foldr'],
    'rest': ['tail'],
    'some': ['any'],
    'uniq': ['unique']
  };

  /** Used to track Backbone's Lo-Dash dependencies */
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
    'map',
    'max',
    'min',
    'mixin',
    'reduce',
    'reduceRight',
    'reject',
    'rest',
    'shuffle',
    'size',
    'some',
    'sortBy',
    'sortedIndex',
    'toArray',
    'uniqueId',
    'without'
  ];

  /** Used to track function dependencies */
  var dependencyMap = {
    'after': [],
    'bind': ['isFunction'],
    'bindAll': ['bind', 'isFunction'],
    'chain': ['mixin'],
    'clone': ['extend', 'forIn', 'forOwn', 'isArguments', 'isFunction'],
    'compact': [],
    'compose': [],
    'contains': [],
    'countBy': [],
    'debounce': [],
    'defaults': ['isArguments'],
    'defer': [],
    'delay': [],
    'difference': ['indexOf'],
    'drop': ['indexOf', 'isArguments'],
    'escape': [],
    'every': ['identity'],
    'extend': ['isArguments'],
    'filter': ['identity'],
    'find': [],
    'first': [],
    'flatten': ['isArray'],
    'forEach': [],
    'forIn': ['isArguments'],
    'forOwn': ['isArguments'],
    'functions': ['isArguments', 'isFunction'],
    'groupBy': [],
    'has': [],
    'identity': [],
    'indexOf': ['sortedIndex'],
    'initial': [],
    'intersection': ['indexOf'],
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
    'isRegExp': [],
    'isString': [],
    'isUndefined': [],
    'keys': ['isArguments'],
    'last': [],
    'lastIndexOf': [],
    'map': ['identity'],
    'max': [],
    'memoize': [],
    'merge': ['isArguments', 'isArray', 'forIn'],
    'min': [],
    'mixin': ['forEach', 'functions'],
    'noConflict': [],
    'once': [],
    'partial': [],
    'pick': [],
    'pluck': [],
    'range': [],
    'reduce': [],
    'reduceRight': ['keys'],
    'reject': ['identity'],
    'rest': [],
    'result': ['isFunction'],
    'shuffle': [],
    'size': ['isArguments', 'isFunction', 'keys'],
    'some': ['identity'],
    'sortBy': [],
    'sortedIndex': ['bind'],
    'tap': [],
    'template': ['escape'],
    'throttle': [],
    'times': [],
    'toArray': ['isFunction', 'values'],
    'unescape': [],
    'union': ['indexOf'],
    'uniq': ['identity', 'indexOf'],
    'uniqueId': [],
    'values': ['isArguments'],
    'where': ['forIn'],
    'without': ['indexOf'],
    'wrap': [],
    'zip': ['max', 'pluck'],
    'zipObject': []
  };

  /** Used to `iteratorTemplate` */
  var iteratorOptions = [
    'args',
    'array',
    'arrayBranch',
    'beforeLoop',
    'bottom',
    'exit',
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

  /** Collections of method names */
  var excludeMethods = [],
      includeMethods = [],
      allMethods = Object.keys(dependencyMap);

  var underscoreMethods = lodash.without.apply(lodash, [allMethods].concat([
    'countBy',
    'drop',
    'forIn',
    'forOwn',
    'merge',
    'partial',
    'unescape',
    'where',
    'zipObject'
  ]));

  /** Used to specify whether filtering is for exclusion or inclusion */
  var filterType = process.argv.reduce(function(result, value) {
    if (result) {
      return result;
    }
    var pair = value.match(/^(exclude|include)=(.*)$/);
    if (!pair) {
      return result;
    }
    // remove nonexistent method names
    var methodNames = lodash.intersection(allMethods, pair[2].split(/, */).map(getRealName));

    if (pair[1] == 'exclude') {
      excludeMethods = methodNames;
    } else {
      includeMethods = methodNames;
    }
    // return `filterType`
    return pair[1];
  }, '');

  /*--------------------------------------------------------------------------*/

  /**
   * Logs the help message to the console.
   *
   * @private
   */
  function displayHelp() {
    console.log([
      '',
      '  Commands:',
      '',
      '    lodash backbone      Build containing all methods required by Backbone',
      '    lodash csp           Build supporting default Content Security Policy restrictions',
      '    lodash legacy        Build tailored for older browsers without ES5 support',
      '    lodash mobile        Build with IE < 9 bug fixes and method compilation removed',
      '    lodash strict        Build with `_.bindAll`, `_.defaults`, and `_.extend` in strict mode',
      '    lodash underscore    Build containing only methods included in Underscore',
      '    lodash category=...  Comma separated categories of methods to include in the build',
      '    lodash exclude=...   Comma separated names of methods to exclude from the build',
      '    lodash include=...   Comma separated names of methods to include in the build',
      '',
      '    All arguments, except `backbone` with `underscore`, `exclude` with `include`,',
      '    and `legacy` with `csp`/`mobile`, may be combined.',
      '',
      '  Options:',
      '',
      '    -h, --help     Display help information',
      '    -V, --version  Output current version of Lo-Dash',
      ''
    ].join('\n'));
  }

  /**
   * Gets the aliases associated with a given function name.
   *
   * @private
   * @param {String} funcName The name of the function to get aliases for.
   * @returns {Array} Returns an array of aliases.
   */
  function getAliases(funcName) {
    return realToAliasMap[funcName] || [];
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
   * Gets an array of depenants for a function by a given name.
   *
   * @private
   * @param {String} funcName The name of the function to query.
   * @returns {Array} Returns an array of function dependants.
   */
  function getDependants(funcName) {
    // iterate over `dependencyMap`, adding the names of functions that
    // have `funcName` as a dependency
    return lodash.reduce(dependencyMap, function(result, dependencies, otherName) {
      if (lodash.contains(dependencies, funcName)) {
        result.push(otherName);
      }
      return result;
    }, []);
  }

  /**
   * Gets an array of dependencies for a given function name. If passed an array
   * of dependencies it will return an array containing the given dependencies
   * plus any additional detected sub-dependencies.
   *
   * @private
   * @param {Array|String} funcName A single function name or array of
   *  dependencies to query.
   * @returns {Array} Returns an array of function dependencies.
   */
  function getDependencies(funcName) {
    var dependencies = Array.isArray(funcName) ? funcName : dependencyMap[funcName];
    if (!dependencies) {
      return [];
    }
    // recursively accumulate the dependencies of the `funcName` function, and
    // the dependencies of its dependencies, and so on.
    return lodash.uniq(dependencies.reduce(function(result, otherName) {
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

    // all leading whitespace
    return source.replace(/\n(?:.*)/g, function(match, index) {
      match = match.slice(1);
      return (
        match == '}' && source.indexOf('}', index + 2) == -1 ? '\n  ' : '\n    '
      ) + match;
    });
  }

  /**
   * Gets the `_.isArguments` fallback snippet from `source`.
   *
   * @private
   * @param {String} source The source to inspect.
   * @returns {String} Returns the `isArguments` fallback snippet.
   */
  function getIsArgumentsFallback(source) {
    return (source.match(/(?:\s*\/\/.*)*\n( +)if *\(noArgsClass[\s\S]+?};\n\1}/) || [''])[0];
  }

  /**
   * Gets the real name, not alias, of a given function name.
   *
   * @private
   * @param {String} funcName The name of the function to resolve.
   * @returns {String} Returns the real name.
   */
  function getRealName(funcName) {
    return aliasToRealMap[funcName] || funcName;
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
      '\\n +/\\*[^*]*\\*+(?:[^/][^*]*\\*+)*/\\n' +
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
    source = source.replace(matchFunction(source, funcName), '');

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
    return source.replace(/(?:\s*\/\/.*)*\n( +)if *\(isFunction\(\/x\/[\s\S]+?};\n\1}/, '');
  }

  /**
   * Removes the `isPlainObject` fallback from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the source with the `isPlainObject` fallback removed.
   */
  function removeIsPlainObjectFallback(source) {
    return source.replace(/(?:\s*\/\/.*)*\n( +)if *\(!isPlainObject[\s\S]+?};\n\1}/, '');
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
      .replace(/(?: *\/\/.*\n)*\s*'( *)<% *if *\(isKeysFast[\s\S]+?'\1<% *} *else *\{ *%>.+\n([\s\S]+?) *'\1<% *} *%>.+/, '$2')
      // remove `isKeysFast` from `beforeLoop.object` of `mapIteratorOptions`
      .replace(/=\s*'\s*\+\s*\(isKeysFast.+/, "= []'")
      // remove `isKeysFast` from `inLoop.object` of `mapIteratorOptions`, `invoke`, `pluck`, and `sortBy`
      .replace(/'\s*\+\s*\(isKeysFast[^)]+?\)\s*\+\s*'/g, '.push')
      // remove data object property assignment in `createIterator`
      .replace(/\s*.+?\.isKeysFast *=.+/, '');
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
      // remove `noArgsClass` from `_.clone`, `_.isEqual`, and `_.size`
      .replace(/ *\|\| *\(noArgsClass *&&[^)]+?\)\)/g, '')
      // remove `noArgsClass` from `_.isEqual`
      .replace(/if *\(noArgsClass[^}]+?}\n/, '');
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
   * Removes the "use strict" directive from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeUseStrictDirective(source) {
    return source.replace(/(["'])use strict\1;( *\n)?/, '');
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
    source = source.replace(RegExp(
      // begin non-capturing group
      '(?:' +
      // match multi-line comment block
      '(?:\\n +/\\*[^*]*\\*+(?:[^/][^*]*\\*+)*/)?\\n' +
      // match a variable declaration that's not part of a declaration list
      '( +)var ' + varName + ' *= *(?:.+?;|(?:Function\\(.+?|.*?[^,])\\n[\\s\\S]+?\\n\\1.+?;)\\n|' +
      // match a variable in a declaration list
      '\\n +' + varName + ' *=.+?,' +
      // end non-capturing group
      ')'
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
    source = source.replace(RegExp(
      '(( +)var ' + varName + ' *= *)' +
      '(?:.+?;|(?:Function\\(.+?|.*?[^,])\\n[\\s\\S]+?\\n\\2.+?;)\\n'
    ), '$1' + varValue + ';\n');

    // replace a varaible at the start or middle of a declaration list
    source = source.replace(RegExp('((?:var|\\n) +' + varName + ' *=).+?,'), '$1 ' + varValue + ',');

    // replace a variable at the end of a variable declaration list
    source = source.replace(RegExp('(,\\s*' + varName + ' *=).+?;'), '$1 ' + varValue + ';');

    return source;
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
      // remove `useStrict` variable assignment in `createIterator`
      .replace(/,\s*useStrict *=[^;]+/, '')
      // remove `useStrict` data object property assignment in `createIterator`
      .replace(/\s*.+?\.useStrict *=.+/, '');
  }

  /**
   * Writes `source` to a file with the given `filename` to the current
   * working directory.
   *
   * @private
   * @param {String} source The source to write.
   * @param {String} filename The name of the file.
   */
  function writeFile(source, filename) {
    // correct overly aggressive Closure Compiler minification
    source = source.replace(/prototype\s*=\s*{\s*valueOf\s*:\s*1\s*}/, 'prototype={valueOf:1,y:1}');

    // re-remove "use strict" added by the minifier
    if (!isStrict) {
      source = removeUseStrictDirective(source);
    }
    fs.writeFileSync(path.join(cwd, filename), source);
  }

  /*--------------------------------------------------------------------------*/

  // display help message
  if (lodash.find(process.argv, function(arg) {
        return /^(?:-h|--help)$/.test(arg);
      })) {
    displayHelp();
    process.exit();
  }

  // display `lodash.VERSION`
  if (lodash.find(process.argv, function(arg) {
        return /^(?:-V|--version)$/.test(arg);
      })) {
    console.log(lodash.VERSION);
    process.exit();
  }

  /*--------------------------------------------------------------------------*/

  // don't expose `_.forIn` or `_.forOwn` if `isUnderscore` is `true` unless
  // requested by `include`
  if (isUnderscore) {
    if (includeMethods.indexOf('forIn')  == -1) {
      source = source.replace(/ *lodash\.forIn *=.+\n/, '');
    }
    if (includeMethods.indexOf('forOwn') == -1) {
      source = source.replace(/ *lodash\.forOwn *=.+\n/, '');
    }
  }

  // add methods required by Backbone or Underscore
  [
    { 'flag': isBackbone, 'methodNames': backboneDependencies },
    { 'flag': isUnderscore, 'methodNames': underscoreMethods }
  ]
  .some(function(data) {
    var flag = data.flag,
        methodNames = data.methodNames;

    if (!flag) {
      return false;
    }
    // add any additional sub-dependencies
    methodNames = getDependencies(methodNames);

    if (filterType == 'exclude') {
      // remove excluded methods from `methodNames`
      includeMethods = lodash.without.apply(lodash, [methodNames].concat(excludeMethods));
    }
    else if (filterType) {
      // merge `methodNames` into `includeMethods`
      includeMethods = lodash.union(includeMethods, methodNames);
    }
    else {
      // include only the `methodNames`
      includeMethods = methodNames;
    }
    filterType = 'include';
    return true;
  });

  /*--------------------------------------------------------------------------*/

  // add category methods
  process.argv.some(function(value) {
    var categories = value.match(/^category=(.*)$/);
    if (!categories) {
      return false;
    }
    // resolve method names belonging to each category
    var categoryMethods = categories.reduce(function(result, category) {
      return result.concat(allMethods.filter(function(funcName) {
        return RegExp('@category ' + category + '\\b', 'i').test(matchFunction(source, funcName));
      }));
    }, []);

    if (filterType == 'exclude') {
      // remove excluded methods from `categoryMethods`
      includeMethods = lodash.without.apply(lodash, [categoryMethods].concat(excludeMethods));
    }
    else if (filterType) {
      // merge `categoryMethods` into `includeMethods`
      includeMethods = lodash.union(includeMethods, categoryMethods);
    }
    else {
      // include only the `categoryMethods`
      includeMethods = categoryMethods;
    }
    filterType = 'include';
    return true;
  });

  /*--------------------------------------------------------------------------*/

  // custom build
  (function() {
    // exit early if "exclude" or "include" options aren't specified
    if (!filterType) {
      return;
    }
    if (filterType == 'exclude') {
      // remove methods that are named in `excludeMethods` and their dependants
      excludeMethods.forEach(function(funcName) {
        getDependants(funcName).concat(funcName).forEach(function(otherName) {
          source = removeFunction(source, otherName);
        });
      });
    }
    else {
      // add dependencies to `includeMethods`
      includeMethods = getDependencies(includeMethods);

      // remove methods that aren't named in `includeMethods`
      lodash.each(allMethods, function(otherName) {
        if (!lodash.contains(includeMethods, otherName)) {
          source = removeFunction(source, otherName);
        }
      });
    }

    // remove `isArguments` fallback before `isArguments` is transformed by
    // other parts of the build process
    if (isRemoved(source, 'isArguments')) {
      source = removeIsArgumentsFallback(source);
    }
  }());

  /*--------------------------------------------------------------------------*/

  // simplify template snippets by removing unnecessary brackets
  source = source.replace(
    RegExp("{(\\\\n' *\\+\\s*.*?\\+\\n\\s*' *)}(?:\\\\n)?' *([,\\n])", 'g'), "$1'$2"
  );

  source = source.replace(
    RegExp("{(\\\\n' *\\+\\s*.*?\\+\\n\\s*' *)}(?:\\\\n)?' *\\+", 'g'), "$1;\\n'+"
  );

  /*--------------------------------------------------------------------------*/

  // DRY out isType functions
  (function() {
    var iteratorName = lodash.find(['forEach', 'forOwn'], function(funcName) {
      return !isRemoved(source, funcName);
    });

    // skip this optimization if there are no iteration methods to use
    if (!iteratorName) {
      return;
    }
    var funcNames = [],
        objectSnippets = [];

    // build replacement code
    lodash.forOwn({
      'Date': 'dateClass',
      'Number': 'numberClass',
      'RegExp': 'regexpClass',
      'String': 'stringClass'
    }, function(value, key) {
      var funcName = 'is' + key,
          funcCode = matchFunction(source, funcName);

      if (funcCode) {
        funcNames.push(funcName);
        objectSnippets.push("'" + key + "': " + value);
      }
    });

    // skip this optimization if there are less than 2 isType functions
    if (funcNames.length < 2) {
      return;
    }

    // remove existing isType functions
    funcNames.forEach(function(funcName) {
      source = removeFunction(source, funcName);
    });

    // insert new DRY code after the method assignments
    var snippet = getMethodAssignments(source);
    source = source.replace(snippet, snippet + '\n' +
      '  // add `_.' + funcNames.join('`, `_.') + '`\n' +
      '  ' + iteratorName + '({\n    ' + objectSnippets.join(',\n    ') + '\n  }, function(className, key) {\n' +
      "    lodash['is' + key] = function(value) {\n" +
      '      return toString.call(value) == className;\n' +
      '    };\n' +
      '  });\n'
    );
  }());

  /*--------------------------------------------------------------------------*/

  if (isLegacy) {
    ['isBindFast', 'nativeBind', 'nativeIsArray', 'nativeKeys'].forEach(function(varName) {
      source = removeVar(source, varName);
    });

    ['bind', 'isArray'].forEach(function(funcName) {
      var snippet = matchFunction(source, funcName),
          modified = snippet;

      // remove native `Function#bind` branch in `_.bind`
      if (funcName == 'bind') {
        modified = modified.replace(/(?:\s*\/\/.*)*\s*else if *\(isBindFast[^}]+}/, '');
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
    source = removeKeysOptimization(source);
  }

  if (isMobile) {
    // inline all functions defined with `createIterator`
    lodash.functions(lodash).forEach(function(funcName) {
      // match `funcName` with pseudo private `_` prefixes removed to allow matching `shimKeys`
      var reFunc = RegExp('(\\bvar ' + funcName.replace(/^_/, '') + ' *= *)createIterator\\(((?:{|[a-zA-Z])[\\s\\S]+?)\\);\\n');

      // skip if not defined with `createIterator`
      if (!reFunc.test(source)) {
        return;
      }
      // extract, format, and inject the compiled function's source code
      source = source.replace(reFunc, '$1' + getFunctionSource(lodash[funcName]) + ';\n');
    });

    // replace `callee` in `_.merge` with `merge`
    source = source.replace(matchFunction(source, 'merge'), function(match) {
      return match.replace(/\bcallee\b/g, 'merge');
    });

    if (!isUnderscore) {
      source = removeIsArgumentsFallback(source);
      source = removeIsPlainObjectFallback(source);
      source = removeNoArgsClass(source);
    }

    // remove `hasDontEnumBug`, `hasObjectSpliceBug`, `iteratesOwnLast`, `noArgsEnum` assignment
    source = source.replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n *var hasDontEnumBug\b[\s\S]+?}\(1\)\);\n/, '');

    // remove `iteratesOwnLast` from `isPlainObject`
    source = source.replace(/(?:\s*\/\/.*)*\n( +)if *\(iteratesOwnLast[\s\S]+?\n\1}/, '');

    // remove JScript [[DontEnum]] fix from `_.isEqual`
    source = source.replace(/(?:\s*\/\/.*)*\n( +)if *\(hasDontEnumBug[\s\S]+?\n\1}/, '');

    // remove `hasObjectSpliceBug` fix from the mutator Array functions mixin
    source = source.replace(/(?:\s*\/\/.*)*\n( +)if *\(hasObjectSpliceBug[\s\S]+?\n\1}/, '');

    // remove `noArraySliceOnStrings` from `_.toArray`
    source = source.replace(/noArraySliceOnStrings *\?[^:]+: *([^)]+)/g, '$1');

    // remove `noCharByIndex` from `_.reduceRight`
    source = source.replace(/noCharByIndex *&&[^:]+: *([^;]+)/g, '$1');

    source = removeVar(source, 'extendIteratorOptions');
    source = removeVar(source, 'iteratorTemplate');
    source = removeVar(source, 'noArraySliceOnStrings');
    source = removeVar(source, 'noCharByIndex');
    source = removeKeysOptimization(source);
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
        .replace(/\(\(__t *= *\( *([^)]+) *\)\) *== *null *\? *'' *: *__t\)/g, '$1');

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

  /*--------------------------------------------------------------------------*/

  // modify/remove references to removed methods/variables
  if (isRemoved(source, 'isArguments')) {
    source = replaceVar(source, 'noArgsClass', 'false');
  }
  if (isRemoved(source, 'isFunction')) {
    source = removeIsFunctionFallback(source);
  }
  if (isRemoved(source, 'mixin')) {
    // remove `LoDash` constructor
    source = removeFunction(source, 'LoDash');
    // remove `LoDash` calls
    source = source.replace(/(?:new +LoDash(?!\()|(?:new +)?LoDash\([^)]*\));?/g, '');
    // remove `LoDash.prototype` additions
    source = source.replace(/(?:\s*\/\/.*)*\s*LoDash.prototype *=[\s\S]+?\/\*-+\*\//, '');
    // remove `hasObjectSpliceBug` assignment
    source = source.replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n *var hasObjectSpliceBug;|.+?hasObjectSpliceBug *=.+/g, '');
  }

  // remove pseudo private properties
  source = source.replace(/(?:(?:\s*\/\/.*)*\s*lodash\._[^=]+=.+\n)+/g, '\n');

  // assign debug source before further modifications that rely on the minifier
  // to remove unused variables and other dead code
  debugSource = source;

  // remove associated functions, variables, and code snippets that the minifier may miss
  if (isRemoved(source, 'isArray')) {
    source = removeVar(source, 'nativeIsArray');
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
  if (isRemoved(source, 'clone', 'merge')) {
    source = removeFunction(source, 'isPlainObject');
  }
  if (isRemoved(source, 'clone', 'isArguments', 'isEmpty', 'isEqual', 'size')) {
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
  if (isRemoved(source, 'createIterator', 'bind', 'isArray', 'keys')) {
    source = removeVar(source, 'reNative');
  }
  if (isRemoved(source, 'createIterator', 'clone', 'merge')) {
    source = removeIsPlainObjectFallback(source);
    source = source.replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n *var iteratesOwnLast;|.+?iteratesOwnLast *=.+/g, '');
  }
  if (isRemoved(source, 'createIterator', 'isEqual')) {
    source = source.replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n *var hasDontEnumBug;|.+?hasDontEnumBug *=.+/g, '');
  }
  if (isRemoved(source, 'createIterator', 'keys')) {
    source = removeVar(source, 'nativeKeys');
  }
  if (!source.match(/var (?:hasDontEnumBug|hasObjectSpliceBug|iteratesOwnLast|noArgsEnum)\b/g)) {
    // remove `hasDontEnumBug`, `hasObjectSpliceBug`, `iteratesOwnLast`, and `noArgsEnum` assignment
    source = source.replace(/ *\(function\(\) *{[\s\S]+?}\(1\)\);/, '');
  }

  // consolidate consecutive horizontal rule comment separators
  source = source.replace(/(?:\s*\/\*-+\*\/\s*){2,}/g, function(separators) {
    return separators.match(/^\s*/)[0] + separators.slice(separators.lastIndexOf('/*'));
  });

  // cleanup code
  source = source.replace(/^ *;\n/gm, '');

  // begin the minification process
  if (filterType || isBackbone || isLegacy || isMobile || isStrict || isUnderscore) {
    writeFile(debugSource, 'lodash.custom.js');

    minify(source, 'lodash.custom.min', function(result) {
      writeFile(result, 'lodash.custom.min.js');
    });
  }
  else {
    minify(source, 'lodash.min', function(result) {
      writeFile(result, 'lodash.min.js');
    });
  }
}());
