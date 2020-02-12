import assert from 'assert';
import lodashStable from 'lodash';
import unescape from '../unescape.js';
import escape from '../escape.js';

describe('unescape', function() {
  var escaped = '&amp;&lt;&gt;&quot;&#39;/',
      unescaped = '&<>"\'/';

  escaped += escaped;
  unescaped += unescaped;

  it('should unescape entities in order', function() {
    assert.strictEqual(unescape('&amp;lt;'), '&lt;');
  });

  it('should unescape the proper entities', function() {
    assert.strictEqual(unescape(escaped), unescaped);
  });

  it('should handle strings with nothing to unescape', function() {
    assert.strictEqual(unescape('abc'), 'abc');
  });

  it('should unescape the same characters escaped by `_.escape`', function() {
    assert.strictEqual(unescape(escape(unescaped)), unescaped);
  });

  it('should handle leading zeros in html entities', function() {
    assert.strictEqual(unescape('&#39;'), "'");
    assert.strictEqual(unescape('&#039;'), "'");
    assert.strictEqual(unescape('&#000039;'), "'");
  });

  lodashStable.each(['&#96;', '&#x2F;'], function(entity) {
    it('should not unescape the "' + entity + '" entity', function() {
      assert.strictEqual(unescape(entity), entity);
    });
  });
});
