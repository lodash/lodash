import assert from 'assert';
import lodashStable from 'lodash';
import { args, slice, document, body, symbol, falsey, stubFalse, realm } from './utils.js';
import isObject from '../isObject.js';

describe('isObject', function() {
  it('should return `true` for objects', function() {
    assert.strictEqual(isObject(args), true);
    assert.strictEqual(isObject([1, 2, 3]), true);
    assert.strictEqual(isObject(Object(false)), true);
    assert.strictEqual(isObject(new Date), true);
    assert.strictEqual(isObject(new Error), true);
    assert.strictEqual(isObject(_), true);
    assert.strictEqual(isObject(slice), true);
    assert.strictEqual(isObject({ 'a': 1 }), true);
    assert.strictEqual(isObject(Object(0)), true);
    assert.strictEqual(isObject(/x/), true);
    assert.strictEqual(isObject(Object('a')), true);

    if (document) {
      assert.strictEqual(isObject(body), true);
    }
    if (Symbol) {
      assert.strictEqual(isObject(Object(symbol)), true);
    }
  });

  it('should return `false` for non-objects', function() {
    var values = falsey.concat(true, 1, 'a', symbol),
        expected = lodashStable.map(values, stubFalse);

    var actual = lodashStable.map(values, function(value, index) {
      return index ? isObject(value) : isObject();
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with objects from another realm', function() {
    if (realm.element) {
      assert.strictEqual(isObject(realm.element), true);
    }
    if (realm.object) {
      assert.strictEqual(isObject(realm.boolean), true);
      assert.strictEqual(isObject(realm.date), true);
      assert.strictEqual(isObject(realm.function), true);
      assert.strictEqual(isObject(realm.number), true);
      assert.strictEqual(isObject(realm.object), true);
      assert.strictEqual(isObject(realm.regexp), true);
      assert.strictEqual(isObject(realm.string), true);
    }
  });
});
