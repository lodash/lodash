import assert from 'assert';
import lodashStable from 'lodash';
import { stubTrue, stubFalse, args, symbol } from './utils.js';
import isFinite from '../isFinite.js';

describe('isFinite', function() {
  it('should return `true` for finite values', function() {
    var values = [0, 1, 3.14, -1],
        expected = lodashStable.map(values, stubTrue),
        actual = lodashStable.map(values, isFinite);

    assert.deepStrictEqual(actual, expected);
  });

  it('should return `false` for non-finite values', function() {
    var values = [NaN, Infinity, -Infinity, Object(1)],
        expected = lodashStable.map(values, stubFalse),
        actual = lodashStable.map(values, isFinite);

    assert.deepStrictEqual(actual, expected);
  });

  it('should return `false` for non-numeric values', function() {
    var values = [undefined, [], true, '', ' ', '2px'],
        expected = lodashStable.map(values, stubFalse),
        actual = lodashStable.map(values, isFinite);

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(isFinite(args), false);
    assert.strictEqual(isFinite([1, 2, 3]), false);
    assert.strictEqual(isFinite(true), false);
    assert.strictEqual(isFinite(new Date), false);
    assert.strictEqual(isFinite(new Error), false);
    assert.strictEqual(isFinite({ 'a': 1 }), false);
    assert.strictEqual(isFinite(/x/), false);
    assert.strictEqual(isFinite('a'), false);
    assert.strictEqual(isFinite(symbol), false);
  });

  it('should return `false` for numeric string values', function() {
    var values = ['2', '0', '08'],
        expected = lodashStable.map(values, stubFalse),
        actual = lodashStable.map(values, isFinite);

    assert.deepStrictEqual(actual, expected);
  });
});
