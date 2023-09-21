import lodashStable from 'lodash';
import { burredLetters, stubArray } from './utils';
import words from '../src/words';

describe('words', () => {
    it('should match words containing Latin Unicode letters', () => {
        const expected = lodashStable.map(burredLetters, (letter) => [letter]);

        const actual = lodashStable.map(burredLetters, (letter) => words(letter));

        expect(actual).toEqual(expected);
    });

    it('should support a `pattern`', () => {
        expect(words('abcd', /ab|cd/g)).toEqual(['ab', 'cd']);
        expect(Array.from(words('abcd', 'ab|cd'))).toEqual(['ab']);
    });

    it('should work with compound words', () => {
        expect(words('12ft')).toEqual(['12', 'ft']);
        expect(words('aeiouAreVowels')).toEqual(['aeiou', 'Are', 'Vowels']);
        expect(words('enable 6h format')).toEqual(['enable', '6', 'h', 'format']);
        expect(words('enable 24H format')).toEqual(['enable', '24', 'H', 'format']);
        expect(words('isISO8601')).toEqual(['is', 'ISO', '8601']);
        expect(words('LETTERSAeiouAreVowels')).toEqual(['LETTERS', 'Aeiou', 'Are', 'Vowels']);
        expect(words('tooLegit2Quit')).toEqual(['too', 'Legit', '2', 'Quit']);
        expect(words('walk500Miles')).toEqual(['walk', '500', 'Miles']);
        expect(words('xhr2Request')).toEqual(['xhr', '2', 'Request']);
        expect(words('XMLHttp')).toEqual(['XML', 'Http']);
        expect(words('XmlHTTP')).toEqual(['Xml', 'HTTP']);
        expect(words('XmlHttp')).toEqual(['Xml', 'Http']);
    });

    it('should work with compound words containing diacritical marks', () => {
        expect(words('LETTERSÆiouAreVowels')).toEqual(['LETTERS', 'Æiou', 'Are', 'Vowels']);
        expect(words('æiouAreVowels')).toEqual(['æiou', 'Are', 'Vowels']);
        expect(words('æiou2Consonants')).toEqual(['æiou', '2', 'Consonants']);
    });

    it('should not treat contractions as separate words', () => {
        const postfixes = ['d', 'll', 'm', 're', 's', 't', 've'];

        lodashStable.each(["'", '\u2019'], (apos) => {
            lodashStable.times(2, (index) => {
                const actual = lodashStable.map(postfixes, (postfix) => {
                    const string = `a b${apos}${postfix} c`;
                    return words(string[index ? 'toUpperCase' : 'toLowerCase']());
                });

                const expected = lodashStable.map(postfixes, (postfix) => {
                    const words = ['a', `b${apos}${postfix}`, 'c'];
                    return lodashStable.map(words, (word) =>
                        word[index ? 'toUpperCase' : 'toLowerCase'](),
                    );
                });

                expect(actual).toEqual(expected);
            });
        });
    });

    it('should not treat ordinal numbers as separate words', () => {
        const ordinals = ['1st', '2nd', '3rd', '4th'];

        lodashStable.times(2, (index) => {
            const expected = lodashStable.map(ordinals, (ordinal) => [
                ordinal[index ? 'toUpperCase' : 'toLowerCase'](),
            ]);

            const actual = lodashStable.map(expected, (expectedWords) => words(expectedWords[0]));

            expect(actual).toEqual(expected);
        });
    });

    it('should not treat mathematical operators as words', () => {
        const operators = ['\xac', '\xb1', '\xd7', '\xf7'];
        const expected = lodashStable.map(operators, stubArray);
        const actual = lodashStable.map(operators, words);

        expect(actual).toEqual(expected);
    });

    it('should not treat punctuation as words', () => {
        const marks = [
            '\u2012',
            '\u2013',
            '\u2014',
            '\u2015',
            '\u2024',
            '\u2025',
            '\u2026',
            '\u205d',
            '\u205e',
        ];

        const expected = lodashStable.map(marks, stubArray);
        const actual = lodashStable.map(marks, words);

        expect(actual).toEqual(expected);
    });

    it('should prevent ReDoS', () => {
        const largeWordLen = 50000;
        const largeWord = 'A'.repeat(largeWordLen);
        const maxMs = 1000;
        const startTime = lodashStable.now();

        expect(words(`${largeWord}ÆiouAreVowels`)).toEqual([largeWord, 'Æiou', 'Are', 'Vowels']);

        const endTime = lodashStable.now();
        const timeSpent = endTime - startTime;

        expect(timeSpent).toBeLessThan(maxMs);
    });
});
