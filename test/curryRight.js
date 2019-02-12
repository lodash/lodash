import assert from 'assert';
import lodashStable from 'lodash';
import { slice, stubArray } from './utils.js';
import curryRight from '../curryRight.js';
import placeholder from '../placeholder.js';
import bind from '../bind.js';
import partialRight from '../partialRight.js';
import partial from '../partial.js';

describe('curryRight', function() {
  function fn(a, b, c, d) {
    return slice.call(arguments);
  }

  it('should curry based on the number of arguments given', function() {
    var curried = curryRight(fn),
        expected = [1, 2, 3, 4];

    assert.deepStrictEqual(curried(4)(3)(2)(1), expected);
    assert.deepStrictEqual(curried(3, 4)(1, 2), expected);
    assert.deepStrictEqual(curried(1, 2, 3, 4), expected);
  });

  it('should allow specifying `arity`', function() {
    var curried = curryRight(fn, 3),
        expected = [1, 2, 3];

    assert.deepStrictEqual(curried(3)(1, 2), expected);
    assert.deepStrictEqual(curried(2, 3)(1), expected);
    assert.deepStrictEqual(curried(1, 2, 3), expected);
  });

  it('should coerce `arity` to an integer', function() {
    var values = ['0', 0.6, 'xyz'],
        expected = lodashStable.map(values, stubArray);

    var actual = lodashStable.map(values, function(arity) {
      return curryRight(fn, arity)();
    });

    assert.deepStrictEqual(actual, expected);
    assert.deepStrictEqual(curryRight(fn, '2')(1)(2), [2, 1]);
  });

  it('should support placeholders', function() {
    var curried = curryRight(fn),
        expected = [1, 2, 3, 4],
        ph = curried.placeholder;

    assert.deepStrictEqual(curried(4)(2, ph)(1, ph)(3), expected);
    assert.deepStrictEqual(curried(3, ph)(4)(1, ph)(2), expected);
    assert.deepStrictEqual(curried(ph, ph, 4)(ph, 3)(ph, 2)(1), expected);
    assert.deepStrictEqual(curried(ph, ph, ph, 4)(ph, ph, 3)(ph, 2)(1), expected);
  });

  it('should persist placeholders', function() {
    var curried = curryRight(fn),
        ph = curried.placeholder,
        actual = curried('a', ph, ph, ph)('b')(ph)('c')('d');

    assert.deepStrictEqual(actual, ['a', 'b', 'c', 'd']);
  });

  it('should use `_.placeholder` when set', function() {
    var curried = curryRight(fn),
        _ph = placeholder = {},
        ph = curried.placeholder;

    assert.deepEqual(curried(4)(2, _ph)(1, ph), [1, 2, ph, 4]);
    delete placeholder;
  });

  it('should provide additional arguments after reaching the target arity', function() {
    var curried = curryRight(fn, 3);
    assert.deepStrictEqual(curried(4)(1, 2, 3), [1, 2, 3, 4]);
    assert.deepStrictEqual(curried(4, 5)(1, 2, 3), [1, 2, 3, 4, 5]);
    assert.deepStrictEqual(curried(1, 2, 3, 4, 5, 6), [1, 2, 3, 4, 5, 6]);
  });

  it('should create a function with a `length` of `0`', function() {
    lodashStable.times(2, function(index) {
      var curried = index ? curryRight(fn, 4) : curryRight(fn);
      assert.strictEqual(curried.length, 0);
      assert.strictEqual(curried(4).length, 0);
      assert.strictEqual(curried(3, 4).length, 0);
    });
  });

  it('should ensure `new curried` is an instance of `func`', function() {
    function Foo(value) {
      return value && object;
    }

    var curried = curryRight(Foo),
        object = {};

    assert.ok(new curried(false) instanceof Foo);
    assert.strictEqual(new curried(true), object);
  });

  it('should use `this` binding of function', function() {
    var fn = function(a, b, c) {
      var value = this || {};
      return [value[a], value[b], value[c]];
    };

    var object = { 'a': 1, 'b': 2, 'c': 3 },
        expected = [1, 2, 3];

    assert.deepStrictEqual(curryRight(bind(fn, object), 3)('c')('b')('a'), expected);
    assert.deepStrictEqual(curryRight(bind(fn, object), 3)('b', 'c')('a'), expected);
    assert.deepStrictEqual(curryRight(bind(fn, object), 3)('a', 'b', 'c'), expected);

    assert.deepStrictEqual(bind(curryRight(fn), object)('c')('b')('a'), Array(3));
    assert.deepStrictEqual(bind(curryRight(fn), object)('b', 'c')('a'), Array(3));
    assert.deepStrictEqual(bind(curryRight(fn), object)('a', 'b', 'c'), expected);

    object.curried = curryRight(fn);
    assert.deepStrictEqual(object.curried('c')('b')('a'), Array(3));
    assert.deepStrictEqual(object.curried('b', 'c')('a'), Array(3));
    assert.deepStrictEqual(object.curried('a', 'b', 'c'), expected);
  });

  it('should work with partialed methods', function() {
    var curried = curryRight(fn),
        expected = [1, 2, 3, 4];

    var a = partialRight(curried, 4),
        b = partialRight(a, 3),
        c = bind(b, null, 1),
        d = partial(b(2), 1);

    assert.deepStrictEqual(c(2), expected);
    assert.deepStrictEqual(d(), expected);
  });
});
