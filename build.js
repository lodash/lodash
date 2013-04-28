#!/usr/bin/env node
;(function() {
  'use strict';

  /** Load Node.js modules */
  var vm = require('vm');

  /** Load other modules */
  var _ = require('./lodash.js'),
      minify = require('./build/minify.js'),
      util = require('./build/util.js');

  /** Module shortcuts */
  var fs = util.fs,
      path = util.path;

  /** The current working directory */
  var cwd = process.cwd();

  /** Used for array method references */
  var arrayRef = [];

  /** Shortcut used to push arrays of values to an array */
  var push = arrayRef.push;

  /** Used to detect the Node.js executable in command-line arguments */
  var reNode = RegExp('(?:^|' + path.sepEscaped + ')node(?:\\.exe)?$');

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
    'object': 'zipObject',
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
    'uniq': ['unique'],
    'zipObject': ['object']
  };

  /** Used to track function dependencies */
  var dependencyMap = {
    'after': [],
    'assign': ['isArray', 'keys'],
    'at': ['isString'],
    'bind': ['isFunction', 'isObject'],
    'bindAll': ['bind', 'functions'],
    'bindKey': ['isFunction', 'isObject'],
    'clone': ['assign', 'forEach', 'forOwn', 'isArray', 'isObject'],
    'cloneDeep': ['clone'],
    'compact': [],
    'compose': [],
    'contains': ['indexOf', 'isString'],
    'countBy': ['createCallback', 'forEach'],
    'createCallback': ['identity', 'isEqual', 'keys'],
    'debounce': [],
    'defaults': ['isArray', 'keys'],
    'defer': ['bind'],
    'delay': [],
    'difference': ['indexOf'],
    'escape': [],
    'every': ['createCallback', 'isArray'],
    'filter': ['createCallback', 'isArray'],
    'find': ['createCallback', 'forEach', 'isArray'],
    'findIndex': ['createCallback'],
    'findKey': ['createCallback'],
    'first': [],
    'flatten': ['createCallback', 'isArray'],
    'forEach': ['createCallback', 'isArguments', 'isArray', 'isString', 'keys'],
    'forIn': ['createCallback', 'isArguments'],
    'forOwn': ['createCallback', 'isArguments', 'keys'],
    'functions': ['forIn', 'isFunction'],
    'groupBy': ['createCallback', 'forEach'],
    'has': [],
    'identity': [],
    'indexOf': ['sortedIndex'],
    'initial': [],
    'intersection': ['indexOf'],
    'invert': ['keys'],
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
    'map': ['createCallback', 'isArray'],
    'max': ['createCallback', 'isArray', 'isString'],
    'memoize': [],
    'merge': ['forEach', 'forOwn', 'isArray', 'isObject', 'isPlainObject'],
    'min': ['createCallback', 'isArray', 'isString'],
    'mixin': ['forEach', 'functions'],
    'noConflict': [],
    'omit': ['forIn', 'indexOf'],
    'once': [],
    'pairs': ['keys'],
    'parseInt': ['isString'],
    'partial': ['isFunction', 'isObject'],
    'partialRight': ['isFunction', 'isObject'],
    'pick': ['forIn', 'isObject'],
    'pluck': ['map'],
    'random': [],
    'range': [],
    'reduce': ['createCallback', 'isArray'],
    'reduceRight': ['createCallback', 'forEach', 'isString', 'keys'],
    'reject': ['createCallback', 'filter'],
    'rest': [],
    'result': ['isFunction'],
    'runInContext': ['defaults', 'pick'],
    'shuffle': ['forEach'],
    'size': ['keys'],
    'some': ['createCallback', 'isArray'],
    'sortBy': ['createCallback', 'forEach'],
    'sortedIndex': ['createCallback', 'identity'],
    'tap': ['value'],
    'template': ['defaults', 'escape', 'keys', 'values'],
    'throttle': [],
    'times': ['createCallback'],
    'toArray': ['isString', 'values'],
    'unescape': [],
    'union': ['isArray', 'uniq'],
    'uniq': ['createCallback', 'indexOf'],
    'uniqueId': [],
    'unzip': ['max', 'pluck'],
    'value': ['forOwn', 'isArray'],
    'values': ['keys'],
    'where': ['filter'],
    'without': ['difference'],
    'wrap': [],
    'zip': ['max', 'pluck'],
    'zipObject': [],

    // method used by the `backbone` and `underscore` builds
    'chain': ['value'],
    'findWhere': ['find']
  };

  /** Used to inline `iteratorTemplate` */
  var iteratorOptions = [
    'args',
    'arrays',
    'bottom',
    'firstArg',
    'init',
    'loop',
    'shadowedProps',
    'top',
    'useHas',
    'useKeys'
  ];

  /** List of all methods */
  var allMethods = _.without(_.keys(dependencyMap));

  /** List of Lo-Dash methods */
  var lodashMethods = _.without(allMethods, 'chain', 'findWhere');

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
    'invert',
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
    'omit',
    'once',
    'pairs',
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
    'values',
    'without'
  ];

  /** List of Lo-Dash only methods */
  var lodashOnlyMethods = [
    'at',
    'bindKey',
    'cloneDeep',
    'createCallback',
    'findIndex',
    'findKey',
    'forIn',
    'forOwn',
    'isPlainObject',
    'merge',
    'parseInt',
    'partialRight',
    'runInContext',
    'unzip'
  ];

  /** List of Underscore methods */
  var underscoreMethods = _.without.apply(_, [allMethods].concat(lodashOnlyMethods));

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
      var indent = getIndent(match);
      return match && (indent + [
        '',
        '/**',
        ' * Creates a `lodash` object that wraps the given `value`.',
        ' *',
        ' * @static',
        ' * @memberOf _',
        ' * @category Chaining',
        ' * @param {Mixed} value The value to wrap.',
        ' * @returns {Object} Returns the wrapper object.',
        ' * @example',
        ' *',
        ' * var stooges = [',
        " *   { 'name': 'moe', 'age': 40 },",
        " *   { 'name': 'larry', 'age': 50 },",
        " *   { 'name': 'curly', 'age': 60 }",
        ' * ];',
        ' *',
        ' * var youngest = _.chain(stooges)',
        ' *     .sortBy(function(stooge) { return stooge.age; })',
        " *     .map(function(stooge) { return stooge.name + ' is ' + stooge.age; })",
        ' *     .first();',
        " * // => 'moe is 40'",
        ' */',
        'function chain(value) {',
        '  value = new lodashWrapper(value);',
        '  value.__chain__ = true;',
        '  return value;',
        '}',
        '',
        match
      ].join('\n' + indent));
    });

    // add `wrapperChain`
    source = source.replace(matchFunction(source, 'wrapperToString'), function(match) {
      var indent = getIndent(match);
      return match && (indent + [
        '',
        '/**',
        ' * Enables method chaining on the wrapper object.',
        ' *',
        ' * @name chain',
        ' * @memberOf _',
        ' * @category Chaining',
        ' * @returns {Mixed} Returns the wrapper object.',
        ' * @example',
        ' *',
        ' * var sum = _([1, 2, 3])',
        ' *     .chain()',
        ' *     .reduce(function(sum, num) { return sum + num; })',
        ' *     .value()',
        ' * // => 6`',
        ' */',
        'function wrapperChain() {',
        '  this.__chain__ = true;',
        '  return this;',
        '}',
        '',
        match
      ].join('\n' + indent));
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

    // replace `_.mixin`
    source = replaceFunction(source, 'mixin', [
      'function mixin(object) {',
      '  forEach(functions(object), function(methodName) {',
      '    var func = lodash[methodName] = object[methodName];',
      '',
      '    lodash.prototype[methodName] = function() {',
      '      var args = [this.__wrapped__];',
      '      push.apply(args, arguments);',
      '',
      '      var result = func.apply(lodash, args);',
      '      if (this.__chain__) {',
      '        result = new lodashWrapper(result);',
      '        result.__chain__ = true;',
      '      }',
      '      return result;',
      '    };',
      '  });',
      '}'
    ].join('\n'));

    // replace wrapper `Array` method assignments
    source = source.replace(/^(?:(?: *\/\/.*\n)*(?: *if *\(.+\n)?( *)(each|forEach)\(\['[\s\S]+?\n\1}\);(?:\n *})?\n+)+/m, function(match, indent, funcName) {
      return indent + [
        '// add `Array` mutator functions to the wrapper',
        funcName + "(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {",
        '  var func = arrayRef[methodName];',
        '  lodash.prototype[methodName] = function() {',
        '    var value = this.__wrapped__;',
        '    func.apply(value, arguments);',
        '',
        '    // avoid array-like object bugs with `Array#shift` and `Array#splice`',
        '    // in Firefox < 10 and IE < 9',
        '    if (!support.spliceObjects && value.length === 0) {',
        '      delete value[0];',
        '    }',
        '    return this;',
        '  };',
        '});',
        '',
        '// add `Array` accessor functions to the wrapper',
        funcName + "(['concat', 'join', 'slice'], function(methodName) {",
        '  var func = arrayRef[methodName];',
        '  lodash.prototype[methodName] = function() {',
        '    var value = this.__wrapped__,',
        '        result = func.apply(value, arguments);',
        '',
        '    if (this.__chain__) {',
        '      result = new lodashWrapper(result);',
        '      result.__chain__ = true;',
        '    }',
        '    return result;',
        '  };',
        '});',
        ''
      ].join('\n' + indent);
    });

    // move `mixin(lodash)` to after the method assignments
    source = source.replace(/(?:\s*\/\/.*)*\n( *)mixin\(lodash\).+/, '');
    source = source.replace(getMethodAssignments(source), function(match) {
      var indent = /^ *(?=lodash\.)/m.exec(match)[0];
      return match + [
        '',
        '',
        '// add functions to `lodash.prototype`',
        'mixin(lodash);'
      ].join('\n' + indent);
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
    return source.replace(/(\/\**\n)( \*)( *@license[\s*]+)( *Lo-Dash [\w.-]+)(.*)/, function() {
      // remove `node path/to/build.js` from `commands`
      if (reNode.test(commands[0])) {
        commands.splice(0, 2);
      }
      // add quotes to commands with spaces or equals signs
      commands = _.map(commands, function(command) {
        var separator = (command.match(/[= ]/) || [''])[0];
        if (separator) {
          var pair = command.split(separator);
          command = pair[0] + separator + '"' + pair[1] + '"';
        }
        // escape newlines, carriage returns, multi-line comment end tokens
        command = command
          .replace(/\n/g, '\\n')
          .replace(/\r/g, '\\r')
          .replace(/\*\//g, '*\\/');

        return command;
      });
      // add build commands to copyright/license header
      var parts = slice.call(arguments, 1);
      return (
        parts[0] +
        parts[1] +
        parts[2] + parts[3] + ' (Custom Build)' + parts[4] + '\n' +
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
      "  var freeExports = typeof exports == 'object' && typeof require == 'function' && exports;",
      '',
      "  var freeModule = typeof module == 'object' && module && module.exports == freeExports && module;",
      '',
      "  var freeGlobal = typeof global == 'object' && global;",
      '  if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {',
      '    window = freeGlobal;',
      '  }',
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
      "  } else if (freeExports && !freeExports.nodeType) {",
      "    _ = require('" + options.moduleId + "');",
      "    if (freeModule) {",
      '      (freeModule.exports = templates).templates = templates;',
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
   * Capitalizes a given string.
   *
   * @private
   * @param {String} string The string to capitalize.
   * @returns {String} Returns the capitalized string.
   */
  function capitalize(string) {
    return string[0].toUpperCase() + string.toLowerCase().slice(1);
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
      // remove extraneous whitespace
      .replace(/^ *\n/gm, '\n')
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
      '    lodash legacy        Build tailored for older environments without ES5 support',
      '    lodash modern        Build tailored for newer environments with ES5 support',
      '    lodash mobile        Build without method compilation and most bug fixes for old browsers',
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
      '                         (e.g. `lodash iife="!function(window){%output%}(this)"`)',
      '',
      '    lodash template=...  File path pattern used to match template files to precompile',
      '                         (e.g. `lodash template=./*.jst`)',
      '    lodash settings=...  Template settings used when precompiling templates',
      '                         (e.g. `lodash settings="{interpolate:/{{([\\s\\S]+?)}}/g}"`)',
      '    lodash moduleId=...  The AMD module ID of Lo-Dash, which defaults to “lodash”, used by precompiled templates',
      '',
      '    All arguments, except `legacy` with `mobile`, `modern`, or `underscore`, may be combined.',
      '    Unless specified by `-o` or `--output`, all files created are saved to the current working directory.',
      '',
      '  Options:',
      '',
      '    -c, --stdout      Write output to standard output',
      '    -d, --debug       Write only the non-minified development output',
      '    -h, --help        Display help information',
      '    -m, --minify      Write only the minified production output',
      '    -o, --output      Write output to a given path/filename',
      '    -p, --source-map  Generate a source map for the minified output, using an optional source map URL',
      '    -s, --silent      Skip status updates normally logged to the console',
      '    -V, --version     Output current version of Lo-Dash',
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
   * Gets the category of the given method name.
   *
   * @private
   * @param {String} source The source to inspect.
   * @param {String} methodName The method name.
   * @returns {String} Returns the method name's category.
   */
  function getCategory(source, methodName) {
    var result = /@category +(\w+)/.exec(matchFunction(source, methodName));
    return result ? result[1] : '';
  }

  /**
   * Gets an array of category dependencies for a given category.
   *
   * @private
   * @param {String} source The source to inspect.
   * @param {String} category The category.
   * @returns {Array} Returns an array of cetegory dependants.
   */
  function getCategoryDependencies(source, category) {
    var methods = _.uniq(getMethodsByCategory(source, category).reduce(function(result, methodName) {
      push.apply(result, getDependencies(methodName));
      return result;
    }, []));

    var categories = _.uniq(methods.map(function(methodName) {
      return getCategory(source, methodName);
    }));

    return categories.filter(function(other) {
      return other != category;
    });
  }

  /**
   * Gets an array of depenants for a method by a given name.
   *
   * @private
   * @param {String} methodName The method name.
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
   * @param- {Object} [stackA=[]] Internally used track queried methods.
   * @returns {Array} Returns an array of method dependencies.
   */
  function getDependencies(methodName, stack) {
    var dependencies = Array.isArray(methodName) ? methodName : dependencyMap[methodName];
    if (!dependencies) {
      return [];
    }
    stack || (stack = []);

    // recursively accumulate the dependencies of the `methodName` function, and
    // the dependencies of its dependencies, and so on
    return _.uniq(dependencies.reduce(function(result, otherName) {
      if (!_.contains(stack, otherName)) {
        stack.push(otherName);
        result.push.apply(result, getDependencies(otherName, stack).concat(otherName));
      }
      return result;
    }, []));
  }

  /**
   * Gets the formatted source of the given function.
   *
   * @private
   * @param {Function} func The function to process.
   * @param {String} indent The function indent.
   * @returns {String} Returns the formatted source.
   */
  function getFunctionSource(func, indent) {
    var source = func.source || (func + '');
    if (indent == null) {
      indent = '  ';
    }
    // format leading whitespace
    return source.replace(/\n(?:.*)/g, function(match, index) {
      match = match.slice(1);
      return (
        '\n' + indent +
        (match == '}' && !_.contains(source, '}', index + 2) ? '' : '  ')
      ) + match;
    });
  }

  /**
   * Gets the indent of the given function.
   *
   * @private
   * @param {Function} func The function to process.
   * @returns {String} Returns the indent.
   */
  function getIndent(func) {
    return /^ *(?=\S)/m.exec(func.source || func)[0];
  }

  /**
   * Gets the `_.isArguments` fallback from `source`.
   *
   * @private
   * @param {String} source The source to inspect.
   * @returns {String} Returns the `isArguments` fallback.
   */
  function getIsArgumentsFallback(source) {
    return (source.match(/(?:\s*\/\/.*)*\n( *)if *\((?:!support\.argsClass|!isArguments)[\s\S]+?};\n\1}/) || [''])[0];
  }

  /**
   * Gets the `_.isArray` fallback from `source`.
   *
   * @private
   * @param {String} source The source to inspect.
   * @returns {String} Returns the `isArray` fallback.
   */
  function getIsArrayFallback(source) {
    return matchFunction(source, 'isArray')
      .replace(/^[\s\S]+?=\s*nativeIsArray\b/, '')
      .replace(/[;\s]+$/, '');
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
   * Gets the names of methods in `source` belonging to the given `category`.
   *
   * @private
   * @param {String} source The source to inspect.
   * @param {String} category The category to filter by.
   * @returns {Array} Returns a new array of method names belonging to the given category.
   */
  function getMethodsByCategory(source, category) {
    return allMethods.filter(function(methodName) {
      return getCategory(source, methodName) == category;
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
      return !(
        matchFunction(source, funcName) ||
        RegExp('^ *lodash\\.prototype\\.' + funcName + ' *=.+', 'm').test(source)
      );
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
      // match multi-line comment block
      '(?:\\n +/\\*[^*]*\\*+(?:[^/][^*]*\\*+)*/)?\\n' +
      // begin non-capturing group
      '( *)(?:' +
      // match a function declaration
      'function ' + funcName + '\\b[\\s\\S]+?\\n\\1}|' +
      // match a variable declaration with function expression
      'var ' + funcName + ' *=.*?function[\\s\\S]+?\\n\\1};' +
      // end non-capturing group
      ')\\n'
    ));

    // match variables that are explicitly defined as functions
    result || (result = source.match(RegExp(
      // match multi-line comment block
      '(?:\\n +/\\*[^*]*\\*+(?:[^/][^*]*\\*+)*/)?\\n' +
      // match simple variable declarations and those with `createIterator`
      ' *var ' + funcName + ' *=(?:.+?|.*?createIterator\\([\\s\\S]+?\\));\\n'
    )));

    return /@type +Function|function\s*\w*\(/.test(result) ? result[0] : '';
  }

  /**
   * Converts a comma separated options string into an array.
   *
   * @private
   * @param {String} value The option to convert.
   * @returns {Array} Returns the new converted array.
   */
  function optionToArray(value) {
    return _.compact(_.isArray(value)
      ? value
      : value.match(/\w+=(.*)$/)[1].split(/, */)
    );
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

    // convert aliases to real method names
    methodNames = methodNames.map(getRealName);

    // remove nonexistent and duplicate method names
    return _.uniq(_.intersection(allMethods, methodNames));
  }

  /**
   * Removes the all references to `varName` from `createIterator` in `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @param {String} identifier The name of the variable or property to remove.
   * @returns {String} Returns the modified source.
   */
  function removeFromCreateIterator(source, identifier) {
    var snippet = matchFunction(source, 'createIterator');
    if (!snippet) {
      return source;
    }
    // remove data object property assignment
    var modified = snippet
      .replace(RegExp("^(?: *\\/\\/.*\\n)* *'" + identifier + "':.+\\n+", 'm'), '')
      .replace(/,(?=\s*})/, '');

    source = source.replace(snippet, function() {
      return modified;
    });

    // clip at the `factory` assignment
    snippet = modified.match(/Function\([\s\S]+$/)[0];

    modified = snippet
      .replace(RegExp('\\b' + identifier + '\\b,? *', 'g'), '')
      .replace(/, *(?=',)/, '')
      .replace(/,(?=\s*\))/, '')

    source = source.replace(snippet, function() {
      return modified;
    });

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
    var snippet;

    // remove function
    if (funcName == 'runInContext') {
      source = removeRunInContext(source, funcName);
    } else if (funcName != 'each' && (snippet = matchFunction(source, funcName))) {
      source = source.replace(snippet, '');
    }
    // grab the method assignments snippet
    snippet = getMethodAssignments(source);

    // remove method assignment from `lodash.prototype`
    source = source.replace(RegExp('^ *lodash\\.prototype\\.' + funcName + ' *=.+\\n', 'm'), '');

    // remove pseudo private methods
    source = source.replace(RegExp('^(?: *//.*\\s*)* *lodash\\._' + funcName + ' *=.+\\n', 'm'), '');

    // remove assignment and aliases
    var modified = getAliases(funcName).concat(funcName).reduce(function(result, otherName) {
      return result.replace(RegExp('^(?: *//.*\\s*)* *lodash\\.' + otherName + ' *=.+\\n', 'm'), '');
    }, snippet);

    // replace with the modified snippet
    source = source.replace(snippet, function() {
      return modified;
    });

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
   * Removes the `_.isArray` fallback from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeIsArrayFallback(source) {
    return source.replace(getIsArrayFallback(source), '');
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
    source = removeFromCreateIterator(source, 'useKeys');

    // remove optimized branch in `iteratorTemplate`
    source = source.replace(getIteratorTemplate(source), function(match) {
      return match.replace(/^(?: *\/\/.*\n)* *["']( *)<% *if *\(useHas *&& *useKeys[\s\S]+?["']\1<% *} *else *{ *%>.+\n([\s\S]+?) *["']\1<% *} *%>.+/m, "'\\n' +\n$2");
    });

    return source;
  }

  /**
   * Removes all `lodashWrapper` references from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeLodashWrapper(source) {
    source = removeFunction(source, 'lodashWrapper');

    // remove `lodashWrapper.prototype` assignment
    source = source.replace(/(?:\s*\/\/.*)*\n *lodashWrapper\.prototype *=.+/, '');

    // replace `new lodashWrapper` with `new lodash`
    source = source.replace(/\bnew lodashWrapper\b/g, 'new lodash');

    return source;
  }

  /**
   * Removes all `support.argsObject` references from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeSupportArgsObject(source) {
    source = removeSupportProp(source, 'argsObject');

    // remove `argsAreObjects` from `_.isEqual`
    source = source.replace(matchFunction(source, 'isEqual'), function(match) {
      return match.replace(/!support.\argsObject[^:]+:\s*/g, '');
    });

    return source;
  }

  /**
   * Removes all `support.argsClass` references from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeSupportArgsClass(source) {
    source = removeSupportProp(source, 'argsClass');

    // replace `support.argsClass` in the `_.isArguments` fallback
    source = source.replace(getIsArgumentsFallback(source), function(match) {
      return match.replace(/!support\.argsClass/g, '!isArguments(arguments)');
    });

    // remove `support.argsClass` from `_.isEmpty`
    source = source.replace(matchFunction(source, 'isEmpty'), function(match) {
      return match.replace(/\s*\(support\.argsClass\s*\?([^:]+):.+?\)\)/g, '$1');
    });

    // remove `support.argsClass` from `_.isPlainObject`
    _.each(['shimIsPlainObject', 'isPlainObject'], function(methodName) {
      source = source.replace(matchFunction(source, methodName), function(match) {
        return match.replace(/\s*\|\|\s*\(!support\.argsClass[\s\S]+?\)\)/, '');
      });
    });

    return source;
  }

  /**
   * Removes all `support.enumPrototypes` references from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeSupportEnumPrototypes(source) {
    source = removeSupportProp(source, 'enumPrototypes');

    // remove `support.enumPrototypes` from `_.keys`
    source = source.replace(matchFunction(source, 'keys'), function(match) {
      return match
        .replace(/\(support\.enumPrototypes[^)]+\)(?:\s*\|\|\s*)?/, '')
        .replace(/\s*if *\(\s*\)[^}]+}/, '');
    });

    // remove `support.enumPrototypes` from `iteratorTemplate`
    source = source.replace(getIteratorTemplate(source), function(match) {
      return match
        .replace(/(?: *\/\/.*\n)* *["'] *(?:<% *)?if *\(support\.enumPrototypes *(?:&&|\))[\s\S]+?<% *} *(?:%>|["']).+/g, '')
        .replace(/support\.enumPrototypes\s*\|\|\s*/g, '');
    });

    return source;
  }

  /**
   * Removes all `support.nodeClass` references from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeSupportNodeClass(source) {
    source = removeFunction(source, 'isNode');
    source = removeSupportProp(source, 'nodeClass');

    // remove `support.nodeClass` from `shimIsPlainObject`
    source = source.replace(matchFunction(source, 'shimIsPlainObject'), function(match) {
      return match.replace(/\(support\.nodeClass[\s\S]+?\)\)/, 'true');
    });

    // remove `support.nodeClass` from `_.clone`
    source = source.replace(matchFunction(source, 'clone'), function(match) {
      return match.replace(/\s*\|\|\s*\(!support\.nodeClass[\s\S]+?\)\)/, '');
    });

    // remove `support.nodeClass` from `_.isEqual`
    source = source.replace(matchFunction(source, 'isEqual'), function(match) {
      return match.replace(/\s*\|\|\s*\(!support\.nodeClass[\s\S]+?\)\)\)/, '');
    });

    return source;
  }

  /**
   * Removes all `support.nonEnumArgs` references from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeSupportNonEnumArgs(source) {
    source = removeSupportProp(source, 'nonEnumArgs');

    // remove `support.nonEnumArgs` from `_.keys`
    source = source.replace(matchFunction(source, 'keys'), function(match) {
      return match
        .replace(/(?:\s*\|\|\s*)?\(support\.nonEnumArgs[^)]+\)\)/, '')
        .replace(/\s*if *\(\s*\)[^}]+}/, '');
    });

    // remove `nonEnumArgs` from `iteratorTemplate`
    source = source.replace(getIteratorTemplate(source), function(match) {
      return match
        .replace(/(?: *\/\/.*\n)*( *["'] *)<% *} *else *if *\(support\.nonEnumArgs[\s\S]+?(\1<% *} *%>.+)/, '$2')
        .replace(/\s*\|\|\s*support\.nonEnumArgs/, '');
    });

    return source;
  }

  /**
   * Removes all `support.nonEnumShadows` references from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeSupportNonEnumShadows(source) {
    source = removeSupportProp(source, 'nonEnumShadows');
    source = removeVar(source, 'shadowedProps');
    source = removeFromCreateIterator(source, 'shadowedProps');

    // remove `support.nonEnumShadows` from `iteratorTemplate`
    source = source.replace(getIteratorTemplate(source), function(match) {
      return match.replace(/(?: *\/\/.*\n)* *["']( *)<% *if *\(support\.nonEnumShadows[\s\S]+?["']\1<% *} *%>.+/, '');
    });

    return source;
  }

  /**
   * Removes all `support.ownLast` references from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeSupportOwnLast(source) {
    source = removeSupportProp(source, 'ownLast');

    // remove `support.ownLast` from `shimIsPlainObject`
    source = source.replace(matchFunction(source, 'shimIsPlainObject'), function(match) {
      return match.replace(/(?:\s*\/\/.*)*\n( *)if *\(support\.ownLast[\s\S]+?\n\1}/, '');
    });

    return source;
  }

  /**
   * Removes all `support.spliceObjects` references from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeSupportSpliceObjects(source) {
    source = removeSupportProp(source, 'spliceObjects');

    // remove `support.spliceObjects` fix from the `Array` function mixins
    source = source.replace(/(?:\s*\/\/.*)*\n( *)if *\(!support\.spliceObjects[\s\S]+?(?:{\s*}|\n\1})/, '');

    return source;
  }

  /**
   * Removes all `support.unindexedChars` references from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeSupportUnindexedChars(source) {
    source = removeSupportProp(source, 'unindexedChars');

    // remove `support.unindexedChars` from `_.at`
    source = source.replace(matchFunction(source, 'at'), function(match) {
      return match.replace(/^ *if *\(support\.unindexedChars[^}]+}\n+/m, '');
    });

    // remove `support.unindexedChars` from `_.reduceRight`
    source = source.replace(matchFunction(source, 'reduceRight'), function(match) {
      return match.replace(/}\s*else if *\(support\.unindexedChars[^}]+/, '');
    });

    // remove `support.unindexedChars` from `_.toArray`
    source = source.replace(matchFunction(source, 'toArray'), function(match) {
      return match.replace(/(return\b).+?support\.unindexedChars[^:]+:\s*/, '$1 ');
    });

    // remove `support.unindexedChars` from `iteratorTemplate`
    source = source.replace(getIteratorTemplate(source), function(match) {
      return match
        .replace(/'if *\(<%= *arrays *%>[^']*/, '$&\\n')
        .replace(/(?: *\/\/.*\n)* *["']( *)<% *if *\(support\.unindexedChars[\s\S]+?["']\1<% *} *%>.+/, '');
    });

    return source;
  }

  /**
   * Removes all `runInContext` references from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeRunInContext(source) {
    source = removeVar(source, 'contextProps');

    // remove function scaffolding, leaving most of its content
    source = source.replace(matchFunction(source, 'runInContext'), function(match) {
      return match
        .replace(/^[\s\S]+?function runInContext[\s\S]+?context *= *context.+| *return lodash[\s\S]+$/g, '')
        .replace(/^ {4}/gm, '  ');
    });

    // cleanup adjusted source
    source = source
      .replace(/\bcontext\b/g, 'window')
      .replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n *var Array *=[\s\S]+?;\n/, '')
      .replace(/(return *|= *)_([;)])/g, '$1lodash$2')
      .replace(/^ *var _ *=.+\n+/m, '');

    return source;
  }

  /**
   * Removes all `setImmediate` references from `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the modified source.
   */
  function removeSetImmediate(source) {
    source = removeVar(source, 'setImmediate');

    // remove the `setImmediate` fork of `_.defer`.
    source = source.replace(/(?:\s*\/\/.*)*\n( *)if *\(isV8 *&& *freeModule[\s\S]+?\n\1}/, '');

    return source;
  }

  /**
   * Removes a given property from the `support` object in `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @param {String} varName The name of the `support` property to remove.
   * @returns {String} Returns the modified source.
   */
  function removeSupportProp(source, propName) {
    return source.replace(RegExp(
      // match multi-line comment block
      '(?:\\n +/\\*[^*]*\\*+(?:[^/][^*]*\\*+)*/)?\\n' +
      // match a `try` block
      '(?: *try\\b.+\\n)?' +
      // match the `support` property assignment
      ' *support\\.' + propName + ' *=.+\\n' +
      // match `catch` block
      '(?:( *).+?catch\\b[\\s\\S]+?\\n\\1}\\n)?'
    ), '');
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
    // simplify complex variable assignments
    if (/^(?:cloneableClasses|contextProps|ctorByClass|shadowedProps|whitespace)$/.test(varName)) {
      source = source.replace(RegExp('(var ' + varName + ' *=)[\\s\\S]+?;\\n\\n'), '$1=null;\n\n');
    }

    source = removeFunction(source, varName);

    source = source.replace(RegExp(
      // match multi-line comment block
      '(?:\\n +/\\*[^*]*\\*+(?:[^/][^*]*\\*+)*/)?\\n' +
      // match a variable declaration that's not part of a declaration list
      '( *)var ' + varName + ' *= *(?:.+?(?:;|&&\\n[^;]+;)|(?:\\w+\\(|{)[\\s\\S]+?\\n\\1.+?;)\\n|' +
      // match a variable in a declaration list
      '^ *' + varName + ' *=.+?,\\n',
      'm'
    ), '');

    // remove a varaible at the start of a variable declaration list
    source = source.replace(RegExp('(var +)' + varName + ' *=.+?,\\s+'), '$1');

    // remove a variable at the end of a variable declaration list
    source = source.replace(RegExp(',\\s*' + varName + ' *=.+?;'), ';');

    return source;
  }

  /**
   * Replaces the `funcName` function body in `source` with `funcValue`.
   *
   * @private
   * @param {String} source The source to process.
   * @param {String} varName The name of the function to replace.
   * @returns {String} Returns the modified source.
   */
  function replaceFunction(source, funcName, funcValue) {
    var snippet = matchFunction(source, funcName);
    if (!snippet) {
      return source;
    }
    // clip snippet after the JSDoc comment block
    snippet = snippet.replace(/^\s*(?:\/\/.*|\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)\n/, '');

    source = source.replace(snippet, function() {
      return funcValue
        .replace(RegExp('^' + getIndent(funcValue), 'gm'), getIndent(snippet))
        .trimRight() + '\n';
    });

    return source;
  }


  /**
   * Replaces the `support` object `propName` property value in `source` with `propValue`.
   *
   * @private
   * @param {String} source The source to process.
   * @param {String} varName The name of the `support` property to replace.
   * @returns {String} Returns the modified source.
   */
  function replaceSupportProp(source, propName, propValue) {
    return source.replace(RegExp(
      // match a `try` block
      '(?: *try\\b.+\\n)?' +
      // match the `support` property assignment
      '( *support\\.' + propName + ' *=).+\\n' +
      // match `catch` block
      '(?:( *).+?catch\\b[\\s\\S]+?\\n\\2}\\n)?'
    ), function(match, left) {
      return left + ' ' + propValue + ';\n';
    });
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
      '(( *)var ' + varName + ' *=)' +
      '(?:.+?;|(?:Function\\(.+?|.*?[^,])\\n[\\s\\S]+?\\n\\2.+?;)\\n'
    ), function(match, left) {
      return left + ' ' + varValue + ';\n';
    });

    if (source == result) {
      // replace a varaible at the start or middle of a declaration list
      result = source.replace(RegExp('((?:var|\\n) +' + varName + ' *=).+?,'), function(match, left) {
        return left + ' ' + varValue + ',';
      });
    }
    if (source == result) {
      // replace a variable at the end of a variable declaration list
      result = source.replace(RegExp('(,\\s*' + varName + ' *=).+?;'), function(match, left) {
        return left + ' ' + varValue + ';';
      });
    }
    return result;
  }

  /**
   * Hard-codes the `strict` template option value for `iteratorTemplate`.
   *
   * @private
   * @param {String} source The source to process.
   * @param {Boolean} value The value to set.
   * @returns {String} Returns the modified source.
   */
  function setUseStrictOption(source, value) {
    // inject or remove the "use strict" directive
    source = source.replace(/^([\s\S]*?function[^{]+{)(?:\s*'use strict';)?/, '$1' + (value ? "\n  'use strict';" : ''));

    // replace `strict` branch in `iteratorTemplate` with hard-coded option
    source = source.replace(getIteratorTemplate(source), function(match) {
      return match.replace(/(template\()(?:\s*"'use strict.+)?/, '$1' + (value ? '\n    "\'use strict\';\\n" +' : ''));
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

    // used to specify the source map URL
    var sourceMapURL;

    // used to report invalid command-line arguments
    var invalidArgs = _.reject(options.slice(reNode.test(options[0]) ? 2 : 0), function(value, index, options) {
      if (/^(?:-o|--output)$/.test(options[index - 1]) ||
          /^(?:category|exclude|exports|iife|include|moduleId|minus|plus|settings|template)=.*$/.test(value)) {
        return true;
      }
      var result = _.contains([
        'backbone',
        'csp',
        'legacy',
        'mobile',
        'modern',
        'modularize',
        'strict',
        'underscore',
        '-c', '--stdout',
        '-d', '--debug',
        '-h', '--help',
        '-m', '--minify',
        '-n', '--no-dep',
        '-o', '--output',
        '-p', '--source-map',
        '-s', '--silent',
        '-V', '--version'
      ], value);

      if (!result && /^(?:-p|--source-map)$/.test(options[index - 1])) {
        result = true;
        sourceMapURL = value;
      }
      return result;
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
    var dependencyBackup = _.cloneDeep(dependencyMap);

    // used to specify a custom IIFE to wrap Lo-Dash
    var iife = options.reduce(function(result, value) {
      var match = value.match(/iife=(.*)/);
      return match ? match[1] : result;
    }, null);

    // the path to the source file
    var filePath = path.join(__dirname, 'lodash.js');

    // flag to specify a Backbone build
    var isBackbone = _.contains(options, 'backbone');

    // flag to specify a Content Security Policy build
    var isCSP = _.contains(options, 'csp') || _.contains(options, 'CSP');

    // flag to specify only creating the debug build
    var isDebug = _.contains(options, '-d') || _.contains(options, '--debug');

    // flag to indicate that a custom IIFE was specified
    var isIIFE = typeof iife == 'string';

    // flag to specify creating a source map for the minified source
    var isMapped = _.contains(options, '-p') || _.contains(options, '--source-map');

    // flag to specify only creating the minified build
    var isMinify = _.contains(options, '-m') || _.contains(options, '--minify');

    // flag to specify a mobile build
    var isMobile = _.contains(options, 'mobile');

    // flag to specify a modern build
    var isModern = isCSP || isMobile || _.contains(options, 'modern');

    // flag to specify a modularize build
    var isModularize = _.contains(options, 'modularize');

    // flag to specify a no-dependency build
    var isNoDep = _.contains(options, '-n') || _.contains(options, '--no-dep');

    // flag to specify writing output to standard output
    var isStdOut = _.contains(options, '-c') || _.contains(options, '--stdout');

    // flag to specify skipping status updates normally logged to the console
    var isSilent = isStdOut || _.contains(options, '-s') || _.contains(options, '--silent');

    // flag to specify `_.assign`, `_.bindAll`, and `_.defaults` are
    // constructed using the "use strict" directive
    var isStrict = _.contains(options, 'strict');

    // flag to specify an Underscore build
    var isUnderscore = isBackbone || _.contains(options, 'underscore');

    // flag to specify a legacy build
    var isLegacy = !(isModern || isUnderscore) && _.contains(options, 'legacy');

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
        var dirname = path.dirname(result);
        fs.mkdirpSync(dirname);
        result = path.join(fs.realpathSync(dirname), path.basename(result));
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

    // used as the template settings for precompiled templates
    var templateSettings = options.reduce(function(result, value) {
      var match = value.match(/settings=(.+)$/);
      return match
        ? _.assign(result, Function('return {' + match[1].replace(/^{|}$/g, '') + '}')())
        : result;
    }, _.assign(_.clone(_.templateSettings), {
      'moduleId': moduleId
    }));

    // flag to specify a template build
    var isTemplate = !!templatePattern;

    // the lodash.js source
    var source = fs.readFileSync(filePath, 'utf8');

    // flags to specify export options
    var isAMD = _.contains(exportsOptions, 'amd'),
        isCommonJS = _.contains(exportsOptions, 'commonjs'),
        isGlobal = _.contains(exportsOptions, 'global'),
        isNode = _.contains(exportsOptions, 'node');

    /*------------------------------------------------------------------------*/

    var useLodashMethod = function(methodName) {
      if (_.contains(lodashOnlyMethods, methodName) || /^(?:assign|zipObject)$/.test(methodName)) {
        var methods = _.without.apply(_, [_.union(includeMethods, plusMethods)].concat(minusMethods));
        return _.contains(methods, methodName);
      }
      methods = _.without.apply(_, [plusMethods].concat(minusMethods));
      return _.contains(methods, methodName);
    };

    // methods to include in the build
    var includeMethods = options.reduce(function(accumulator, value) {
      return /include/.test(value)
        ? _.union(accumulator, optionToMethodsArray(source, value))
        : accumulator;
    }, []);

    // methods to remove from the build
    var minusMethods = options.reduce(function(accumulator, value) {
      return /exclude|minus/.test(value)
        ? _.union(accumulator, optionToMethodsArray(source, value))
        : accumulator;
    }, []);

    // methods to add to the build
    var plusMethods = options.reduce(function(accumulator, value) {
      return /plus/.test(value)
        ? _.union(accumulator, optionToMethodsArray(source, value))
        : accumulator;
    }, []);

    // methods categories to include in the build
    var categories = options.reduce(function(accumulator, value) {
      if (/category|exclude|include|minus|plus/.test(value)) {
        var array = optionToArray(value);
        accumulator =  _.union(accumulator, /category/.test(value)
          ? array.map(capitalize)
          : array.filter(function(category) { return /^[A-Z]/.test(category); })
        );
      }
      return accumulator;
    }, []);

    // names of methods to include in the build
    var buildMethods = !isTemplate && (function() {
      var result;

      // update dependencies
      if (isLegacy) {
        dependencyMap.defer = _.without(dependencyMap.defer, 'bind');
      }
      if (isModern) {
        dependencyMap.reduceRight = _.without(dependencyMap.reduceRight, 'isString');

        if (!isMobile) {
          dependencyMap.isEmpty = _.without(dependencyMap.isEmpty, 'isArguments');
          dependencyMap.isEqual = _.without(dependencyMap.isEqual, 'isArguments');
          dependencyMap.isPlainObject = _.without(dependencyMap.isPlainObject, 'isArguments');
          dependencyMap.keys = _.without(dependencyMap.keys, 'isArguments');
        }
      }
      if (isUnderscore) {
        dependencyMap.contains = _.without(dependencyMap.contains, 'isString');
        dependencyMap.createCallback = _.without(dependencyMap.createCallback, 'isEqual');
        dependencyMap.findWhere = ['where'];
        dependencyMap.flatten = _.without(dependencyMap.flatten, 'createCallback');
        dependencyMap.isEmpty = ['isArray', 'isString'];
        dependencyMap.isEqual = _.without(dependencyMap.isEqual, 'forIn', 'isArguments');
        dependencyMap.max = _.without(dependencyMap.max, 'isArray', 'isString');
        dependencyMap.min = _.without(dependencyMap.min, 'isArray', 'isString');
        dependencyMap.pick = _.without(dependencyMap.pick, 'forIn', 'isObject');
        dependencyMap.reduceRight = _.without(dependencyMap.reduceRight, 'isString');
        dependencyMap.template = _.without(dependencyMap.template, 'keys', 'values');
        dependencyMap.toArray.push('isArray', 'map');
        dependencyMap.value = _.without(dependencyMap.value, 'isArray');
        dependencyMap.where.push('find', 'isEmpty');

        if (!useLodashMethod('clone') && !useLodashMethod('cloneDeep')) {
          dependencyMap.clone = _.without(dependencyMap.clone, 'forEach', 'forOwn');
        }
      }
      if (isModern || isUnderscore) {
        dependencyMap.at = _.without(dependencyMap.at, 'isString');
        dependencyMap.forEach = _.without(dependencyMap.forEach, 'isString');
        dependencyMap.toArray = _.without(dependencyMap.toArray, 'isString');

        if (!isMobile) {
          dependencyMap.every = _.without(dependencyMap.every, 'isArray');
          dependencyMap.find = _.without(dependencyMap.find, 'isArray');
          dependencyMap.filter = _.without(dependencyMap.filter, 'isArray');
          dependencyMap.forEach = _.without(dependencyMap.forEach, 'isArguments', 'isArray');
          dependencyMap.forIn = _.without(dependencyMap.forIn, 'isArguments');
          dependencyMap.forOwn = _.without(dependencyMap.forOwn, 'isArguments');
          dependencyMap.map = _.without(dependencyMap.map, 'isArray');
          dependencyMap.max.push('forEach');
          dependencyMap.min.push('forEach');
          dependencyMap.reduce = _.without(dependencyMap.reduce, 'isArray');
        }
      }
      // add method names explicitly
      if (includeMethods.length) {
        result = includeMethods;
      }
      // add method names required by Backbone and Underscore builds
      if (isBackbone && !result) {
        result = backboneDependencies;
      }
      else if (isUnderscore && !result) {
        result = underscoreMethods;
      }
      // add method names by category
      if (categories.length) {
        result = _.union(result || [], categories.reduce(function(accumulator, category) {
          // get method names belonging to each category
          var methodNames = getMethodsByCategory(source, category);

          // add `chain` and `findWhere`
          if (isUnderscore) {
            if (_.contains(categories, 'Chaining')) {
              methodNames.push('chain');
            }
            if (_.contains(categories, 'Collections')) {
              methodNames.push('findWhere');
            }
          }
          // limit category methods to those available for specific builds
          if (isBackbone) {
            methodNames = methodNames.filter(function(methodName) {
              return _.contains(backboneDependencies, methodName);
            });
          }
          else if (isUnderscore) {
            methodNames = methodNames.filter(function(methodName) {
              return _.contains(underscoreMethods, methodName);
            });
          }
          return accumulator.concat(methodNames);
        }, []));
      }
      if (!result) {
        result = lodashMethods.slice();
      }
      if (plusMethods.length) {
        result = _.union(result, plusMethods);
      }
      if (minusMethods.length) {
        result = _.without.apply(_, [result].concat(minusMethods, isNoDep
          ? minusMethods
          : getDependants(minusMethods)
        ));
      }
      if (!isNoDep) {
        result = getDependencies(result);
      }
      return result;
    }());

    /*------------------------------------------------------------------------*/

    // load customized Lo-Dash module
    var lodash = !isTemplate && (function() {
      source = setUseStrictOption(source, isStrict);

      if (isLegacy) {
        source = removeKeysOptimization(source);
        source = removeSetImmediate(source);
        source = removeSupportProp(source, 'fastBind');
        source = replaceSupportProp(source, 'argsClass', 'false');

        _.each(['getPrototypeOf', 'nativeBind', 'nativeIsArray', 'nativeKeys'], function(varName) {
          source = replaceVar(source, varName, 'false');
        });

        _.each(['isIeOpera', 'isV8', 'nativeBind', 'nativeIsArray', 'nativeKeys', 'reNative'], function(varName) {
          source = removeVar(source, varName);
        });

        // remove native `Function#bind` branch in `_.bind`
        source = source.replace(matchFunction(source, 'bind'), function(match) {
          return match.replace(/(?:\s*\/\/.*)*\s*return support\.fastBind[^:]+:\s*/, 'return ');
        });

        // remove native `Array.isArray` branch in `_.isArray`
        source = source.replace(matchFunction(source, 'isArray'), function(match) {
          return match.replace(/\bnativeIsArray\s*\|\|\s*/, '');
        });

        // replace `_.keys` with `shimKeys`
        source = source.replace(
          matchFunction(source, 'keys').replace(/[\s\S]+?var keys *= */, ''),
          matchFunction(source, 'shimKeys').replace(/[\s\S]+?var shimKeys *= */, '')
        );

        source = removeFunction(source, 'shimKeys');

        // replace `_.isArguments` with fallback
        source = source.replace(matchFunction(source, 'isArguments').replace(/[\s\S]+?function isArguments/, ''), function() {
          var fallback = getIsArgumentsFallback(source),
              body = fallback.match(/isArguments *= *function([\s\S]+? *});/)[1],
              indent = getIndent(fallback);

          return body.replace(RegExp('^' + indent, 'gm'), indent.slice(0, -2)) + '\n';
        });

        source = removeIsArgumentsFallback(source);
      }
      if (isModern) {
        source = removeSupportSpliceObjects(source);
        source = removeIsArgumentsFallback(source);

        if (isMobile) {
          source = replaceSupportProp(source, 'enumPrototypes', 'true');
          source = replaceSupportProp(source, 'nonEnumArgs', 'true');
        }
        else {
          source = removeIsArrayFallback(source);
          source = removeIsFunctionFallback(source);

          // remove `shimIsPlainObject` from `_.isPlainObject`
          source = source.replace(matchFunction(source, 'isPlainObject'), function(match) {
            return match.replace(/!getPrototypeOf[^:]+:\s*/, '');
          });

          // replace `_.isRegExp`
          source = replaceFunction(source, 'isRegExp', [
            'function isRegExp(value) {',
            "  return value ? (typeof value == 'object' && toString.call(value) == regexpClass) : false;",
            '}'
          ].join('\n'));
        }
      }
      if (isMobile || isUnderscore) {
        source = removeKeysOptimization(source);
        source = removeSetImmediate(source);
      }
      if (isModern || isUnderscore) {
        source = removeSupportArgsClass(source);
        source = removeSupportArgsObject(source);
        source = removeSupportNonEnumShadows(source);
        source = removeSupportOwnLast(source);
        source = removeSupportUnindexedChars(source);
        source = removeSupportNodeClass(source);

        if (!isMobile) {
          source = removeSupportEnumPrototypes(source);
          source = removeSupportNonEnumArgs(source);

          // replace `_.forEach`
          source = replaceFunction(source, 'forEach', [
            'function forEach(collection, callback, thisArg) {',
            '  var index = -1,',
            '      length = collection ? collection.length : 0;',
            '',
            "  callback = callback && typeof thisArg == 'undefined' ? callback : lodash.createCallback(callback, thisArg);",
            "  if (typeof length == 'number') {",
            '    while (++index < length) {',
            '      if (callback(collection[index], index, collection) === false) {',
            '        break;',
            '      }',
            '    }',
            '  } else {',
            '    each(collection, callback);',
            '  }',
            '  return collection;',
            '}',
          ].join('\n'));

          // replace `_.map`
          source = replaceFunction(source, 'map', [
            'function map(collection, callback, thisArg) {',
            '  var index = -1,',
            '      length = collection ? collection.length : 0;',
            '',
            '  callback = lodash.createCallback(callback, thisArg);',
            "  if (typeof length == 'number') {",
            '    var result = Array(length);',
            '    while (++index < length) {',
            '      result[index] = callback(collection[index], index, collection);',
            '    }',
            '  } else {',
            '    result = [];',
            '    each(collection, function(value, key, collection) {',
            '      result[++index] = callback(value, key, collection);',
            '    });',
            '  }',
            '  return result;',
            '}'
          ].join('\n'));

          // replace `_.pluck`
          source = replaceFunction(source, 'pluck', [
            'function pluck(collection, property) {',
            '  var index = -1,',
            '      length = collection ? collection.length : 0;',
            '',
            "  if (typeof length == 'number') {",
            '    var result = Array(length);',
            '    while (++index < length) {',
            '      result[index] = collection[index][property];',
            '    }',
            '  }',
            '  return result || map(collection, property);',
            '}'
          ].join('\n'));

          // replace `isArray(collection)` checks in "Collections" methods with simpler type checks
          _.each(['every', 'filter', 'find', 'max', 'min', 'reduce', 'some'], function(methodName) {
            source = source.replace(matchFunction(source, methodName), function(match) {
              if (methodName == 'reduce') {
                match = match.replace(/^( *)var noaccum\b/m, '$1if (!collection) return accumulator;\n$&');
              }
              else if (/^(?:max|min)$/.test(methodName)) {
                match = match.replace(/\beach\(/, 'forEach(');
                if (!isUnderscore) {
                  return match;
                }
              }
              return match.replace(/^(( *)if *\(.*?\bisArray\([^\)]+\).*?\) *{\n)(( *)var index[^;]+.+\n+)/m, function(snippet, statement, indent, vars) {
                vars = vars
                  .replace(/\b(length *=)[^;]+/, '$1 collection' + (methodName == 'reduce' ? '.length' : ' ? collection.length : 0'))
                  .replace(RegExp('^  ' + indent, 'gm'), indent);

                return vars + statement.replace(/\bisArray\([^\)]+\)/, "typeof length == 'number'");
              });
            });
          });

          // replace `arrays` property value of `eachIteratorOptions` with `false`
          source = source.replace(/^( *)var eachIteratorOptions *= *[\s\S]+?\n\1};\n/m, function(match) {
            return match.replace(/(^ *'arrays':)[^,]+/m, '$1 false');
          });
        }
      }
      if (isUnderscore) {
        // replace `_.assign`
        source = replaceFunction(source, 'assign', [
          'function assign(object) {',
          '  if (!object) {',
          '    return object;',
          '  }',
          '  for (var argsIndex = 1, argsLength = arguments.length; argsIndex < argsLength; argsIndex++) {',
          '    var iterable = arguments[argsIndex];',
          '    if (iterable) {',
          '      for (var key in iterable) {',
          '        object[key] = iterable[key];',
          '      }',
          '    }',
          '  }',
          '  return object;',
          '}'
        ].join('\n'));

        // replace `_.clone`
        if (!useLodashMethod('clone') && !useLodashMethod('cloneDeep')) {
          source = replaceFunction(source, 'clone', [
            'function clone(value) {',
            '  return isObject(value)',
            '    ? (isArray(value) ? slice(value) : assign({}, value))',
            '    : value;',
            '}'
          ].join('\n'));
        }

        // replace `_.contains`
        source = replaceFunction(source, 'contains', [
          'function contains(collection, target) {',
          '  var length = collection ? collection.length : 0,',
          '      result = false;',
          "  if (typeof length == 'number') {",
          '    result = indexOf(collection, target) > -1;',
          '  } else {',
          '    each(collection, function(value) {',
          '      return (result = value === target) && indicatorObject;',
          '    });',
          '  }',
          '  return result;',
          '}'
        ].join('\n'));

        // replace `_.debounce`
        source = replaceFunction(source, 'debounce', [
          'function debounce(func, wait, immediate) {',
          '  var args,',
          '      result,',
          '      thisArg,',
          '      timeoutId;',
          '',
          '  function delayed() {',
          '    timeoutId = null;',
          '    if (!immediate) {',
          '      result = func.apply(thisArg, args);',
          '    }',
          '  }',
          '  return function() {',
          '    var isImmediate = immediate && !timeoutId;',
          '    args = arguments;',
          '    thisArg = this;',
          '',
          '    clearTimeout(timeoutId);',
          '    timeoutId = setTimeout(delayed, wait);',
          '',
          '    if (isImmediate) {',
          '      result = func.apply(thisArg, args);',
          '    }',
          '    return result;',
          '  };',
          '}'
        ].join('\n'));

        // replace `_.defaults`
        source = replaceFunction(source, 'defaults', [
          'function defaults(object) {',
          '  if (!object) {',
          '    return object;',
          '  }',
          '  for (var argsIndex = 1, argsLength = arguments.length; argsIndex < argsLength; argsIndex++) {',
          '    var iterable = arguments[argsIndex];',
          '    if (iterable) {',
          '      for (var key in iterable) {',
          '        if (object[key] == null) {',
          '          object[key] = iterable[key];',
          '        }',
          '      }',
          '    }',
          '  }',
          '  return object;',
          '}'
        ].join('\n'));

        // replace `_.difference`
        source = replaceFunction(source, 'difference', [
          'function difference(array) {',
          '  var index = -1,',
          '      length = array.length,',
          '      flattened = concat.apply(arrayRef, nativeSlice.call(arguments, 1)),',
          '      result = [];',
          '',
          '  while (++index < length) {',
          '    var value = array[index];',
          '    if (indexOf(flattened, value) < 0) {',
          '      result.push(value);',
          '    }',
          '  }',
          '  return result;',
          '}'
        ].join('\n'));

        // replace `_.flatten`
        source = replaceFunction(source, 'flatten', [
          'function flatten(array, isShallow) {',
          '  var index = -1,',
          '      length = array ? array.length : 0,',
          '      result = [];',
          '' ,
          '  while (++index < length) {',
          '    var value = array[index];',
          '    if (isArray(value)) {',
          '      push.apply(result, isShallow ? value : flatten(value));',
          '    } else {',
          '      result.push(value);',
          '    }',
          '  }',
          '  return result;',
          '}'
        ].join('\n'));

        // replace `_.intersection`
        source = replaceFunction(source, 'intersection', [
          'function intersection(array) {',
          '  var args = arguments,',
          '      argsLength = args.length,',
          '      index = -1,',
          '      length = array ? array.length : 0,',
          '      result = [];',
          '',
          '  outer:',
          '  while (++index < length) {',
          '    var value = array[index];',
          '    if (indexOf(result, value) < 0) {',
          '      var argsIndex = argsLength;',
          '      while (--argsIndex) {',
          '        if (indexOf(args[argsIndex], value) < 0) {',
          '          continue outer;',
          '        }',
          '      }',
          '      result.push(value);',
          '    }',
          '  }',
          '  return result;',
          '}'
        ].join('\n'));

        // replace `_.isEmpty`
        source = replaceFunction(source, 'isEmpty', [
          'function isEmpty(value) {',
          '  if (!value) {',
          '    return true;',
          '  }',
          '  if (isArray(value) || isString(value)) {',
          '    return !value.length;',
          '  }',
          '  for (var key in value) {',
          '    if (hasOwnProperty.call(value, key)) {',
          '      return false;',
          '    }',
          '  }',
          '  return true;',
          '}'
        ].join('\n'));

        // replace `_.isEqual`
        source = replaceFunction(source, 'isEqual', [
          'function isEqual(a, b, stackA, stackB) {',
          '  if (a === b) {',
          '    return a !== 0 || (1 / a == 1 / b);',
          '  }',
          '  var type = typeof a,',
          '      otherType = typeof b;',
          '',
          '  if (a === a &&',
          "      (!a || (type != 'function' && type != 'object')) &&",
          "      (!b || (otherType != 'function' && otherType != 'object'))) {",
          '    return false;',
          '  }',
          '  if (a == null || b == null) {',
          '    return a === b;',
          '  }',
          '  var className = toString.call(a),',
          '      otherClass = toString.call(b);',
          '',
          '  if (className != otherClass) {',
          '    return false;',
          '  }',
          '  switch (className) {',
          '    case boolClass:',
          '    case dateClass:',
          '      return +a == +b;',
          '',
          '    case numberClass:',
          '      return a != +a',
          '        ? b != +b',
          '        : (a == 0 ? (1 / a == 1 / b) : a == +b);',
          '',
          '    case regexpClass:',
          '    case stringClass:',
          '      return a == String(b);',
          '  }',
          '  var isArr = className == arrayClass;',
          '  if (!isArr) {',
          '    if (a instanceof lodash || b instanceof lodash) {',
          '      return isEqual(a.__wrapped__ || a, b.__wrapped__ || b, stackA, stackB);',
          '    }',
          '    if (className != objectClass) {',
          '      return false;',
          '    }',
          '    var ctorA = a.constructor,',
          '        ctorB = b.constructor;',
          '',
          '    if (ctorA != ctorB && !(',
          '          isFunction(ctorA) && ctorA instanceof ctorA &&',
          '          isFunction(ctorB) && ctorB instanceof ctorB',
          '        )) {',
          '      return false;',
          '    }',
          '  }',
          '  stackA || (stackA = []);',
          '  stackB || (stackB = []);',
          '',
          '  var length = stackA.length;',
          '  while (length--) {',
          '    if (stackA[length] == a) {',
          '      return stackB[length] == b;',
          '    }',
          '  }',
          '  var result = true,',
          '      size = 0;',
          '',
          '  stackA.push(a);',
          '  stackB.push(b);',
          '',
          '  if (isArr) {',
          '    size = b.length;',
          '    result = size == a.length;',
          '',
          '    if (result) {',
          '      while (size--) {',
          '        if (!(result = isEqual(a[size], b[size], stackA, stackB))) {',
          '          break;',
          '        }',
          '      }',
          '    }',
          '    return result;',
          '  }',
          '  forIn(b, function(value, key, b) {',
          '    if (hasOwnProperty.call(b, key)) {',
          '      size++;',
          '      return !(result = hasOwnProperty.call(a, key) && isEqual(a[key], value, stackA, stackB)) && indicatorObject;',
          '    }',
          '  });',
          '',
          '  if (result) {',
          '    forIn(a, function(value, key, a) {',
          '      if (hasOwnProperty.call(a, key)) {',
          '        return !(result = --size > -1) && indicatorObject;',
          '      }',
          '    });',
          '  }',
          '  return result;',
          '}'
        ].join('\n'));

        // replace `lodash`
        source = replaceFunction(source, 'lodash', [
          'function lodash(value) {',
          '  return (value instanceof lodash)',
          '    ? value',
          '    : new lodashWrapper(value);',
          '}'
        ].join('\n'));

        // replace `_.omit`
        source = replaceFunction(source, 'omit', [
          'function omit(object) {',
          '  var props = concat.apply(arrayRef, nativeSlice.call(arguments, 1)),',
          '      result = {};',
          '',
          '  forIn(object, function(value, key) {',
          '    if (indexOf(props, key) < 0) {',
          '      result[key] = value;',
          '    }',
          '  });',
          '  return result;',
          '}'
        ].join('\n'));

        // replace `_.pick`
        source = replaceFunction(source, 'pick', [
          'function pick(object) {',
          '  var index = -1,',
          '      props = concat.apply(arrayRef, nativeSlice.call(arguments, 1)),',
          '      length = props.length,',
          '      result = {};',
          '',
          '  while (++index < length) {',
          '    var prop = props[index];',
          '    if (prop in object) {',
          '      result[prop] = object[prop];',
          '    }',
          '  }',
          '  return result;',
          '}'
        ].join('\n'));

        // replace `_.result`
        source = replaceFunction(source, 'result', [
          'function result(object, property) {',
          '  var value = object ? object[property] : null;',
          '  return isFunction(value) ? object[property]() : value;',
          '}'
        ].join('\n'));

        // replace `_.template`
        source = replaceFunction(source, 'template', [
          'function template(text, data, options) {',
          "  text || (text = '');",
          '  options = defaults({}, options, lodash.templateSettings);',
          '',
          '  var index = 0,',
          '      source = "__p += \'",',
          '      variable = options.variable;',
          '',
          '  var reDelimiters = RegExp(',
          "    (options.escape || reNoMatch).source + '|' +",
          "    (options.interpolate || reNoMatch).source + '|' +",
          "    (options.evaluate || reNoMatch).source + '|$'",
          "  , 'g');",
          '',
          '  text.replace(reDelimiters, function(match, escapeValue, interpolateValue, evaluateValue, offset) {',
          '    source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);',
          '    if (escapeValue) {',
          '      source += "\' +\\n_.escape(" + escapeValue + ") +\\n\'";',
          '    }',
          '    if (evaluateValue) {',
          '      source += "\';\\n" + evaluateValue + ";\\n__p += \'";',
          '    }',
          '    if (interpolateValue) {',
          '      source += "\' +\\n((__t = (" + interpolateValue + ")) == null ? \'\' : __t) +\\n\'";',
          '    }',
          '    index = offset + match.length;',
          '    return match;',
          '  });',
          '',
          '  source += "\';\\n";',
          '  if (!variable) {',
          "    variable = 'obj';",
          "    source = 'with (' + variable + ' || {}) {\\n' + source + '\\n}\\n';",
          '  }',
          "  source = 'function(' + variable + ') {\\n' +",
          '    "var __t, __p = \'\', __j = Array.prototype.join;\\n" +',
          '    "function print() { __p += __j.call(arguments, \'\') }\\n" +',
          '    source +',
          "    'return __p\\n}';",
          '',
          '  try {',
          "    var result = Function('_', 'return ' + source)(lodash);",
          '  } catch(e) {',
          '    e.source = source;',
          '    throw e;',
          '  }',
          '  if (data) {',
          '    return result(data);',
          '  }',
          '  result.source = source;',
          '  return result;',
          '}'
        ].join('\n'));

        // replace `_.throttle`
        source = replaceFunction(source, 'throttle', [
          'function throttle(func, wait) {',
          '  var args,',
          '      result,',
          '      thisArg,',
          '      timeoutId,',
          '      lastCalled = 0;',
          '',
          '  function trailingCall() {',
          '    lastCalled = new Date;',
          '    timeoutId = null;',
          '    result = func.apply(thisArg, args);',
          '  }',
          '  return function() {',
          '    var now = new Date,',
          '        remaining = wait - (now - lastCalled);',
          '',
          '    args = arguments;',
          '    thisArg = this;',
          '',
          '    if (remaining <= 0) {',
          '      clearTimeout(timeoutId);',
          '      timeoutId = null;',
          '      lastCalled = now;',
          '      result = func.apply(thisArg, args);',
          '    }',
          '    else if (!timeoutId) {',
          '      timeoutId = setTimeout(trailingCall, remaining);',
          '    }',
          '    return result;',
          '  };',
          '}'
        ].join('\n'));

        // replace `_.times`
        source = replaceFunction(source, 'times', [
          'function times(n, callback, thisArg) {',
          '  var index = -1,',
          '      result = Array(n > -1 ? n : 0);',
          '',
          '  while (++index < n) {',
          '    result[index] = callback.call(thisArg, index);',
          '  }',
          '  return result;',
          '}'
        ].join('\n'));

        // replace `_.toArray`
        source = replaceFunction(source, 'toArray', [
          'function toArray(collection) {',
          '  if (isArray(collection)) {',
          '    return slice(collection);',
          '  }',
          "  if (collection && typeof collection.length == 'number') {",
          '    return map(collection);',
          '  }',
          '  return values(collection);',
          '}'
        ].join('\n'));

        // replace `_.uniq`
        source = replaceFunction(source, 'uniq', [
          'function uniq(array, isSorted, callback, thisArg) {',
          '  var index = -1,',
          '      length = array ? array.length : 0,',
          '      result = [],',
          '      seen = result;',
          '',
          "  if (typeof isSorted != 'boolean' && isSorted != null) {",
          '    thisArg = callback;',
          '    callback = isSorted;',
          '    isSorted = false;',
          '  }',
          '  if (callback != null) {',
          '    seen = [];',
          '    callback = lodash.createCallback(callback, thisArg);',
          '  }',
          '  while (++index < length) {',
          '    var value = array[index],',
          '        computed = callback ? callback(value, index, array) : value;',
          '',
          '    if (isSorted',
          '          ? !index || seen[seen.length - 1] !== computed',
          '          : indexOf(seen, computed) < 0',
          '        ) {',
          '      if (callback) {',
          '        seen.push(computed);',
          '      }',
          '      result.push(value);',
          '    }',
          '  }',
          '  return result;',
          '}'
        ].join('\n'));

        // replace `_.uniqueId`
        source = replaceFunction(source, 'uniqueId', [
          'function uniqueId(prefix) {',
          "  var id = ++idCounter + '';",
          '  return prefix ? prefix + id : id;',
          '}'
        ].join('\n'));

        // replace `_.where`
        source = replaceFunction(source, 'where', [
          'function where(collection, properties, first) {',
          '  return (first && isEmpty(properties))',
          '    ? null',
          '    : (first ? find : filter)(collection, properties);',
          '}'
        ].join('\n'));

        // unexpose `lodash.support`
        source = source.replace(/lodash\.support *= */, '');

        // remove `_.templateSettings.imports assignment
        source = source.replace(/,[^']*'imports':[^}]+}/, '');

        // remove large array optimizations
        source = removeFunction(source, 'cachedContains');

        // replace `slice` with `nativeSlice.call`
        source = removeFunction(source, 'slice');
        source = source.replace(/([^.])\bslice\(/g, '$1nativeSlice.call(');

        // remove `_.isEqual` use from `createCallback`
        source = source.replace(matchFunction(source, 'createCallback'), function(match) {
          return match.replace(/\bisEqual\(([^,]+), *([^,]+)[^)]+\)/, '$1 === $2');
        });

        // remove conditional `charCodeCallback` use from `_.max` and `_.min`
        _.each(['max', 'min'], function(methodName) {
          source = source.replace(matchFunction(source, methodName), function(match) {
            return match.replace(/=.+?callback *&& *isString[^:]+:\s*/g, '= ');
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



        // remove unneeded variables
        if (!useLodashMethod('clone') && !useLodashMethod('cloneDeep')) {
          source = removeVar(source, 'cloneableClasses');
          source = removeVar(source, 'ctorByClass');
        }
        // remove chainability from `each` and `_.forEach`
        if (!useLodashMethod('forEach')) {
          _.each(['each', 'forEach'], function(methodName) {
            source = source.replace(matchFunction(source, methodName), function(match) {
              return match
                .replace(/\n *return .+?([};\s]+)$/, '$1')
                .replace(/\b(return) +result\b/, '$1')
            });
          });
        }
        // remove unused features from `createBound`
        if (_.every(['bindKey', 'partial', 'partialRight'], function(methodName) {
              return !_.contains(buildMethods, methodName);
            })) {
          source = source.replace(matchFunction(source, 'createBound'), function(match) {
            return match
              .replace(/, *indicator[^)]*/, '')
              .replace(/(function createBound\([^{]+{)[\s\S]+?(\n *)(function bound)/, function(match, part1, indent, part2) {
                return [
                  part1,
                  'if (!isFunction(func)) {',
                  '  throw new TypeError;',
                  '}',
                  part2
                ].join(indent);
              })
              .replace(/thisBinding *=[^}]+}/, 'thisBinding = thisArg;\n')
              .replace(/\(args *=.+/, 'partialArgs.concat(slice(args))');
          });
        }
      }
      // add Underscore's `_.findWhere`
      if (_.contains(buildMethods, 'findWhere')) {
        if (isUnderscore) {
          source = source.replace(matchFunction(source, 'find'), function(match) {
            var indent = getIndent(match);
            return match && (match + [
              '',
              '/**',
              ' * Examines each element in a `collection`, returning the first that',
              ' * has the given `properties`. When checking `properties`, this method',
              ' * performs a deep comparison between values to determine if they are',
              ' * equivalent to each other.',
              ' *',
              ' * @static',
              ' * @memberOf _',
              ' * @category Collections',
              ' * @param {Array|Object|String} collection The collection to iterate over.',
              ' * @param {Object} properties The object of property values to filter by.',
              ' * @returns {Mixed} Returns the found element, else `undefined`.',
              ' * @example',
              ' *',
              ' * var food = [',
              " *   { 'name': 'apple',  'organic': false, 'type': 'fruit' },",
              " *   { 'name': 'banana', 'organic': true,  'type': 'fruit' },",
              " *   { 'name': 'beet',   'organic': false, 'type': 'vegetable' }",
              ' * ];',
              ' *',
              " * _.findWhere(food, { 'type': 'vegetable' });",
              " * // => { 'name': 'beet', 'organic': false, 'type': 'vegetable' }",
              ' */',
              'function findWhere(object, properties) {',
              '  return where(object, properties, true);',
              '}',
              ''
            ].join('\n' + indent));
          });
        }
        source = source.replace(getMethodAssignments(source), function(match) {
          var methodName = isUnderscore ? 'findWhere' : 'find';
          return match.replace(/^( *)lodash.find *=.+/m, '$&\n$1lodash.findWhere = ' + methodName + ';');
        });
      }
      // add Underscore's chaining methods
      if (_.contains(buildMethods, 'chain')) {
        source = addChainMethods(source);
      }
      // replace `each` references with `forEach` and `forOwn`
      if ((isUnderscore || (isModern && !isMobile)) &&
            _.contains(buildMethods, 'forEach') &&
            (_.contains(buildMethods, 'forOwn') || !useLodashMethod('forOwn'))
          ) {
        source = source
          .replace(matchFunction(source, 'each'), '')
          .replace(/^ *lodash\._each *=.+\n/gm, '')
          .replace(/\beach(?=\(collection)/g, 'forOwn')
          .replace(/\beach(?=\(\[)/g, 'forEach');
      }

      var context = vm.createContext({
        'clearTimeout': clearTimeout,
        'console': console,
        'setTimeout': setTimeout
      });

      vm.runInContext(source, context);
      return context._;
    }());

    /*------------------------------------------------------------------------*/

    if (isTemplate) {
      source = buildTemplate(templatePattern, templateSettings);
    }
    else {
      // remove methods from the build
      allMethods.forEach(function(otherName) {
        if (!_.contains(buildMethods, otherName)) {
          source = removeFunction(source, otherName);
        }
      });

      // remove `iteratorTemplate` dependency checks from `_.template`
      source = source.replace(matchFunction(source, 'template'), function(match) {
        return match
          .replace(/iteratorTemplate *&& */g, '')
          .replace(/iteratorTemplate\s*\?\s*([^:]+?)\s*:[^,;]+/g, '$1');
      });

      /*----------------------------------------------------------------------*/

      if (isModern || isUnderscore) {
        // inline all functions defined with `createIterator`
        _.functions(lodash).forEach(function(methodName) {
          // strip leading underscores to match pseudo private functions
          var reFunc = RegExp('^( *)(var ' + methodName.replace(/^_/, '') + ' *= *)createIterator\\(((?:{|[a-zA-Z])[\\s\\S]+?)\\);\\n', 'm');
          if (reFunc.test(source)) {
            // extract, format, and inject the compiled function's source code
            source = source.replace(reFunc, function(match, indent, left) {
              return (indent + left) +
                getFunctionSource(lodash[methodName], indent) + ';\n';
            });
          }
        });

        if (isUnderscore) {
          // unexpose "exit early" feature of `each`, `_.forEach`, `_.forIn`, and `_.forOwn`
          _.each(['each', 'forEach', 'forIn', 'forOwn'], function(methodName) {
            if (methodName == 'each' || !useLodashMethod(methodName)) {
              source = source.replace(matchFunction(source, methodName), function(match) {
                return match.replace(/=== *false\)/g, '=== indicatorObject)');
              });
            }
          });

          // remove `thisArg` from unexposed `forIn` and `forOwn`
          _.each(['forIn', 'forOwn'], function(methodName) {
            if (!useLodashMethod(methodName)) {
              source = source.replace(matchFunction(source, methodName), function(match) {
                return match
                  .replace(/(callback), *thisArg/g, '$1')
                  .replace(/^ *callback *=.+\n/m, '');
              });
            }
          });

          // replace `lodash.createCallback` references with `createCallback`
          if (!useLodashMethod('createCallback')) {
            source = source.replace(/\blodash\.(createCallback\()\b/g, '$1');
          }
          // remove `_.assign`, `_.forIn`, `_.forOwn`, `_.isPlainObject`, and `_.zipObject` assignments
          (function() {
            var snippet = getMethodAssignments(source),
                modified = snippet;

            if (!useLodashMethod('assign')) {
              modified = modified.replace(/^(?: *\/\/.*\s*)* *lodash\.assign *=.+\n/m, '');
            }
            if (!useLodashMethod('createCallback')) {
              modified = modified.replace(/^(?: *\/\/.*\s*)* *lodash\.createCallback *=.+\n/m, '');
            }
            if (!useLodashMethod('forIn')) {
              modified = modified.replace(/^(?: *\/\/.*\s*)* *lodash\.forIn *=.+\n/m, '');
            }
            if (!useLodashMethod('forOwn')) {
              modified = modified.replace(/^(?: *\/\/.*\s*)* *lodash\.forOwn *=.+\n/m, '');
            }
            if (!useLodashMethod('isPlainObject')) {
              modified = modified.replace(/^(?: *\/\/.*\s*)* *lodash\.isPlainObject *=.+\n/m, '');
            }
            if (!useLodashMethod('zipObject')) {
              modified = modified.replace(/^(?: *\/\/.*\s*)* *lodash\.zipObject *=.+\n/m, '');
            }
            source = source.replace(snippet, function() {
              return modified;
            });
          }());
        }
      }
      else {
        source = removeFromCreateIterator(source, 'support');

        // inline `iteratorTemplate` template
        source = source.replace(getIteratorTemplate(source), function(match) {
          var indent = getIndent(match),
              snippet = getFunctionSource(lodash._iteratorTemplate, indent);

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
            .replace(/\s*\+\s*'';/g, ';')
            .replace(/(__p *\+= *)' *' *\+/g, '$1')
            .replace(/(?:; *)([{}])|([{}])(?: *;)/g, '$1$2')
            .replace(/\(\(__t *= *\( *([^)]+?) *\)\) *== *null *\? *'' *: *__t\)/g, '($1)');

          // remove the with-statement
          snippet = snippet.replace(/ *with *\(.+?\) *{/, '\n').replace(/}([^}]*}[^}]*$)/, '$1');

          // minor cleanup
          snippet = snippet
            .replace(/obj\s*\|\|\s*\(obj *= *{}\);/, '')
            .replace(/var __p = '';\s*__p \+=/, 'var __p =');

          // remove comments, including sourceURLs
          snippet = snippet.replace(/\s*\/\/.*(?:\n|$)/g, '');

          return indent + 'var iteratorTemplate = ' + snippet + ';\n';
        });
      }
    }

    /*------------------------------------------------------------------------*/

    // customize Lo-Dash's IIFE
    (function() {
      if (isIIFE) {
        var token = '%output%',
            index = iife.indexOf(token);

        source = source.match(/^\/\**[\s\S]+?\*\/\n/) +
          iife.slice(0, index) +
          source.replace(/^[\s\S]+?\(function[^{]+?{|}\(this\)\)[;\s]*$/g, '') +
          iife.slice(index + token.length);
      }
    }());

    /*------------------------------------------------------------------------*/

    // customize Lo-Dash's export bootstrap
    (function() {
      if (!isAMD) {
        source = source.replace(/(?: *\/\/.*\n)*( *)if *\(typeof +define[\s\S]+?else /, '$1');
      }
      if (!isNode) {
        source = source.replace(/(?: *\/\/.*\n)*( *)if *\(freeModule[\s\S]+?else *{([\s\S]+?\n)\1}\n+/, '$1$2');
      }
      if (!isCommonJS) {
        source = source.replace(/(?: *\/\/.*\n)*(?:( *)else *{)?\s*freeExports\.\w+ *=[\s\S]+?(?:\n\1})?\n+/, '');
      }
      if (!isGlobal) {
        source = source.replace(/(?:( *)(})? *else(?: *if *\(_\))? *{)?(?:\s*\/\/.*)*\s*(?:window\._|_\.templates) *=[\s\S]+?(?:\n\1})?\n+/g, '$1$2\n');
      }
      // remove `if (freeExports) {...}` if it's empty
      if (isAMD && isGlobal) {
        source = source.replace(/(?: *\/\/.*\n)* *(?:else )?if *\(freeExports.*?\) *{\s*}\n+/, '');
      } else {
        source = source.replace(/(?: *\/\/.*\n)* *(?:else )?if *\(freeExports.*?\) *{\s*}(?:\s*else *{([\s\S]+?) *})?\n+/, '$1\n');
      }
    }());

    /*------------------------------------------------------------------------*/

    // modify/remove references to removed methods/variables
    if (!isTemplate) {
      if (isRemoved(source, 'clone')) {
        source = removeVar(source, 'cloneableClasses');
        source = removeVar(source, 'ctorByClass');
      }
      if (isRemoved(source, 'clone', 'isEqual', 'isPlainObject')) {
        source = removeSupportNodeClass(source);
      }
      if (isRemoved(source, 'createIterator', 'bind', 'keys')) {
        source = removeSupportProp(source, 'fastBind');
        source = removeVar(source, 'isV8');
        source = removeVar(source, 'nativeBind');
      }
      if (isRemoved(source, 'createIterator', 'keys')) {
        source = removeVar(source, 'nativeKeys');
        source = removeKeysOptimization(source);
        source = removeSupportNonEnumArgs(source);
      }
      if (isRemoved(source, 'defer')) {
        source = removeSetImmediate(source);
      }
      if (isRemoved(source, 'invert')) {
        source = replaceVar(source, 'htmlUnescapes', "{'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'\"','&#x27;':\"'\"}");
      }
      if (isRemoved(source, 'isArguments')) {
        source = removeIsArgumentsFallback(source);
        source = replaceSupportProp(source, 'argsClass', 'true');
      }
      if (isRemoved(source, 'isArguments', 'isEmpty')) {
        source = removeSupportArgsClass(source);
      }
      if (isRemoved(source, 'isArray')) {
        source = removeVar(source, 'nativeIsArray');
      }
      if (isRemoved(source, 'isFunction')) {
        source = removeIsFunctionFallback(source);
      }
      if (isRemoved(source, 'isPlainObject')) {
        source = removeFunction(source, 'shimIsPlainObject');
        source = removeVar(source, 'getPrototypeOf');
        source = removeSupportOwnLast(source);
      }
      if (isRemoved(source, 'keys')) {
        source = removeFunction(source, 'shimKeys');
      }
      if (isRemoved(source, 'mixin')) {
        // if possible, inline the `_.mixin` call to ensure proper chaining behavior
        source = source.replace(/^( *)mixin\(lodash\).+/m, function(match, indent) {
          if (isRemoved(source, 'forOwn')) {
            return '';
          }
          return indent + [
            'forOwn(lodash, function(func, methodName) {',
            '  lodash[methodName] = func;',
            '',
            '  lodash.prototype[methodName] = function() {',
            '    var value = this.__wrapped__,',
            '        args = [value];',
            '',
            '    push.apply(args, arguments);',
            '    var result = func.apply(lodash, args);',
            "    return (value && typeof value == 'object' && value == result)",
            '      ? this',
            '      : new lodashWrapper(result);',
            '  };',
            '});'
          ].join('\n' + indent);
        });
      }
      if (isRemoved(source, 'parseInt')) {
        source = removeVar(source, 'nativeParseInt');
        source = removeVar(source, 'reLeadingSpacesAndZeros');
        source = removeVar(source, 'whitespace');
      }
      if (isRemoved(source, 'template')) {
        // remove `templateSettings` assignment
        source = source.replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n *lodash\.templateSettings[\s\S]+?};\n/, '');
      }
      if (isRemoved(source, 'value')) {
        source = removeFunction(source, 'wrapperToString');
        source = removeFunction(source, 'wrapperValueOf');
        source = removeSupportSpliceObjects(source);
        source = removeLodashWrapper(source);

        // simplify the `lodash` function
        source = replaceFunction(source, 'lodash', [
          'function lodash() {',
          '  // no operation performed',
          '}'
        ].join('\n'));

        // remove `lodash.prototype` method assignments from `_.mixin`
        source = replaceFunction(source, 'mixin', [
          'function mixin(object) {',
          '  forEach(functions(object), function(methodName) {',
          '    lodash[methodName] = object[methodName];',
          '  });',
          '}'
        ].join('\n'));

        // remove all `lodash.prototype` additions
        source = source
          .replace(/(?:\s*\/\/.*)*\n( *)forOwn\(lodash, *function\(func, *methodName\)[\s\S]+?\n\1}.+/g, '')
          .replace(/(?:\s*\/\/.*)*\n( *)(?:each|forEach)\(\['[\s\S]+?\n\1}.+/g, '')
          .replace(/(?:\s*\/\/.*)*\n *lodash\.prototype.+/g, '');
      }
      if (!/\beach\(/.test(source)) {
        source = source.replace(matchFunction(source, 'each'), '');
      }
      if ((source.match(/\bcreateIterator\b/g) || []).length < 2) {
        source = removeFunction(source, 'createIterator');
        source = removeVar(source, 'defaultsIteratorOptions');
        source = removeVar(source, 'eachIteratorOptions');
        source = removeVar(source, 'forOwnIteratorOptions');
        source = removeVar(source, 'iteratorTemplate');
        source = removeVar(source, 'templateIterator');
        source = removeSupportNonEnumShadows(source);
      }
      // remove code used to resolve unneeded `support` properties
      source = source.replace(/^ *\(function[\s\S]+?\n(( *)var ctor *= *function[\s\S]+?(?:\n *for.+)+\n)([\s\S]+?)}\(1\)\);\n/m, function(match, setup, indent, body) {
        var modified = setup;
        if (!/support\.spliceObjects *=(?! *(?:false|true))/.test(match)) {
          modified = modified.replace(/^ *object *=.+\n/m, '');
        }
        if (!/support\.enumPrototypes *=(?! *(?:false|true))/.test(match) &&
            !/support\.nonEnumShadows *=(?! *(?:false|true))/.test(match) &&
            !/support\.ownLast *=(?! *(?:false|true))/.test(match)) {
          modified = modified
            .replace(/\bctor *=.+\s+/, '')
            .replace(/^ *ctor\.prototype.+\s+.+\n/m, '')
            .replace(/(?:,\n)? *props *=[^;]+/, '')
            .replace(/^ *for *\((?=prop)/, '$&var ')
        }
        if (!/support\.nonEnumArgs *=(?! *(?:false|true))/.test(match)) {
          modified = modified.replace(/^ *for *\(.+? arguments.+\n/m, '');
        }
        // cleanup the empty var statement
        modified = modified.replace(/^ *var;\n/m, '');

        // if no setup then remove IIFE
        return /^\s*$/.test(modified)
          ? body.replace(RegExp('^' + indent, 'gm'), indent.slice(0, -2))
          : match.replace(setup, modified);
      });
    }
    if (_.size(source.match(/\bfreeModule\b/g)) < 2) {
      source = removeVar(source, 'freeModule');
    }
    if (_.size(source.match(/\bfreeExports\b/g)) < 2) {
      source = removeVar(source, 'freeExports');
    }

    debugSource = cleanupSource(source);
    source = cleanupSource(source);

    /*------------------------------------------------------------------------*/

    // flag to track if `outputPath` has been used by `callback`
    var outputUsed = false;

    // flag to specify creating a custom build
    var isCustom = (
      isLegacy || isMapped || isModern || isNoDep || isStrict || isUnderscore || outputPath ||
      /(?:category|exclude|exports|iife|include|minus|plus)=/.test(options) ||
      !_.isEqual(exportsOptions, exportsAll)
    );

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
        callback({
          'source': debugSource
        });
      }
      else if (!isStdOut) {
        filePath = outputPath || path.join(cwd, basename + '.js');
        outputUsed = true;
        callback({
          'source': debugSource,
          'outputPath': filePath
        });
      }
    }
    // begin the minification process
    if (!isDebug) {
      if (outputPath && outputUsed) {
        outputPath = path.join(path.dirname(outputPath), path.basename(outputPath, '.js') + '.min.js');
      } else if (!outputPath) {
        outputPath = path.join(cwd, basename + '.min.js');
      }
      minify(source, {
        'filePath': filePath,
        'isMapped': isMapped,
        'isSilent': isSilent,
        'isTemplate': isTemplate,
        'modes': isIIFE && ['simple', 'hybrid'],
        'outputPath': outputPath,
        'sourceMapURL': sourceMapURL,
        'onComplete': function(data) {
          if (isCustom) {
            data.source = addCommandsToHeader(data.source, options);
          }
          if (isStdOut) {
            stdout.write(data.source);
            callback(data);
          } else {
            callback(data);
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
    build(process.argv, function(data) {
      var outputPath = data.outputPath,
          sourceMap = data.sourceMap;

      if (outputPath) {
        fs.writeFileSync(outputPath, data.source, 'utf8');
        if (sourceMap) {
          fs.writeFileSync(path.join(path.dirname(outputPath), path.basename(outputPath, '.js') + '.map'), sourceMap, 'utf8');
        }
      }
    });
  }
}());
