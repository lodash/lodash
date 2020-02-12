import assert from 'assert';
import lodashStable from 'lodash';
import { slice, _ } from './utils.js';
import ary from '../ary.js';
import curry from '../curry.js';
import rearg from '../rearg.js';

describe('ary', function() {
  function fn(a, b, c) {
    return slice.call(arguments);
  }

  it('should cap the number of arguments provided to `func`', function() {
    var actual = lodashStable.map(['6', '8', '10'], ary(parseInt, 1));
    assert.deepStrictEqual(actual, [6, 8, 10]);

    var capped = ary(fn, 2);
    assert.deepStrictEqual(capped('a', 'b', 'c', 'd'), ['a', 'b']);
  });

  it('should use `func.length` if `n` is not given', function() {
    var capped = ary(fn);
    assert.deepStrictEqual(capped('a', 'b', 'c', 'd'), ['a', 'b', 'c']);
  });

  it('should treat a negative `n` as `0`', function() {
    var capped = ary(fn, -1);

    try {
      var actual = capped('a');
    } catch (e) {}

    assert.deepStrictEqual(actual, []);
  });

  it('should coerce `n` to an integer', function() {
    var values = ['1', 1.6, 'xyz'],
        expected = [['a'], ['a'], []];

    var actual = lodashStable.map(values, function(n) {
      var capped = ary(fn, n);
      return capped('a', 'b');
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should not force a minimum argument count', function() {
    var args = ['a', 'b', 'c'],
        capped = ary(fn, 3);

    var expected = lodashStable.map(args, function(arg, index) {
      return args.slice(0, index);
    });

    var actual = lodashStable.map(expected, function(array) {
      return capped.apply(undefined, array);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should use `this` binding of function', function() {
    var capped = ary(function(a, b) { return this; }, 1),
        object = { 'capped': capped };

    assert.strictEqual(object.capped(), object);
  });

  it('should use the existing `ary` if smaller', function() {
    var capped = ary(ary(fn, 1), 2);
    assert.deepStrictEqual(capped('a', 'b', 'c'), ['a']);
  });

  it('should work as an iteratee for methods like `_.map`', function() {
    var funcs = lodashStable.map([fn], ary),
        actual = funcs[0]('a', 'b', 'c');

    assert.deepStrictEqual(actual, ['a', 'b', 'c']);
  });

  it('should work when combined with other methods that use metadata', function() {
    var array = ['a', 'b', 'c'],
        includes = curry(rearg(ary(_.includes, 2), 1, 0), 2);

    assert.strictEqual(includes('b')(array, 2), true);

    includes = _(_.includes).ary(2).rearg(1, 0).curry(2).value();
    assert.strictEqual(includes('b')(array, 2), true);
  });
});
