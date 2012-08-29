#!/usr/bin/env node
;(function() {
  'use strict';

  /** The Node filesystem module */
  var fs = require('fs');

  /** Used to minify variables embedded in compiled strings */
  var compiledVars = [
    'argsIndex',
    'argsLength',
    'callback',
    'collection',
    'concat',
    'ctor',
    'hasOwnProperty',
    'identity',
    'index',
    'iteratee',
    'iteratorBind',
    'length',
    'nativeKeys',
    'object',
    'ownIndex',
    'ownProps',
    'prop',
    'propertyIsEnumerable',
    'propIndex',
    'props',
    'result',
    'skipProto',
    'slice',
    'stringClass',
    'thisArg',
    'toString',
    'value',

    // lesser used variables
    'accumulator',
    'args',
    'arrayLikeClasses',
    'ArrayProto',
    'bind',
    'callee',
    'className',
    'compareAscending',
    'destValue',
    'forIn',
    'found',
    'funcs',
    'indexOf',
    'indicator',
    'isArguments',
    'isArr',
    'isArray',
    'isFunc',
    'isFunction',
    'isPlainObject',
    'methodName',
    'noaccum',
    'objectClass',
    'objectTypes',
    'pass',
    'properties',
    'property',
    'propsLength',
    'recursive',
    'source',
    'stack',
    'stackLength',
    'target',
    'valueProp'
  ];

  /** Used to minify `compileIterator` option properties */
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

  /** Used to minify variables and string values to a single character */
  var minNames = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  minNames.push.apply(minNames, minNames.map(function(value) {
    return value + value;
  }));

  /** Used to protect the specified properties from getting minified */
  var propWhitelist = [
    '_',
    '_chain',
    '_wrapped',
    '__proto__',
    'after',
    'all',
    'amd',
    'any',
    'attachEvent',
    'bind',
    'bindAll',
    'chain',
    'clearTimeout',
    'clone',
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
    'groupBy',
    'has',
    'head',
    'identity',
    'include',
    'index',
    'indexOf',
    'initial',
    'inject',
    'interpolate',
    'intersection',
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
    'omit',
    'once',
    'opera',
    'partial',
    'pick',
    'pluck',
    'range',
    'reduce',
    'reduceRight',
    'reject',
    'rest',
    'result',
    'select',
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
    'zipObject'
  ];

  /*--------------------------------------------------------------------------*/

  /**
   * Pre-process a given Lo-Dash `source`, preparing it for minification.
   *
   * @param {String} source The source to process.
   * @returns {String} Returns the processed source.
   */
  function preprocess(source) {
    // remove copyright to add later in post-compile.js
    source = source.replace(/\/\*![\s\S]+?\*\//, '');

    // remove unrecognized JSDoc tags so Closure Compiler won't complain
    source = source.replace(/@(?:alias|category)\b.*/g, '');

    // manually convert `arrayLikeClasses` property assignments because
    // Closure Compiler errors trying to minify them
    source = source.replace(/(arrayLikeClasses =)[\s\S]+?= *true/,
      "$1{'[object Arguments]': true, '[object Array]': true, '[object Boolean]': false, " +
      "'[object Date]': false, '[object Function]': false, '[object Number]': false, " +
      "'[object Object]': false, '[object RegExp]': false, '[object String]': true }"
    );

    // manually convert `cloneableClasses` property assignments because
    // Closure Compiler errors trying to minify them
    source = source.replace(/(cloneableClasses =)[\s\S]+?= *true/,
      "$1{'[object Arguments]': false, '[object Array]': true, '[object Boolean]': true, " +
      "'[object Date]': true, '[object Function]': false, '[object Number]': true, " +
      "'[object Object]': true, '[object RegExp]': true, '[object String]': true }"
    );

    // add brackets to whitelisted properties so Closure Compiler won't mung them
    // http://code.google.com/closure/compiler/docs/api-tutorial3.html#export
    source = source.replace(RegExp('\\.(' + propWhitelist.join('|') + ')\\b', 'g'), "['$1']");

    // remove brackets from `_.escape()` in `_.template`
    source = source.replace(/__e *= *_\['escape']/g, '__e=_.escape');

    // remove brackets from `collection.indexOf` in `_.contains`
    source = source.replace("collection['indexOf'](target)", 'collection.indexOf(target)');

    // remove brackets from `result[length].value` in `_.sortBy`
    source = source.replace("result[length]['value']", 'result[length].value');

    // remove whitespace from string literals
    source = source.replace(/'(?:(?=(\\?))\1.)*?'/g, function(string) {
      // avoids removing the '\n' of the `stringEscapes` object
      return string.replace(/\[object |delete |else if|function | in |return\s+[\w']|throw |typeof |use strict|var |@ |'\\n'|\\\\n|\\n|\s+/g, function(match) {
        return match == false || match == '\\n' ? '' : match;
      });
    });

    // remove whitespace from `_.template` related regexes
    source = source.replace(/(?:reDelimiterCode\w+|reEmptyString\w+|reInsertVariable) *=.+/g, function(match) {
      return match.replace(/ |\\n/g, '');
    });

    // remove newline from double-quoted strings in `_.template`
    source = source
      .replace('"\';\\n__with ("', '"\';__with("')
      .replace('"\\n}__\\n__p += \'"', '"}____p+=\'"')
      .replace('"__p = \'"', '"__p=\'"')
      .replace('"\';\\n"', '"\';"')
      .replace("') {\\n'", "'){'")

    // remove `useSourceURL` variable
    source = source.replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n *try *\{(?:\s*\/\/.*)*\n *var useSourceURL[\s\S]+?catch[^}]+}\n/, '');

    // remove debug sourceURL use in `_.template`
    source = source.replace(/(?:\s*\/\/.*\n)* *if *\(useSourceURL[^}]+}/, '');

    // minify internal properties used by 'compareAscending', `_.clone`, `_.merge`, and `_.sortBy`
    (function() {
      var properties = ['criteria', 'index', 'source', 'value'],
          snippets = source.match(/( +)(?:function clone|function compareAscending|var merge|var sortBy)\b[\s\S]+?\n\1}/g);

      if (!snippets) {
        return;
      }
      snippets.forEach(function(snippet) {
        var modified = snippet,
            isCompilable = /(?:var merge|var sortBy)\b/.test(modified),
            isInlined = !/\bcreateIterator\b/.test(modified);

        // minify properties
        properties.forEach(function(property, index) {
          var reBracketProp = RegExp("\\['(" + property + ")'\\]", 'g'),
              reDotProp = RegExp('\\.' + property + '\\b', 'g'),
              rePropColon = RegExp("(')?\\b" + property + "\\1 *:", 'g');

          if (isCompilable) {
            // add quotes around properties in the inlined `_.merge` and `_.sortBy`
            // of the mobile build so Closure Compiler won't mung them
            if (isInlined) {
              modified = modified
                .replace(reBracketProp, "['" + minNames[index] + "']")
                .replace(reDotProp, "['" + minNames[index] + "']")
                .replace(rePropColon, "'" + minNames[index] + "':");
            }
            else {
              modified = modified
                .replace(reBracketProp, '.' + minNames[index])
                .replace(reDotProp, '.' + minNames[index])
                .replace(rePropColon, minNames[index] + ':');
            }
          }
          else {
            modified = modified
              .replace(reBracketProp, "['" + minNames[index] + "']")
              .replace(reDotProp, '.' + minNames[index])
              .replace(rePropColon, "'" + minNames[index] + "':")

            // correct `value.source` in regexp branch of `_.clone`
            if (property == 'source') {
              modified = modified.replace("value['" + minNames[index] + "']", "value['source']");
            }
          }
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

      // add brackets to whitelisted properties so Closure Compiler won't mung them
      modified = modified.replace(RegExp('\\.(' + iteratorOptions.join('|') + ')\\b', 'g'), "['$1']");

      if (isCreateIterator) {
        // replace with modified snippet early and clip snippet to the `factory`
        // call so other arguments aren't minified
        source = source.replace(snippet, modified);
        snippet = modified = modified.replace(/factory\([\s\S]+$/, '');
      }

      // minify snippet variables / arguments
      compiledVars.forEach(function(variable, index) {
        // ensure properties in compiled strings aren't minified
        modified = modified.replace(RegExp('([^.]\\b)' + variable + '\\b(?!\' *[\\]:])', 'g'), '$1' + minNames[index]);

        // correct `typeof x == 'object'`
        if (variable == 'object') {
          modified = modified.replace(RegExp("(typeof [^']+')" + minNames[index] + "'", 'g'), "$1object'");
        }
      });

      // minify `createIterator` option property names
      iteratorOptions.forEach(function(property, index) {
        if (isIteratorTemplate) {
          // minify property names as interpolated template variables
          modified = modified.replace(RegExp('\\b' + property + '\\b', 'g'), minNames[index]);
        }
        else {
          if (property == 'array' || property == 'object') {
            // minify "array" and "object" sub property names
            modified = modified.replace(RegExp("'" + property + "'( *[\\]:])", 'g'), "'" + minNames[index] + "'$1");
          }
          else {
            // minify property name strings
            modified = modified.replace(RegExp("'" + property + "'", 'g'), "'" + minNames[index] + "'");
            // minify property names in regexes and accessors
            if (isCreateIterator) {
              modified = modified.replace(RegExp('([\\.|/])' + property + '\\b' , 'g'), '$1' + minNames[index]);
            }
          }
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
      var source = fs.readFileSync(process.argv[2], 'utf8');
      fs.writeFileSync(process.argv[2], preprocess(source), 'utf8');
    }());
  }
}());
