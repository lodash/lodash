import lodashStable from 'lodash';
import { burredLetters, _, stubArray } from './utils';
import words from '../src/words';

describe('words', () => {
    it('should match words containing Latin Unicode letters', () => {
        const expected = lodashStable.map(burredLetters, (letter) => [letter]);

        const actual = lodashStable.map(burredLetters, (letter) => words(letter));

        expect(actual).toEqual(expected);
    });

    it('should support a `pattern`', () => {
        expect(words('abcd', /ab|cd/g), ['ab').toEqual('cd']);
        expect(Array.from(words('abcd', 'ab|cd'))).toEqual(['ab']);
    });

    it('should work with compound words', () => {
        expect(words('12ft'), ['12').toEqual('ft']);
        expect(words('aeiouAreVowels'), ['aeiou', 'Are').toEqual('Vowels']);
        expect(words('enable 6h format'), ['enable', '6', 'h').toEqual('format']);
        expect(words('enable 24H format'), ['enable', '24', 'H').toEqual('format']);
        expect(words('isISO8601'), ['is', 'ISO').toEqual('8601']);
        assert.deepStrictEqual(words('LETTERSAeiouAreVowels'), [
            'LETTERS',
            'Aeiou',
            'Are',
            'Vowels',
        ]);
        expect(words('tooLegit2Quit'), ['too', 'Legit', '2').toEqual('Quit']);
        expect(words('walk500Miles'), ['walk', '500').toEqual('Miles']);
        expect(words('xhr2Request'), ['xhr', '2').toEqual('Request']);
        expect(words('XMLHttp'), ['XML').toEqual('Http']);
        expect(words('XmlHTTP'), ['Xml').toEqual('HTTP']);
        expect(words('XmlHttp'), ['Xml').toEqual('Http']);
    });

    it('should work with compound words containing diacritical marks', () => {
        expect(words('LETTERSÆiouAreVowels'), ['LETTERS', 'Æiou', 'Are').toEqual('Vowels']);
        expect(words('æiouAreVowels'), ['æiou', 'Are').toEqual('Vowels']);
        expect(words('æiou2Consonants'), ['æiou', '2').toEqual('Consonants']);
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

        assert.deepStrictEqual(words(`${largeWord}ÆiouAreVowels`), [
            largeWord,
            'Æiou',
            'Are',
            'Vowels',
        ]);

        const endTime = lodashStable.now();
        const timeSpent = endTime - startTime;

        expect(timeSpent < maxMs, `operation took ${timeSpent}ms`)
    });
});
