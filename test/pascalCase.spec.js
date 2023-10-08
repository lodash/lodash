import lodashStable from 'lodash';
import pascalCase from '../src/pascalCase';

describe('pascalCase', () => {
    it('should work with numbers', () => {
        expect(pascalCase('12 feet')).toBe('12Feet');
        expect(pascalCase('enable 6h format')).toBe('Enable6HFormat');
        expect(pascalCase('enable 24H format')).toBe('Enable24HFormat');
        expect(pascalCase('too legit 2 quit')).toBe('TooLegit2Quit');
        expect(pascalCase('walk 500 miles')).toBe('Walk500Miles');
        expect(pascalCase('xhr2 request')).toBe('Xhr2Request');
    });

    it('should handle acronyms', () => {
        lodashStable.each(['safe HTML', 'safeHTML'], (string) => {
            expect(pascalCase(string)).toBe('SafeHtml');
        });

        lodashStable.each(['escape HTML entities', 'escapeHTMLEntities'], (string) => {
            expect(pascalCase(string)).toBe('EscapeHtmlEntities');
        });

        lodashStable.each(['XMLHttpRequest', 'XmlHTTPRequest'], (string) => {
            expect(pascalCase(string)).toBe('XmlHttpRequest');
        });
    });
});
