#!/usr/bin/env node
;(function() {
  'use strict';

  /** The Node filesystem module */
  var fs = require('fs');

  /** Used to minify variables embedded in compiled strings */
  var compiledVars = [
    'args',
    'argsIndex',
    'argsLength',
    'callback',
    'collection',
    'createCallback',
    'ctor',
    'guard',
    'hasOwnProperty',
    'index',
    'isArguments',
    'isArray',
    'isString',
    'iterable',
    'length',
    'nativeKeys',
    'object',
    'objectTypes',
    'ownIndex',
    'ownProps',
    'result',
    'skipProto',
    'source',
    'thisArg'
  ];

  /** Used to minify `compileIterator` option properties */
  var iteratorOptions = [
    'args',
    'arrays',
    'bottom',
    'firstArg',
    'hasDontEnumBug',
    'hasEnumPrototype',
    'isKeysFast',
    'loop',
    'nonEnumArgs',
    'noCharByIndex',
    'shadowed',
    'top',
    'useHas'
  ];

  /** Used to minify variables and string values to a single character */
  var minNames = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  minNames.push.apply(minNames, minNames.map(function(value) {
    return value + value;
  }));

  /** Used to protect the specified properties from getting minified */
  var propWhitelist = [
    '_',
    '__wrapped__',
    'after',
    'all',
    'amd',
    'any',
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
    'criteria',
    'debounce',
    'defaults',
    'defer',
    'delay',
    'detect',
    'difference',
    'drop',
    'each',
    'environment',
    'escape',
    'evaluate',
    'every',
    'exports',
    'extend',
    'filter',
    'find',
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
    'imports',
    'identity',
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
    'object',
    'omit',
    'once',
    'opera',
    'pairs',
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
    'select',
    'setImmediate',
    'setTimeout',
    'shuffle',
    'size',
    'some',
    'sortBy',
    'sortedIndex',
    'source',
    'tail',
    'take',
    'tap',
    'template',
    'templateSettings',
    'throttle',
    'times',
    'toArray',
    'unescape',
    'union',
    'uniq',
    'unique',
    'uniqueId',
    'value',
    'values',
    'variable',
    'VERSION',
    'where',
    'without',
    'wrap',
    'zip',

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

    // remove brackets from `_.escape()` in `_.template`
    source = source.replace(/__e *= *_\['escape']/g, '__e=_.escape');

    // remove brackets from `collection.indexOf` in `_.contains`
    source = source.replace("collection['indexOf'](target)", 'collection.indexOf(target)');

    // remove brackets from `result[length].value` in `_.sortBy`
    source = source.replace("result[length]['value']", 'result[length].value');

    // remove whitespace from string literals
    source = source.replace(/^([ "'\w]+:)? *"[^"\\\n]*(?:\\.[^"\\\n]*)*"|'[^'\\\n]*(?:\\.[^'\\\n]*)*'/gm, function(string, captured) {
      // remove object literal property name
      if (/:$/.test(captured)) {
        string = string.slice(captured.length);
      }
      // avoids removing the '\n' of the `stringEscapes` object
      string = string.replace(/\[object |delete |else (?!{)|function | in |return\s+[\w"']|throw |typeof |use strict|var |@ |(["'])\\n\1|\\\\n|\\n|\s+/g, function(match) {
        return match == false || match == '\\n' ? '' : match;
      });
      // prepend object literal property name
      return (captured || '') + string;
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
        source = source.replace(snippet, modified);
      });
    }());

    // minify all compilable snippets
    var snippets = source.match(
      RegExp([
        // match the `iteratorTemplate`
        '( +)var iteratorTemplate\\b[\\s\\S]+?\\n\\1}',
        // match methods created by `createIterator` calls
        'createIterator\\((?:{|[a-zA-Z]+)[\\s\\S]+?\\);\\n',
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

      if (isCreateIterator) {
        // clip before the `factory` call to avoid minifying its arguments
        source = source.replace(snippet, modified);
        snippet = modified = modified.replace(/return factory\([\s\S]+$/, '');
      }
      // minify `createIterator` option property names
      iteratorOptions.forEach(function(property, index) {
        var minName = minNames[index];

        // minify variables in `iteratorTemplate` or property names in everything else
        modified = isIteratorTemplate
          ? modified.replace(RegExp('\\b' + property + '\\b', 'g'), minName)
          : modified.replace(RegExp("'" + property + "'", 'g'), "'" + minName + "'");
      });

      // minify snippet variables / arguments
      compiledVars.forEach(function(variable, index) {
        var minName = minNames[index];

        // ensure properties in compiled strings aren't minified
        modified = modified.replace(RegExp('([^.]\\b)' + variable + '\\b(?!\' *[\\]:])', 'g'), '$1' + minName);

        // correct `typeof` values
        if (/^(?:boolean|function|object|number|string|undefined)$/.test(variable)) {
          modified = modified.replace(RegExp("(typeof [^']+')" + minName + "'", 'g'), '$1' + variable + "'");
        }
      });

      // replace with modified snippet
      source = source.replace(snippet, modified);
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
