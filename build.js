#!/usr/bin/env node
;(function() {
  'use strict';

  /** The Node filesystem and path modules */
  var fs = require('fs'),
      path = require('path');

  /** Load other modules */
  var lodash = require(path.join(__dirname, 'lodash')),
      minify = require(path.join(__dirname, 'build', 'minify'));

  /** Flag used to specify a custom build */
  var isCustom = false;

  /** Shortcut used to convert array-like objects to arrays */
  var slice = [].slice;

  /** The lodash.js source */
  var source = fs.readFileSync(path.join(__dirname, 'lodash.js'), 'utf8');

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
    'intersect': 'intersection',
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
    'intersection': ['intersect'],
    'map': ['collect'],
    'reduce': ['foldl', 'inject'],
    'reduceRight': ['foldr'],
    'rest': ['tail'],
    'some': ['any'],
    'uniq': ['unique']
  };

  /** Used to track function dependencies */
  var dependencyMap = {
    'after': [],
    'bind': [],
    'bindAll': ['bind'],
    'chain': [],
    'clone': ['extend', 'isArray'],
    'compact': [],
    'compose': [],
    'contains': ['createIterator'],
    'createIterator': [],
    'debounce': [],
    'defaults': ['createIterator'],
    'defer': [],
    'delay': [],
    'difference': ['indexOf'],
    'escape': [],
    'every': ['bind', 'createIterator', 'identity'],
    'extend': ['createIterator'],
    'filter': ['bind', 'createIterator', 'identity'],
    'find': ['createIterator'],
    'first': [],
    'flatten': ['isArray'],
    'forEach': ['bind', 'createIterator'],
    'functions': ['createIterator'],
    'groupBy': ['bind', 'createIterator'],
    'has': [],
    'identity': [],
    'indexOf': ['sortedIndex'],
    'initial': [],
    'intersection': ['every', 'indexOf'],
    'invoke': [],
    'isArguments': [],
    'isArray': [],
    'isBoolean': [],
    'isDate': [],
    'isElement': [],
    'isEmpty': ['createIterator'],
    'isEqual': [],
    'isFinite': [],
    'isFunction': [],
    'isNaN': [],
    'isNull': [],
    'isNumber': [],
    'isObject': [],
    'isRegExp': [],
    'isString': [],
    'isUndefined': [],
    'keys': ['createIterator'],
    'last': [],
    'lastIndexOf': [],
    'map': ['bind', 'createIterator', 'identity'],
    'max': ['bind'],
    'memoize': [],
    'min': ['bind'],
    'mixin': ['forEach'],
    'noConflict': [],
    'once': [],
    'partial': [],
    'pick': [],
    'pluck': ['createIterator'],
    'range': [],
    'reduce': ['bind', 'createIterator'],
    'reduceRight': ['bind', 'keys'],
    'reject': ['bind', 'createIterator', 'identity'],
    'rest': [],
    'result': [],
    'shuffle': [],
    'size': ['keys'],
    'some': ['bind', 'createIterator', 'identity'],
    'sortBy': ['bind', 'map', 'pluck'],
    'sortedIndex': [],
    'tap': [],
    'template': ['escape'],
    'throttle': [],
    'times': ['bind'],
    'toArray': ['values'],
    'union': ['indexOf'],
    'uniq': ['indexOf'],
    'uniqueId': [],
    'values': ['createIterator'],
    'without': ['indexOf'],
    'wrap': [],
    'zip': ['max', 'pluck']
  };

  /*--------------------------------------------------------------------------*/

  /**
   * Gets the aliases associated with a given `funcName`.
   *
   * @private
   * @param {String} funcName The name of the function to get aliases for.
   * @returns {Array} Returns an array of aliases.
   */
  function getAliases(funcName) {
    return realToAliasMap[funcName] || [];
  }

  /**
   * Gets an array of depenants for a function by the given `funcName`.
   *
   * @private
   * @param {String} funcName The name of the function to query.
   * @returns {Array} Returns an array of function dependants.
   */
  function getDependants(funcName) {
    // iterate over `dependencyMap`, adding the names of functions that
    // have `funcName` as a dependency
    return lodash.reduce(dependencyMap, function(result, dependencies, otherName) {
      if (dependencies.indexOf(funcName) > -1) {
        result.push(otherName);
      }
      return result;
    }, []);
  }

  /**
   * Gets an array of dependencies for a function of the given `funcName`.
   *
   * @private
   * @param {String} funcName The name of the function to query.
   * @returns {Array} Returns an array of function dependencies.
   */
  function getDependencies(funcName) {
    var dependencies = dependencyMap[funcName],
        result = [];

    if (!dependencies) {
      return result;
    }
    // recursively accumulate the dependencies of the `funcName` function, and
    // the dependencies of its dependencies, and so on.
    return dependencies.reduce(function(result, otherName) {
      result.push.apply(result, getDependencies(otherName).concat(otherName));
      return result;
    }, result);
  }

  /**
   * Gets the real name, not alias, of a given `funcName`.
   *
   * @private
   * @param {String} funcName The name of the function to resolve.
   * @returns {String} Returns the real name.
   */
  function getRealName(funcName) {
    return aliasToRealMap[funcName] || funcName;
  }

  /**
   * Determines if all functions of the given names have been removed from the `source`.
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
   * Searches the `source` for a `funcName` function declaration, expression, or
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
      ' +var ' + funcName + ' *= *(?:[a-zA-Z]+ *\\|\\| *)?createIterator\\((?:{|[a-zA-Z])[\\s\\S]+?\\);|' +
      // match a variable declaration with function expression
      '( +)var ' + funcName + ' *= *(?:[a-zA-Z]+ *\\|\\| *)?function[\\s\\S]+?\\n\\2};' +
      // end non-capturing group
      ')\\n'
    ));

    return result ? result[0] : '';
  }

  /**
   * Removes the all references to `refName` from the `createIterator` source.
   *
   * @private
   * @param {String} source The source to process.
   * @param {String} refName The name of the reference to remove.
   * @returns {String} Returns the modified source.
   */
  function removeFromCreateIterator(source, refName) {
    var snippet = matchFunction(source, 'createIterator'),
        modified = snippet.replace(RegExp('\\b' + refName + '\\b,? *', 'g'), '');

    return source.replace(snippet, modified);
  }

  /**
   * Removes the `funcName` function declaration, expression, or assignment and
   * associated code from the `source`.
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
    snippet = source.match(/lodash\.VERSION *= *[\s\S]+?\/\*-+\*\/\n/)[0];

    // remove assignment and aliases
    modified = getAliases(funcName).concat(funcName).reduce(function(result, otherName) {
      return result.replace(RegExp('(?:\\n *//.*\\s*)* *lodash\\.' + otherName + ' *= *.+\\n'), '');
    }, snippet);

    // replace with the modified snippet
    source = source.replace(snippet, modified);

    return removeFromCreateIterator(source, funcName);
  }

  /**
   * Removes a given variable from the `source`.
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
      '( +)var ' + varName + ' *= *(?:.*?;|(?:Function\\(.+?|.*?[^,])\\n[\\s\\S]+?\\n\\1.+?;)\\n|' +
      // match a variable in a declaration list
      '\\n +' + varName + ' *=.*?,' +
      // end non-capturing group
      ')'
    ), '');

    // remove a varaible at the start of a variable declaration list
    source = source.replace(RegExp('(var +)' + varName + ' *=.+?,\\s+'), '$1');

    // remove a variable at the end of a variable declaration list
    source = source.replace(RegExp(',\\s*' + varName + ' *=.*?;'), ';');

    return removeFromCreateIterator(source, varName);
  }

  /*--------------------------------------------------------------------------*/

  // inline `iteratorTemplate`
  (function() {
    var iteratorTemplate = lodash._iteratorTemplate,
        code = /^function[^{]+{([\s\S]+?)}$/.exec(iteratorTemplate)[1];

    // remove whitespace from template
    code = code.replace(/\[object |else if|function | in |return\s+[\w']|throw |typeof |var |\\\\n|\\n|\s+/g, function(match) {
      return match == false || match == '\\n' ? '' : match;
    });

    // remove unnecessary code
    code = code
      .replace(/\|\|\{\}|,__t,__j=Array.prototype.join|function print[^}]+}|\+''/g, '')
      .replace(/(\{);|;(\})/g, '$1$2')
      .replace(/\(\(__t=\(([^)]+)\)\)==null\?'':__t\)/g, '$1');

    // ensure escaped characters are interpreted correctly inside the `Function()` string
    code = code.replace(/\\/g, '\\\\');

    // add `code` to `Function()`
    code = '$1Function(\'object\',\n$2  "' + code + '"\n$2);\n';

    // replace `template()` with `Function()`
    source = source.replace(/(( +)var iteratorTemplate *= *)([\s\S]+?\n\2.+?);\n/, code);

    // remove pseudo private property `_iteratorTemplate`
    source = source.replace(/(?:\s*\/\/.*)*\s*lodash\._iteratorTemplate\b.+\n/, '\n');
  }());

  /*--------------------------------------------------------------------------*/

  // custom build
  process.argv.some(function(arg) {
    // exit early if not the "exclude" or "include" command option
    var pair = arg.match(/^(exclude|include)=(.*)$/);
    if (!pair) {
      return false;
    }

    var filterType = pair[1],
        filterNames = lodash.intersection(Object.keys(dependencyMap), pair[2].split(/, */).map(getRealName));

    // set custom build flag
    isCustom = true;

    // remove the specified functions and their dependants
    if (filterType == 'exclude') {
      filterNames.forEach(function(funcName) {
        getDependants(funcName).concat(funcName).forEach(function(otherName) {
          source = removeFunction(source, otherName);
        });
      });
    }
    // else remove all but the specified functions and their dependencies
    else {
      filterNames = lodash.uniq(filterNames.reduce(function(result, funcName) {
        result.push.apply(result, getDependencies(funcName).concat(funcName));
        return result;
      }, []));

      lodash.each(dependencyMap, function(dependencies, otherName) {
        if (filterNames.indexOf(otherName) < 0) {
          source = removeFunction(source, otherName);
        }
      });
    }

    // remove associated functions, variables and code snippets
    if (isRemoved(source, 'isArguments')) {
      // remove `isArguments` if-statement
      source = source.replace(/(?:\s*\/\/.*)*\s*if *\(!isArguments[^)]+\)[\s\S]+?};?\s*}\n/, '');
    }
    if (isRemoved(source, 'mixin')) {
      // remove `LoDash` constructor
      source = removeFunction(source, 'LoDash');
      // remove `LoDash` calls
      source = source.replace(/(?:new +LoDash(?!\()|(?:new +)?LoDash\([^)]*\));?/g, '');
      // remove `LoDash.prototype` additions
      source = source.replace(/(?:\s*\/\/.*)*\s*LoDash.prototype *=[\s\S]+?\/\*-+\*\//, '');
    }
    if (isRemoved(source, 'template')) {
      // remove `templateSettings` assignment
      source = source.replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n *lodash\.templateSettings[\s\S]+?};\n/, '');
    }
    if (isRemoved(source, 'max', 'min')) {
      source = removeVar(source, 'argsLimit');
      // remove `argsLimit` try-catch
      source = source.replace(/\n *try\s*\{[\s\S]+?argsLimit *=[\s\S]+?catch[^}]+}\n/, '');
    }
    if (isRemoved(source, 'isArray', 'isEmpty', 'isEqual', 'size')) {
      source = removeVar(source, 'arrayClass');
    }
    if (isRemoved(source, 'bind', 'functions', 'groupBy', 'invoke', 'isEqual', 'isFunction', 'result', 'sortBy', 'toArray')) {
      source = removeVar(source, 'funcClass');
    }
    if (isRemoved(source, 'clone', 'isObject', 'keys')) {
      source = removeVar(source, 'objectTypes');
      source = removeFromCreateIterator(source, 'objectTypes');
    }
    if (isRemoved(source, 'isEmpty', 'isEqual', 'isString', 'size')) {
      source = removeVar(source, 'stringClass');
    }

    // consolidate consecutive horizontal rule comment separators
    source = source.replace(/(?:\s*\/\*-+\*\/\s*){2,}/g, function(separators) {
      return separators.match(/^\s*/)[0] + separators.slice(separators.lastIndexOf('/*'));
    });

    return true;
  });

  // begin the minification process
  if (isCustom) {
    fs.writeFileSync(path.join(__dirname, 'lodash.custom.js'), source);
    minify(source, 'lodash.custom.min', function(result) {
      fs.writeFileSync(path.join(__dirname, 'lodash.custom.min.js'), result);
    });
  }
  else {
    minify(source, 'lodash.min', function(result) {
      fs.writeFileSync(path.join(__dirname, 'lodash.min.js'), result);
    });
  }
}());
