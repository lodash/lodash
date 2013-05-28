#!/usr/bin/env node
;(function() {
  'use strict';

  /** Load Node.js modules */
  var fs = require('fs'),
      vm = require('vm');

  /** The minimal license/copyright template */
  var licenseTemplate = [
    '/**',
    ' * @license',
    ' * Lo-Dash <%= VERSION %> lodash.com/license',
    ' * Underscore.js 1.4.4 underscorejs.org/LICENSE',
    ' */'
  ].join('\n');

  /*--------------------------------------------------------------------------*/

  /**
   * Post-process a given minified Lo-Dash `source`, preparing it for
   * deployment.
   *
   * @param {String} source The source to process.
   * @returns {String} Returns the processed source.
   */
  function postprocess(source) {
    // correct overly aggressive Closure Compiler advanced optimization
    source = source
      .replace(/(document[^&]+&&)\s*(?:\w+|!\d)/, '$1!({toString:0}+"")')
      .replace(/"\t"/g, '"\\t"')
      .replace(/"[^"]*?\\f[^"]*?"/g,
        '" \\t\\x0B\\f\\xa0\\ufeff' +
        '\\n\\r\\u2028\\u2029' +
        '\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000"'
      );

    try {
      var context = vm.createContext({});
      vm.runInContext(source, context);
    } catch(e) { }

    ['forEach', 'forIn', 'forOwn'].forEach(function(methodName) {
      var pairs = /[!=]==\s*([a-zA-Z]+)(?!\()|([a-zA-Z]+)\s*[!=]==/.exec((context._ || {})[methodName]),
          varName = pairs && (pairs[1] || pairs[2]),
          value = (value = varName && RegExp('\\b' + varName + '\\s*=\\s*!([01])\\b').exec(source)) && !+value[1];

      if (typeof value == 'boolean') {
        // replace vars for `false` and `true` with boolean literals
        source = source.replace(RegExp('([!=]==\\s*)' + varName + '\\b(?!\\()|\\b' + varName + '(\\s*[!=]==)', 'g'), function(match, prelude, postlude, at) {
          // avoid replacing local variables with the same name
          return RegExp('\\b' + varName + '\\s*(?:,|=[^=])').test(source.slice(at - 10, at))
            ? match
            : (prelude || '') + value + (postlude || '');
        });
      }
    });

    // replace `!1` and `!0` in expressions with `false` and `true` values
    [/([!=]==)\s*!1\b|(.)!1\s*([!=]==)/g, /([!=]==)\s*!0\b|(.)!0\s*([!=]==)/g].forEach(function(regexp, index) {
      source = source.replace(regexp, function(match, prelude, chr, postlude) {
        return (prelude || chr + (/\w/.test(chr) ? ' ' : '')) + !!index + (postlude || '');
      });
    });

    // flip `typeof` expressions to help optimize Safari and
    // correct the AMD module definition for AMD build optimizers
    // (e.g. from `"number" == typeof x` to `typeof x == "number")
    source = source.replace(/(\w)?("[^"]+")\s*([!=]=)\s*(typeof(?:\s*\([^)]+\)|\s+[.\w]+(?!\[)))/g, function(match, other, type, equality, expression) {
      return (other ? other + ' ' : '') + expression + equality + type;
    });

    // add a space so `define` is detected by the Dojo builder
    source = source.replace(/(.)(define\()/, function(match, prelude, define) {
      return prelude + (/^\S/.test(prelude) ? ' ' : '') +  define;
    });

    // add trailing semicolon
    if (source) {
      source = source.replace(/[\s;]*?(\s*\/\/.*\s*|\s*\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/\s*)*$/, ';$1');
    }
    // exit early if version snippet isn't found
    var snippet = /VERSION\s*[=:]\s*([\'"])(.*?)\1/.exec(source);
    if (!snippet) {
      return source;
    }
    // remove copyright header
    source = source.replace(/^\/\**[\s\S]+?\*\/\n/, '');

    // add new copyright header
    var version = snippet[2];
    source = licenseTemplate.replace('<%= VERSION %>', version) + '\n;' + source;

    return source;
  }

  /*--------------------------------------------------------------------------*/

  // expose `postprocess`
  if (module != require.main) {
    module.exports = postprocess;
  }
  else {
    // read the Lo-Dash source file from the first argument if the script
    // was invoked directly (e.g. `node post-compile.js source.js`) and write to
    // the same file
    (function() {
      var options = process.argv;
      if (options.length < 3) {
        return;
      }
      var filePath = options[options.length - 1],
          source = fs.readFileSync(filePath, 'utf8');

      fs.writeFileSync(filePath, postprocess(source), 'utf8');
    }());
  }
}());
