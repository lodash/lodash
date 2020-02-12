import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, stubFalse, args, slice, symbol, realm } from './utils.js';
import isRegExp from '../isRegExp.js';

describe('isRegExp', function() {
  it('should return `true` for regexes', function() {
    assert.strictEqual(isRegExp(/x/), true);
    assert.strictEqual(isRegExp(RegExp('x')), true);
  });

  it('should return `false` for non-regexes', function() {
    var expected = lodashStable.map(falsey, stubFalse);

    var actual = lodashStable.map(falsey, function(value, index) {
      return index ? isRegExp(value) : isRegExp();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(isRegExp(args), false);
    assert.strictEqual(isRegExp([1, 2, 3]), false);
    assert.strictEqual(isRegExp(true), false);
    assert.strictEqual(isRegExp(new Date), false);
    assert.strictEqual(isRegExp(new Error), false);
    assert.strictEqual(isRegExp(_), false);
    assert.strictEqual(isRegExp(slice), false);
    assert.strictEqual(isRegExp({ 'a': 1 }), false);
    assert.strictEqual(isRegExp(1), false);
    assert.strictEqual(isRegExp('a'), false);
    assert.strictEqual(isRegExp(symbol), false);
  });

  it('should work with regexes from another realm', function() {
    if (realm.regexp) {
      assert.strictEqual(isRegExp(realm.regexp), true);
    }
  });
});
