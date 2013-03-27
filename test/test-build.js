#!/usr/bin/env node
;(function(undefined) {
  'use strict';

  /** Load Node.js modules */
  var fs = require('fs'),
      path = require('path'),
      vm = require('vm');

  /** Load other modules */
  var build = require('../build.js'),
      minify = require('../build/minify'),
      _ = require('../lodash.js');

  /** Used to avoid `noglobal` false positives caused by `errno` leaked in Node.js */
  global.errno = true;

  /** Add `path.sep` for older versions of Node.js */
  path.sep || (path.sep = process.platform == 'win32' ? '\\' : '/');

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

  /** List of all Lo-Dash methods */
  var allMethods = _.functions(_)
    .filter(function(methodName) { return !/^_/.test(methodName); })
    .concat('chain')
    .sort();

  /** List of "Arrays" category methods */
  var arraysMethods = [
    'compact',
    'difference',
    'drop',
    'findIndex',
    'first',
    'flatten',
    'head',
    'indexOf',
    'initial',
    'intersection',
    'last',
    'lastIndexOf',
    'object',
    'range',
    'rest',
    'sortedIndex',
    'tail',
    'take',
    'union',
    'uniq',
    'unique',
    'without',
    'zip',
    'zipObject'
  ];

  /** List of "Chaining" category methods */
  var chainingMethods = [
    'tap',
    'value'
  ];

  /** List of "Collections" category methods */
  var collectionsMethods = [
    'all',
    'any',
    'at',
    'collect',
    'contains',
    'countBy',
    'detect',
    'each',
    'every',
    'filter',
    'find',
    'foldl',
    'foldr',
    'forEach',
    'groupBy',
    'include',
    'inject',
    'invoke',
    'map',
    'max',
    'min',
    'pluck',
    'reduce',
    'reduceRight',
    'reject',
    'select',
    'shuffle',
    'size',
    'some',
    'sortBy',
    'toArray',
    'where'
  ];

  /** List of "Functions" category methods */
  var functionsMethods = [
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
  ];

  /** List of "Objects" category methods */
  var objectsMethods = [
    'assign',
    'clone',
    'cloneDeep',
    'defaults',
    'extend',
    'findKey',
    'forIn',
    'forOwn',
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
    'methods',
    'merge',
    'omit',
    'pairs',
    'pick',
    'values'
  ];

  /** List of "Utilities" category methods */
  var utilityMethods = [
    'escape',
    'identity',
    'mixin',
    'noConflict',
    'parseInt',
    'random',
    'result',
    'runInContext',
    'template',
    'times',
    'unescape',
    'uniqueId'
  ];

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

  /** List of methods used by Underscore */
  var underscoreMethods = _.without.apply(_, [allMethods].concat([
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
    'runInContext'
  ]));

  /*--------------------------------------------------------------------------*/

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
   * Expands a list of method names to include real and alias names.
   *
   * @private
   * @param {Array} methodNames The array of method names to expand.
   * @returns {Array} Returns a new array of expanded method names.
   */
  function expandMethodNames(methodNames) {
    return methodNames.reduce(function(result, methodName) {
      var realName = getRealName(methodName);
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
   * Gets the names of methods belonging to the given `category`.
   *
   * @private
   * @param {String} category The category to filter by.
   * @returns {Array} Returns a new array of method names belonging to the given category.
   */
  function getMethodsByCategory(category) {
    switch (category) {
      case 'Arrays':
        return arraysMethods.slice();
      case 'Chaining':
        return chainingMethods.slice();
      case 'Collections':
        return collectionsMethods.slice();
      case 'Functions':
        return functionsMethods.slice();
      case 'Objects':
        return objectsMethods.slice();
      case 'Utilities':
        return utilityMethods.slice();
    }
    return [];
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
   * Tests if a given method on the `lodash` object can be called successfully.
   *
   * @private
   * @param {Object} lodash The built Lo-Dash object.
   * @param {String} methodName The name of the Lo-Dash method to test.
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
      if (_.contains(arraysMethods, methodName)) {
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
      else if (_.contains(chainingMethods, methodName)) {
        lodash(array)[methodName](noop);
      }
      else if (_.contains(collectionsMethods, methodName)) {
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
        else if (methodName == 'where') {
          func(array, object);
          func(object, object);
        }
        else {
          func(array, noop, object);
          func(object, noop, object);
        }
      }
      else if (_.contains(functionsMethods, methodName)) {
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
      else if (_.contains(objectsMethods, methodName)) {
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
      else if (_.contains(utilityMethods, methodName)) {
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

  QUnit.module('minified AMD snippet');

  (function() {
    var start = _.after(2, _.once(QUnit.start));

    asyncTest('`lodash`', function() {
      build(['-s', 'exclude='], function(data) {
        // used by r.js build optimizer
        var defineHasRegExp = /typeof\s+define\s*==(=)?\s*['"]function['"]\s*&&\s*typeof\s+define\.amd\s*==(=)?\s*['"]object['"]\s*&&\s*define\.amd/g,
            basename = path.basename(data.outputPath, '.js');

        ok(!!defineHasRegExp.exec(data.source), basename);
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

          equal(_.templates.a(object.a).replace(/[\r\n]+/g, ''), '<ul><li>moe</li><li>larry</li><li>curly</li></ul>', basename);
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

      asyncTest('`lodash template=*.jst exports=amd' + (command ? ' ' + command : '') + '`', function() {
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

          equal(moduleId, expectedId, basename);
          ok('a' in _.templates && 'b' in _.templates, basename);
          equal(_.templates.a({ 'people': ['moe', 'larry'] }), '<ul>\n<li>moe</li><li>larry</li>\n</ul>', basename);

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
          equal(_.templates.d(object.d), 'Hello Mustache!', basename);
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

  QUnit.module('source maps');

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
                comment = (/(\s*\/\/.*\s*|\s*\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/\s*)$/.exec(data.source) || [])[0],
                sources = /foo.js/.test(outputCommand) ? ['foo.js'] : ['lodash' + (outputCommand.length ? '' : '.custom') + '.js'],
                sourceMap = JSON.parse(data.sourceMap),
                sourceMapURL = (/\w+(?=\.map$)/.exec(mapCommand) || [basename])[0];

            ok(RegExp('/\\*\\n//@ sourceMappingURL=' + sourceMapURL + '.map\\n\\*/').test(comment), basename);
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

  QUnit.module('underscore chaining methods');

  (function() {
    var commands = [
      'backbone',
      'underscore'
    ];

    commands.forEach(function(command) {
      asyncTest('`lodash ' + command +'`', function() {
        var start = _.after(2, _.once(QUnit.start));

        build(['-s', command], function(data) {
          var basename = path.basename(data.outputPath, '.js'),
              context = createContext();

          vm.runInContext(data.source, context);
          var lodash = context._;

          ok(lodash.chain(1) instanceof lodash, '_.chain: ' + basename);
          ok(lodash(1).chain() instanceof lodash, '_#chain: ' + basename);

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

        actual = lodash.defaults({ 'a': null }, { 'a': 1 });
        strictEqual(actual.a, 1, '_.defaults should overwrite `null` values: ' + basename);

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

        // avoid issues comparing objects with `deepEqual`
        object = { 'a': 1, 'b': 2, 'c': 3 };
        actual = lodash.omit(object, function(value) { return value == 3; });
        deepEqual(_.keys(actual).sort(), ['a', 'b', 'c'], '_.omit should not accept a `callback`: ' + basename);

        actual = lodash.pick(object, function(value) { return value != 3; });
        deepEqual(_.keys(actual), [], '_.pick should not accept a `callback`: ' + basename);

        strictEqual(lodash.result(), null, '_.result should return `null` for falsey `object` arguments: ' + basename);
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
        deepEqual(lodash.where(collection, {}, true), null, '_.where should return `null` when passed `first` and falsey `properties`: ' + basename);

        deepEqual(lodash.findWhere(collection, { 'a': 1 }), collection[0], '_.findWhere: ' + basename);
        strictEqual(lodash.findWhere(collection, {}), null, '_.findWhere should return `null` for falsey `properties`: ' + basename);

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

        _.each([
          'assign',
          'at',
          'bindKey',
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
          'zipObject'
        ], function(methodName) {
          equal(lodash[methodName], undefined, '_.' + methodName + ' should not exist: ' + basename);
        });

        start();
      });
    });

    asyncTest('`lodash underscore include=findWhere`', function() {
      var start = _.after(2, _.once(QUnit.start));

      build(['-s', 'underscore', 'include=findWhere'], function(data) {
        var basename = path.basename(data.outputPath, '.js'),
            context = createContext();

        vm.runInContext(data.source, context);
        var lodash = context._;

        var collection = [{ 'a': 1 }, { 'a': 1 }];
        deepEqual(lodash.findWhere(collection, { 'a': 1 }), collection[0], '_.findWhere: ' + basename);

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
      asyncTest('`lodash ' + command +'`', function() {
        var start = _.after(2, _.once(QUnit.start));

        build(['-s', 'underscore', command], function(data) {
          var array = [{ 'value': 1 }],
              basename = path.basename(data.outputPath, '.js'),
              context = createContext();

          vm.runInContext(data.source, context, true);
          var lodash = context._;

          _.each(index ? ['clone','cloneDeep'] : ['clone'], function(methodName) {
            var clone = (methodName == 'clone')
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
              context.define = function(fn) {
                pass = true;
                context._ = fn();
              };
              context.define.amd = {};
              vm.runInContext(source, context);
              ok(pass, basename);
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
              noop = function() {},
              source = data.source;

          vm.runInContext(data.source, context);
          var lodash = context._;

          lodash.mixin({ 'x': noop });
          equal(lodash.x, noop, basename);

          if (index) {
            equal(typeof lodash.prototype.x, 'function', basename);
          } else {
            equal('x' in lodash.prototype, false, basename);
          }
          start();
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('output options');

  (function() {
    var nestedPath = path.join(__dirname, 'a', 'b');

    var commands = [
      '-o a.js',
      '--output b.js',
      '-o ' + path.join('a', 'b', 'c.js'),
      '-o ' + relativePrefix + path.join('a', 'b', 'c.js'),
      '-o ' + path.join(nestedPath, 'c.js')
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

  QUnit.module('stdout options');

  (function() {
    var commands = [
      '-c',
      '-c -d',
      '--stdout',
    ];

    commands.forEach(function(command, index) {
      asyncTest('`lodash ' + command +'`', function() {
        var written,
            start = _.once(QUnit.start),
            write = process.stdout.write;

        process.stdout.write = function(string) {
          written = string;
        };

        build(['exports=', 'include='].concat(command.split(' ')), function(data) {
          process.stdout.write = write;
          equal(written, data.source);
          equal(arguments.length, 1);
          start();
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('mobile build');

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
      build(['-s', '-d', 'mobile'], callback);
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
      'backbone legacy category=utilities minus=first,last',
      'legacy include=defer',
      'legacy underscore',
      'modern strict include=isArguments,isArray,isFunction,isPlainObject,key',
      'underscore include=debounce,throttle plus=after minus=throttle',
      'underscore mobile strict category=functions exports=amd,global plus=pick,uniq',
    ]
    .concat(
      allMethods.map(function(methodName) {
        return 'include=' + methodName;
      })
    );

    commands.forEach(function(origCommand) {
      _.times(4, function(index) {
        var command = origCommand;

        if (index == 1) {
          if (/legacy|mobile/.test(command)) {
            return;
          }
          command = 'mobile ' + command;
        }
        else if (index == 2) {
          if (/legacy|modern/.test(command)) {
            return;
          }
          command = 'modern ' + command;
        }
        else if (index == 3) {
          if (/category|legacy|underscore/.test(command)) {
            return;
          }
          command = 'underscore ' + command;
        }
        asyncTest('`lodash ' + command +'`', function() {
          var start = _.after(2, _.once(QUnit.start));

          build(['--silent'].concat(command.split(' ')), function(data) {
            var methodNames,
                basename = path.basename(data.outputPath, '.js'),
                context = createContext(),
                isBackbone = /backbone/.test(command),
                isUnderscore = isBackbone || /underscore/.test(command),
                exposeAssign = !isUnderscore,
                exposeZipObject = !isUnderscore;

            try {
              vm.runInContext(data.source, context);
            } catch(e) {
              console.log(e);
            }
            // add method names explicitly
            if (/include/.test(command)) {
              methodNames = command.match(/include=(\S*)/)[1].split(/, */);
            }
            // add method names required by Backbone and Underscore builds
            if (/backbone/.test(command) && !methodNames) {
              methodNames = backboneDependencies.slice();
            }
            if (isUnderscore) {
              if (methodNames) {
                exposeAssign = _.contains(methodNames, 'assign');
                exposeZipObject = _.contains(methodNames, 'zipObject');
              } else {
                methodNames = underscoreMethods.slice();
              }
            }
            if (/category/.test(command)) {
              methodNames = (methodNames || []).concat(command.match(/category=(\S*)/)[1].split(/, */).map(capitalize));
            }
            if (!methodNames) {
              methodNames = allMethods.slice();
            }
            if (/plus/.test(command)) {
              methodNames = methodNames.concat(command.match(/plus=(\S*)/)[1].split(/, */));
            }
            if (/minus/.test(command)) {
              methodNames = _.without.apply(_, [methodNames].concat(expandMethodNames(command.match(/minus=(\S*)/)[1].split(/, */))));
            }
            if (/exclude/.test(command)) {
              methodNames = _.without.apply(_, [methodNames].concat(expandMethodNames(command.match(/exclude=(\S*)/)[1].split(/, */))));
            }

            // expand categories to real method names
            methodNames.slice().forEach(function(category) {
              var result = getMethodsByCategory(category);

              // limit category methods to those available for specific builds
              if (isBackbone) {
                result = result.filter(function(methodName) {
                  return _.contains(backboneDependencies, methodName);
                });
              }
              else if (isUnderscore) {
                result = result.filter(function(methodName) {
                  return _.contains(underscoreMethods, methodName);
                });
              }
              if (result.length) {
                methodNames = _.without(methodNames, category);
                push.apply(methodNames, result);
              }
            });

            // expand aliases and remove nonexistent and duplicate method names
            methodNames = _.uniq(_.intersection(allMethods, expandMethodNames(methodNames)));

            if (!exposeAssign) {
              methodNames = _.without(methodNames, 'assign');
            }
            if (!exposeZipObject) {
              methodNames = _.without(methodNames, 'zipObject');
            }
            var lodash = context._ || {};
            methodNames.forEach(function(methodName) {
              testMethod(lodash, methodName, basename);
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
