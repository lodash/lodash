import assert from 'assert';
import lodashStable from 'lodash';
import { slice, errors, stubTrue, CustomError, realm } from './utils.js';
import attempt from '../attempt.js';

describe('attempt', function() {
  it('should return the result of `func`', function() {
    assert.strictEqual(attempt(lodashStable.constant('x')), 'x');
  });

  it('should provide additional arguments to `func`', function() {
    var actual = attempt(function() { return slice.call(arguments); }, 1, 2);
    assert.deepStrictEqual(actual, [1, 2]);
  });

  it('should return the caught error', function() {
    var expected = lodashStable.map(errors, stubTrue);

    var actual = lodashStable.map(errors, function(error) {
      return attempt(function() { throw error; }) === error;
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should coerce errors to error objects', function() {
    var actual = attempt(function() { throw 'x'; });
    assert.ok(lodashStable.isEqual(actual, Error('x')));
  });

  it('should preserve custom errors', function() {
    var actual = attempt(function() { throw new CustomError('x'); });
    assert.ok(actual instanceof CustomError);
  });

  it('should work with an error object from another realm', function() {
    if (realm.errors) {
      var expected = lodashStable.map(realm.errors, stubTrue);

      var actual = lodashStable.map(realm.errors, function(error) {
        return attempt(function() { throw error; }) === error;
      });

      assert.deepStrictEqual(actual, expected);
    }
  });

  it('should return an unwrapped value when implicitly chaining', function() {
    assert.strictEqual(_(lodashStable.constant('x')).attempt(), 'x');
  });

  it('should return a wrapped value when explicitly chaining', function() {
    assert.ok(_(lodashStable.constant('x')).chain().attempt() instanceof _);
  });
});
