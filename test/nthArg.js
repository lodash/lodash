import assert from 'assert';
import lodashStable from 'lodash';
import { args, falsey, stubA, stubB, noop } from './utils.js';
import nthArg from '../nthArg.js';

describe('nthArg', function() {
  var args = ['a', 'b', 'c', 'd'];

  it('should create a function that returns its nth argument', function() {
    var actual = lodashStable.map(args, function(value, index) {
      var func = nthArg(index);
      return func.apply(undefined, args);
    });

    assert.deepStrictEqual(actual, args);
  });

  it('should work with a negative `n`', function() {
    var actual = lodashStable.map(lodashStable.range(1, args.length + 1), function(n) {
      var func = nthArg(-n);
      return func.apply(undefined, args);
    });

    assert.deepStrictEqual(actual, ['d', 'c', 'b', 'a']);
  });

  it('should coerce `n` to an integer', function() {
    var values = falsey,
        expected = lodashStable.map(values, stubA);

    var actual = lodashStable.map(values, function(n) {
      var func = n ? nthArg(n) : nthArg();
      return func.apply(undefined, args);
    });

    assert.deepStrictEqual(actual, expected);

    values = ['1', 1.6];
    expected = lodashStable.map(values, stubB);

    actual = lodashStable.map(values, function(n) {
      var func = nthArg(n);
      return func.apply(undefined, args);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should return `undefined` for empty arrays', function() {
    var func = nthArg(1);
    assert.strictEqual(func(), undefined);
  });

  it('should return `undefined` for non-indexes', function() {
    var values = [Infinity, args.length],
        expected = lodashStable.map(values, noop);

    var actual = lodashStable.map(values, function(n) {
      var func = nthArg(n);
      return func.apply(undefined, args);
    });

    assert.deepStrictEqual(actual, expected);
  });
});
