import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, stubThree } from './utils.js';
import repeat from '../repeat.js';

describe('repeat', function() {
  var string = 'abc';

  it('should repeat a string `n` times', function() {
    assert.strictEqual(repeat('*', 3), '***');
    assert.strictEqual(repeat(string, 2), 'abcabc');
  });

  it('should treat falsey `n` values, except `undefined`, as `0`', function() {
    var expected = lodashStable.map(falsey, function(value) {
      return value === undefined ? string : '';
    });

    var actual = lodashStable.map(falsey, function(n, index) {
      return index ? repeat(string, n) : repeat(string);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should return an empty string if `n` is <= `0`', function() {
    assert.strictEqual(repeat(string, 0), '');
    assert.strictEqual(repeat(string, -2), '');
  });

  it('should coerce `n` to an integer', function() {
    assert.strictEqual(repeat(string, '2'), 'abcabc');
    assert.strictEqual(repeat(string, 2.6), 'abcabc');
    assert.strictEqual(repeat('*', { 'valueOf': stubThree }), '***');
  });

  it('should coerce `string` to a string', function() {
    assert.strictEqual(repeat(Object(string), 2), 'abcabc');
    assert.strictEqual(repeat({ 'toString': lodashStable.constant('*') }, 3), '***');
  });

  it('should work as an iteratee for methods like `_.map`', function() {
    var actual = lodashStable.map(['a', 'b', 'c'], repeat);
    assert.deepStrictEqual(actual, ['a', 'b', 'c']);
  });
});
