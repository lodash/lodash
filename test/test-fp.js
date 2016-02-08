;(function() {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /** Used as the size to cover large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /** Used as a reference to the global object. */
  var root = (typeof global == 'object' && global) || this;

  /** Used for native method references. */
  var arrayProto = Array.prototype;

  /** Method and object shortcuts. */
  var phantom = root.phantom,
      amd = root.define && define.amd,
      argv = root.process && process.argv,
      document = !phantom && root.document,
      noop = function() {},
      slice = arrayProto.slice,
      WeakMap = root.WeakMap;

  /*--------------------------------------------------------------------------*/

  /** Use a single "load" function. */
  var load = (!amd && typeof require == 'function')
    ? require
    : noop;

  /** The unit testing framework. */
  var QUnit = root.QUnit || (root.QUnit = (
    QUnit = load('../node_modules/qunitjs/qunit/qunit.js') || root.QUnit,
    QUnit = QUnit.QUnit || QUnit
  ));

  /** Load stable Lodash and QUnit Extras. */
  var _ = root._ || load('../lodash.js');
  if (_) {
    _ = _.runInContext(root);
  }
  var QUnitExtras = load('../node_modules/qunit-extras/qunit-extras.js');
  if (QUnitExtras) {
    QUnitExtras.runInContext(root);
  }

  var convert = root.fp || (function() {
    var baseConvert = load('../fp/_baseConvert.js');
    return function(name, func, options) {
      return baseConvert(_, name, func, options);
    };
  }());

  var mapping = root.mapping || load('../fp/_mapping.js'),
      fp = convert(_.runInContext());

  /*--------------------------------------------------------------------------*/

  /**
   * Skips a given number of tests with a passing result.
   *
   * @private
   * @param {Object} assert The QUnit assert object.
   * @param {number} [count=1] The number of tests to skip.
   */
  function skipTest(assert, count) {
    count || (count = 1);
    while (count--) {
      assert.ok(true, 'test skipped');
    }
  }

  /*--------------------------------------------------------------------------*/

  if (argv) {
    console.log('Running lodash/fp tests.');
  }

  QUnit.module('convert');

  (function() {
    QUnit.test('should accept an `options` argument', function(assert) {
      assert.expect(3);

      if (!document) {
        var remove = convert('remove', _.remove, {
          'cap': false,
          'curry': false,
          'fixed': false,
          'immutable': false,
          'rearg': false
        });

        var array = [1, 2, 3, 4];

        var actual = remove(array, function(n) {
          return n % 2 == 0;
        });

        assert.deepEqual(array, [1, 3]);
        assert.deepEqual(actual, [2, 4]);
        assert.deepEqual(remove(), []);
      }
      else {
        skipTest(assert, 3);
      }
    });

    QUnit.test('should respect the `cap` option', function(assert) {
      assert.expect(1);

      if (!document) {
        var iteratee = convert('iteratee', _.iteratee, {
          'cap': false
        });

        var func = iteratee(function(a, b, c) {
          return [a, b, c];
        }, 3);

        assert.deepEqual(func(1, 2, 3), [1, 2, 3]);
      }
      else {
        skipTest(assert);
      }
    });

    QUnit.test('should respect the `rearg` option', function(assert) {
      assert.expect(1);

      if (!document) {
        var add = convert('add', _.add, {
          'rearg': true
        });

        assert.strictEqual(add('2')('1'), '12');
      }
      else {
        skipTest(assert);
      }
    });

    QUnit.test('should use `options` in `runInContext`', function(assert) {
      assert.expect(3);

      if (!document) {
        var runInContext = convert('runInContext', _.runInContext, {
          'cap': false,
          'curry': false,
          'fixed': false,
          'immutable': false,
          'rearg': false
        });

        var array = [1, 2, 3, 4],
            lodash = runInContext();

        var actual = lodash.remove(array, function(n) {
          return n % 2 == 0;
        });

        assert.deepEqual(array, [1, 3]);
        assert.deepEqual(actual, [2, 4]);
        assert.deepEqual(lodash.remove(), []);
      }
      else {
        skipTest(assert, 3);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('method arity checks');

  (function() {
    QUnit.test('should wrap methods with an arity > `1`', function(assert) {
      assert.expect(1);

      var methodNames = _.filter(_.functions(fp), function(methodName) {
        return fp[methodName].length > 1;
      });

      assert.deepEqual(methodNames, []);
    });

    QUnit.test('should have >= arity of `aryMethod` designation', function(assert) {
      assert.expect(4);

      _.times(4, function(index) {
        var aryCap = index + 1;

        var methodNames = _.filter(mapping.aryMethod[aryCap], function(methodName) {
          var key = _.result(mapping.rename, methodName, methodName),
              arity = _[key].length;

          return arity != 0 && arity < aryCap;
        });

        assert.deepEqual(methodNames, [], '`aryMethod[' + aryCap + ']`');
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('method aliases');

  (function() {
    QUnit.test('should have correct aliases', function(assert) {
      assert.expect(1);

      var actual = _.transform(mapping.aliasToReal, function(result, realName, alias) {
        result.push([alias, fp[alias] === fp[realName]]);
      }, []);

      assert.deepEqual(_.reject(actual, 1), []);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('method ary caps');

  (function() {
    QUnit.test('should have a cap of 1', function(assert) {
      assert.expect(1);

      var funcMethods = [
        'curry', 'iteratee', 'memoize', 'over', 'overEvery', 'overSome',
        'method', 'methodOf', 'rest', 'runInContext'
      ];

      var exceptions = funcMethods.concat('mixin', 'template'),
          expected = _.map(mapping.aryMethod[1], _.constant(true));

      var actual = _.map(mapping.aryMethod[1], function(methodName) {
        var arg = _.includes(funcMethods, methodName) ? _.noop : 1,
            result = _.attempt(function() { return fp[methodName](arg); });

        if (_.includes(exceptions, methodName)
              ? typeof result == 'function'
              : typeof result != 'function'
            ) {
          return true;
        }
        console.log(methodName, result);
        return false;
      });

      assert.deepEqual(actual, expected);
    });

    QUnit.test('should have a cap of 2', function(assert) {
      assert.expect(1);

      var funcMethods = [
        'after', 'ary', 'before', 'bind', 'bindKey', 'curryN', 'debounce', 'delay',
        'overArgs', 'partial', 'partialRight', 'rearg', 'throttle', 'wrap'
      ];

      var exceptions = _.difference(funcMethods.concat('matchesProperty'), ['cloneDeepWith', 'cloneWith', 'delay']),
          expected = _.map(mapping.aryMethod[2], _.constant(true));

      var actual = _.map(mapping.aryMethod[2], function(methodName) {
        var args = _.includes(funcMethods, methodName) ? [methodName == 'curryN' ? 1 : _.noop, _.noop] : [1, []],
            result = _.attempt(function() { return fp[methodName](args[0])(args[1]); });

        if (_.includes(exceptions, methodName)
              ? typeof result == 'function'
              : typeof result != 'function'
            ) {
          return true;
        }
        console.log(methodName, result);
        return false;
      });

      assert.deepEqual(actual, expected);
    });

    QUnit.test('should have a cap of 3', function(assert) {
      assert.expect(1);

      var funcMethods = [
        'assignWith', 'extendWith', 'isEqualWith', 'isMatchWith', 'reduce',
        'reduceRight', 'transform', 'zipWith'
      ];

      var expected = _.map(mapping.aryMethod[3], _.constant(true));

      var actual = _.map(mapping.aryMethod[3], function(methodName) {
        var args = _.includes(funcMethods, methodName) ? [_.noop, 0, 1] : [0, 1, []],
            result = _.attempt(function() { return fp[methodName](args[0])(args[1])(args[2]); });

        if (typeof result != 'function') {
          return true;
        }
        console.log(methodName, result);
        return false;
      });

      assert.deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('methods that use `indexOf`');

  (function() {
    QUnit.test('should work with `fp.indexOf`', function(assert) {
      assert.expect(10);

      var array = ['a', 'b', 'c'],
          other = ['b', 'b', 'd'],
          object = { 'a': 1, 'b': 2, 'c': 2 },
          actual = fp.difference(array, other);

      assert.deepEqual(actual, ['a', 'c'], 'fp.difference');

      actual = fp.includes('b', array);
      assert.strictEqual(actual, true, 'fp.includes');

      actual = fp.intersection(other, array);
      assert.deepEqual(actual, ['b'], 'fp.intersection');

      actual = fp.omit(other, object);
      assert.deepEqual(actual, { 'a': 1, 'c': 2 }, 'fp.omit');

      actual = fp.union(other, array);
      assert.deepEqual(actual, ['a', 'b', 'c', 'd'], 'fp.union');

      actual = fp.uniq(other);
      assert.deepEqual(actual, ['b', 'd'], 'fp.uniq');

      actual = fp.uniqBy(_.identity, other);
      assert.deepEqual(actual, ['b', 'd'], 'fp.uniqBy');

      actual = fp.without('b', array);
      assert.deepEqual(actual, ['a', 'c'], 'fp.without');

      actual = fp.xor(other, array);
      assert.deepEqual(actual, ['a', 'c', 'd'], 'fp.xor');

      actual = fp.pull('b', array);
      assert.deepEqual(actual, ['a', 'c'], 'fp.pull');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('cherry-picked methods');

  (function() {
    QUnit.test('should provide the correct `iteratee` arguments', function(assert) {
      assert.expect(4);

      if (!document) {
        var args,
            array = [1, 2, 3],
            object = { 'a': 1, 'b': 2 },
            isFIFO = _.keys(object)[0] == 'a',
            map = convert('map', _.map),
            reduce = convert('reduce', _.reduce);

        map(function() {
          args || (args = slice.call(arguments));
        })(array);

        assert.deepEqual(args, [1]);

        args = undefined;
        map(function() {
          args || (args = slice.call(arguments));
        })(object);

        assert.deepEqual(args, isFIFO ? [1] : [2]);

        args = undefined;
        reduce(function() {
          args || (args = slice.call(arguments));
        })(0, array);

        assert.deepEqual(args, [0, 1]);

        args = undefined;
        reduce(function() {
          args || (args = slice.call(arguments));
        })(0, object);

        assert.deepEqual(args, isFIFO ? [0, 1] : [0, 2]);
      }
      else {
        skipTest(assert, 4);
      }
    });

    QUnit.test('should not support shortcut fusion', function(assert) {
      assert.expect(3);

      if (!document) {
        var array = fp.range(0, LARGE_ARRAY_SIZE),
            filterCount = 0,
            mapCount = 0;

        var iteratee = function(value) {
          mapCount++;
          return value * value;
        };

        var predicate = function(value) {
          filterCount++;
          return value % 2 == 0;
        };

        var map1 = convert('map', _.map),
            filter1 = convert('filter', _.filter),
            take1 = convert('take', _.take);

        var filter2 = filter1(predicate),
            map2 = map1(iteratee),
            take2 = take1(2);

        var combined = fp.flow(map2, filter2, fp.compact, take2);

        assert.deepEqual(combined(array), [4, 16]);
        assert.strictEqual(filterCount, 200, 'filterCount');
        assert.strictEqual(mapCount, 200, 'mapCount');
      }
      else {
        skipTest(assert, 3);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('key methods');

  (function() {
    var object = { 'a': 1 };

    QUnit.test('should provide the correct `iteratee` arguments', function(assert) {
      assert.expect(3);

      _.each(['findKey', 'findLastKey', 'mapKeys'], function(methodName) {
        var args;

        var actual = fp[methodName](function() {
          args || (args = slice.call(arguments));
        }, object);

        assert.deepEqual(args, ['a'], 'fp.' + methodName);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('mutation methods');

  (function() {
    var array = [1, 2, 3],
        object = { 'a': 1 },
        deepObject = { 'a': { 'b': 2, 'c': 3 } };

    QUnit.test('should not mutate values', function(assert) {
      assert.expect(38);

      function Foo() {}
      Foo.prototype = { 'b': 2 };

      var value = _.clone(object),
          actual = fp.assign(value, { 'b': 2 });

      assert.deepEqual(value, object, 'fp.assign');
      assert.deepEqual(actual, { 'a': 1, 'b': 2 }, 'fp.assign');

      value = _.clone(object);
      actual = fp.assignWith(function(objValue, srcValue) {
        return srcValue;
      }, value, { 'b': 2 });

      assert.deepEqual(value, object, 'fp.assignWith');
      assert.deepEqual(actual, { 'a': 1, 'b': 2 }, 'fp.assignWith');

      value = _.clone(object);
      actual = fp.assignIn(value, new Foo);

      assert.deepEqual(value, object, 'fp.assignIn');
      assert.deepEqual(actual, { 'a': 1, 'b': 2 }, 'fp.assignIn');

      value = _.clone(object);
      actual = fp.assignInWith(function(objValue, srcValue) {
        return srcValue;
      }, value, new Foo);

      assert.deepEqual(value, object, 'fp.assignInWith');
      assert.deepEqual(actual, { 'a': 1, 'b': 2 }, 'fp.assignInWith');

      value = _.clone(object);
      actual = fp.defaults({ 'a': 2, 'b': 2 }, value);

      assert.deepEqual(value, object, 'fp.defaults');
      assert.deepEqual(actual, { 'a': 1, 'b': 2 }, 'fp.defaults');

      value = _.cloneDeep(deepObject);
      actual = fp.defaultsDeep({ 'a': { 'c': 4, 'd': 4 } }, deepObject);

      assert.deepEqual(value, { 'a': { 'b': 2, 'c': 3 } }, 'fp.defaultsDeep');
      assert.deepEqual(actual, { 'a': { 'b': 2, 'c': 3, 'd': 4 } }, 'fp.defaultsDeep');

      value = _.clone(object);
      actual = fp.extend(value, new Foo);

      assert.deepEqual(value, object, 'fp.extend');
      assert.deepEqual(actual, { 'a': 1, 'b': 2 }, 'fp.extend');

      value = _.clone(object);
      actual = fp.extendWith(function(objValue, srcValue) {
        return srcValue;
      }, value, new Foo);

      assert.deepEqual(value, object, 'fp.extendWith');
      assert.deepEqual(actual, { 'a': 1, 'b': 2 }, 'fp.extendWith');

      value = _.clone(array);
      actual = fp.fill(1, 2, '*', value);

      assert.deepEqual(value, array, 'fp.fill');
      assert.deepEqual(actual, [1, '*', 3], 'fp.fill');

      value = _.cloneDeep(deepObject);
      actual = fp.merge(value, { 'a': { 'd': 4 } });

      assert.deepEqual(value, { 'a': { 'b': 2, 'c': 3 } }, 'fp.merge');
      assert.deepEqual(actual, { 'a': { 'b': 2, 'c': 3, 'd': 4 } }, 'fp.merge');

      value = _.cloneDeep(deepObject);
      value.a.b = [1];

      actual = fp.mergeWith(function(objValue, srcValue) {
        if (_.isArray(objValue)) {
          return objValue.concat(srcValue);
        }
      }, value, { 'a': { 'b': [2, 3] } });

      assert.deepEqual(value, { 'a': { 'b': [1], 'c': 3 } }, 'fp.mergeWith');
      assert.deepEqual(actual, { 'a': { 'b': [1, 2, 3], 'c': 3 } }, 'fp.mergeWith');

      value = _.clone(array);
      actual = fp.pull(2, value);

      assert.deepEqual(value, array, 'fp.pull');
      assert.deepEqual(actual, [1, 3], 'fp.pull');

      value = _.clone(array);
      actual = fp.pullAll([1, 3], value);

      assert.deepEqual(value, array, 'fp.pullAll');
      assert.deepEqual(actual, [2], 'fp.pullAll');

      value = _.clone(array);
      actual = fp.pullAt([0, 2], value);

      assert.deepEqual(value, array, 'fp.pullAt');
      assert.deepEqual(actual, [2], 'fp.pullAt');

      value = _.clone(array);
      actual = fp.remove(function(value) {
        return value === 2;
      }, value);

      assert.deepEqual(value, array, 'fp.remove');
      assert.deepEqual(actual, [1, 3], 'fp.remove');

      value = _.clone(array);
      actual = fp.reverse(value);

      assert.deepEqual(value, array, 'fp.reverse');
      assert.deepEqual(actual, [3, 2, 1], 'fp.reverse');

      value = _.cloneDeep(deepObject);
      actual = fp.set('a.b', 3, value);

      assert.deepEqual(value, deepObject, 'fp.set');
      assert.deepEqual(actual, { 'a': { 'b': 3, 'c': 3 } }, 'fp.set');

      value = _.cloneDeep(deepObject);
      actual = fp.setWith(Object, 'd.e', 4, value);

      assert.deepEqual(value, deepObject, 'fp.setWith');
      assert.deepEqual(actual, { 'a': { 'b': 2, 'c': 3 }, 'd': { 'e': 4 } }, 'fp.setWith');

      value = _.cloneDeep(deepObject);
      actual = fp.unset('a.b', value);

      assert.deepEqual(value, deepObject, 'fp.unset');
      assert.deepEqual(actual, { 'a': { 'c': 3 } }, 'fp.set');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('placeholder methods');

  (function() {
    QUnit.test('should support placeholders', function(assert) {
      assert.expect(6);

      _.each([[], fp.__], function(ph) {
        fp.placeholder = ph;

        var actual = fp.add(ph, 'b')('a');
        assert.strictEqual(actual, 'ab');

        actual = fp.slice(ph, 2)(1)(['a', 'b', 'c']);
        assert.deepEqual(actual, ['b']);

        actual = fp.fill(ph, 2)(1, '*')([1, 2, 3]);
        assert.deepEqual(actual, [1, '*', 3]);
      });
    });

    _.forOwn(mapping.placeholder, function(truthy, methodName) {
      var func = fp[methodName];

      QUnit.test('`_.' + methodName + '` should have a `placeholder` property', function(assert) {
        assert.expect(2);

        assert.ok(_.isObject(func.placeholder));
        assert.strictEqual(func.placeholder, fp.__);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('with methods');

  (function() {
    var array = [1, 2, 3],
        object = { 'a': 1 };

    QUnit.test('should provide the correct `customizer` arguments', function(assert) {
      assert.expect(4);

      var args,
          value = _.clone(object);

      fp.assignWith(function() {
        args || (args = _.map(arguments, _.cloneDeep));
      }, value, { 'b': 2 });

      assert.deepEqual(args, [undefined, 2, 'b', { 'a': 1 }, { 'b': 2 }], 'fp.assignWith');

      args = undefined;
      value = _.clone(object);

      fp.extendWith(function() {
        args || (args = _.map(arguments, _.cloneDeep));
      }, value, { 'b': 2 });

      assert.deepEqual(args, [undefined, 2, 'b', { 'a': 1 }, { 'b': 2 }], 'fp.extendWith');

      var stack = { '__data__': { 'array': [], 'map': null } },
          expected = [[1], [2, 3], 'a', { 'a': [1] }, { 'a': [2, 3] }, stack];

      args = undefined;
      value = { 'a': [1] };

      fp.mergeWith(function() {
        args || (args = _.map(arguments, _.cloneDeep));
      }, value, { 'a': [2, 3] });

      args[5] = _.omitBy(args[5], _.isFunction);
      assert.deepEqual(args, expected, 'fp.mergeWith');

      args = undefined;
      value = _.clone(object);

      fp.setWith(function() {
        args || (args = _.map(arguments, _.cloneDeep));
      }, 'b.c', 2, value);

      assert.deepEqual(args, [undefined, 'b', { 'a': 1 }], 'fp.setWith');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.add and fp.subtract');

  _.each(['add', 'subtract'], function(methodName) {
    var func = fp[methodName],
        isAdd = methodName == 'add';

    QUnit.test('`fp.' + methodName + '` should have `rearg` applied', function(assert) {
      assert.expect(1);

      assert.strictEqual(func('1')('2'), isAdd ? '12' : -1);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.curry and fp.curryRight');

  _.each(['curry', 'curryRight'], function(methodName) {
    var func = fp[methodName];

    QUnit.test('`_.' + methodName + '` should only accept a `func` param', function(assert) {
      assert.expect(1);

      assert.raises(function() { func(1, _.noop); }, TypeError);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.curryN and fp.curryRightN');

  _.each(['curryN', 'curryRightN'], function(methodName) {
    var func = fp[methodName];

    QUnit.test('`_.' + methodName + '` should accept an `arity` param', function(assert) {
      assert.expect(1);

      var actual = func(1, function(a, b) { return [a, b]; })('a');
      assert.deepEqual(actual, ['a', undefined]);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.difference');

  (function() {
    QUnit.test('should return the elements of the first array not included in the second array', function(assert) {
      assert.expect(1);

      assert.deepEqual(fp.difference([1, 2])([2, 3]), [1]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.extend');

  (function() {
    QUnit.test('should convert by name', function(assert) {
      assert.expect(2);

      function Foo() {}
      Foo.prototype = { 'b': 2 };

      var object = { 'a': 1 };

      if (!document) {
        var extend = convert('extend', _.extend),
            value = _.clone(object),
            actual = extend(value, new Foo);

        assert.deepEqual(value, object);
        assert.deepEqual(actual, { 'a': 1, 'b': 2 });
      }
      else {
        skipTest(assert, 2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.fill');

  (function() {
    QUnit.test('should have an argument order of `start`, `end`, then `value`', function(assert) {
      assert.expect(1);

      var array = [1, 2, 3];
      assert.deepEqual(fp.fill(1)(2)('*')(array), [1, '*', 3]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.flow and fp.flowRight');

  _.each(['flow', 'flowRight'], function(methodName) {
    var func = fp[methodName],
        isFlow = methodName == 'flow';

    QUnit.test('`fp.' + methodName + '` should support shortcut fusion', function(assert) {
      assert.expect(6);

      var filterCount,
          mapCount,
          array = fp.range(0, LARGE_ARRAY_SIZE);

      var iteratee = function(value) {
        mapCount++;
        return value * value;
      };

      var predicate = function(value) {
        filterCount++;
        return value % 2 == 0;
      };

      var filter = fp.filter(predicate),
          map = fp.map(iteratee),
          take = fp.take(2);

      _.times(2, function(index) {
        var combined = isFlow
          ? func(map, filter, fp.compact, take)
          : func(take, fp.compact, filter, map);

        filterCount = mapCount = 0;

        if (WeakMap && WeakMap.name) {
          assert.deepEqual(combined(array), [4, 16]);
          assert.strictEqual(filterCount, 5, 'filterCount');
          assert.strictEqual(mapCount, 5, 'mapCount');
        }
        else {
          skipTest(assert, 3);
        }
      });
    });
  });
  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.getOr');

  QUnit.test('should accept a `defaultValue` param', function(assert) {
    assert.expect(1);

    var actual = fp.getOr('default')('path')({});
    assert.strictEqual(actual, 'default');
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.gt and fp.gte');

  _.each(['gt', 'gte'], function(methodName) {
    var func = fp[methodName];

    QUnit.test('`fp.' + methodName + '` should have `rearg` applied', function(assert) {
      assert.expect(1);

      assert.strictEqual(func(2)(1), true);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.inRange');

  (function() {
    QUnit.test('should have an argument order of `start`, `end`, then `value`', function(assert) {
      assert.expect(1);

      assert.strictEqual(fp.inRange(2)(4)(3), true);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.iteratee');

  (function() {
    QUnit.test('should return a iteratee with capped params', function(assert) {
      assert.expect(1);

      var func = fp.iteratee(function(a, b, c) { return [a, b, c]; }, undefined, 3);
      assert.deepEqual(func(1, 2, 3), [1, undefined, undefined]);
    });

    QUnit.test('should convert by name', function(assert) {
      assert.expect(1);

      if (!document) {
        var iteratee = convert('iteratee', _.iteratee),
            func = iteratee(function(a, b, c) { return [a, b, c]; }, undefined, 3);

        assert.deepEqual(func(1, 2, 3), [1, undefined, undefined]);
      }
      else {
        skipTest(assert);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.lt and fp.lte');

  _.each(['lt', 'lte'], function(methodName) {
    var func = fp[methodName];

    QUnit.test('`fp.' + methodName + '` should have `rearg` applied', function(assert) {
      assert.expect(1);

      assert.strictEqual(func(1)(2), true);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.maxBy and fp.minBy');

  _.each(['maxBy', 'minBy'], function(methodName) {
    var array = [1, 2, 3],
        func = fp[methodName],
        isMax = methodName == 'maxBy';

    QUnit.test('`fp.' + methodName + '` should work with an `iteratee` argument', function(assert) {
      assert.expect(1);

      var actual = func(function(num) {
        return -num;
      })(array);

      assert.strictEqual(actual, isMax ? 1 : 3);
    });

    QUnit.test('`fp.' + methodName + '` should provide the correct `iteratee` arguments', function(assert) {
      assert.expect(1);

      var args;

      func(function() {
        args || (args = slice.call(arguments));
      })(array);

      assert.deepEqual(args, [1]);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.mixin');

  (function() {
    var source = { 'a': _.noop };

    QUnit.test('should mixin static methods but not prototype methods', function(assert) {
      assert.expect(2);

      fp.mixin(source);

      assert.strictEqual(typeof fp.a, 'function');
      assert.notOk('a' in fp.prototype);

      delete fp.a;
      delete fp.prototype.a;
    });

    QUnit.test('should not assign inherited `source` methods', function(assert) {
      assert.expect(2);

      function Foo() {}
      Foo.prototype.a = _.noop;
      fp.mixin(new Foo);

      assert.notOk('a' in fp);
      assert.notOk('a' in fp.prototype);

      delete fp.a;
      delete fp.prototype.a;
    });

    QUnit.test('should not remove existing prototype methods', function(assert) {
      assert.expect(2);

      var each1 = fp.each,
          each2 = fp.prototype.each;

      fp.mixin({ 'each': source.a });

      assert.strictEqual(fp.each, source.a);
      assert.strictEqual(fp.prototype.each, each2);

      fp.each = each1;
      fp.prototype.each = each2;
    });

    QUnit.test('should not export to the global when `source` is not an object', function(assert) {
      assert.expect(2);

      var props = _.without(_.keys(_), '_');

      _.times(2, function(index) {
        fp.mixin.apply(fp, index ? [1] : []);

        assert.ok(_.every(props, function(key) {
          return root[key] !== fp[key];
        }));

        _.each(props, function(key) {
          if (root[key] === fp[key]) {
            delete root[key];
          }
        });
      });
    });

    QUnit.test('should convert by name', function(assert) {
      assert.expect(3);

      if (!document) {
        var object = { 'mixin': convert('mixin', _.mixin) };

        function Foo() {}
        Foo.mixin = object.mixin;
        Foo.mixin(source);

        assert.strictEqual(typeof Foo.a, 'function');
        assert.notOk('a' in Foo.prototype);

        object.mixin(source);
        assert.strictEqual(typeof object.a, 'function');
      }
      else {
        skipTest(assert, 3);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.partial and fp.partialRight');

  _.each(['partial', 'partialRight'], function(methodName) {
    var func = fp[methodName],
        isPartial = methodName == 'partial';

    QUnit.test('`_.' + methodName + '` should accept an `args` param', function(assert) {
      assert.expect(1);

      var expected = isPartial ? [1, 2, 3] : [0, 1, 2];

      var actual = func(function(a, b, c) {
        return [a, b, c];
      })([1, 2])(isPartial ? 3 : 0);

      assert.deepEqual(actual, expected);
    });

    QUnit.test('`_.' + methodName + '` should convert by name', function(assert) {
      assert.expect(1);

      if (!document) {
        var expected = isPartial ? [1, 2, 3] : [0, 1, 2],
            par = convert(methodName, _[methodName]);

        var actual = par(function(a, b, c) {
          return [a, b, c];
        })([1, 2])(isPartial ? 3 : 0);

        assert.deepEqual(actual, expected);
      }
      else {
        skipTest(assert);
      }
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.random');

  (function() {
    var array = Array(1000);

    QUnit.test('should support a `min` and `max` argument', function(assert) {
      assert.expect(1);

      var min = 5,
          max = 10;

      assert.ok(_.some(array, function() {
        var result = fp.random(min)(max);
        return result >= min && result <= max;
      }));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.range');

  (function() {
    QUnit.test('should have an argument order of `start` then `end`', function(assert) {
      assert.expect(1);

      assert.deepEqual(fp.range(1)(4), [1, 2, 3]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.reduce and fp.reduceRight');

  _.each(['reduce', 'reduceRight'], function(methodName) {
    var func = fp[methodName],
        isReduce = methodName == 'reduce';

    QUnit.test('`_.' + methodName + '` should provide the correct `iteratee` arguments when iterating an array', function(assert) {
      assert.expect(1);

      var args,
          array = [1, 2, 3];

      func(function() {
        args || (args = slice.call(arguments));
      })(0, array);

      assert.deepEqual(args, isReduce ? [0, 1] : [0, 3]);
    });

    QUnit.test('`_.' + methodName + '` should provide the correct `iteratee` arguments when iterating an object', function(assert) {
      assert.expect(1);

      var args,
          object = { 'a': 1, 'b': 2 },
          isFIFO = _.keys(object)[0] == 'a';

      var expected = isFIFO
        ? (isReduce ? [0, 1] : [0, 2])
        : (isReduce ? [0, 2] : [0, 1]);

      func(function() {
        args || (args = slice.call(arguments));
      })(0, object);

      assert.deepEqual(args, expected);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.runInContext');

  (function() {
    QUnit.test('should return a converted lodash instance', function(assert) {
      assert.expect(1);

      assert.strictEqual(typeof fp.runInContext({}).curryN, 'function');
    });

    QUnit.test('should convert by name', function(assert) {
      assert.expect(1);

      if (!document) {
        var runInContext = convert('runInContext', _.runInContext);
        assert.strictEqual(typeof runInContext({}).curryN, 'function');
      }
      else {
        skipTest(assert);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.trimChars');

  _.each(['trimChars', 'trimCharsStart', 'trimCharsEnd'], function(methodName, index) {
    var func = fp[methodName],
        parts = [];

    if (index != 2) {
      parts.push('leading');
    }
    if (index != 1) {
      parts.push('trailing');
    }
    parts = parts.join(' and ');

    QUnit.test('`_.' + methodName + '` should remove ' + parts + ' `chars`', function(assert) {
      assert.expect(1);

      var string = '-_-a-b-c-_-',
          expected = (index == 2 ? '-_-' : '') + 'a-b-c' + (index == 1 ? '-_-' : '');

      assert.strictEqual(func('_-')(string), expected);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.uniqBy');

  (function() {
    var objects = [{ 'a': 2 }, { 'a': 3 }, { 'a': 1 }, { 'a': 2 }, { 'a': 3 }, { 'a': 1 }];

    QUnit.test('should work with an `iteratee` argument', function(assert) {
      assert.expect(1);

      var expected = objects.slice(0, 3);

      var actual = fp.uniqBy(function(object) {
        return object.a;
      })(objects);

      assert.deepEqual(actual, expected);
    });

    QUnit.test('should provide the correct `iteratee` arguments', function(assert) {
      assert.expect(1);

      var args;

      fp.uniqBy(function() {
        args || (args = slice.call(arguments));
      })(objects);

      assert.deepEqual(args, [objects[0]]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.zip');

  (function() {
    QUnit.test('should zip together two arrays', function(assert) {
      assert.expect(1);

      assert.deepEqual(fp.zip([1, 2], [3, 4]), [[1, 3], [2, 4]]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('fp.zipObject');

  (function() {
    QUnit.test('should zip together key/value arrays into an object', function(assert) {
      assert.expect(1);

      assert.deepEqual(fp.zipObject(['a', 'b'], [1, 2]), { 'a': 1, 'b': 2 });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.config.asyncRetries = 10;
  QUnit.config.hidepassed = true;

  if (!document) {
    QUnit.config.noglobals = true;
    QUnit.load();
  }
}.call(this));
