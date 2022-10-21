import assert from 'assert';
import lodashStable from 'lodash';
import kebabCase from '../kebabCase.js';

describe('kebabCase', function() {
  it('should work with numbers', function() {
    assert.strictEqual(kebabCase('12 feet'), '12-feet');
    assert.strictEqual(kebabCase('enable 6h format'), 'enable-6-h-format');
    assert.strictEqual(kebabCase('enable 24H format'), 'enable-24-h-format');
    assert.strictEqual(kebabCase('too legit 2 quit'), 'too-legit-2-quit');
    assert.strictEqual(kebabCase('walk 500 miles'), 'walk-500-miles');
    assert.strictEqual(kebabCase('xhr2 request'), 'xhr-2-request');
  });

  it('should handle acronyms', function() {
    lodashStable.each(['safe HTML', 'safeHTML'], function(string) {
      assert.strictEqual(kebabCase(string), 'safe-html');
    });

    lodashStable.each(['escape HTML entities', 'escapeHTMLEntities'], function(string) {
      assert.strictEqual(kebabCase(string), 'escape-html-entities');
    });

    lodashStable.each(['XMLHttpRequest', 'XmlHTTPRequest'], function(string) {
      assert.strictEqual(kebabCase(string), 'xml-http-request');
    });
  });
  it('should handle locale information correctly', function() {
    assert.strictEqual(kebabCase('dinç muhteşem İyi'), 'dinç-muhteşem-i̇yi');
    assert.strictEqual(kebabCase('dinç muhteşem İyi', 'tr-TR'), 'dinç-muhteşem-iyi');
    assert.strictEqual(kebabCase('dinç muhteşem İyi', ['tr-TR']), 'dinç-muhteşem-iyi');
  });
});
