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
  var allMethods = _.functions(_).filter(function(methodName) {
    return !/^_/.test(methodName);
  });

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
    'max',
    'min',
    'object',
    'range',
    'rest',
    'shuffle',
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
    'chain',
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
    'pluck',
    'reduce',
    'reduceRight',
    'reject',
    'select',
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
    'clone',
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
    'clone',
    'contains',
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
    'keys',
    'last',
    'lastIndexOf',
    'map',
    'max',
    'min',
    'mixin',
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
    'without'
  ];

  /** List of methods used by Underscore */
  var underscoreMethods = _.without.apply(_, [allMethods].concat([
    'countBy',
    'forIn',
    'forOwn',
    'invert',
    'merge',
    'object',
    'omit',
    'pairs',
    'partial',
    'random',
    'unescape',
    'where'
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
        } else if (/^(?:bind|partial)$/.test(methodName)) {
          func(noop, object, array, string);
        } else if (/^(?:compose|memoize|wrap)$/.test(methodName)) {
          func(noop, noop);
        } else if (/^(?:debounce|throttle)$/.test(methodName)) {
          func(noop, 100);
        } else if (methodName == 'bindAll') {
          func({ 'noop': noop });
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
    equal(pass, true, methodName + ': ' + message);
  }

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
      'category=collections,functions',
      'underscore backbone',
      'backbone legacy category=utilities exclude=first,last',
      'underscore mobile strict category=functions exports=amd,global include=pick,uniq',
    ]
    .concat(
      allMethods.map(function(methodName) {
        return 'include=' + methodName;
      })
    );

    commands.forEach(function(command) {
      var start = _.after(2, _.once(QUnit.start));

      asyncTest('`lodash ' + command +'`', function() {
        build(['--silent'].concat(command.split(' ')), function(source, filepath) {
          var basename = path.basename(filepath, '.js'),
              context = createContext(),
              methodNames = [];

          try {
            vm.runInContext(source, context);
          } catch(e) { }

          if (/underscore/.test(command)) {
            methodNames = underscoreMethods;
          }
          if (/backbone/.test(command)) {
            methodNames = backboneDependencies;
          }
          if (/include/.test(command)) {
            methodNames = methodNames.concat(command.match(/include=(\S*)/)[1].split(/, */));
          }
          if (/category/.test(command)) {
            methodNames = command.match(/category=(\S*)/)[1].split(/, */).reduce(function(result, category) {
              switch (category) {
                case 'arrays':
                  return result.concat(arraysMethods);
                case 'chaining':
                  return result.concat(chainingMethods);
                case 'collections':
                  return result.concat(collectionsMethods);
                case 'functions':
                  return result.concat(functionsMethods);
                case 'objects':
                  return result.concat(objectsMethods);
                case 'utilities':
                  return result.concat(utilityMethods);
              }
              return result;
            }, methodNames);
          }
          if (!methodNames.length) {
            methodNames = allMethods;
          }

          if (/exclude/.test(command)) {
            methodNames = _.without.apply(_, [methodNames].concat(
              expandMethodNames(command.match(/exclude=(\S*)/)[1].split(/, */))
            ));
          } else {
            methodNames = expandMethodNames(methodNames);
          }

          var lodash = context._ || {};
          methodNames = _.unique(methodNames);

          methodNames.forEach(function(methodName) {
            testMethod(lodash, methodName, basename);
          });

          start();
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('strict modifier');

  (function() {
    var object = Object.create(Object.prototype, {
      'a': { 'value': _.identify },
      'b': { 'value': null }
    });

    ['non-strict', 'strict'].forEach(function(strictMode, index) {
      var start = _.after(2, _.once(QUnit.start));

      asyncTest(strictMode + ' should ' + (index ? 'error': 'silently fail') + ' attempting to overwrite read-only properties', function() {
        var commands = ['-s', 'include=bindAll,defaults,extend'];
        if (index) {
          commands.push('strict');
        }

        build(commands, function(source, filepath) {
          var basename = path.basename(filepath, '.js'),
              context = createContext(),
              pass = !index;

          vm.runInContext(source, context);
          var lodash = context._;

          try {
            lodash.bindAll(object);
            lodash.extend(object, { 'a': 1 });
            lodash.defaults(object, { 'b': 2 });
          } catch(e) {
            pass = !!index;
          }
          equal(pass, true, basename);
          start();
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('underscore modifier');

  (function() {
    var start = _.once(QUnit.start);

    asyncTest('should not have deep clone', function() {
      build(['-s', 'underscore'], function(source, filepath) {
        var array = [{ 'a': 1 }],
            basename = path.basename(filepath, '.js'),
            context = createContext();

        vm.runInContext(source, context);
        var lodash = context._;

        ok(lodash.clone(array, true)[0] === array[0], basename);
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
      var start = _.after(2, _.once(QUnit.start));

      asyncTest('`lodash ' + command +'`', function() {
        build(['-s', command], function(source, filepath) {
          var basename = path.basename(filepath, '.js'),
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
              ok(context._ === undefined, basename);
              ok(_.isFunction(context.exports._), basename)
              break;

            case 2:
              vm.runInContext(source, context);
              ok(_.isFunction(context._), basename);
              break;

            case 3:
              context.exports = {};
              context.module = { 'exports': context.exports };
              vm.runInContext(source, context);
              ok(context._ === undefined, basename);
              ok(_.isFunction(context.module.exports), basename);
              break;

            case 4:
              vm.runInContext(source, context);
              ok(context._ === undefined, basename);
          }
          start();
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('iife command');

  (function() {
    var start = _.after(2, _.once(QUnit.start));

    asyncTest('`lodash iife=...`', function() {
      build(['-s', 'iife=!function(window,undefined){%output%}(this)'], function(source, filepath) {
        var basename = path.basename(filepath, '.js'),
            context = createContext();

        try {
          vm.runInContext(source, context);
        } catch(e) { }

        var lodash = context._ || {};
        ok(_.isString(lodash.VERSION), basename);
        ok(/!function/.test(source), basename);
        start();
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('output options');

  (function() {
    ['-o a.js', '--output a.js'].forEach(function(command, index) {
      var start = _.once(QUnit.start);

      asyncTest('`lodash ' + command +'`', function() {
        build(['-s'].concat(command.split(' ')), function(source, filepath) {
          equal(filepath, 'a.js', command);
          start();
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('stdout options');

  (function() {
    ['-c', '--stdout'].forEach(function(command, index) {
      var descriptor = Object.getOwnPropertyDescriptor(global, 'console'),
          start = _.once(QUnit.start);

      asyncTest('`lodash ' + command +'`', function() {
        build([command, 'exports=', 'include='], function(source, filepath) {
          equal(source, '');
          equal(arguments.length, 1);
          start();
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('minify underscore');

  (function() {
    var start = _.once(QUnit.start);

    asyncTest('`node minify underscore.js`', function() {
      var source = fs.readFileSync(path.join(__dirname, '..', 'vendor', 'underscore', 'underscore.js'), 'utf8');
      minify(source, {
        'silent': true,
        'workingName': 'underscore.min',
        'onComplete': function(result) {
          var context = createContext();

          try {
            vm.runInContext(result, context);
          } catch(e) { }

          var underscore = context._ || {};
          ok(_.isString(underscore.VERSION));
          ok(result.match(/\n/g).length < source.match(/\n/g).length);
          start();
        }
      });
    });
  }());

}());
