import assert from 'assert';
import lodashStable from 'lodash';
import escape from '../escape.js';
import unescape from '../unescape.js';

describe('escape', function() {
  var escaped = '&amp;&lt;&gt;&quot;&#39;/',
      unescaped = '&<>"\'/';

  escaped += escaped;
  unescaped += unescaped;

  it('should escape values', function() {
    assert.strictEqual(escape(unescaped), escaped);
  });

  it('should handle strings with nothing to escape', function() {
    assert.strictEqual(escape('abc'), 'abc');
  });

  it('should escape the same characters unescaped by `_.unescape`', function() {
    assert.strictEqual(escape(unescape(escaped)), escaped);
  });

  lodashStable.each(['`', '/'], function(chr) {
    it('should not escape the "' + chr + '" character', function() {
      assert.strictEqual(escape(chr), chr);
    });
  });
});
