import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, stubTrue } from './utils.js';

describe('lodash(...).unshift', function() {
  it('should prepend elements to `array`', function() {
    var array = [3],
        wrapped = _(array).unshift(1, 2),
        actual = wrapped.value();

    assert.strictEqual(actual, array);
    assert.deepEqual(actual, [1, 2, 3]);
  });

  it('should accept falsey arguments', function() {
    var expected = lodashStable.map(falsey, stubTrue);

    var actual = lodashStable.map(falsey, function(value, index) {
      try {
        var result = index ? _(value).unshift(1).value() : _().unshift(1).value();
        return lodashStable.eq(result, value);
      } catch (e) {}
    });

    assert.deepEqual(actual, expected);
  });
});
