import assert from 'assert';
import isLowerCase from '../isLowerCase';

describe('isLowerCase', function () {
  it('should return `true` for fully lowercase strings', function () {
    assert.strictEqual(isLowerCase('foobar'), true);
    assert.strictEqual(isLowerCase('foo-bar'), true);
    assert.strictEqual(isLowerCase('__foo_bar__'), true);
  });

  it('should return `false` for fully or partially uppercase strings', function () {
    assert.strictEqual(isLowerCase('FOOBAR'), false);
    assert.strictEqual(isLowerCase('FOO-BAR'), false);
    assert.strictEqual(isLowerCase('__FOO_BAR__'), false);
    assert.strictEqual(isLowerCase('FooBar'), false);
  });
});