import assert from 'assert';
import lodashStable from 'lodash';
import { symbol, falsey, stubFalse, args, slice, realm } from './utils.js';
import isSymbol from '../isSymbol.js';

describe('isSymbol', function() {
  it('should return `true` for symbols', function() {
    if (Symbol) {
      assert.strictEqual(isSymbol(symbol), true);
      assert.strictEqual(isSymbol(Object(symbol)), true);
    }
  });

  it('should return `false` for non-symbols', function() {
    var expected = lodashStable.map(falsey, stubFalse);

    var actual = lodashStable.map(falsey, function(value, index) {
      return index ? isSymbol(value) : isSymbol();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(isSymbol(args), false);
    assert.strictEqual(isSymbol([1, 2, 3]), false);
    assert.strictEqual(isSymbol(true), false);
    assert.strictEqual(isSymbol(new Date), false);
    assert.strictEqual(isSymbol(new Error), false);
    assert.strictEqual(isSymbol(_), false);
    assert.strictEqual(isSymbol(slice), false);
    assert.strictEqual(isSymbol({ '0': 1, 'length': 1 }), false);
    assert.strictEqual(isSymbol(1), false);
    assert.strictEqual(isSymbol(/x/), false);
    assert.strictEqual(isSymbol('a'), false);
  });

  it('should work with symbols from another realm', function() {
    if (Symbol && realm.symbol) {
      assert.strictEqual(isSymbol(realm.symbol), true);
    }
  });
});
