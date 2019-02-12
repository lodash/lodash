import assert from 'assert';
import lodashStable from 'lodash';
import { _ } from './utils.js';

describe('sortBy methods', function() {
  lodashStable.each(['orderBy', 'sortBy'], function(methodName) {
    var func = _[methodName];

    function Pair(a, b, c) {
      this.a = a;
      this.b = b;
      this.c = c;
    }

    var objects = [
      { 'a': 'x', 'b': 3 },
      { 'a': 'y', 'b': 4 },
      { 'a': 'x', 'b': 1 },
      { 'a': 'y', 'b': 2 }
    ];

    var stableArray = [
      new Pair(1, 1, 1), new Pair(1, 2, 1),
      new Pair(1, 1, 1), new Pair(1, 2, 1),
      new Pair(1, 3, 1), new Pair(1, 4, 1),
      new Pair(1, 5, 1), new Pair(1, 6, 1),
      new Pair(2, 1, 2), new Pair(2, 2, 2),
      new Pair(2, 3, 2), new Pair(2, 4, 2),
      new Pair(2, 5, 2), new Pair(2, 6, 2),
      new Pair(undefined, 1, 1), new Pair(undefined, 2, 1),
      new Pair(undefined, 3, 1), new Pair(undefined, 4, 1),
      new Pair(undefined, 5, 1), new Pair(undefined, 6, 1)
    ];

    var stableObject = lodashStable.zipObject('abcdefghijklmnopqrst'.split(''), stableArray);

    it('`_.' + methodName + '` should sort multiple properties in ascending order', function() {
      var actual = func(objects, ['a', 'b']);
      assert.deepStrictEqual(actual, [objects[2], objects[0], objects[3], objects[1]]);
    });

    it('`_.' + methodName + '` should support iteratees', function() {
      var actual = func(objects, ['a', function(object) { return object.b; }]);
      assert.deepStrictEqual(actual, [objects[2], objects[0], objects[3], objects[1]]);
    });

    it('`_.' + methodName + '` should perform a stable sort (test in IE > 8 and V8)', function() {
      lodashStable.each([stableArray, stableObject], function(value, index) {
        var actual = func(value, ['a', 'c']);
        assert.deepStrictEqual(actual, stableArray, index ? 'object' : 'array');
      });
    });

    it('`_.' + methodName + '` should not error on nullish elements', function() {
      try {
        var actual = func(objects.concat(null, undefined), ['a', 'b']);
      } catch (e) {}

      assert.deepStrictEqual(actual, [objects[2], objects[0], objects[3], objects[1], null, undefined]);
    });

    it('`_.' + methodName + '` should work as an iteratee for methods like `_.reduce`', function() {
      var objects = [
        { 'a': 'x', '0': 3 },
        { 'a': 'y', '0': 4 },
        { 'a': 'x', '0': 1 },
        { 'a': 'y', '0': 2 }
      ];

      var funcs = [func, lodashStable.partialRight(func, 'bogus')];

      lodashStable.each(['a', 0, [0]], function(props, index) {
        var expected = lodashStable.map(funcs, lodashStable.constant(
          index
            ? [objects[2], objects[3], objects[0], objects[1]]
            : [objects[0], objects[2], objects[1], objects[3]]
        ));

        var actual = lodashStable.map(funcs, function(func) {
          return lodashStable.reduce([props], func, objects);
        });

        assert.deepStrictEqual(actual, expected);
      });
    });
  });
});
