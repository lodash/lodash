import assert from 'assert';
import lodashStable from 'lodash';
import { args, strictArgs, falsey, stubFalse, slice, noop, symbol, realm } from './utils.js';
import isArguments from '../isArguments.js';

describe('isArguments', function() {
  it('should return `true` for `arguments` objects', function() {
    assert.strictEqual(isArguments(args), true);
    assert.strictEqual(isArguments(strictArgs), true);
  });

  it('should return `false` for non `arguments` objects', function() {
    var expected = lodashStable.map(falsey, stubFalse);

    var actual = lodashStable.map(falsey, function(value, index) {
      return index ? isArguments(value) : isArguments();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(isArguments([1, 2, 3]), false);
    assert.strictEqual(isArguments(true), false);
    assert.strictEqual(isArguments(new Date), false);
    assert.strictEqual(isArguments(new Error), false);
    assert.strictEqual(isArguments(_), false);
    assert.strictEqual(isArguments(slice), false);
    assert.strictEqual(isArguments({ '0': 1, 'callee': noop, 'length': 1 }), false);
    assert.strictEqual(isArguments(1), false);
    assert.strictEqual(isArguments(/x/), false);
    assert.strictEqual(isArguments('a'), false);
    assert.strictEqual(isArguments(symbol), false);
  });

  it('should work with an `arguments` object from another realm', function() {
    if (realm.arguments) {
      assert.strictEqual(isArguments(realm.arguments), true);
    }
  });
});
