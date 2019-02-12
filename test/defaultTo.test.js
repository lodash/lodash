import assert from 'assert';
import lodashStable from 'lodash';
import { falsey } from './utils.js';
import defaultTo from '../defaultTo.js';

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
});
