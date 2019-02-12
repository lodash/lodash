import assert from 'assert';
import lodashStable from 'lodash';
import truncate from '../truncate.js';

describe('truncate', function() {
  var string = 'hi-diddly-ho there, neighborino';

  it('should use a default `length` of `30`', function() {
    assert.strictEqual(truncate(string), 'hi-diddly-ho there, neighbo...');
  });

  it('should not truncate if `string` is <= `length`', function() {
    assert.strictEqual(truncate(string, { 'length': string.length }), string);
    assert.strictEqual(truncate(string, { 'length': string.length + 2 }), string);
  });

  it('should truncate string the given length', function() {
    assert.strictEqual(truncate(string, { 'length': 24 }), 'hi-diddly-ho there, n...');
  });

  it('should support a `omission` option', function() {
    assert.strictEqual(truncate(string, { 'omission': ' [...]' }), 'hi-diddly-ho there, neig [...]');
  });

  it('should coerce nullish `omission` values to strings', function() {
    assert.strictEqual(truncate(string, { 'omission': null }), 'hi-diddly-ho there, neighbnull');
    assert.strictEqual(truncate(string, { 'omission': undefined }), 'hi-diddly-ho there, nundefined');
  });

  it('should support a `length` option', function() {
    assert.strictEqual(truncate(string, { 'length': 4 }), 'h...');
  });

  it('should support a `separator` option', function() {
    assert.strictEqual(truncate(string, { 'length': 24, 'separator': ' ' }), 'hi-diddly-ho there,...');
    assert.strictEqual(truncate(string, { 'length': 24, 'separator': /,? +/ }), 'hi-diddly-ho there...');
    assert.strictEqual(truncate(string, { 'length': 24, 'separator': /,? +/g }), 'hi-diddly-ho there...');
  });

  it('should treat negative `length` as `0`', function() {
    lodashStable.each([0, -2], function(length) {
      assert.strictEqual(truncate(string, { 'length': length }), '...');
    });
  });

  it('should coerce `length` to an integer', function() {
    lodashStable.each(['', NaN, 4.6, '4'], function(length, index) {
      var actual = index > 1 ? 'h...' : '...';
      assert.strictEqual(truncate(string, { 'length': { 'valueOf': lodashStable.constant(length) } }), actual);
    });
  });

  it('should coerce `string` to a string', function() {
    assert.strictEqual(truncate(Object(string), { 'length': 4 }), 'h...');
    assert.strictEqual(truncate({ 'toString': lodashStable.constant(string) }, { 'length': 5 }), 'hi...');
  });

  it('should work as an iteratee for methods like `_.map`', function() {
    var actual = lodashStable.map([string, string, string], truncate),
        truncated = 'hi-diddly-ho there, neighbo...';

    assert.deepStrictEqual(actual, [truncated, truncated, truncated]);
  });
});
