import assert from 'assert';
import isValidateObject from '../isValidateObject.js';
import { falsey, lodashStable, realm, slice, stubFalse, stubTrue, symbol } from './utils.js';

describe('isValidateObject', function() {
  it('should return `true` for `object` values', function() {
    assert.strictEqual(isValidateObject(['foo','bar','foobar']), true);
    assert.strictEqual(isValidateObject([-1,-2,-3]), true);
    assert.strictEqual(isValidateObject([0,1,2]), true);
    assert.strictEqual(isValidateObject([1,2,3]), true);
    assert.strictEqual(isValidateObject({a: 1, b: 2, c: 3}), true);
    assert.strictEqual(isValidateObject({a: 'foo', b: 'bar'}), true);
  });

  it('should return `false` for non `object` values', function() {
    var expected = lodashStable.map(falsey, stubFalse);

    var actual = lodashStable.map(falsey, function(value, index) {
      return index ? isValidateObject(value) : isValidateObject();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(isValidateObject(['', '', '']), false);
    assert.strictEqual(isValidateObject([null, null, null]), false);
    assert.strictEqual(isValidateObject([undefined, undefined, undefined]), false);
    assert.strictEqual(isValidateObject([null, undefined, NaN]), false);
    assert.strictEqual(isValidateObject([1, 'foo', null]), false);
    assert.strictEqual(isValidateObject([1, 'foo', undefined]), false);
    assert.strictEqual(isValidateObject([1, undefined, 3]), false);
    assert.strictEqual(isValidateObject([1, 'foo', '']), false);
    assert.strictEqual(isValidateObject({a: 'foo', b: ''}), false);
    assert.strictEqual(isValidateObject({a: 'foo', b: null}), false);
    assert.strictEqual(isValidateObject({a: 'foo', b: undefined}), false);
    assert.strictEqual(isValidateObject({a: undefined, b: undefined}), false);
    assert.strictEqual(isValidateObject(true), false);
    assert.strictEqual(isValidateObject(new Date), false);
    assert.strictEqual(isValidateObject(new Error), false);
    assert.strictEqual(isValidateObject(_), false);
    assert.strictEqual(isValidateObject(slice), false);
    assert.strictEqual(isValidateObject(undefined), false);
    assert.strictEqual(isValidateObject(1), false);
    assert.strictEqual(isValidateObject(/x/), false);
    assert.strictEqual(isValidateObject('a'), false);

    if (Symbol) {
      assert.strictEqual(isValidateObject(symbol), false);
    }
  });

  it('should work with `object` from another realm', function() {
    var values = [realm.arguments, realm.array, realm.string],
    expected = lodashStable.map(values, stubTrue),
    actual = lodashStable.map(values, isValidateObject);

    assert.deepStrictEqual(actual, expected);
  });
});
