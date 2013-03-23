#!/usr/bin/env node
;(function() {
  'use strict';

  /** The Node.js filesystem module */
  var fs = require('fs');

  /** Used to minify variables embedded in compiled strings */
  var compiledVars = [
    'args',
    'argsIndex',
    'argsLength',
    'callback',
    'collection',
    'ctor',
    'guard',
    'hasOwnProperty',
    'index',
    'isArguments',
    'isArray',
    'isString',
    'iterable',
    'length',
    'keys',
    'lodash',
    'object',
    'objectTypes',
    'ownIndex',
    'ownProps',
    'result',
    'skipProto',
    'source',
    'thisArg'
  ];

  /** Used to minify `iteratorTemplate` data properties */
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

  /** Used to minify variables and string values to a single character */
  var minNames = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  minNames.push.apply(minNames, minNames.map(function(value) {
    return value + value;
  }));

  /** Used to protect the specified properties from getting minified */
  var propWhitelist = [
    'Array',
    'Boolean',
    'Date',
    'Function',
    'Math',
    'Number',
    'Object',
    'RegExp',
    'String',
    'TypeError',
    'VERSION',
    '_',
    '__wrapped__',
    'after',
    'all',
    'amd',
    'any',
    'argsClass',
    'argsObject',
    'assign',
    'at',
    'attachEvent',
    'bind',
    'bindAll',
    'bindKey',
    'clearTimeout',
    'clone',
    'cloneDeep',
    'collect',
    'compact',
    'compose',
    'contains',
    'countBy',
    'createCallback',
    'criteria',
    'debounce',
    'defaults',
    'defer',
    'delay',
    'detect',
    'difference',
    'drop',
    'each',
    'enumPrototypes',
    'environment',
    'escape',
    'evaluate',
    'every',
    'exports',
    'extend',
    'fastBind',
    'fastKeys',
    'filter',
    'find',
    'findIndex',
    'findKey',
    'first',
    'flatten',
    'foldl',
    'foldr',
    'forEach',
    'forIn',
    'forOwn',
    'functions',
    'global',
    'groupBy',
    'has',
    'head',
    'identity',
    'imports',
    'include',
    'index',
    'indexOf',
    'initial',
    'inject',
    'interpolate',
    'intersection',
    'invert',
    'invoke',
    'isArguments',
    'isArray',
    'isBoolean',
    'isDate',
    'isElement',
    'isEmpty',
    'isEqual',
    'isEqual',
    'isFinite',
    'isFinite',
    'isFunction',
    'isNaN',
    'isNull',
    'isNumber',
    'isObject',
    'isPlainObject',
    'isRegExp',
    'isString',
    'isUndefined',
    'keys',
    'last',
    'lastIndexOf',
    'map',
    'max',
    'memoize',
    'merge',
    'methods',
    'min',
    'mixin',
    'noConflict',
    'nodeClass',
    'nonEnumArgs',
    'nonEnumShadows',
    'object',
    'omit',
    'once',
    'ownLast',
    'pairs',
    'parseInt',
    'partial',
    'partialRight',
    'pick',
    'pluck',
    'random',
    'range',
    'reduce',
    'reduceRight',
    'reject',
    'rest',
    'result',
    'runInContext',
    'select',
    'setImmediate',
    'setTimeout',
    'shuffle',
    'size',
    'some',
    'sortBy',
    'sortedIndex',
    'source',
    'spliceObjects',
    'support',
    'tail',
    'take',
    'tap',
    'template',
    'templateSettings',
    'throttle',
    'times',
    'toArray',
    'unescape',
    'unindexedChars',
    'union',
    'uniq',
    'unique',
    'uniqueId',
    'value',
    'values',
    'variable',
    'where',
    'without',
    'wrap',
    'zip',
    'zipObject',

    // properties used by the `backbone` and `underscore` builds
    '__chain__',
    'chain',
    'findWhere'
  ];

  /*--------------------------------------------------------------------------*/

  /**
   * Pre-process a given Lo-Dash `source`, preparing it for minification.
   *
   * @param {String} [source=''] The source to process.
   * @param {Object} [options={}] The options object.
   * @returns {String} Returns the processed source.
   */
  function preprocess(source, options) {
    source || (source = '');
    options || (options = {});

    // remove unrecognized JSDoc tags so the Closure Compiler won't complain
    source = source.replace(/@(?:alias|category)\b.*/g, '');

    if (options.isTemplate) {
      return source;
    }
    // add brackets to whitelisted properties so the Closure Compiler won't mung them
    // http://code.google.com/closure/compiler/docs/api-tutorial3.html#export
    source = source.replace(RegExp('\\.(' + propWhitelist.join('|') + ')\\b', 'g'), function(match, prop) {
      return "['" + prop.replace(/['\n\r\t]/g, '\\$&') + "']";
    });

    // remove brackets from `lodash.createCallback` in `eachIteratorOptions`
    source = source.replace('lodash[\'createCallback\'](callback, thisArg)"', 'lodash.createCallback(callback, thisArg)"');

    // remove brackets from `lodash.createCallback` in `_.assign`
    source = source.replace("'  var callback = lodash['createCallback']", "'var callback=lodash.createCallback");

    // remove brackets from `_.escape` in `_.template`
    source = source.replace(/__e *= *_\['escape']/g, '__e=_.escape');

    // remove brackets from `collection.indexOf` in `_.contains`
    source = source.replace("collection['indexOf'](target)", 'collection.indexOf(target)');

    // remove brackets from `result[length].value` in `_.sortBy`
    source = source.replace("result[length]['value']", 'result[length].value');

    // remove whitespace from string literals
    source = source.replace(/^((?:[ "'\w]+:)? *)"[^"\\\n]*(?:\\.[^"\\\n]*)*"|'[^'\\\n]*(?:\\.[^'\\\n]*)*'/gm, function(string, left) {
      // clip after an object literal property name or leading spaces
      if (left) {
        string = string.slice(left.length);
      }
      // avoids removing the '\n' of the `stringEscapes` object
      string = string.replace(/\[object |delete |else (?!{)|function | in |return\s+[\w"']|throw |typeof |use strict|var |@ |(["'])\\n\1|\\\\n|\\n|\s+/g, function(match) {
        return match == false || match == '\\n' ? '' : match;
      });
      // unclip
      return (left || '') + string;
    });

    // remove whitespace from `_.template` related regexes
    source = source.replace(/reEmptyString\w+ *=.+/g, function(match) {
      return match.replace(/ |\\n/g, '');
    });

    // remove newline from double-quoted strings in `_.template`
    source = source
      .replace('"__p += \'"', '"__p+=\'"')
      .replace('"\';\n"', '"\';"')

    // remove debug sourceURL use in `_.template`
    source = source.replace(/(?:\s*\/\/.*\n)* *var sourceURL[^;]+;|\+ *sourceURL/g, '');

    // minify internal properties used by 'compareAscending' and `_.sortBy`
    (function() {
      var properties = ['criteria', 'index', 'value'],
          snippets = source.match(/( +)function (?:compareAscending|sortBy)\b[\s\S]+?\n\1}/g);

      if (!snippets) {
        return;
      }
      snippets.forEach(function(snippet) {
        var modified = snippet;

        // minify properties
        properties.forEach(function(property, index) {
          var minName = minNames[index],
              reBracketProp = RegExp("\\['(" + property + ")'\\]", 'g'),
              reDotProp = RegExp('\\.' + property + '\\b', 'g'),
              rePropColon = RegExp("([^?\\s])\\s*([\"'])?\\b" + property + "\\2 *:", 'g');

          modified = modified
            .replace(reBracketProp, "['" + minName + "']")
            .replace(reDotProp, "['" + minName + "']")
            .replace(rePropColon, "$1'" + minName + "':");
        });

        // replace with modified snippet
        source = source.replace(snippet, function() {
          return modified;
        });
      });
    }());

    // minify all compilable snippets
    var snippets = source.match(
      RegExp([
        // match the `iteratorTemplate`
        '( +)var iteratorTemplate\\b[\\s\\S]+?\\n\\1}',
        // match methods created by `createIterator` calls
        'createIterator\\((?:{|[a-zA-Z]+)[\\s\\S]*?\\);\\n',
        // match variables storing `createIterator` options
        '( +)var [a-zA-Z]+IteratorOptions\\b[\\s\\S]+?\\n\\2}',
        // match the the `createIterator` function
        '( +)function createIterator\\b[\\s\\S]+?\\n\\3}'
      ].join('|'), 'g')
    );

    // exit early if no compilable snippets
    if (!snippets) {
      return source;
    }

    snippets.forEach(function(snippet, index) {
      var isCreateIterator = /function createIterator\b/.test(snippet),
          isIteratorTemplate = /var iteratorTemplate\b/.test(snippet),
          modified = snippet;

      // add brackets to iterator option properties so the Closure Compiler won't mung them
      modified = modified.replace(RegExp('\\.(' + iteratorOptions.join('|') + ')\\b', 'g'), function(match, prop) {
        return "['" + prop.replace(/['\n\r\t]/g, '\\$&') + "']";
      });

      // minify `createIterator` option property names
      iteratorOptions.forEach(function(property, index) {
        var minName = minNames[index];

        // minify variables in `iteratorTemplate` or property names in everything else
        modified = isIteratorTemplate
          ? modified.replace(RegExp('\\b' + property + '\\b', 'g'), minName)
          : modified.replace(RegExp("'" + property + "'", 'g'), "'" + minName + "'");
      });

      // minify snippet variables / arguments
      compiledVars.forEach(function(varName, index) {
        var minName = minNames[index];

        // minify variable names present in strings
        if (isCreateIterator) {
          modified = modified.replace(RegExp('(([\'"])[^\\n\\2]*?)\\b' + varName + '\\b(?=[^\\n\\2]*\\2[ ,+]+$)', 'gm'), '$1' + minName);
        }
        // ensure properties in compiled strings aren't minified
        else {
          modified = modified.replace(RegExp('([^.])\\b' + varName + '\\b(?!\' *[\\]:])', 'g'), '$1' + minName);
        }
        // correct `typeof` values
        if (/^(?:boolean|function|object|number|string|undefined)$/.test(varName)) {
          modified = modified.replace(RegExp("(typeof [^']+')" + minName + "'", 'g'), '$1' + varName + "'");
        }
      });

      // replace with modified snippet
      source = source.replace(snippet, function() {
        return modified;
      });
    });

    return source;
  }

  /*--------------------------------------------------------------------------*/

  // expose `preprocess`
  if (module != require.main) {
    module.exports = preprocess;
  }
  else {
    // read the Lo-Dash source file from the first argument if the script
    // was invoked directly (e.g. `node pre-compile.js source.js`) and write to
    // the same file
    (function() {
      var options = process.argv;
      if (options.length < 3) {
        return;
      }
      var filePath = options[options.length - 1],
          isTemplate = options.indexOf('-t') > -1 || options.indexOf('--template') > -1,
          source = fs.readFileSync(filePath, 'utf8');

      fs.writeFileSync(filePath, preprocess(source, {
        'isTemplate': isTemplate
      }), 'utf8');
    }());
  }
}());
