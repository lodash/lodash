import assert from 'assert';
import lodashStable from 'lodash';

import {
  document,
  create,
  objectProto,
  falsey,
  stubFalse,
  symbol,
  defineProperty,
  realm,
} from './utils.js';

import isPlainObject from '../isPlainObject.js';

describe('isPlainObject', function() {
  var element = document && document.createElement('div');

  it('should detect plain objects', function() {
    function Foo(a) {
      this.a = 1;
    }

    assert.strictEqual(isPlainObject({}), true);
    assert.strictEqual(isPlainObject({ 'a': 1 }), true);
    assert.strictEqual(isPlainObject({ 'constructor': Foo }), true);
    assert.strictEqual(isPlainObject([1, 2, 3]), false);
    assert.strictEqual(isPlainObject(new Foo(1)), false);
  });

  it('should return `true` for objects with a `[[Prototype]]` of `null`', function() {
    var object = create(null);
    assert.strictEqual(isPlainObject(object), true);

    object.constructor = objectProto.constructor;
    assert.strictEqual(isPlainObject(object), true);
  });

  it('should return `true` for objects with a `valueOf` property', function() {
    assert.strictEqual(isPlainObject({ 'valueOf': 0 }), true);
  });

  it('should return `true` for objects with a writable `Symbol.toStringTag` property', function() {
    if (Symbol && Symbol.toStringTag) {
      var object = {};
      object[Symbol.toStringTag] = 'X';

      assert.deepStrictEqual(isPlainObject(object), true);
    }
  });

  it('should return `false` for objects with a custom `[[Prototype]]`', function() {
    var object = create({ 'a': 1 });
    assert.strictEqual(isPlainObject(object), false);
  });

  it('should return `false` for DOM elements', function() {
    if (element) {
      assert.strictEqual(isPlainObject(element), false);
    }
  });

  it('should return `false` for non-Object objects', function() {
    assert.strictEqual(isPlainObject(arguments), false);
    assert.strictEqual(isPlainObject(Error), false);
    assert.strictEqual(isPlainObject(Math), false);
  });

  it('should return `false` for non-objects', function() {
    var expected = lodashStable.map(falsey, stubFalse);

    var actual = lodashStable.map(falsey, function(value, index) {
      return index ? isPlainObject(value) : isPlainObject();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(isPlainObject(true), false);
    assert.strictEqual(isPlainObject('a'), false);
    assert.strictEqual(isPlainObject(symbol), false);
  });

  it('should return `false` for objects with a read-only `Symbol.toStringTag` property', function() {
    if (Symbol && Symbol.toStringTag) {
      var object = {};
      defineProperty(object, Symbol.toStringTag, {
        'configurable': true,
        'enumerable': false,
        'writable': false,
        'value': 'X'
      });

      assert.deepStrictEqual(isPlainObject(object), false);
    }
  });

  it('should not mutate `value`', function() {
    if (Symbol && Symbol.toStringTag) {
      var proto = {};
      proto[Symbol.toStringTag] = undefined;
      var object = create(proto);

      assert.strictEqual(isPlainObject(object), false);
      assert.ok(!lodashStable.has(object, Symbol.toStringTag));
    }
  });

  it('should work with objects from another realm', function() {
    if (realm.object) {
      assert.strictEqual(isPlainObject(realm.object), true);
    }
  });
});
