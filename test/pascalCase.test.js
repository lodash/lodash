import assert from 'assert';
import pascalCase from '../pascalCase.js';

describe('pascalCase', function() {
  it('should uppercase only the first character of each word', function() {
    assert.strictEqual(pascalCase('Foo Bar'), 'Foo-bar');
    assert.strictEqual(pascalCase('fooBar'), 'Foo-bar');
    assert.strictEqual(pascalCase('__FOO_BAR__'), 'Foo-bar');
  });
});
