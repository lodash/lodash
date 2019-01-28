import assert from 'assert';
import lodashStable from 'lodash';
import { _, isEven, stubTrue } from './utils.js';

describe('negate', function() {
  it('should create a function that negates the result of `func`', function() {
    var negate = _.negate(isEven);

    assert.strictEqual(negate(1), true);
    assert.strictEqual(negate(2), false);
  });

  it('should create a function that negates the result of `func`', function() {
    var negate = _.negate(isEven);

    assert.strictEqual(negate(1), true);
    assert.strictEqual(negate(2), false);
  });

  it('should create a function that accepts multiple arguments', function() {
    var argCount,
        count = 5,
        negate = _.negate(function() { argCount = arguments.length; }),
        expected = lodashStable.times(count, stubTrue);

    var actual = lodashStable.times(count, function(index) {
      switch (index) {
        case 0: negate(); break;
        case 1: negate(1); break;
        case 2: negate(1, 2); break;
        case 3: negate(1, 2, 3); break;
        case 4: negate(1, 2, 3, 4);
      }
      return argCount == index;
    });

    assert.deepStrictEqual(actual, expected);
  });
});
