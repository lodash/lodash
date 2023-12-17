import lodashStable from 'lodash';
import camelCase from '../src/camelCase';

describe('camelCase', () => {
    it('should work with numbers', () => {
        expect(camelCase('12 feet')).toBe('12Feet');
        expect(camelCase('enable 6h format')).toBe('enable6HFormat');
        expect(camelCase('enable 24H format')).toBe('enable24HFormat');
        expect(camelCase('too legit 2 quit')).toBe('tooLegit2Quit');
        expect(camelCase('walk 500 miles')).toBe('walk500Miles');
        expect(camelCase('xhr2 request')).toBe('xhr2Request');
    });

    it('should handle acronyms', () => {
        lodashStable.each(['safe HTML', 'safeHTML'], (string) => {
            expect(camelCase(string)).toBe('safeHtml');
        });

        lodashStable.each(['escape HTML entities', 'escapeHTMLEntities'], (string) => {
            expect(camelCase(string)).toBe('escapeHtmlEntities');
        });

        lodashStable.each(['XMLHttpRequest', 'XmlHTTPRequest'], (string) => {
            expect(camelCase(string)).toBe('xmlHttpRequest');
        });

        lodashStable.each(['IDs'], (string) => {
            expect(camelCase(string)).toBe('ids');
        });
        
        lodashStable.each(['Product XMLs'], (string) => {
            expect(camelCase(string)).toBe('productXmls');
        });
    });
});
