import assert from 'assert';
import lodashStable from 'lodash';
import { empties, stubNaN } from './utils.js';
import mean from '../mean.js';

describe('mean', function() {
  it('should return the mean of an array of numbers', function() {
    var array = [4, 2, 8, 6];
    assert.strictEqual(mean(array), 5);
  });

  it('should return `NaN` when passing empty `array` values', function() {
    var expected = lodashStable.map(empties, stubNaN),
        actual = lodashStable.map(empties, mean);

    assert.deepStrictEqual(actual, expected);
  });
});
