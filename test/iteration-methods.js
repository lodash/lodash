import assert from 'assert';
import lodashStable from 'lodash';
import { _, slice, isNpm, noop, MAX_SAFE_INTEGER, stubTrue } from './utils.js';

describe('iteration methods', function() {
  var methods = [
    '_baseEach',
    'countBy',
    'every',
    'filter',
    'find',
    'findIndex',
    'findKey',
    'findLast',
    'findLastIndex',
    'findLastKey',
    'forEach',
    'forEachRight',
    'forIn',
    'forInRight',
    'forOwn',
    'forOwnRight',
    'groupBy',
    'keyBy',
    'map',
    'mapKeys',
    'mapValues',
    'maxBy',
    'minBy',
    'omitBy',
    'partition',
    'pickBy',
    'reject',
    'some'
  ];

  var arrayMethods = [
    'findIndex',
    'findLastIndex',
    'maxBy',
    'minBy'
  ];

  var collectionMethods = [
    '_baseEach',
    'countBy',
    'every',
    'filter',
    'find',
    'findLast',
    'forEach',
    'forEachRight',
    'groupBy',
    'keyBy',
    'map',
    'partition',
    'reduce',
    'reduceRight',
    'reject',
    'some'
  ];

  var forInMethods = [
    'forIn',
    'forInRight',
    'omitBy',
    'pickBy'
  ];

  var iterationMethods = [
    '_baseEach',
    'forEach',
    'forEachRight',
    'forIn',
    'forInRight',
    'forOwn',
    'forOwnRight'
  ];

  var objectMethods = [
    'findKey',
    'findLastKey',
    'forIn',
    'forInRight',
    'forOwn',
    'forOwnRight',
    'mapKeys',
    'mapValues',
    'omitBy',
    'pickBy'
  ];

  var rightMethods = [
    'findLast',
    'findLastIndex',
    'findLastKey',
    'forEachRight',
    'forInRight',
    'forOwnRight'
  ];

  var unwrappedMethods = [
    'each',
    'eachRight',
    'every',
    'find',
    'findIndex',
    'findKey',
    'findLast',
    'findLastIndex',
    'findLastKey',
    'forEach',
    'forEachRight',
    'forIn',
    'forInRight',
    'forOwn',
    'forOwnRight',
    'max',
    'maxBy',
    'min',
    'minBy',
    'some'
  ];

  lodashStable.each(methods, function(methodName) {
    var array = [1, 2, 3],
        func = _[methodName],
        isBy = /(^partition|By)$/.test(methodName),
        isFind = /^find/.test(methodName),
        isOmitPick = /^(?:omit|pick)By$/.test(methodName),
        isSome = methodName == 'some';

    it('`_.' + methodName + '` should provide correct iteratee arguments', function() {
      if (func) {
        var args,
            expected = [1, 0, array];

        func(array, function() {
          args || (args = slice.call(arguments));
        });

        if (lodashStable.includes(rightMethods, methodName)) {
          expected[0] = 3;
          expected[1] = 2;
        }
        if (lodashStable.includes(objectMethods, methodName)) {
          expected[1] += '';
        }
        if (isBy) {
          expected.length = isOmitPick ? 2 : 1;
        }
        assert.deepStrictEqual(args, expected);
      }
    });

    it('`_.' + methodName + '` should treat sparse arrays as dense', function() {
      if (func) {
        var array = [1];
        array[2] = 3;

        var expected = lodashStable.includes(objectMethods, methodName)
          ? [[1, '0', array], [undefined, '1', array], [3, '2', array]]
          : [[1,  0, array],  [undefined,  1,  array], [3,  2,  array]];

        if (isBy) {
          expected = lodashStable.map(expected, function(args) {
            return args.slice(0, isOmitPick ? 2 : 1);
          });
        }
        else if (lodashStable.includes(objectMethods, methodName)) {
          expected = lodashStable.map(expected, function(args) {
            args[1] += '';
            return args;
          });
        }
        if (lodashStable.includes(rightMethods, methodName)) {
          expected.reverse();
        }
        var argsList = [];
        func(array, function() {
          argsList.push(slice.call(arguments));
          return !(isFind || isSome);
        });

        assert.deepStrictEqual(argsList, expected);
      }
    });
  });

  lodashStable.each(lodashStable.difference(methods, objectMethods), function(methodName) {
    var array = [1, 2, 3],
        func = _[methodName],
        isEvery = methodName == 'every';

    array.a = 1;

    it('`_.' + methodName + '` should not iterate custom properties on arrays', function() {
      if (func) {
        var keys = [];
        func(array, function(value, key) {
          keys.push(key);
          return isEvery;
        });

        assert.ok(!lodashStable.includes(keys, 'a'));
      }
    });
  });

  lodashStable.each(lodashStable.difference(methods, unwrappedMethods), function(methodName) {
    var array = [1, 2, 3],
        isBaseEach = methodName == '_baseEach';

    it('`_.' + methodName + '` should return a wrapped value when implicitly chaining', function() {
      if (!(isBaseEach || isNpm)) {
        var wrapped = _(array)[methodName](noop);
        assert.ok(wrapped instanceof _);
      }
    });
  });

  lodashStable.each(unwrappedMethods, function(methodName) {
    var array = [1, 2, 3];

    it('`_.' + methodName + '` should return an unwrapped value when implicitly chaining', function() {
      var actual = _(array)[methodName](noop);
      assert.notOk(actual instanceof _);
    });

    it('`_.' + methodName + '` should return a wrapped value when explicitly chaining', function() {
      var wrapped = _(array).chain(),
          actual = wrapped[methodName](noop);

      assert.ok(actual instanceof _);
      assert.notStrictEqual(actual, wrapped);
    });
  });

  lodashStable.each(lodashStable.difference(methods, arrayMethods, forInMethods), function(methodName) {
    var func = _[methodName];

    it('`_.' + methodName + '` iterates over own string keyed properties of objects', function() {
      function Foo() {
        this.a = 1;
      }
      Foo.prototype.b = 2;

      if (func) {
        var values = [];
        func(new Foo, function(value) { values.push(value); });
        assert.deepStrictEqual(values, [1]);
      }
    });
  });

  lodashStable.each(iterationMethods, function(methodName) {
    var array = [1, 2, 3],
        func = _[methodName];

    it('`_.' + methodName + '` should return the collection', function() {
      if (func) {
        assert.strictEqual(func(array, Boolean), array);
      }
    });
  });

  lodashStable.each(collectionMethods, function(methodName) {
    var func = _[methodName];

    it('`_.' + methodName + '` should use `isArrayLike` to determine whether a value is array-like', function() {
      if (func) {
        var isIteratedAsObject = function(object) {
          var result = false;
          func(object, function() { result = true; }, 0);
          return result;
        };

        var values = [-1, '1', 1.1, Object(1), MAX_SAFE_INTEGER + 1],
            expected = lodashStable.map(values, stubTrue);

        var actual = lodashStable.map(values, function(length) {
          return isIteratedAsObject({ 'length': length });
        });

        var Foo = function(a) {};
        Foo.a = 1;

        assert.deepStrictEqual(actual, expected);
        assert.ok(isIteratedAsObject(Foo));
        assert.ok(!isIteratedAsObject({ 'length': 0 }));
      }
    });
  });

  lodashStable.each(methods, function(methodName) {
    var func = _[methodName],
        isFind = /^find/.test(methodName),
        isSome = methodName == 'some',
        isReduce = /^reduce/.test(methodName);

    it('`_.' + methodName + '` should ignore changes to `length`', function() {
      if (func) {
        var count = 0,
            array = [1];

        func(array, function() {
          if (++count == 1) {
            array.push(2);
          }
          return !(isFind || isSome);
        }, isReduce ? array : null);

        assert.strictEqual(count, 1);
      }
    });
  });

  lodashStable.each(lodashStable.difference(lodashStable.union(methods, collectionMethods), arrayMethods), function(methodName) {
    var func = _[methodName],
        isFind = /^find/.test(methodName),
        isSome = methodName == 'some',
        isReduce = /^reduce/.test(methodName);

    it('`_.' + methodName + '` should ignore added `object` properties', function() {
      if (func) {
        var count = 0,
            object = { 'a': 1 };

        func(object, function() {
          if (++count == 1) {
            object.b = 2;
          }
          return !(isFind || isSome);
        }, isReduce ? object : null);

        assert.strictEqual(count, 1);
      }
    });
  });
});
