import assert from 'assert';
import lodashStable from 'lodash';
import uniqueId from '../uniqueId.js';

describe('uniqueId', function() {
  it('should generate unique ids', function() {
    var actual = lodashStable.times(1000, function() {
      return uniqueId();
    });

    assert.strictEqual(lodashStable.uniq(actual).length, actual.length);
  });

  it('should return a string value when not providing a `prefix`', function() {
    assert.strictEqual(typeof uniqueId(), 'string');
  });

  it('should coerce the prefix argument to a string', function() {
    var actual = [uniqueId(3), uniqueId(2), uniqueId(1)];
    assert.ok(/3_\d+,2_\d+,1_\d+/.test(actual));
  });

  it('should handle numeric prefixes properly', function() {
    var firstId = uniqueId('1')
    var moreIds = lodashStable.times(15, function() {
      return uniqueId()
    });
    assert.ok(!moreIds.includes(firstId))
  });

  it('should properly handle prefixes that end with digits', function() {
    var firstFooId = uniqueId('foo1')
    var moreFooIds = lodashStable.times(15, function() {
      return uniqueId('foo')
    });
    assert.ok(!moreFooIds.includes(firstFooId))
  });
});
