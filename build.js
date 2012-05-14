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
    'createIterator': ['template'],
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

  /** Used to indicate core functions */
  var coreFuncs = ['extend', 'forEach', 'mixin'];

  /** Used to determine the remaining functions in the source */
  var funcNames = Object.keys(dependencyMap);

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
   * Determines if all functions of the given names have been removed.
   *
   * @private
   * @param {String} [funcName1, funcName2, ...] The names of functions to check.
   * @returns {Boolean} Returns `true` if all functions have been removed, else `false`.
   */
  function isRemoved() {
    return !lodash.intersection(funcNames, arguments).length;
  }

  /**
   * Removes a function and associated code from the `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @param {String} funcName The name of the function to remove.
   * @returns {String} Returns the source with the function removed.
   */
  function removeFunction(source, funcName) {
    // remove function
    source = source.replace(RegExp(
      // match multi-line comment block (could be on a single line)
      '\\n +/\\*[^*]*\\*+(?:[^/][^*]*\\*+)*/\\n' +
      // begin non-capturing group
      '(?:' +
      // match a function declaration
      '( +)function ' + funcName + '\\b[\\s\\S]+?\\n\\1}|' +
      // match a variable declaration with `createIerator`
      ' +var ' + funcName + ' *= *(?:[a-zA-Z]+ *\\|\\| *)?createIterator\\((?:{|[a-zA-Z])[\\s\\S]+?\\);|' +
      // match a variable declaration with function expression
      '( +)var ' + funcName + ' *= *(?:[a-zA-Z]+ *\\|\\| *)?function[\\s\\S]+?\\n\\2};' +
      // end non-capturing group
      ')\\n'
    ), '');

    // exit early if function is already removed
    var found = funcNames.indexOf(funcName);
    if (found < 0) {
      return source;
    }

    // grab `lodash` method assignments snippet
    var assignmentSnippet = source.match(/( +)extend\(lodash,(?:[\s\S]+?\},)?([\s\S]+?\n\1}\))/)[2];

    // remove `funcName` from method assignments
    var modifiedSnippet = getAliases(funcName).concat(funcName).reduce(function(result, otherName) {
      result = result.replace(RegExp(" *'" + otherName + "'[^\\n]+\\n"), '');
      return result;
    }, assignmentSnippet)

    // remove any trailing commas and comments from the method assignments
    modifiedSnippet = modifiedSnippet.replace(/,(?:\s*\/\/[^\n]*)?(\s*}\))/, '$1');

    // replace method assignments snippet with the modified snippet
    source = source.replace(assignmentSnippet, modifiedSnippet);

    // remove from remaining function names
    funcNames.splice(found, 1);

    // remove associated code snippets
    switch(funcName) {
      case 'isArguments':
        // remove `isArguments` if-statement
        source = source.replace(/ +(?:\/\/[^\n]*\s+)?if *\(!isArguments[^)]+\)[\s\S]+?};?\s*}\n/, '');
        break;

      case 'template':
        // remove associated functions
        ['detokenize', 'escapeChar', 'tokenizeEscape', 'tokenizeInterpolate', 'tokenizeEvaluate'].forEach(function(otherName) {
          source = removeFunction(source, otherName);
        });
        // remove associated variables
        ['escapes', 'iteratorTemplate', 'reEscapeDelimiter', 'reEvaluateDelimiter', 'reInterpolateDelimiter', 'reToken', 'reUnescaped', 'token', 'tokenized'].forEach(function(varName) {
          source = removeVar(source, varName);
        });
        // remove `templateSettings` assignment
        source = source.replace(/\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/\n( +)'templateSettings'[\s\S]+?},\n/, '');
        break;

      case 'uniqueId':
        source = removeVar(source, 'idCounter');
    }
    return source;
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
    return source.replace(RegExp(
      // match multi-line comment block
      '\\n +/\\*[^*]*\\*+(?:[^/][^*]*\\*+)*/\\n' +
      // match a variable declaration
      '( +)var ' + varName + ' *= *(?:.*?;|[\\s\\S]+?\\n\\1[^\\n]+;)\\n'
    ), '');
  }

  /*--------------------------------------------------------------------------*/

  // custom build
  process.argv.some(function(arg) {
    // exit early if not the "exclude" or "include" command option
    var pair = arg.match(/^(exclude|include)=(.+)$/);
    if (!pair) {
      return false;
    }

    var filterType = pair[1],
        filterNames = pair[2].split(',');

    // set custom build flag
    isCustom = true;

    // remove the specified functions and their dependants
    if (filterType == 'exclude') {
      filterNames.forEach(function(funcName) {
        funcName = getRealName(funcName);
        var otherNames = getDependants(funcName).concat(funcName);

        // skip removal if `funcName` is a required core function
        if (otherNames.some(function(otherName) {
              return coreFuncs.indexOf(otherName) > -1;
            })) {
          return;
        }
        otherNames.forEach(function(otherName) {
          source = removeFunction(source, otherName);
        });
      });
    }
    // else remove all but the specified functions and their dependencies
    else {
      filterNames = lodash.uniq(filterNames.concat(coreFuncs).reduce(function(result, funcName) {
        funcName = getRealName(funcName);
        result.push.apply(result, getDependencies(funcName).concat(funcName));
        return result;
      }, []));

      lodash.each(dependencyMap, function(dependencies, otherName) {
        if (filterNames.indexOf(otherName) < 0) {
          source = removeFunction(source, otherName);
        }
      });
    }

    // remove shared variables
    if (isRemoved('createIterator', 'isEqual')) {
      source = removeVar(source, 'hasDontEnumBug');
    }
    if (isRemoved('every', 'filter', 'find', 'forEach', 'groupBy', 'map', 'reject', 'some')) {
      source = removeVar(source, 'baseIteratorOptions');
    }
    if (isRemoved('every', 'some')) {
      source = removeVar(source, 'everyIteratorOptions');
    }
    if (isRemoved('defaults', 'extend')) {
      source = removeVar(source, 'extendIteratorOptions');
    }
    if (isRemoved('filter', 'reject')) {
      source = removeVar(source, 'filterIteratorOptions');
    }
    if (isRemoved('map', 'pluck', 'values')) {
      source = removeVar(source, 'mapIteratorOptions');
    }
    if (isRemoved('max', 'min')) {
      // remove varaible and associated try-catch
      source = removeVar(source, 'argsLimit');
      source = source.replace(/\n *try\s*\{\s*\(function[\s\S]+?catch[^}]+}\n/, '');
    }

    // consolidate consecutive horizontal rule comment separators
    source = source.replace(/(?:\s*\/\*-+\*\/\s*){2,}/g, function(separators) {
      return separators.match(/^\s*/)[0] + separators.slice(separators.lastIndexOf('/*'));
    });

    return true;
  });

  // begin the minification process
  if (isCustom) {
    minify(source, 'lodash.custom.min', function(result) {
      fs.writeFileSync(path.join(__dirname, 'lodash.custom.js'), source);
      fs.writeFileSync(path.join(__dirname, 'lodash.custom.min.js'), result);
    });
  }
  else {
    minify(source, 'lodash.min', function(result) {
      fs.writeFileSync(path.join(__dirname, 'lodash.min.js'), result);
    });
  }
}());
