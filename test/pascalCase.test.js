import assert from 'assert';
import lodashStable from 'lodash';
import pascalCase from '../pascalCase.js';

describe('pascalCase', function() {
  it('should pascalCase simple strings', function() {
    assert.strictEqual(pascalCase('--Foo-Bar--'), 'FooBar');
    assert.strictEqual(pascalCase('  Foo  bar  '), 'FooBar');
    assert.strictEqual(pascalCase('fooBar'), 'FooBar');
    assert.strictEqual(pascalCase('__FOO_BAR__'), 'FooBar');
  });
  
  it('should work with numbers', function() {
    assert.strictEqual(pascalCase('42 is the answer'), '42IsTheAnswer');
    assert.strictEqual(pascalCase('too cool 2 be real'), 'TooCool2BeReal');
    assert.strictEqual(pascalCase('open 24 hours'), 'Open24Hours');
    assert.strictEqual(pascalCase('bruh 4 real seven 8 nine'), 'Bruh4RealSeven8Nine');
    assert.strictEqual(pascalCase('w8 4 me m8'), 'W84MeM8');
    assert.strictEqual(pascalCase('ipv6 copied to clipboard'), 'Ipv6CopiedToClipboard');
  });

  it('should handle acronyms', function() {
    lodashStable.each(['safe HTML', 'SafeHTML'], function(string) {
      assert.strictEqual(pascalCase(string), 'SafeHtml');
    });

    lodashStable.each(['escape HTML entities', 'EscapeHTMLEntities'], function(string) {
      assert.strictEqual(pascalCase(string), 'EscapeHtmlEntities');
    });

    lodashStable.each(['XMLHttpRequest', 'XmlHTTPRequest'], function(string) {
      assert.strictEqual(pascalCase(string), 'XmlHttpRequest');
    });
  });
});
