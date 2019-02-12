import assert from 'assert';
import lodashStable from 'lodash';
import { _, empties, LARGE_ARRAY_SIZE, slice } from './utils.js';
import each from '../each.js';

describe('find methods', function() {
  lodashStable.each(['find', 'findIndex', 'findKey', 'findLast', 'findLastIndex', 'findLastKey'], function(methodName) {
    var array = [1, 2, 3, 4],
        func = _[methodName];

    var objects = [
      { 'a': 0, 'b': 0 },
      { 'a': 1, 'b': 1 },
      { 'a': 2, 'b': 2 }
    ];

    var expected = ({
      'find': [objects[1], undefined, objects[2]],
      'findIndex': [1, -1, 2],
      'findKey': ['1', undefined, '2'],
      'findLast': [objects[2], undefined, objects[2]],
      'findLastIndex': [2, -1, 2],
      'findLastKey': ['2', undefined, '2']
    })[methodName];

    it('`_.' + methodName + '` should return the found value', function() {
      assert.strictEqual(func(objects, function(object) { return object.a; }), expected[0]);
    });

    it('`_.' + methodName + '` should return `' + expected[1] + '` if value is not found', function() {
      assert.strictEqual(func(objects, function(object) { return object.a === 3; }), expected[1]);
    });

    it('`_.' + methodName + '` should work with `_.matches` shorthands', function() {
      assert.strictEqual(func(objects, { 'b': 2 }), expected[2]);
    });

    it('`_.' + methodName + '` should work with `_.matchesProperty` shorthands', function() {
      assert.strictEqual(func(objects, ['b', 2]), expected[2]);
    });

    it('`_.' + methodName + '` should work with `_.property` shorthands', function() {
      assert.strictEqual(func(objects, 'b'), expected[0]);
    });

    it('`_.' + methodName + '` should return `' + expected[1] + '` for empty collections', function() {
      var emptyValues = lodashStable.endsWith(methodName, 'Index') ? lodashStable.reject(empties, lodashStable.isPlainObject) : empties,
          expecting = lodashStable.map(emptyValues, lodashStable.constant(expected[1]));

      var actual = lodashStable.map(emptyValues, function(value) {
        try {
          return func(value, { 'a': 3 });
        } catch (e) {}
      });

      assert.deepStrictEqual(actual, expecting);
    });

    it('`_.' + methodName + '` should return an unwrapped value when implicitly chaining', function() {
      var expected = ({
        'find': 1,
        'findIndex': 0,
        'findKey': '0',
        'findLast': 4,
        'findLastIndex': 3,
        'findLastKey': '3'
      })[methodName];

      assert.strictEqual(_(array)[methodName](), expected);
    });

    it('`_.' + methodName + '` should return a wrapped value when explicitly chaining', function() {
      assert.ok(_(array).chain()[methodName]() instanceof _);
    });

    it('`_.' + methodName + '` should not execute immediately when explicitly chaining', function() {
      var wrapped = _(array).chain()[methodName]();
      assert.strictEqual(wrapped.__wrapped__, array);
    });

    it('`_.' + methodName + '` should work in a lazy sequence', function() {
      var largeArray = lodashStable.range(1, LARGE_ARRAY_SIZE + 1),
          smallArray = array;

      lodashStable.times(2, function(index) {
        var array = index ? largeArray : smallArray,
            wrapped = _(array).filter(isEven);

        assert.strictEqual(wrapped[methodName](), func(lodashStable.filter(array, isEven)));
      });
    });
  }),
  function() {
    each(['find', 'findIndex', 'findLast', 'findLastIndex'], function(methodName) {
      var func = _[methodName];

      it('`_.' + methodName + '` should provide correct `predicate` arguments for arrays', function() {
        var args,
            array = ['a'];

        func(array, function() {
          args || (args = slice.call(arguments));
        });

        assert.deepStrictEqual(args, ['a', 0, array]);
      });
    });

    each(['find', 'findKey', 'findLast', 'findLastKey'], function(methodName) {
      var func = _[methodName];

      it('`_.' + methodName + '` should work with an object for `collection`', function() {
        var actual = func({ 'a': 1, 'b': 2, 'c': 3 }, function(n) {
          return n < 3;
        });

        var expected = ({
          'find': 1,
          'findKey': 'a',
          'findLast': 2,
          'findLastKey': 'b'
        })[methodName];

        assert.strictEqual(actual, expected);
      });

      it('`_.' + methodName + '` should provide correct `predicate` arguments for objects', function() {
        var args,
            object = { 'a': 1 };

        func(object, function() {
          args || (args = slice.call(arguments));
        });

        assert.deepStrictEqual(args, [1, 'a', object]);
      });
    });
  }
});
