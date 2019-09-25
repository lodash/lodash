import assert from 'assert';
import lodashStable from 'lodash';
import { push, falsey, stubTrue } from './utils.js';
import bind from '../bind.js';
import placeholder from '../placeholder.js';

describe('bind', function() {
  function fn() {
    var result = [this];
    push.apply(result, arguments);
    return result;
  }

  it('should bind a function to an object', function() {
    var object = {},
        bound = bind(fn, object);

    assert.deepStrictEqual(bound('a'), [object, 'a']);
  });

  it('should accept a falsey `thisArg`', function() {
    var values = lodashStable.reject(falsey.slice(1), function(value) { return value == null; }),
        expected = lodashStable.map(values, function(value) { return [value]; });

    var actual = lodashStable.map(values, function(value) {
      try {
        var bound = bind(fn, value);
        return bound();
      } catch (e) {}
    });

    assert.ok(lodashStable.every(actual, function(value, index) {
      return lodashStable.isEqual(value, expected[index]);
    }));
  });

  it('should bind a function to nullish values', function() {
    var bound = bind(fn, null),
        actual = bound('a');

    assert.ok((actual[0] === null) || (actual[0] && actual[0].Array));
    assert.strictEqual(actual[1], 'a');

    lodashStable.times(2, function(index) {
      bound = index ? bind(fn, undefined) : bind(fn);
      actual = bound('b');

      assert.ok((actual[0] === undefined) || (actual[0] && actual[0].Array));
      assert.strictEqual(actual[1], 'b');
    });
  });

  it('should partially apply arguments ', function() {
    var object = {},
        bound = bind(fn, object, 'a');

    assert.deepStrictEqual(bound(), [object, 'a']);

    bound = bind(fn, object, 'a');
    assert.deepStrictEqual(bound('b'), [object, 'a', 'b']);

    bound = bind(fn, object, 'a', 'b');
    assert.deepStrictEqual(bound(), [object, 'a', 'b']);
    assert.deepStrictEqual(bound('c', 'd'), [object, 'a', 'b', 'c', 'd']);
  });

  it('should support placeholders', function() {
    var object = {},
        ph = bind.placeholder,
        bound = bind(fn, object, ph, 'b', ph);

    assert.deepStrictEqual(bound('a', 'c'), [object, 'a', 'b', 'c']);
    assert.deepStrictEqual(bound('a'), [object, 'a', 'b', undefined]);
    assert.deepStrictEqual(bound('a', 'c', 'd'), [object, 'a', 'b', 'c', 'd']);
    assert.deepStrictEqual(bound(), [object, undefined, 'b', undefined]);
  });

  it('should use `_.placeholder` when set', function() {
    var _ph = placeholder = {},
        ph = bind.placeholder,
        object = {},
        bound = bind(fn, object, _ph, 'b', ph);

    assert.deepEqual(bound('a', 'c'), [object, 'a', 'b', ph, 'c']);
    delete placeholder;
  });

  it('should create a function with a `length` of `0`', function() {
    var fn = function(a, b, c) {},
        bound = bind(fn, {});

    assert.strictEqual(bound.length, 0);

    bound = bind(fn, {}, 1);
    assert.strictEqual(bound.length, 0);
  });

  it('should ignore binding when called with the `new` operator', function() {
    function Foo() {
      return this;
    }

    var bound = bind(Foo, { 'a': 1 }),
        newBound = new bound;

    assert.strictEqual(bound().a, 1);
    assert.strictEqual(newBound.a, undefined);
    assert.ok(newBound instanceof Foo);
  });

  it('should handle a number of arguments when called with the `new` operator', function() {
    function Foo() {
      return this;
    }

    function Bar() {}

    var thisArg = { 'a': 1 },
        boundFoo = bind(Foo, thisArg),
        boundBar = bind(Bar, thisArg),
        count = 9,
        expected = lodashStable.times(count, lodashStable.constant([undefined, undefined]));

    var actual = lodashStable.times(count, function(index) {
      try {
        switch (index) {
          case 0: return [new boundFoo().a, new boundBar().a];
          case 1: return [new boundFoo(1).a, new boundBar(1).a];
          case 2: return [new boundFoo(1, 2).a, new boundBar(1, 2).a];
          case 3: return [new boundFoo(1, 2, 3).a, new boundBar(1, 2, 3).a];
          case 4: return [new boundFoo(1, 2, 3, 4).a, new boundBar(1, 2, 3, 4).a];
          case 5: return [new boundFoo(1, 2, 3, 4, 5).a, new boundBar(1, 2, 3, 4, 5).a];
          case 6: return [new boundFoo(1, 2, 3, 4, 5, 6).a, new boundBar(1, 2, 3, 4, 5, 6).a];
          case 7: return [new boundFoo(1, 2, 3, 4, 5, 6, 7).a, new boundBar(1, 2, 3, 4, 5, 6, 7).a];
          case 8: return [new boundFoo(1, 2, 3, 4, 5, 6, 7, 8).a, new boundBar(1, 2, 3, 4, 5, 6, 7, 8).a];
        }
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should ensure `new bound` is an instance of `func`', function() {
    function Foo(value) {
      return value && object;
    }

    var bound = bind(Foo),
        object = {};

    assert.ok(new bound instanceof Foo);
    assert.strictEqual(new bound(true), object);
  });

  it('should append array arguments to partially applied arguments', function() {
    var object = {},
        bound = bind(fn, object, 'a');

    assert.deepStrictEqual(bound(['b'], 'c'), [object, 'a', ['b'], 'c']);
  });

  it('should not rebind functions', function() {
    var object1 = {},
        object2 = {},
        object3 = {};

    var bound1 = bind(fn, object1),
        bound2 = bind(bound1, object2, 'a'),
        bound3 = bind(bound1, object3, 'b');

    assert.deepStrictEqual(bound1(), [object1]);
    assert.deepStrictEqual(bound2(), [object1, 'a']);
    assert.deepStrictEqual(bound3(), [object1, 'b']);
  });

  it('should not error when instantiating bound built-ins', function() {
    var Ctor = bind(Date, null),
        expected = new Date(2012, 4, 23, 0, 0, 0, 0);

    try {
      var actual = new Ctor(2012, 4, 23, 0, 0, 0, 0);
    } catch (e) {}

    assert.deepStrictEqual(actual, expected);

    Ctor = bind(Date, null, 2012, 4, 23);

    try {
      actual = new Ctor(0, 0, 0, 0);
    } catch (e) {}

    assert.deepStrictEqual(actual, expected);
  });

  it('should not error when calling bound class constructors with the `new` operator', function() {
    var createCtor = lodashStable.attempt(Function, '"use strict";return class A{}');

    if (typeof createCtor === 'function') {
      var bound = bind(createCtor()),
          count = 8,
          expected = lodashStable.times(count, stubTrue);

      var actual = lodashStable.times(count, function(index) {
        try {
          switch (index) {
            case 0: return !!(new bound);
            case 1: return !!(new bound(1));
            case 2: return !!(new bound(1, 2));
            case 3: return !!(new bound(1, 2, 3));
            case 4: return !!(new bound(1, 2, 3, 4));
            case 5: return !!(new bound(1, 2, 3, 4, 5));
            case 6: return !!(new bound(1, 2, 3, 4, 5, 6));
            case 7: return !!(new bound(1, 2, 3, 4, 5, 6, 7));
          }
        } catch (e) {}
      });

      assert.deepStrictEqual(actual, expected);
    }
  });

  it('should return a wrapped value when chaining', function() {
    var object = {},
        bound = _(fn).bind({}, 'a', 'b');

    assert.ok(bound instanceof _);

    var actual = bound.value()('c');
    assert.deepEqual(actual, [object, 'a', 'b', 'c']);
  });
});
