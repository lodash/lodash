import assert from 'node:assert';
import lodashStable from 'lodash';
import escape from '../src/escape';
import unescape from '../src/unescape';

describe('escape', () => {
    let escaped = '&amp;&lt;&gt;&quot;&#39;/',
        unescaped = '&<>"\'/';

    escaped += escaped;
    unescaped += unescaped;

    it('should escape values', () => {
        assert.strictEqual(escape(unescaped), escaped);
    });

    it('should handle strings with nothing to escape', () => {
        assert.strictEqual(escape('abc'), 'abc');
    });

    it('should escape the same characters unescaped by `_.unescape`', () => {
        assert.strictEqual(escape(unescape(escaped)), escaped);
    });

    lodashStable.each(['`', '/'], (chr) => {
        it(`should not escape the "${chr}" character`, () => {
            assert.strictEqual(escape(chr), chr);
        });
    });
});
