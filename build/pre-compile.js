#!/usr/bin/env node
;(function() {
  'use strict';

  /** The Node filesystem module */
  var fs = require('fs');

  /** Used to minify string values embedded in compiled strings */
  var compiledValues = [
    'arrays',
    'objects'
  ];

  /** Used to minify variables embedded in compiled strings */
  var compiledVars = [
    'accumulator',
    'array',
    'arrayClass',
    'bind',
    'callback',
    'className',
    'collection',
    'computed',
    'concat',
    'current',
    'false',
    'funcClass',
    'hasOwnProperty',
    'identity',
    'index',
    'indexOf',
    'Infinity',
    'initial',
    'isArray',
    'isEmpty',
    'length',
    'object',
    'Math',
    'property',
    'result',
    'slice',
    'source',
    'stringClass',
    'target',
    'thisArg',
    'toString',
    'true',
    'undefined',
    'value',
    'values'
  ];

  /** Used to minify `iterationFactory` option properties */
  var iterationFactoryOptions = [
    'afterLoop',
    'args',
    'array',
    'beforeLoop',
    'bottom',
    'exits',
    'inLoop',
    'init',
    'iterate',
    'loopExp',
    'object',
    'returns',
    'top',
    'useHas'
  ];

  /** Used to minify variables and string values to a single character */
  var minNames = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  /** Used protect the specified properties from getting minified */
  var propWhitelist = [
    '_',
    'amd',
    'chain',
    'clearTimeout',
    'criteria',
    'escape',
    'evaluate',
    'interpolate',
    'isEqual',
    'isFinite',
    'lodash',
    'setTimeout',
    'templateSettings',
    'toArray',
    'value',
    'variable'
  ];

  /*--------------------------------------------------------------------------*/

  /**
   * Pre-process a given JavaScript `source`, preparing it for minification.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the processed source.
   */
  function preprocess(source) {
    // remove copyright to add later in post-compile.js
    source = source.replace(/\/\*![\s\S]+?\*\//, '');

    // correct JSDoc tags for Closure Compiler
    source = source.replace(/@(?:alias|category)[^\n]*/g, '');

    // add brackets to whitelisted properties so Closure Compiler won't mung them.
    // http://code.google.com/closure/compiler/docs/api-tutorial3.html#export
    source = source.replace(RegExp('\\.(' + iterationFactoryOptions.concat(propWhitelist).join('|') + ')\\b', 'g'), "['$1']");

    // minify `sortBy` and `template` methods
    ['sortBy', 'template'].forEach(function(methodName) {
      var properties = ['criteria', 'value'],
          snippet = source.match(RegExp('(\\n\\s*)function ' + methodName + '[\\s\\S]+?\\1}'))[0],
          result = snippet;

      // minify property strings
      properties.forEach(function(property, index) {
        result = result.replace(RegExp("'" + property + "'", 'g'), "'" + minNames[index] + "'");
      });

      // remove escaped newlines in strings
      result = result.replace(/\\n/g, '');

      // replace with modified snippet
      source = source.replace(snippet, result);
    });

    // minify all `iterationFactory` related snippets
    source.match(
      RegExp([
        // match variables storing `iterationFactory` options
        'var [a-zA-Z]+FactoryOptions\\s*=\\s*\\{[\\s\\S]+?};\\n',
        // match the the `iterationFactory` function
        '(\\n\\s*)function iterationFactory[\\s\\S]+?\\1}',
        // match methods created by `iterationFactor` calls
        'iterationFactory\\((?:[\'{]|[a-zA-Z]+,)[\\s\\S]+?\\);\\n'
      ].join('|'), 'g')
    )
    .forEach(function(snippet, index) {
      var result = snippet;

      // add `true` and `false` arguments to be minified
      if (/function iterationFactory/.test(snippet)) {
        result = result
          .replace(/(Function\('[\s\S]+?)undefined/, '$1true,false,undefined')
          .replace(/\)\([^)]+/, '$&,true,false');

        // replace with modified snippet early and clip snippet
        source = source.replace(snippet, result);
        snippet = result = result.replace(/\)\([\s\S]+$/, '');
      }

      // minify snippet variables/arguments
      compiledVars.forEach(function(variable, index) {
        result = result.replace(RegExp('([^.]\\b|\\\\n)' + variable + '\\b(?!\'\\s*[\\]:])', 'g'), '$1' + minNames[index]);
        // correct `typeof x == 'object'`
        if (variable == 'object') {
          result = result.replace(RegExp("(typeof [^']+')" + minNames[index] + "'", 'g'), "$1object'");
        }
        // correct boolean literals
        if (variable == 'true' || variable == 'false') {
          result = result
            .replace(RegExp(':\\s*' + minNames[index] + '\\s*,', 'g'), ':' + variable + ',')
            .replace(RegExp('\\s*' + minNames[index] + '\\s*;', 'g'), variable + ';');
        }
      });

      // minify snippet values
      compiledValues.forEach(function(value, index) {
        result = result.replace(RegExp("'" + value + "'", 'g'), "'" + minNames[index] + "'");
      });

      // minify iterationFactory option property strings
      iterationFactoryOptions.forEach(function(property, index) {
        if (property == 'array' || property == 'object') {
          result = result.replace(RegExp("'" + property + "'(\\s*[\\]:])", 'g'), "'" + minNames[index] + "'$1");
        } else {
          result = result.replace(RegExp("'" + property + "'", 'g'), "'" + minNames[index] + "'");
        }
      });

      // remove escaped newlines in strings
      result = result.replace(/\\n/g, '');

      // replace with modified snippet
      source = source.replace(snippet, result);
    });

    return source;
  }

  /*--------------------------------------------------------------------------*/

  // expose `preprocess`
  if (module != require.main) {
    module.exports = preprocess;
  } else {
    // read the JavaScript source file from the first argument if the script
    // was invoked directly (e.g. `node pre-compile.js source.js`) and write to
    // the same file
    (function() {
      var source = fs.readFileSync(process.argv[2], 'utf8');
      fs.writeFileSync(process.argv[2], preprocess(source), 'utf8');
    }());
  }
}());
