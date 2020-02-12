import assert from 'assert';
import lodashStable from 'lodash';
import { MAX_SAFE_INTEGER, falsey, stubTrue } from './utils.js';
import endsWith from '../endsWith.js';

describe('endsWith', function() {
  var string = 'abc';

  it('should return `true` if a string ends with `target`', function() {
    assert.strictEqual(endsWith(string, 'c'), true);
  });

  it('should return `false` if a string does not end with `target`', function() {
    assert.strictEqual(endsWith(string, 'b'), false);
  });

  it('should work with a `position`', function() {
    assert.strictEqual(endsWith(string, 'b', 2), true);
  });

  it('should work with `position` >= `length`', function() {
    lodashStable.each([3, 5, MAX_SAFE_INTEGER, Infinity], function(position) {
      assert.strictEqual(endsWith(string, 'c', position), true);
    });
  });

  it('should treat falsey `position` values, except `undefined`, as `0`', function() {
    var expected = lodashStable.map(falsey, stubTrue);

    var actual = lodashStable.map(falsey, function(position) {
      return endsWith(string, position === undefined ? 'c' : '', position);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should treat a negative `position` as `0`', function() {
    lodashStable.each([-1, -3, -Infinity], function(position) {
      assert.ok(lodashStable.every(string, function(chr) {
        return !endsWith(string, chr, position);
      }));
      assert.strictEqual(endsWith(string, '', position), true);
    });
  });

  it('should coerce `position` to an integer', function() {
    assert.strictEqual(endsWith(string, 'ab', 2.2), true);
  });
});
