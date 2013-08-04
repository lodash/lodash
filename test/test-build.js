#!/usr/bin/env node
;(function(undefined) {
  'use strict';

  /** Load Node.js modules */
  var vm = require('vm');

  /** Load other modules */
  var _ = require('../dist/lodash.js'),
      build = require('../build.js'),
      minify = require('../build/minify.js'),
      util = require('../build/util.js');

  /** Module shortcuts */
  var fs = util.fs,
      path = util.path;

  /** Used to avoid `noglobal` false positives caused by `errno` leaked in Node.js */
  global.errno = true;

  /** The current working directory */
  var cwd = process.cwd();

  /** Used to prefix relative paths from the current directory */
  var relativePrefix = '.' + path.sep;

  /** The unit testing framework */
  var QUnit = (
    global.addEventListener = Function.prototype,
    global.QUnit = require('../vendor/qunit/qunit/qunit.js'),
    require('../vendor/qunit-clib/qunit-clib.js').runInContext(global),
    delete global.addEventListener,
    global.QUnit
  );

  /** Shortcut used to push arrays of values to an array */
  var push = Array.prototype.push;

  /** The time limit for the tests to run (milliseconds) */
  var timeLimit = process.argv.reduce(function(result, value, index) {
    if (/--time-limit/.test(value)) {
      return parseInt(process.argv[index + 1].replace(/(\d+h)?(\d+m)?(\d+s)?/, function(match, h, m, s) {
        return ((parseInt(h) || 0) * 3600000) +
               ((parseInt(m) || 0) * 60000) +
               ((parseInt(s) || 0) * 1000);
      })) || result;
    }
    return result;
  }, 0);

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
    'unique': 'uniq',
    'unzip': 'zip'
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
    'zip': ['unzip'],
    'zipObject': ['object']
  };

  /** Used to track the category of identifiers */
  var categoryMap = {
    'Arrays': [
      'compact',
      'difference',
      'findIndex',
      'findLastIndex',
      'first',
      'flatten',
      'indexOf',
      'initial',
      'intersection',
      'last',
      'lastIndexOf',
      'pull',
      'range',
      'rest',
      'sortedIndex',
      'union',
      'uniq',
      'without',
      'zip',
      'zipObject'
    ],
    'Chaining': [
      'chain',
      'lodash',
      'tap',
      'wrapperChain',
      'wrapperToString',
      'wrapperValueOf'
    ],
    'Collections': [
      'at',
      'contains',
      'countBy',
      'every',
      'filter',
      'find',
      'findLast',
      'findWhere',
      'forEach',
      'forEachRight',
      'groupBy',
      'indexBy',
      'invoke',
      'map',
      'max',
      'min',
      'pluck',
      'reduce',
      'reduceRight',
      'reject',
      'remove',
      'shuffle',
      'size',
      'some',
      'sortBy',
      'toArray',
      'where'
    ],
    'Functions': [
      'after',
      'bind',
      'bindAll',
      'bindKey',
      'createCallback',
      'compose',
      'debounce',
      'defer',
      'delay',
      'memoize',
      'once',
      'partial',
      'partialRight',
      'throttle',
      'wrap'
    ],
    'Objects': [
      'assign',
      'clone',
      'cloneDeep',
      'defaults',
      'findKey',
      'findLastKey',
      'forIn',
      'forInRight',
      'forOwn',
      'forOwnRight',
      'functions',
      'has',
      'invert',
      'isArguments',
      'isArray',
      'isBoolean',
      'isDate',
      'isElement',
      'isEmpty',
      'isEqual',
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
      'merge',
      'omit',
      'pairs',
      'pick',
      'transform',
      'values'
    ],
    'Utilities': [
      'escape',
      'identity',
      'mixin',
      'noConflict',
      'parseInt',
      'random',
      'result',
      'runInContext',
      'template',
      'templateSettings',
      'times',
      'unescape',
      'uniqueId'
    ]
  };

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
    'lodash',
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

  /** List of Lo-Dash only functions */
  var lodashOnlyFuncs = [
    'at',
    'bindKey',
    'cloneDeep',
    'createCallback',
    'findIndex',
    'findKey',
    'findLast',
    'findLastIndex',
    'findLastKey',
    'forEachRight',
    'forIn',
    'forInRight',
    'forOwn',
    'forOwnRight',
    'indexBy',
    'isPlainObject',
    'merge',
    'parseInt',
    'partialRight',
    'pull',
    'remove',
    'runInContext',
    'transform'
  ];

  /** List of all functions */
  var allFuncs = _.functions(_).filter(function(funcName) {
    return !/^_/.test(funcName);
  });

  /** List of all Lo-Dash functions */
  var lodashFuncs = allFuncs.slice();

  /** List of Underscore functions */
  var underscoreFuncs = _.difference(allFuncs, lodashOnlyFuncs);

  /*--------------------------------------------------------------------------*/

  /**
   * Capitalizes a given string.
   *
   * @private
   * @param {String} string The string to capitalize.
   * @returns {String} Returns the capitalized string.
   */
  function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  /**
   * Creates a context object to use with `vm.runInContext`.
   *
   * @private
   * @returns {Object} Returns a new context object.
   */
  function createContext() {
    return vm.createContext({
      'clearTimeout': clearTimeout,
      'setTimeout': setTimeout
    });
  }

  /**
   * Expands a list of function names to include real and alias names.
   *
   * @private
   * @param {Array} funcNames The array of function names to expand.
   * @returns {Array} Returns a new array of expanded function names.
   */
  function expandFuncNames(funcNames) {
    return funcNames.reduce(function(result, funcName) {
      var realName = getRealName(funcName);
      push.apply(result, [realName].concat(getAliases(realName)));
      return result;
    }, []);
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
   * Tests if a given method can be called successfully.
   *
   * @private
   * @param {Object} lodash The built Lo-Dash object.
   * @param {String} funcName The name of the method to test.
   * @param {String} message The unit test message.
   */
  function testMethod(lodash, methodName, message) {
    var pass = true,
        array = [['a', 1], ['b', 2], ['c', 3]],
        object = { 'a': 1, 'b': 2, 'c': 3 },
        noop = function() {},
        string = 'abc',
        template = '<%= a %>',
        func = lodash[methodName];

    try {
      if (_.contains(categoryMap.Arrays, methodName)) {
        if (/(?:indexOf|sortedIndex|without)$/i.test(methodName)) {
          func(array, string);
        } else if (/^(?:difference|intersection|union|uniq|zip)/.test(methodName)) {
          func(array, array);
        } else if (methodName == 'range') {
          func(2, 4);
        } else {
          func(array);
        }
      }
      else if (_.contains(categoryMap.Chaining, methodName)) {
        lodash(array)[methodName](noop);
      }
      else if (_.contains(categoryMap.Collections, methodName)) {
        if (/^(?:count|group|sort)By$/.test(methodName)) {
          func(array, noop);
          func(array, string);
          func(object, noop);
          func(object, string);
        }
        else if (/^(?:size|toArray)$/.test(methodName)) {
          func(array);
          func(object);
        }
        else if (methodName == 'at') {
          func(array, 0, 2);
          func(object, 'a', 'c');
        }
        else if (methodName == 'invoke') {
          func(array, 'slice');
          func(object, 'toFixed');
        }
        else if (methodName == 'findWhere' || methodName == 'where') {
          func(array, object);
          func(object, object);
        }
        else {
          func(array, noop, object);
          func(object, noop, object);
        }
      }
      else if (_.contains(categoryMap.Functions, methodName)) {
        if (methodName == 'after') {
          func(1, noop);
        } else if (methodName == 'bindAll') {
          func({ 'noop': noop });
        } else if (methodName == 'bindKey') {
          func(lodash, 'identity', array, string);
        } else if (/^(?:bind|partial(?:Right)?)$/.test(methodName)) {
          func(noop, object, array, string);
        } else if (/^(?:compose|memoize|wrap)$/.test(methodName)) {
          func(noop, noop);
        } else if (/^(?:debounce|throttle)$/.test(methodName)) {
          func(noop, 100);
        } else {
          func(noop);
        }
      }
      else if (_.contains(categoryMap.Objects, methodName)) {
        if (methodName == 'clone') {
          func(object);
          func(object, true);
        }
        else if (/^(?:defaults|extend|merge)$/.test(methodName)) {
          func({}, object);
        } else if (/^(?:forIn|forOwn)$/.test(methodName)) {
          func(object, noop);
        } else if (/^(?:omit|pick)$/.test(methodName)) {
          func(object, 'b');
        } else if (methodName == 'has') {
          func(object, string);
        } else {
          func(object);
        }
      }
      else if (_.contains(categoryMap.Utilities, methodName)) {
        if (methodName == 'mixin') {
          func({});
        } else if (methodName == 'result') {
          func(object, 'b');
        } else if (methodName == 'runInContext') {
          func();
        } else if (methodName == 'template') {
          func(template, object);
          func(template, null, { 'imports': object })(object);
        } else if (methodName == 'times') {
          func(2, noop, object);
        } else {
          func(string, object);
        }
      }
    }
    catch(e) {
      console.log(e);
      pass = false;
    }
    ok(pass, '_.' + methodName + ': ' + message);
  }

  /*--------------------------------------------------------------------------*/

  QUnit.module('build command checks');

  (function() {
    var reHelp = /lodash --help/,
        write = process.stdout.write;

    var commands = [
      'node.EXE build -s modern',
      '-s strict underscore'
    ];

    commands.forEach(function(command) {
      asyncTest('`lodash ' + command +'` is valid', function() {
        var start = _.after(2, _.once(function() {
          ok(true, 'should be valid');
          QUnit.start();
        }));

        build(command.split(' '), start);
      });
    });

    commands = [
      'csp backbone',
      'mobile underscore',
      'modern template=./*.jst'
    ];

    commands.forEach(function(command) {
      asyncTest('`lodash ' + command +'` is not valid', function() {
        process.stdout.write = _.once(function(string) {
          ok(reHelp.test(string));
          process.stdout.write = write;
          QUnit.start();
        });

        build(command.split(' '), function() {});
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('minified AMD snippet');

  (function() {
    asyncTest('r.js build optimizer check', function() {
      var start = _.after(2, _.once(QUnit.start));

      build(['-s', 'exclude='], function(data) {
        // uses the same regexp from the r.js build optimizer
        var basename = path.basename(data.outputPath, '.js'),
            defineHasRegExp = /typeof\s+define\s*==(=)?\s*['"]function['"]\s*&&\s*typeof\s+define\.amd\s*==(=)?\s*['"]object['"]\s*&&\s*define\.amd/g;

        ok(defineHasRegExp.test(data.source), basename);
        start();
      });
    });

    asyncTest('Dojo builder check', function() {
      var start = _.after(2, _.once(QUnit.start));

      build(['-s', 'exclude='], function(data) {
        var basename = path.basename(data.outputPath, '.js'),
            reSpaceDefine = /\sdefine\(/;

        ok(reSpaceDefine.test(data.source), basename);
        start();
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('template builds');

  (function() {
    var templatePath = path.join(__dirname, 'template');

    var commands = [
      'template=' + path.join('template', '*.jst'),
      'template=' + relativePrefix + path.join('template', '*.jst'),
      'template=' + path.join(templatePath, '*.jst')
    ];

    commands.forEach(function(command) {
      asyncTest('`lodash ' + command +'`', function() {
        var start = _.after(2, _.once(function() {
          process.chdir(cwd);
          QUnit.start();
        }));

        process.chdir(__dirname);

        build(['-s', command], function(data) {
          var basename = path.basename(data.outputPath, '.js'),
              context = createContext();

          var object = {
            'a': { 'people': ['moe', 'larry', 'curly'] },
            'b': { 'epithet': 'stooge' },
            'c': { 'name': 'ES6' }
          };

          context._ = _;
          vm.runInContext(data.source, context);

          var actual = _.templates.a(object.a);
          equal(actual.replace(/[\r\n]+/g, ''), '<ul><li>moe</li><li>larry</li><li>curly</li></ul>', basename);

          equal(_.templates.b(object.b), 'Hello stooge.', basename);
          equal(_.templates.c(object.c), 'Hello ES6!', basename);

          delete _.templates;
          start();
        });
      });
    });

    commands = [
      '',
      'moduleId=underscore'
    ];

    commands.forEach(function(command) {
      var expectedId = /underscore/.test(command) ? 'underscore' : 'lodash';

      asyncTest('`lodash exports=amd' + (command ? ' ' + command + '`' : '` using the default `moduleId`'), function() {
        var start = _.after(2, _.once(QUnit.start));

        build(['-s', 'template=' + path.join(templatePath, '*.jst'), 'exports=amd'].concat(command || []), function(data) {
          var moduleId,
              basename = path.basename(data.outputPath, '.js'),
              context = createContext();

          context.define = function(requires, factory) {
            factory(_);
            moduleId = requires[0];
          };

          context.define.amd = {};
          vm.runInContext(data.source, context);

          var templates = _.templates;
          equal(moduleId, expectedId, basename);
          ok('a' in templates && 'b' in templates && 'c' in templates, basename);

          var actual = templates.a({ 'people': ['moe', 'larry'] });
          equal(actual.replace(/[\r\n]+/g, ''), '<ul><li>moe</li><li>larry</li></ul>', basename);

          delete _.templates;
          start();
        });
      });

      asyncTest('`lodash settings=...' + (command ? ' ' + command : '') + '`', function() {
        var start = _.after(2, _.once(QUnit.start));

        build(['-s', 'template=' + path.join(templatePath, '*.tpl'), 'settings={interpolate:/{{([\\s\\S]+?)}}/}'].concat(command || []), function(data) {
          var moduleId,
              basename = path.basename(data.outputPath, '.js'),
              context = createContext();

          var object = {
            'd': { 'name': 'Mustache' }
          };

          context.define = function(requires, factory) {
            factory(_);
            moduleId = requires[0];
          };

          context.define.amd = {};
          vm.runInContext(data.source, context);

          equal(moduleId, expectedId, basename);
          equal(_.templates.d(object.d), 'Hallå Mustache!', basename);
          delete _.templates;
          start();
        });
      });
    });

    var defaultTemplates = { 'c': function() { return ''; } };

    var exportsCommands = [
      'exports=amd',
      'exports=commonjs',
      'exports=global',
      'exports=node',
      'exports=none'
    ];

    exportsCommands.forEach(function(command, index) {
      asyncTest('`lodash ' + command +'`', function() {
        var start = _.after(2, _.once(QUnit.start));

        build(['-s',  'template=' + path.join(templatePath, '*.jst'), command], function(data) {
          var templates,
              basename = path.basename(data.outputPath, '.js'),
              context = createContext(),
              source = data.source;

          switch(index) {
            case 0:
              context.define = function(requires, factory) { factory(_); };
              context.define.amd = {};
              vm.runInContext(source, context);

              templates = _.templates || defaultTemplates;
              break;

            case 1:
              context.exports = {};
              context.require = function() { return _; };
              vm.runInContext(source, context);

              templates = context.exports.templates || defaultTemplates;
              break;

            case 2:
              context._ = _;
              vm.runInContext(source, context);

              templates = context._.templates || defaultTemplates;
              break;

            case 3:
              context.exports = {};
              context.require = function() { return _; };
              context.module = { 'exports': context.exports };
              vm.runInContext(source, context);

              templates = context.module.exports || defaultTemplates;
              break;

            case 4:
              vm.runInContext(source, context);
              strictEqual(context._, undefined, basename);
          }
          if (templates) {
            equal(templates.c({ 'name': 'Moe' }), 'Hello Moe!', basename);
          }
          delete _.templates;
          start();
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('independent builds');

  (function() {
    var reCustom = /Custom Build/,
        reLicense = /^\/\**\s+\* @license[\s\S]+?\*\/\n/;

    asyncTest('debug only', function() {
      var start = _.once(QUnit.start);
      build(['-d', '-s'], function(data) {
        equal(path.basename(data.outputPath, '.js'), 'lodash');
        start();
      });
    });

    asyncTest('debug custom', function() {
      var start = _.once(QUnit.start);
      build(['-d', '-s', 'backbone'], function(data) {
        equal(path.basename(data.outputPath, '.js'), 'lodash.custom');

        var comment = data.source.match(reLicense);
        ok(reCustom.test(comment));
        start();
      });
    });

    asyncTest('minified only', function() {
      var start = _.once(QUnit.start);
      build(['-m', '-s'], function(data) {
        equal(path.basename(data.outputPath, '.js'), 'lodash.min');
        start();
      });
    });

    asyncTest('minified custom', function() {
      var start = _.once(QUnit.start);
      build(['-m', '-s', 'backbone'], function(data) {
        equal(path.basename(data.outputPath, '.js'), 'lodash.custom.min');

        var comment = data.source.match(reLicense);
        ok(reCustom.test(comment));
        start();
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('csp modifier');

  (function() {
    asyncTest('`lodash csp`', function() {
      var sources = [];

      var check = _.after(2, _.once(function() {
        ok(_.every(sources, function(source) {
          // remove `Function` in `_.template` before testing for additional use
          return !/\bFunction\(/.test(source.replace(/= *\w+\(\w+, *['"]return.+?apply[^)]+\)/, ''));
        }));

        equal(sources[0], sources[1]);
        QUnit.start();
      }));

      var callback = function(data) {
        // remove copyright header and append to `sources`
        sources.push(data.source.replace(/^\/\**[\s\S]+?\*\/\n/, ''));
        check();
      };

      build(['-s', '-d', 'csp'], callback);
      build(['-s', '-d', 'modern'], callback);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('mobile modifier');

  (function() {
    asyncTest('`lodash mobile`', function() {
      var start = _.after(2, _.once(QUnit.start));

      build(['-s', 'mobile'], function(data) {
        var array = [1, 2, 3],
            basename = path.basename(data.outputPath, '.js'),
            context = createContext(),
            object1 = [{ 'a': 1 }],
            object2 = [{ 'b': 2 }],
            object3 = [{ 'a': 1, 'b': 2 }],
            circular1 = { 'a': 1 },
            circular2 = { 'a': 1 };

        circular1.b = circular1;
        circular2.b = circular2;

        vm.runInContext(data.source, context);
        var lodash = context._;

        deepEqual(lodash.merge(object1, object2), object3, basename);
        deepEqual(lodash.sortBy([3, 2, 1], _.identity), array, basename);
        strictEqual(lodash.isEqual(circular1, circular2), true, basename);

        var actual = lodash.cloneDeep(circular1);
        ok(actual != circular1 && actual.b == actual, basename);
        start();
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('modern modifier');

  (function() {
    asyncTest('`lodash modern`', function() {
      var start = _.after(2, _.once(QUnit.start));

      build(['-s', 'modern'], function(data) {
        var basename = path.basename(data.outputPath, '.js'),
            context = createContext();

        vm.runInContext(data.source, context);
        var lodash = context._;

        strictEqual(lodash.isPlainObject(Object.create(null)), true, basename);
        start();
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('source-map modifier');

  (function() {
    var mapCommands = [
      '-p',
      '-p custom.map',
      '--source-map',
      '--source-map custom.map'
    ];

    var outputCommands = [
      '',
      '-o foo.js',
      '-m -o bar.js'
    ];

    mapCommands.forEach(function(mapCommand) {
      outputCommands.forEach(function(outputCommand) {
        asyncTest('`lodash ' + mapCommand + (outputCommand ? ' ' + outputCommand : '') + '`', function() {
          var callback = _.once(function(data) {
            var basename = path.basename(data.outputPath, '.js'),
                sources = /foo.js/.test(outputCommand) ? ['foo.js'] : ['lodash' + (outputCommand.length ? '' : '.custom') + '.js'],
                sourceMap = JSON.parse(data.sourceMap),
                sourceMapURL = (/\w+(?=\.map$)/.exec(mapCommand) || [basename])[0];

            ok(RegExp('\\n//# sourceMappingURL=' + sourceMapURL + '.map$').test(data.source), basename);
            equal(sourceMap.file, basename + '.js', basename);
            deepEqual(sourceMap.sources, sources, basename);

            process.chdir(cwd);
            QUnit.start();
          });

          process.chdir(__dirname);

          outputCommand = outputCommand ? outputCommand.split(' ') : [];
          if (!_.contains(outputCommand, '-m')) {
            callback = _.after(2, callback);
          }
          build(['-s'].concat(mapCommand.split(' '), outputCommand), callback);
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('strict modifier');

  (function() {
    var object = Object.freeze({
      'a': _.identity,
      'b': undefined
    });

    var modes = [
      'non-strict',
      'strict'
    ];

    modes.forEach(function(strictMode, index) {
      asyncTest(strictMode + ' should ' + (index ? 'error': 'silently fail') + ' attempting to overwrite read-only properties', function() {
        var commands = ['-s', 'include=bindAll,defaults,extend'],
            start = _.after(2, _.once(QUnit.start));

        if (index) {
          commands.push('strict');
        }
        build(commands, function(data) {
          var basename = path.basename(data.outputPath, '.js'),
              context = createContext();

          vm.runInContext(data.source, context);
          var lodash = context._;

          var actual = _.every([
            function() { lodash.bindAll(object); },
            function() { lodash.extend(object, { 'a': 1 }); },
            function() { lodash.defaults(object, { 'b': 2 }); }
          ], function(fn) {
            var pass = !index;
            try {
              fn();
            } catch(e) {
              pass = !!index;
            }
            return pass;
          });

          ok(actual, basename);
          start();
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('underscore modifier');

  (function() {
    asyncTest('modified methods should work correctly', function() {
      var start = _.after(2, _.once(QUnit.start));

      build(['-s', 'underscore'], function(data) {
        var array = [{ 'a': 1, 'b': 2 }, { 'a': 2, 'b': 2 }],
            basename = path.basename(data.outputPath, '.js'),
            context = createContext();

        vm.runInContext(data.source, context);
        var lodash = context._;

        var object = {
          'fn': lodash.bind(function(foo) {
            return foo + this.bar;
          }, { 'bar': 1 }, 1)
        };

        equal(object.fn(), 2, '_.bind: ' + basename);

        var actual = lodash.clone('a', function() {
          return this.a;
        }, { 'a': 'A' });

        equal(actual, 'a', '_.clone should ignore `callback` and `thisArg`: ' + basename);
        strictEqual(lodash.clone(array, true)[0], array[0], '_.clone should ignore `deep`: ' + basename);

        strictEqual(lodash.contains({ 'a': 1, 'b': 2 }, 1), true, '_.contains should work with objects: ' + basename);
        strictEqual(lodash.contains([1, 2, 3], 1, 2), true, '_.contains should ignore `fromIndex`: ' + basename);
        strictEqual(lodash.every([true, false, true]), false, '_.every: ' + basename);

        function Foo() {}
        Foo.prototype = { 'a': 1 };

        deepEqual(lodash.defaults({}, new Foo), Foo.prototype, '_.defaults should assign inherited `source` properties: ' + basename);
        deepEqual(lodash.extend({}, new Foo), Foo.prototype, '_.extend should assign inherited `source` properties: ' + basename);

        var callback = function(a, b) {
          actual = this[b];
        };

        actual = lodash.extend({}, { 'a': 0 }, callback, [2]);
        strictEqual(actual.a, 0, '_.extend should ignore `callback` and `thisArg`: ' + basename);

        actual = lodash.find(array, function(value) {
          return 'a' in value;
        });

        equal(actual, _.first(array), '_.find: ' + basename);

        var last;
        actual = lodash.forEach(array, function(value) {
          last = value;
          return false;
        });

        equal(last, _.last(array), '_.forEach should not exit early: ' + basename);
        equal(actual, undefined, '_.forEach should return `undefined`: ' + basename);

        lodash.forEach([1], callback, [2]);
        equal(actual, 2, '_.forEach supports the `thisArg` argument when iterating arrays: ' + basename);

        lodash.forEach({ 'a': 1 }, callback, { 'a': 2 });
        equal(actual, 2, '_.forEach supports the `thisArg` argument when iterating objects: ' + basename);

        array = [{ 'a': [1, 2] }, { 'a': [3] }];

        actual = lodash.flatten(array, function(value, index) {
          return this[index].a;
        }, array);

        deepEqual(actual, array, '_.flatten should should ignore `callback` and `thisArg`: ' + basename);
        deepEqual(lodash.flatten(array, 'a'), array, '_.flatten should should ignore string `callback` values: ' + basename);

        object = { 'length': 0, 'splice': Array.prototype.splice };
        equal(lodash.isEmpty(object), false, '_.isEmpty should return `false` for jQuery/MooTools DOM query collections: ' + basename);

        object = { 'a': 1, 'b': 2, 'c': 3 };
        equal(lodash.isEqual(object, { 'a': 1, 'b': 0, 'c': 3 }), false, '_.isEqual: ' + basename);

        actual = lodash.isEqual('a', 'b', function(a, b) {
          return this[a] == this[b];
        }, { 'a': 1, 'b': 1 });

        strictEqual(actual, false, '_.isEqual should ignore `callback` and `thisArg`: ' + basename);

        equal(lodash.max('abc'), -Infinity, '_.max should return `-Infinity` for strings: ' + basename);
        equal(lodash.min('abc'), Infinity, '_.min should return `Infinity` for strings: ' + basename);

        object = {};
        lodash.mixin(object, { 'a': function(a) { return a[0]; } });
        equal('a' in object, false, '_.mixin should not accept a destination object: ' + basename);

        // avoid issues comparing objects with `deepEqual`
        object = { 'a': 1, 'b': 2, 'c': 3 };
        actual = lodash.omit(object, function(value) { return value == 3; });
        deepEqual(_.keys(actual).sort(), ['a', 'b', 'c'], '_.omit should not accept a `callback`: ' + basename);

        actual = lodash.pick(object, function(value) { return value != 3; });
        deepEqual(_.keys(actual), [], '_.pick should not accept a `callback`: ' + basename);

        deepEqual(lodash.range(1, 4, 0), [1, 2, 3], '_.range should not support a `step` of `0`');
        strictEqual(lodash.some([false, true, false]), true, '_.some: ' + basename);
        deepEqual(lodash.times(null, function() {}), [null], '_.times should not coerce `n` to a number: ' + basename);
        equal(lodash.template('${a}', object), '${a}', '_.template should ignore ES6 delimiters: ' + basename);
        equal('support' in lodash, false, '_.support should not exist: ' + basename);
        equal('imports' in lodash.templateSettings, false, '_.templateSettings should not have an "imports" property: ' + basename);
        strictEqual(lodash.uniqueId(0), '1', '_.uniqueId should ignore a prefix of `0`: ' + basename);

        var collection = [{ 'a': { 'b': 1, 'c': 2 } }];
        deepEqual(lodash.where(collection, { 'a': { 'b': 1 } }), [], '_.where performs shallow comparisons: ' + basename);

        collection = [{ 'a': 1 }, { 'a': 1 }];
        deepEqual(lodash.where(collection, { 'a': 1 }, true), collection[0], '_.where supports a `first` argument: ' + basename);
        deepEqual(lodash.where(collection, {}, true), undefined, '_.where should return `undefined` when passed `first` and falsey `properties`: ' + basename);

        deepEqual(lodash.findWhere(collection, { 'a': 1 }), collection[0], '_.findWhere: ' + basename);
        strictEqual(lodash.findWhere(collection, {}), undefined, '_.findWhere should return `undefined` for falsey `properties`: ' + basename);

        var expected = [[['moe', 30, true]], [['larry', 40, false]]];
        actual = lodash.zip(lodash.zip(['moe', 'larry'], [30, 40], [true, false]));
        deepEqual(actual, expected, '_.zip is unable to correctly consume it\'s output: ' + basename);

        start();
      });
    });

    asyncTest('should not have AMD support', function() {
      var start = _.after(2, _.once(QUnit.start));

      build(['-s', 'underscore'], function(data) {
        var basename = path.basename(data.outputPath, '.js'),
            context = createContext(),
            pass = true;

        context.define = function(fn) {
          pass = false;
          context._ = fn();
        };

        context.define.amd = {};
        vm.runInContext(data.source, context);

        ok(pass, basename);
        start();
      });
    });

    asyncTest('should not have any Lo-Dash-only methods', function() {
      var start = _.after(2, _.once(QUnit.start));

      build(['-s', 'underscore'], function(data) {
        var basename = path.basename(data.outputPath, '.js'),
            context = createContext();

        vm.runInContext(data.source, context);
        var lodash = context._;

        _.each(lodashOnlyFuncs.concat('assign'), function(funcName) {
          equal(lodash[funcName], undefined, '_.' + funcName + ' should not exist: ' + basename);
        });

        start();
      });
    });

    asyncTest('`lodash underscore include=partial`', function() {
      var start = _.after(2, _.once(QUnit.start));

      build(['-s', 'underscore', 'include=partial'], function(data) {
        var basename = path.basename(data.outputPath, '.js'),
            context = createContext();

        vm.runInContext(data.source, context);
        var lodash = context._;

        equal(lodash.partial(_.identity, 2)(), 2, '_.partial: ' + basename);
        start();
      });
    });

    var commands = [
      'plus=clone',
      'plus=cloneDeep'
    ];

    commands.forEach(function(command, index) {
      asyncTest('`lodash underscore ' + command +'`', function() {
        var start = _.after(2, _.once(QUnit.start));

        build(['-s', 'underscore', command], function(data) {
          var array = [{ 'value': 1 }],
              basename = path.basename(data.outputPath, '.js'),
              context = createContext();

          vm.runInContext(data.source, context, true);
          var lodash = context._;

          _.each(index ? ['clone','cloneDeep'] : ['clone'], function(funcName) {
            var clone = (funcName == 'clone')
              ? lodash.clone(array, true)
              : lodash.cloneDeep(array);

            ok(_.isEqual(array, clone), basename);
            notEqual(array[0], clone[0], basename);
          });

          start();
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('underscore chaining methods');

  (function() {
    var commands = [
      'backbone',
      'underscore',
      'modern plus=chain'
    ];

    commands.forEach(function(command) {
      asyncTest('`lodash ' + command +'`', function() {
        var start = _.after(2, _.once(QUnit.start));

        build(['-s'].concat(command.split(' ')), function(data) {
          var basename = path.basename(data.outputPath, '.js'),
              context = createContext();

          vm.runInContext(data.source, context);
          var lodash = context._;

          var array = ['abc'];
          ok(lodash.chain(array).first().first() instanceof lodash, '_.chain: ' + basename);
          ok(lodash(array).chain().first().first() instanceof lodash, '_#chain: ' + basename);

          var wrapped = lodash(1);
          strictEqual(wrapped.identity(), 1, '_(...) wrapped values are not chainable by default: ' + basename);
          equal(String(wrapped) === '1', false, '_#toString should not be implemented: ' + basename);
          equal(Number(wrapped) === 1 , false, '_#valueOf should not be implemented: ' + basename);

          wrapped.chain();
          ok(wrapped.has('x') instanceof lodash, '_#has returns wrapped values when chaining: ' + basename);
          ok(wrapped.join() instanceof lodash, '_#join returns wrapped values when chaining: ' + basename);

          wrapped = lodash([1, 2, 3]);
          ok(wrapped.pop() instanceof lodash, '_#pop returns wrapped values: ' + basename);
          ok(wrapped.shift() instanceof lodash, '_#shift returns wrapped values: ' + basename);
          deepEqual(wrapped.splice(0, 0).value(), [2], '_#splice returns wrapper: ' + basename);

          start();
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

 QUnit.module('exclude command');

  (function() {
    var commands = [
      'exclude',
      'minus'
    ];

    commands.forEach(function(command) {
      asyncTest('`lodash ' + command + '=runInContext`', function() {
        var start = _.after(2, _.once(QUnit.start));

        build(['-s', command + '=runInContext'], function(data) {
          var basename = path.basename(data.outputPath, '.js'),
              context = createContext();

          vm.runInContext(data.source, context);

          var lodash = context._,
              array = [0];

          var actual = lodash.map(array, function() {
            return String(this[0]);
          }, array);

          deepEqual(actual, ['0'], basename);
          equal('runInContext' in lodash, false, basename);
          start();
        });
      });

      asyncTest('`lodash ' + command + '=value`', function() {
        var start = _.after(2, _.once(QUnit.start));

        build(['-s', command + '=value'], function(data) {
          var basename = path.basename(data.outputPath, '.js'),
              context = createContext();

          vm.runInContext(data.source, context);
          var lodash = context._;

          equal(lodash([1]) instanceof lodash, false, basename);
          deepEqual(_.keys(lodash.prototype), [], basename);
          start();
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('exports command');

  (function() {
    var commands = [
      'exports=amd',
      'exports=commonjs',
      'exports=global',
      'exports=node',
      'exports=none'
    ];

    commands.forEach(function(command, index) {
      asyncTest('`lodash ' + command +'`', function() {
        var start = _.after(2, _.once(QUnit.start));

        build(['-s', command], function(data) {
          var basename = path.basename(data.outputPath, '.js'),
              context = createContext(),
              pass = false,
              source = data.source;

          switch(index) {
            case 0:
              context.define = function(factory) {
                pass = true;
                context._ = factory();
              };
              context.define.amd = {};
              vm.runInContext(source, context);

              ok(pass, basename);
              ok(_.isFunction(context._), basename);
              break;

            case 1:
              context.exports = {};
              vm.runInContext(source, context);

              ok(_.isFunction(context.exports._), basename);
              strictEqual(context._, undefined, basename);
              break;

            case 2:
              vm.runInContext(source, context);
              ok(_.isFunction(context._), basename);
              break;

            case 3:
              context.exports = {};
              context.module = { 'exports': context.exports };
              vm.runInContext(source, context);

              ok(_.isFunction(context.module.exports), basename);
              strictEqual(context._, undefined, basename);
              break;

            case 4:
              vm.runInContext(source, context);
              strictEqual(context._, undefined, basename);
          }
          start();
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('iife command');

  (function() {
    var commands = [
      'iife=this["lodash"]=(function(window){%output%;return _}(this))',
      'iife=define(function(window){return function(){%output%;return _}}(this));'
    ];

    commands.forEach(function(command) {
      asyncTest('`lodash ' + command +'`', function() {
        var start = _.after(2, _.once(QUnit.start));

        build(['-s', 'exports=none', command], function(data) {
          var basename = path.basename(data.outputPath, '.js'),
              context = createContext();

          context.define = function(func) {
            context.lodash = func();
          };

          try {
            vm.runInContext(data.source, context);
          } catch(e) {
            console.log(e);
          }

          var lodash = context.lodash || {};
          ok(_.isString(lodash.VERSION), basename);
          start();
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

 QUnit.module('include command');

  (function() {
    var commands = [
      'include=mixin',
      'include=mixin,tap',
      'include=mixin,value'
    ];

    commands.forEach(function(command, index) {
      asyncTest('`lodash ' + command +'`', function() {
        var start = _.after(2, _.once(QUnit.start));

        build(['-s', command], function(data) {
          var basename = path.basename(data.outputPath, '.js'),
              context = createContext(),
              noop = function() {};

          vm.runInContext(data.source, context);
          var lodash = context._;

          lodash.mixin({ 'x': noop });
          equal(lodash.x, noop, basename);
          equal(typeof lodash.prototype.x, 'function', basename);

          start();
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('no-dep option');

  (function() {
    var commands = [
      '-n',
      '--no-dep'
    ];

    commands.forEach(function(command) {
      asyncTest('`lodash modern include=each ' + command +'`', function() {
        var start = _.once(QUnit.start);

        build(['-s', 'modern', 'include=each', command], function(data) {
          var basename = path.basename(data.outputPath, '.js');
          strictEqual(/function createCallback\b/.test(data.source), false, basename);
          start();
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('output option');

  (function() {
    var nestedPath = path.join(__dirname, 'a', 'b');

    var commands = [
      '-o a.js',
      '--output b.js',
      '-o ' + path.join('a', 'b', 'c.js'),
      '-o ' + relativePrefix + path.join('a', 'b', 'c.js'),
      '-o ' + path.join(nestedPath, 'c.js'),
      '-o name_with_keywords_like_category_include_exclude_plus_minus.js'
    ];

    commands.forEach(function(command) {
      asyncTest('`lodash ' + command +'`', function() {
        var counter = 0,
            dirs = _.contains(command, 'c.js'),
            expected = /(\w+)(?=\.js$)/.exec(command)[0];

        var start = _.after(2, _.once(function() {
          if (dirs) {
            fs.rmdirSync(nestedPath);
            fs.rmdirSync(path.dirname(nestedPath));
          }
          process.chdir(cwd);
          QUnit.start();
        }));

        process.chdir(__dirname);

        build(['-s'].concat(command.split(' ')), function(data) {
          var basename = path.basename(data.outputPath, '.js');
          equal(basename, expected + (counter++ ? '.min' : ''), command);
          start();
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('stdout option');

  (function() {
    var write = process.stdout.write;

    var commands = [
      '-c',
      '-c -d',
      '--stdout',
    ];

    commands.forEach(function(command, index) {
      asyncTest('`lodash ' + command +'`', function() {
        var written,
            start = _.once(QUnit.start);

        process.stdout.write = function(string) {
          written = string;
        };

        build(['exports=', 'include='].concat(command.split(' ')), function(data) {
          strictEqual('outputPath' in data, false);
          equal(written, data.source);
          equal(arguments.length, 1);

          process.stdout.write = write;
          start();
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('underscore builds with lodash methods');

  (function() {
    var funcNames = [
      'assign',
      'bindKey',
      'clone',
      'contains',
      'debounce',
      'defaults',
      'defer',
      'difference',
      'every',
      'filter',
      'find',
      'findWhere',
      'first',
      'flatten',
      'forEach',
      'forOwn',
      'intersection',
      'initial',
      'isEmpty',
      'isEqual',
      'isPlainObject',
      'isRegExp',
      'last',
      'map',
      'max',
      'memoize',
      'min',
      'omit',
      'partial',
      'partialRight',
      'pick',
      'pluck',
      'reduce',
      'reduceRight',
      'result',
      'rest',
      'some',
      'tap',
      'template',
      'throttle',
      'times',
      'toArray',
      'transform',
      'uniq',
      'uniqueId',
      'value',
      'where',
      'zip'
    ];

    function strip(value) {
      return String(value)
        .replace(/^ *\/\/.*/gm, '')
        .replace(/\b(?:basicEach|context|forEach|forOwn|window)\b/g, '')
        .replace(/\blodash\.(createCallback\()\b/g, '$1')
        .replace(/[\s;]/g, '');
    }

    funcNames.forEach(function(funcName) {
      var command = 'underscore plus=' + funcName;

      if (funcName == 'createCallback') {
        command += ',where';
      }
      if (funcName != 'chain' && _.contains(categoryMap.Chaining.concat('mixin'), funcName)) {
        command += ',chain';
      }
      if (_.contains(['isEqual', 'isPlainObject'], funcName)) {
        command += ',forIn';
      }
      if (_.contains(['contains', 'every', 'find', 'some', 'transform'], funcName)) {
        command += ',forOwn';
      }
      asyncTest('`lodash ' + command +'`', function() {
        var start = _.after(2, _.once(QUnit.start));

        build(['-s'].concat(command.split(' ')), function(data) {
          var array = [{ 'value': 1 }],
              basename = path.basename(data.outputPath, '.js'),
              context = createContext();

          vm.runInContext(data.source, context, true);
          var lodash = context._;

          if (funcName == 'chain' || funcName == 'findWhere' || (funcName == 'defer' && global.setImmediate)) {
            notEqual(strip(lodash[funcName]), strip(_[funcName]), basename);
          } else if (!/\.min$/.test(basename)) {
            equal(strip(lodash[funcName]), strip(_[funcName]), basename);
          }
          testMethod(lodash, funcName, basename);
          start();
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash build');

  (function() {
    var commands = [
      'backbone',
      'csp',
      'legacy',
      'mobile',
      'modern',
      'strict',
      'underscore',
      'category=arrays',
      'category=chaining',
      'category=collections',
      'category=functions',
      'category=objects',
      'category=utilities',
      'exclude=union,uniq,zip',
      'include=each,filter,map',
      'include=once plus=bind,Chaining',
      'category=collections,functions',
      'backbone category=utilities minus=first,last',
      'legacy include=defer',
      'mobile strict category=functions exports=amd,global plus=pick,uniq',
      'modern strict include=isArguments,isArray,isFunction,isPlainObject,keys',
      'underscore include=debounce,throttle plus=after minus=throttle'
    ]
    .concat(
      allFuncs.map(function(funcName) {
        return 'include=' + funcName;
      })
    );

    var reNonCombinable = /\b(?:backbone|csp|legacy|mobile|modern|underscore)\b/;

    commands.forEach(function(origCommand) {
      _.each(['', 'mobile', 'modern', 'underscore'], function(otherCommand) {
        var command = (otherCommand + ' ' + origCommand).trim();
        if ((otherCommand && reNonCombinable.test(origCommand)) ||
            (otherCommand == 'underscore' && /\bcategory\b/.test(origCommand))) {
          return;
        }
        asyncTest('`lodash ' + command +'`', function() {
          var start = _.after(2, _.once(QUnit.start));

          build(['--silent'].concat(command.split(' ')), function(data) {
            var basename = path.basename(data.outputPath, '.js'),
                context = createContext(),
                isBackbone = /\bbackbone\b/.test(command),
                isUnderscore = isBackbone || /\bunderscore\b/.test(command),
                exposeAssign = !isUnderscore,
                exposeZipObject = !isUnderscore;

            try {
              vm.runInContext(data.source, context);
            } catch(e) {
              console.log(e);
            }
            // add function names explicitly
            if (/\binclude=/.test(command)) {
              var funcNames = command.match(/\binclude=(\S*)/)[1].split(/, */);
            }
            if (/\bcategory=/.test(command)) {
              var categories = command.match(/\bcategory=(\S*)/)[1].split(/, */);
              funcNames = (funcNames || []).concat(categories.map(function(category) {
                return capitalize(category.toLowerCase());
              }));
            }
            // add function names required by Backbone and Underscore builds
            if (/\bbackbone\b/.test(command) && !funcNames) {
              funcNames = backboneDependencies.slice();
            }
            if (isUnderscore) {
              if (funcNames) {
                exposeAssign = _.contains(funcNames, 'assign');
                exposeZipObject = _.contains(funcNames, 'zipObject');
              } else {
                funcNames = underscoreFuncs.slice();
              }
            }
            if (!funcNames) {
              funcNames = lodashFuncs.slice();
            }
            if (/\bplus=/.test(command)) {
              var otherNames = command.match(/\bplus=(\S*)/)[1].split(/, */);
              funcNames = funcNames.concat(expandFuncNames(otherNames));
            }
            if (/\bminus=/.test(command)) {
              otherNames = command.match(/\bminus=(\S*)/)[1].split(/, */);
              funcNames = _.difference(funcNames, expandFuncNames(otherNames));
            }
            if (/\bexclude=/.test(command)) {
              otherNames = command.match(/\bexclude=(\S*)/)[1].split(/, */);
              funcNames = _.difference(funcNames, expandFuncNames(otherNames));
            }

            // expand categories to function names
            funcNames.slice().forEach(function(category) {
              var otherNames = _.filter(categoryMap[category], function(key) {
                var type = typeof _[key];
                return type == 'function' || type == 'undefined';
              });

              // limit function names to those available for specific builds
              otherNames = _.intersection(otherNames,
                isBackbone ? backboneDependencies :
                isUnderscore ? underscoreFuncs :
                lodashFuncs
              );

              if (otherNames.length) {
                _.pull(funcNames, category);
                push.apply(funcNames, otherNames);
              }
            });

            // expand aliases and remove nonexistent and duplicate function names
            funcNames = _.uniq(_.intersection(expandFuncNames(funcNames), allFuncs));

            if (!exposeAssign) {
              _.pull(funcNames, 'assign');
            }
            if (!exposeZipObject) {
              _.pull(funcNames, 'zipObject');
            }
            var lodash = context._ || {};
            funcNames.forEach(function(funcName) {
              testMethod(lodash, funcName, basename);
            });

            start();
          });
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  if (timeLimit > 0) {
    setTimeout(function() {
      process.exit(QUnit.config.stats.bad ? 1 : 0);
    }, timeLimit);
  }
  QUnit.config.noglobals = true;
  QUnit.start();
}());
