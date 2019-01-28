import assert from 'assert';
import lodashStable from 'lodash';
import { empties, stubTrue, isNpm, lodashBizarro } from './utils.js';

describe('lodash constructor', function() {
  var values = empties.concat(true, 1, 'a'),
      expected = lodashStable.map(values, stubTrue);

  it('should create a new instance when called without the `new` operator', function() {
    var actual = lodashStable.map(values, function(value) {
      return _(value) instanceof _;
    });

    assert.deepEqual(actual, expected);
  });

  it('should return the given `lodash` instances', function() {
    var actual = lodashStable.map(values, function(value) {
      var wrapped = _(value);
      return _(wrapped) === wrapped;
    });

    assert.deepEqual(actual, expected);
  });

  it('should convert foreign wrapped values to `lodash` instances', function() {
    if (!isNpm && lodashBizarro) {
      var actual = lodashStable.map(values, function(value) {
        var wrapped = _(lodashBizarro(value)),
            unwrapped = wrapped.value();

        return wrapped instanceof _ &&
          ((unwrapped === value) || (unwrapped !== unwrapped && value !== value));
      });

      assert.deepStrictEqual(actual, expected);
    }
  });
});
