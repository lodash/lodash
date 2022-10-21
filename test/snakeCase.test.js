import assert from 'assert';
import lodashStable from 'lodash';
import snakeCase from '../snakeCase';

describe('snakeCase', function() {
  it('should convert given examples to snake_case', function() {
    assert.strictEqual(snakeCase('Foo Bar'), 'foo_bar');
    assert.strictEqual(snakeCase('fooBar'), 'foo_bar');
    assert.strictEqual(snakeCase('--FOO-BAR--'), 'foo_bar');
    assert.strictEqual(snakeCase('foo2bar'), 'foo_2_bar');
  });

  it('should work with numbers', function() {
    assert.strictEqual(snakeCase('12 feet'), '12_feet');
    assert.strictEqual(snakeCase('enable 6h format'), 'enable_6_h_format');
    assert.strictEqual(snakeCase('enable 24H format'), 'enable_24_h_format');
    assert.strictEqual(snakeCase('too legit 2 quit'), 'too_legit_2_quit');
    assert.strictEqual(snakeCase('walk 500 miles'), 'walk_500_miles');
    assert.strictEqual(snakeCase('xhr2 request'), 'xhr_2_request');
  });

  it('should handle acronyms', function() {
    lodashStable.each(['safe HTML', 'safeHTML'], function(string) {
      assert.strictEqual(snakeCase(string), 'safe_html');
    });

    lodashStable.each(['escape HTML entities', 'escapeHTMLEntities'], function(string) {
      assert.strictEqual(snakeCase(string), 'escape_html_entities');
    });

    lodashStable.each(['XMLHttpRequest', 'XmlHTTPRequest'], function(string) {
      assert.strictEqual(snakeCase(string), 'xml_http_request');
    });
  });
  
  it('should handle locale information correctly', function() {
    assert.strictEqual(snakeCase('DINÇ MUHTEŞEM İYI'), 'dinç_muhteşem_i̇yi'); // Without specifying the locale, this is the correct behaviour
    assert.strictEqual(snakeCase('DINÇ MUHTEŞEM İYI', 'tr-TR'), 'dınç_muhteşem_iyı');
    assert.strictEqual(snakeCase('DINÇ MUHTEŞEM İYI', ['tr-TR']), 'dınç_muhteşem_iyı');
  });
});
