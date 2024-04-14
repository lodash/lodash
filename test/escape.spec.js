import lodashStable from 'lodash';
import escape from '../src/escape';
import unescape from '../src/unescape';

describe('escape', () => {
    let escaped = '&amp;&lt;&gt;&quot;&#39;/';
    let unescaped = '&<>"\'/';

    escaped += escaped;
    unescaped += unescaped;

    it('should escape values', () => {
        expect(escape(unescaped)).toBe(escaped);
    });

    it('should handle strings with nothing to escape', () => {
        expect(escape('abc')).toBe('abc');
    });

    it('should escape the same characters unescaped by `_.unescape`', () => {
        expect(escape(unescape(escaped))).toBe(escaped);
    });

    lodashStable.each(['`', '/'], (chr) => {
        it(`should not escape the "${chr}" character`, () => {
            expect(escape(chr)).toBe(chr);
        });
    });
});
