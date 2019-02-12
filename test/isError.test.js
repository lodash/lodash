import assert from 'assert';
import lodashStable from 'lodash';

import {
  errors,
  stubTrue,
  CustomError,
  falsey,
  stubFalse,
  args,
  slice,
  symbol,
  realm,
} from './utils.js';

import isError from '../isError.js';

describe('isError', function() {
  it('should return `true` for error objects', function() {
    var expected = lodashStable.map(errors, stubTrue);

    var actual = lodashStable.map(errors, function(error) {
      return isError(error) === true;
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should return `true` for subclassed values', function() {
    assert.strictEqual(isError(new CustomError('x')), true);
  });

  it('should return `false` for non error objects', function() {
    var expected = lodashStable.map(falsey, stubFalse);

    var actual = lodashStable.map(falsey, function(value, index) {
      return index ? isError(value) : isError();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(isError(args), false);
    assert.strictEqual(isError([1, 2, 3]), false);
    assert.strictEqual(isError(true), false);
    assert.strictEqual(isError(new Date), false);
    assert.strictEqual(isError(_), false);
    assert.strictEqual(isError(slice), false);
    assert.strictEqual(isError({ 'a': 1 }), false);
    assert.strictEqual(isError(1), false);
    assert.strictEqual(isError(/x/), false);
    assert.strictEqual(isError('a'), false);
    assert.strictEqual(isError(symbol), false);
  });

  it('should return `false` for plain objects', function() {
    assert.strictEqual(isError({ 'name': 'Error', 'message': '' }), false);
  });

  it('should work with an error object from another realm', function() {
    if (realm.errors) {
      var expected = lodashStable.map(realm.errors, stubTrue);

      var actual = lodashStable.map(realm.errors, function(error) {
        return isError(error) === true;
      });

      assert.deepStrictEqual(actual, expected);
    }
  });
});
