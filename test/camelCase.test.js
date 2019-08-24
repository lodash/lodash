import assert from 'assert';
import lodashStable from 'lodash';
import camelCase from '../camelCase.js';

describe('camelCase', function() {
  it('should work with numbers', function() {
    assert.strictEqual(camelCase('12 feet'), '12Feet');
    assert.strictEqual(camelCase('enable 6h format'), 'enable6HFormat');
    assert.strictEqual(camelCase('enable 24H format'), 'enable24HFormat');
    assert.strictEqual(camelCase('too legit 2 quit'), 'tooLegit2Quit');
    assert.strictEqual(camelCase('walk 500 miles'), 'walk500Miles');
    assert.strictEqual(camelCase('xhr2 request'), 'xhr2Request');
  });

  it('should handle acronyms', function() {
    lodashStable.each(['safe HTML', 'safeHTML'], function(string) {
      assert.strictEqual(camelCase(string), 'safeHtml');
    });

    lodashStable.each(['escape HTML entities', 'escapeHTMLEntities'], function(string) {
      assert.strictEqual(camelCase(string), 'escapeHtmlEntities');
    });

    lodashStable.each(['XMLHttpRequest', 'XmlHTTPRequest'], function(string) {
      assert.strictEqual(camelCase(string), 'xmlHttpRequest');
    });
  });
});
