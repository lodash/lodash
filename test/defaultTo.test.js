import assert from 'assert';
import lodashStable from 'lodash';
import { errors, falsey } from './utils.js';
import defaultTo from '../defaultTo.js';
import isError from '../isError.js';

describe('defaultTo', function() {
  it('should return a default value if `value` is `NaN` or nullish', function() {
    var expected = lodashStable.map(falsey, function(value) {
      return (value == null || value !== value) ? 1 : value;
    });

    var actual = lodashStable.map(falsey, function(value) {
      return defaultTo(value, 1);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should return a default value if `resolveEmpty` returns true for `value`', function() {
    var expected = new Array(errors.length).fill(1);

    var actual = lodashStable.map(errors, function(value) {
      return defaultTo(value, 1, isError);
    });

    assert.deepStrictEqual(actual, expected);
  });
});
