import lodashStable from 'lodash';
import unescape from '../src/unescape';
import escape from '../src/escape';

describe('unescape', () => {
    let escaped = '&amp;&lt;&gt;&quot;&#39;/';
    let unescaped = '&<>"\'/';

    escaped += escaped;
    unescaped += unescaped;

    it('should unescape entities in order', () => {
        expect(unescape('&amp;lt;')).toBe('&lt;');
    });

    it('should unescape the proper entities', () => {
        expect(unescape(escaped)).toBe(unescaped);
    });

    it('should handle strings with nothing to unescape', () => {
        expect(unescape('abc')).toBe('abc');
    });

    it('should unescape the same characters escaped by `_.escape`', () => {
        expect(unescape(escape(unescaped))).toBe(unescaped);
    });

    it('should handle leading zeros in html entities', () => {
        expect(unescape('&#39;')).toBe("'");
        expect(unescape('&#039;')).toBe("'");
        expect(unescape('&#000039;')).toBe("'");
    });

    lodashStable.each(['&#96;', '&#x2F;'], (entity) => {
        it(`should not unescape the "${entity}" entity`, () => {
            expect(unescape(entity)).toBe(entity);
        });
    });
});
