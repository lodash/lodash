import assert from 'assert';
import isUpperCase from '../isUpperCase.js';

describe('isUpperCase', function () {
  it('should return `true` for fully uppercase strings', function () {
    assert.strictEqual(isUpperCase('FOOBAR'), true);
    assert.strictEqual(isUpperCase('FOO-BAR'), true);
    assert.strictEqual(isUpperCase('__FOO_BAR__'), true);
  });

  it('should return `false` for fully partially uppercase strings', function () {
    assert.strictEqual(isUpperCase('foobar'), false);
    assert.strictEqual(isUpperCase('foo-bar'), false);
    assert.strictEqual(isUpperCase('__foo_bar__'), false);
    assert.strictEqual(isUpperCase('FooBar'), false);
  });
});
