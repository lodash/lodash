#!/usr/bin/env node
;(function(undefined) {
  'use strict';

  /** Load modules */
  var fs = require('fs'),
      path = require('path'),
      vm = require('vm'),
      build = require('../build.js'),
      minify = require('../build/minify'),
      _ = require('../lodash.js');

  /** The unit testing framework */
  var QUnit = global.QUnit = require('../vendor/qunit/qunit/qunit.js');
  require('../vendor/qunit-clib/qunit-clib.js');

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
    'uniq': ['unique']
  };

  /** List of all Lo-Dash methods */
  var allMethods = _.functions(_)
    .filter(function(methodName) { return !/^_/.test(methodName); })
    .concat('chain');

  /** List of "Arrays" category methods */
  var arraysMethods = [
    'compact',
    'difference',
    'drop',
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
    'zip'
  ];

  /** List of "Chaining" category methods */
  var chainingMethods = [
    'mixin',
    'tap',
    'value'
  ];

  /** List of "Collections" category methods */
  var collectionsMethods = [
    'all',
    'any',
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
    'compose',
    'debounce',
    'defer',
    'delay',
    'memoize',
    'once',
    'partial',
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
    'noConflict',
    'random',
    'result',
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
    'once',
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
    'without'
  ];

  /** List of methods used by Underscore */
  var underscoreMethods = _.without.apply(_, [allMethods].concat([
    'bindKey',
    'cloneDeep',
    'forIn',
    'forOwn',
    'isPlainObject',
    'merge',
    'partial'
  ]));

  /*--------------------------------------------------------------------------*/

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
      result.push.apply(result, [realName].concat(getAliases(realName)));
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
        func = lodash[methodName];

    try {
      if (arraysMethods.indexOf(methodName) > -1) {
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
      else if (chainingMethods.indexOf(methodName) > -1) {
        if (methodName == 'chain') {
          lodash.chain(array);
          lodash(array).chain();
        }
        else if (methodName == 'mixin') {
          lodash.mixin({});
        }
        else {
          lodash(array)[methodName](noop);
        }
      }
      else if (collectionsMethods.indexOf(methodName) > -1) {
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
      else if (functionsMethods.indexOf(methodName) > -1) {
        if (methodName == 'after') {
          func(1, noop);
        } else if (methodName == 'bindAll') {
          func({ 'noop': noop });
        } else if (methodName == 'bindKey') {
          func(lodash, 'identity', array, string);
        } else if (/^(?:bind|partial)$/.test(methodName)) {
          func(noop, object, array, string);
        } else if (/^(?:compose|memoize|wrap)$/.test(methodName)) {
          func(noop, noop);
        } else if (/^(?:debounce|throttle)$/.test(methodName)) {
          func(noop, 100);
        } else {
          func(noop);
        }
      }
      else if (objectsMethods.indexOf(methodName) > -1) {
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
      else if (utilityMethods.indexOf(methodName) > -1) {
        if (methodName == 'result') {
          func(object, 'b');
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
    var start = _.once(QUnit.start);

    asyncTest('`lodash`', function() {
      build(['-s'], function(source, filePath) {
        // used by r.js build optimizer
        var defineHasRegExp = /typeof\s+define\s*==(=)?\s*['"]function['"]\s*&&\s*typeof\s+define\.amd\s*==(=)?\s*['"]object['"]\s*&&\s*define\.amd/g,
            basename = path.basename(filePath, '.js');

        ok(!!defineHasRegExp.exec(source), basename);
        start();
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('template builds');

  (function() {
    var templatePath = __dirname + '/template';

    asyncTest('`lodash template=*.jst`', function() {
      var start = _.after(2, _.once(QUnit.start));

      build(['-s', 'template=' + templatePath + '/*.jst'], function(source, filePath) {
        var basename = path.basename(filePath, '.js'),
            context = createContext();

        var data = {
          'a': { 'people': ['moe', 'larry', 'curly'] },
          'b': { 'epithet': 'stooge' },
          'c': { 'name': 'ES6' }
        };

        context._ = _;
        vm.runInContext(source, context);

        equal(_.templates.a(data.a).replace(/[\r\n]+/g, ''), '<ul><li>moe</li><li>larry</li><li>curly</li></ul>', basename);
        equal(_.templates.b(data.b), 'Hello stooge.', basename);
        equal(_.templates.c(data.c), 'Hello ES6!', basename);
        delete _.templates;
        start();
      });
    });

    var commands = [
      '',
      'moduleId=underscore'
    ];

    commands.forEach(function(command) {
      asyncTest('`lodash template=*.jst` exports=amd' + (command ? ' ' + command : ''), function() {
        var start = _.after(2, _.once(QUnit.start));

        build(['-s', 'template=' + templatePath + '/*.jst', 'exports=amd'].concat(command || []), function(source, filePath) {
          var moduleId,
              basename = path.basename(filePath, '.js'),
              context = createContext();

          context.define = function(requires, factory) {
            factory(_);
            moduleId = requires[0];
          };

          context.define.amd = {};
          vm.runInContext(source, context);

          equal(moduleId, (command ? 'underscore' : 'lodash'), basename);
          ok('a' in _.templates && 'b' in _.templates, basename);
          delete _.templates;
          start();
        });
      });

      asyncTest('`lodash settings=...`' + (command ? ' ' + command : ''), function() {
        var start = _.after(2, _.once(QUnit.start));

        build(['-s', 'template=' + templatePath + '/*.tpl', 'settings={interpolate:/\\{\\{([\\s\\S]+?)\\}\\}/}'].concat(command || []), function(source, filePath) {
          var moduleId,
              basename = path.basename(filePath, '.js'),
              context = createContext();

          var data = {
            'd': { 'name': 'Mustache' }
          };

          context.define = function(requires, factory) {
            factory(_);
            moduleId = requires[0];
          };

          context.define.amd = {};
          vm.runInContext(source, context);

          equal(moduleId, (command ? 'underscore' : 'lodash'), basename);
          equal(_.templates.d(data.d), 'Hello Mustache!', basename);
          delete _.templates;
          start();
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('independent builds');

  (function() {
    var reComment = /\/\*![\s\S]+?\*\//,
        reCustom = /Custom Build/;

    asyncTest('debug only', function() {
      var start = _.once(QUnit.start);
      build(['-d', '-s'], function(source, filePath) {
        equal(path.basename(filePath, '.js'), 'lodash');
        start();
      });
    });

    asyncTest('debug custom', function() {
      var start = _.once(QUnit.start);
      build(['-d', '-s', 'backbone'], function(source, filePath) {
        equal(path.basename(filePath, '.js'), 'lodash.custom');

        var comment = source.match(reComment);
        ok(reCustom.test(comment));
        start();
      });
    });

    asyncTest('minified only', function() {
      var start = _.once(QUnit.start);
      build(['-m', '-s'], function(source, filePath) {
        equal(path.basename(filePath, '.js'), 'lodash.min');
        start();
      });
    });

    asyncTest('minified custom', function() {
      var start = _.once(QUnit.start);
      build(['-m', '-s', 'backbone'], function(source, filePath) {
        equal(path.basename(filePath, '.js'), 'lodash.custom.min');

        var comment = source.match(reComment);
        ok(reCustom.test(comment));
        start();
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('strict modifier');

  (function() {
    var object = Object.freeze({
      'a': _.identity,
      'b': null
    });

    ['non-strict', 'strict'].forEach(function(strictMode, index) {
      asyncTest(strictMode + ' should ' + (index ? 'error': 'silently fail') + ' attempting to overwrite read-only properties', function() {
        var commands = ['-s', 'include=bindAll,defaults,extend'],
            start = _.after(2, _.once(QUnit.start));

        if (index) {
          commands.push('strict');
        }
        build(commands, function(source, filePath) {
          var basename = path.basename(filePath, '.js'),
              context = createContext();

          vm.runInContext(source, context);
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

        build(['-s', command], function(source, filePath) {
          var basename = path.basename(filePath, '.js'),
              context = createContext();

          vm.runInContext(source, context);
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

      build(['-s', 'underscore'], function(source, filePath) {
        var last,
            array = [{ 'a': 1, 'b': 2 }, { 'a': 2, 'b': 2 }],
            basename = path.basename(filePath, '.js'),
            context = createContext();

        vm.runInContext(source, context);
        var lodash = context._;

        var object = { 'fn': lodash.bind(function(foo) { return foo + this.bar; }, { 'bar': 1 }, 1) };
        equal(object.fn(), 2, '_.bind: ' + basename);

        strictEqual(lodash.clone(array, true)[0], array[0], '_.clone should be shallow: ' + basename);
        ok(lodash.contains({ 'a': 1, 'b': 2 }, 1), '_.contains should work with objects: ' + basename);
        ok(lodash.contains([1, 2, 3], 1, 2), '_.contains should ignore `fromIndex`: ' + basename);
        ok(!lodash.every([true, false, true]), '_.every: ' + basename);

        function Foo() {}
        Foo.prototype = { 'a': 1 };

        deepEqual(lodash.defaults({}, new Foo), Foo.prototype, '_.defaults should assign inherited `source` properties: ' + basename);
        deepEqual(lodash.extend({}, new Foo), Foo.prototype, '_.extend should assign inherited `source` properties: ' + basename);

        actual = lodash.find(array, function(value) {
          return 'a' in value;
        });

        equal(actual, _.first(array), '_.find: ' + basename);

        actual = lodash.forEach(array, function(value) {
          last = value;
          return false;
        });

        equal(last, _.last(array), '_.forEach should not exit early: ' + basename);
        equal(actual, undefined, '_.forEach should return `undefined`: ' + basename);

        object = { 'length': 0, 'splice': Array.prototype.splice };
        equal(lodash.isEmpty(object), false, '_.isEmpty should return `false` for jQuery/MooTools DOM query collections: ' + basename);

        object = { 'a': 1, 'b': 2, 'c': 3 };
        equal(lodash.isEqual(object, { 'a': 1, 'b': 0, 'c': 3 }), false, '_.isEqual: ' + basename);

        equal(lodash.max('abc'), -Infinity, '_.max should return `-Infinity` for strings: ' + basename);
        equal(lodash.min('abc'), Infinity, '_.min should return `Infinity` for strings: ' + basename);

        // avoid issues comparing objects with `deepEqual`
        object = { 'a': 1, 'b': 2, 'c': 3 };
        var actual = lodash.omit(object, function(value) { return value == 3; });
        deepEqual(_.keys(actual).sort(), ['a', 'b', 'c'], '_.omit should not accept a `callback`: ' + basename);

        actual = lodash.pick(object, function(value) { return value != 3; });
        deepEqual(_.keys(actual), [], '_.pick should not accept a `callback`: ' + basename);

        ok(lodash.some([false, true, false]), '_.some: ' + basename);
        equal(lodash.template('${a}', object), '${a}', '_.template should ignore ES6 delimiters: ' + basename);
        equal(lodash.uniqueId(0), '1', '_.uniqueId should ignore a prefix of `0`: ' + basename);

        start();
      });
    });

    asyncTest('should not have any Lo-Dash-only methods', function() {
      var start = _.after(2, _.once(QUnit.start));

      build(['-s', 'underscore'], function(source, filePath) {
        var basename = path.basename(filePath, '.js'),
            context = createContext();

        vm.runInContext(source, context);
        var lodash = context._;

        _.each([
          'assign',
          'bindKey',
          'forIn',
          'forOwn',
          'isPlainObject',
          'merge',
          'partial'
        ], function(methodName) {
          equal(lodash[methodName], undefined, '_.' + methodName + ' should not exist: ' + basename);
        });

        start();
      });
    });

    asyncTest('`lodash underscore include=partial`', function() {
      var start = _.after(2, _.once(QUnit.start));

      build(['-s', 'underscore', 'include=partial'], function(source, filePath) {
        var basename = path.basename(filePath, '.js'),
            context = createContext();

        vm.runInContext(source, context);
        var lodash = context._;

        equal(lodash.partial(_.identity, 2)(), 2, '_.partial: ' + basename);
        start();
      });
    });

    asyncTest('`lodash underscore plus=clone`', function() {
      var start = _.after(2, _.once(QUnit.start));

      build(['-s', 'underscore', 'plus=clone'], function(source, filePath) {
        var array = [{ 'value': 1 }],
            basename = path.basename(filePath, '.js'),
            context = createContext();

        vm.runInContext(source, context);
        var lodash = context._,
            clone = lodash.clone(array, true);

        deepEqual(array, clone, basename);
        notEqual(array, clone, basename);
        start();
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

        build(['-s', command], function(source, filePath) {
          var basename = path.basename(filePath, '.js'),
              context = createContext(),
              pass = false;

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
      'iife=this["lodash"]=(function(window,undefined){%output%;return lodash}(this))',
      'iife=define(function(window,undefined){return function(){%output%;return lodash}}(this));'
    ];

    commands.forEach(function(command) {
      asyncTest('`lodash ' + command +'`', function() {
        var start = _.after(2, _.once(QUnit.start));

        build(['-s', 'exports=none', command], function(source, filePath) {
          var basename = path.basename(filePath, '.js'),
              context = createContext();

          context.define = function(func) {
            context.lodash = func();
          };

          try {
            vm.runInContext(source, context);
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

  QUnit.module('output options');

  (function() {
    var commands = [
      '-o a.js',
      '--output a.js'
    ];

    commands.forEach(function(command, index) {
      asyncTest('`lodash ' + command +'`', function() {
        var start = _.once(QUnit.start);

        build(['-s'].concat(command.split(' ')), function(source, filePath) {
          equal(path.basename(filePath, '.js'), 'a', command);
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
      '--stdout'
    ];

    commands.forEach(function(command, index) {
      asyncTest('`lodash ' + command +'`', function() {
        var written,
            start = _.once(QUnit.start),
            write = process.stdout.write;

        process.stdout.write = function(string) {
          written = string;
        };

        build([command, 'exports=', 'include='], function(source) {
          process.stdout.write = write;
          equal(written, source);
          equal(arguments.length, 1);
          start();
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('minify underscore');

  (function() {
    asyncTest('`node minify underscore.js`', function() {
      var source = fs.readFileSync(path.join(__dirname, '..', 'vendor', 'underscore', 'underscore.js'), 'utf8'),
          start = _.once(QUnit.start);

      minify(source, {
        'isSilent': true,
        'workingName': 'underscore.min',
        'onComplete': function(result) {
          var context = createContext();

          try {
            vm.runInContext(result, context);
          } catch(e) {
            console.log(e);
          }
          var underscore = context._ || {};
          ok(_.isString(underscore.VERSION));
          ok(!/Lo-Dash/.test(result) && result.match(/\n/g).length < source.match(/\n/g).length);
          start();
        }
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('mobile build');

  (function() {
    asyncTest('`lodash mobile`', function() {
      var start = _.after(2, _.once(QUnit.start));

      build(['-s', 'mobile'], function(source, filePath) {
        var basename = path.basename(filePath, '.js'),
            context = createContext();

        try {
          vm.runInContext(source, context);
        } catch(e) {
          console.log(e);
        }

        var array = [1, 2, 3],
            object1 = [{ 'a': 1 }],
            object2 = [{ 'b': 2 }],
            object3 = [{ 'a': 1, 'b': 2 }],
            circular1 = { 'a': 1 },
            circular2 = { 'a': 1 },
            lodash = context._;

        circular1.b = circular1;
        circular2.b = circular2;

        deepEqual(lodash.merge(object1, object2), object3, basename);
        deepEqual(lodash.sortBy([3, 2, 1], _.identity), array, basename);
        ok(lodash.isEqual(circular1, circular2), basename);

        var actual = lodash.clone(circular1, true);
        ok(actual != circular1 && actual.b == actual, basename);
        start();
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
      'underscore backbone',
      'backbone legacy category=utilities minus=first,last',
      'underscore include=debounce,throttle plus=after minus=throttle',
      'underscore mobile strict category=functions exports=amd,global plus=pick,uniq',
    ]
    .concat(
      allMethods.map(function(methodName) {
        return 'include=' + methodName;
      })
    );

    commands.forEach(function(command) {
      asyncTest('`lodash ' + command +'`', function() {
        var start = _.after(2, _.once(QUnit.start));

        build(['--silent'].concat(command.split(' ')), function(source, filePath) {
          var methodNames,
              basename = path.basename(filePath, '.js'),
              context = createContext(),
              isUnderscore = /underscore/.test(command),
              exposeAssign = !isUnderscore;

          try {
            vm.runInContext(source, context);
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
              exposeAssign = methodNames.indexOf('assign') > -1;
            } else {
              methodNames = underscoreMethods.slice();
            }
          }
          // add method names explicitly by category
          if (/category/.test(command)) {
            // resolve method names belonging to each category (case-insensitive)
            methodNames = command.match(/category=(\S*)/)[1].split(/, */).reduce(function(result, category) {
              var capitalized = category[0].toUpperCase() + category.toLowerCase().slice(1);
              return result.concat(getMethodsByCategory(capitalized));
            }, methodNames || []);
          }
          // init `methodNames` if it hasn't been inited
          if (!methodNames) {
            methodNames = allMethods.slice();
          }
          if (/plus/.test(command)) {
            methodNames = methodNames.concat(command.match(/plus=(\S*)/)[1].split(/, */));
          }
          if (/minus/.test(command)) {
            methodNames = _.without.apply(_, [methodNames]
              .concat(expandMethodNames(command.match(/minus=(\S*)/)[1].split(/, */))));
          }
          if (/exclude/.test(command)) {
            methodNames = _.without.apply(_, [methodNames]
              .concat(expandMethodNames(command.match(/exclude=(\S*)/)[1].split(/, */))));
          }

          // expand aliases and categories to real method names
          methodNames = expandMethodNames(methodNames).reduce(function(result, methodName) {
            return result.concat(methodName, getMethodsByCategory(methodName));
          }, []);

          // remove nonexistent and duplicate method names
          methodNames = _.uniq(_.intersection(allMethods, expandMethodNames(methodNames)));

          if (!exposeAssign) {
            methodNames = _.without(methodNames, 'assign');
          }
          var lodash = context._ || {};
          methodNames.forEach(function(methodName) {
            testMethod(lodash, methodName, basename);
          });

          start();
        });
      });
    });
  }());

}());
