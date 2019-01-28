import assert from 'assert';
import lodashStable from 'lodash';

import {
  slice,
  asyncFunc,
  genFunc,
  arrayViews,
  objToString,
  funcTag,
  falsey,
  stubFalse,
  args,
  symbol,
  document,
  realm,
} from './utils.js';

import isFunction from '../isFunction.js';

describe('isFunction', function() {
  it('should return `true` for functions', function() {
    assert.strictEqual(isFunction(_), true);
    assert.strictEqual(isFunction(slice), true);
  });

  it('should return `true` for async functions', function() {
    assert.strictEqual(isFunction(asyncFunc), typeof asyncFunc == 'function');
  });

  it('should return `true` for generator functions', function() {
    assert.strictEqual(isFunction(genFunc), typeof genFunc == 'function');
  });

  it('should return `true` for the `Proxy` constructor', function() {
    if (Proxy) {
      assert.strictEqual(isFunction(Proxy), true);
    }
  });

  it('should return `true` for array view constructors', function() {
    var expected = lodashStable.map(arrayViews, function(type) {
      return objToString.call(root[type]) == funcTag;
    });

    var actual = lodashStable.map(arrayViews, function(type) {
      return isFunction(root[type]);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should return `false` for non-functions', function() {
    var expected = lodashStable.map(falsey, stubFalse);

    var actual = lodashStable.map(falsey, function(value, index) {
      return index ? isFunction(value) : isFunction();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(isFunction(args), false);
    assert.strictEqual(isFunction([1, 2, 3]), false);
    assert.strictEqual(isFunction(true), false);
    assert.strictEqual(isFunction(new Date), false);
    assert.strictEqual(isFunction(new Error), false);
    assert.strictEqual(isFunction({ 'a': 1 }), false);
    assert.strictEqual(isFunction(1), false);
    assert.strictEqual(isFunction(/x/), false);
    assert.strictEqual(isFunction('a'), false);
    assert.strictEqual(isFunction(symbol), false);

    if (document) {
      assert.strictEqual(isFunction(document.getElementsByTagName('body')), false);
    }
  });

  it('should work with a function from another realm', function() {
    if (realm.function) {
      assert.strictEqual(isFunction(realm.function), true);
    }
  });
});
