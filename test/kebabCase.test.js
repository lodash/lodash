
import assert from 'assert';
import kebabCase from "../kebabCase";

describe('kebabCase', function () {
  it('should support a `pattern`', function() {
    assert.deepStrictEqual(kebabCase('FOOBARv1.0',/([A-Z]+)(v)(\d).(\d)/), 'foobar-v-1-0');
    assert.deepStrictEqual(kebabCase('TestURLs',/([A-Z][a-z]+)(\w+)/), 'test-urls');
    assert.deepStrictEqual(kebabCase('HTML5 ShouldReturn only html5 in uppercase and v1.0 and nothing else',/(HTML5).*(v)(\d).(\d)/), 'html5-v-1-0');
  });

  it('should work with compound kebabCase', function() {
    assert.deepStrictEqual(kebabCase('12ft'), '12-ft');
    assert.deepStrictEqual(kebabCase('aeiouAreVowels'), 'aeiou-are-vowels');
    assert.deepStrictEqual(kebabCase('enable 6h format'), 'enable-6-h-format');
    assert.deepStrictEqual(kebabCase('enable 24H format'), 'enable-24-h-format');
    assert.deepStrictEqual(kebabCase('isISO8601'), 'is-iso-8601');
    assert.deepStrictEqual(kebabCase('LETTERSAeiouAreVowels'), 'letters-aeiou-are-vowels');
    assert.deepStrictEqual(kebabCase('tooLegit2Quit'), 'too-legit-2-quit');
    assert.deepStrictEqual(kebabCase('walk500Miles'), 'walk-500-miles');
    assert.deepStrictEqual(kebabCase('xhr2Request'), 'xhr-2-request');
    assert.deepStrictEqual(kebabCase('XMLHttp'), 'xml-http');
    assert.deepStrictEqual(kebabCase('XmlHTTP'), 'xml-http');
    assert.deepStrictEqual(kebabCase('XmlHttp'), 'xml-http');
    assert.deepStrictEqual(kebabCase("- (this),is.a+test-that*must:work;or&else#it%fails big/*/time 123--xyz----Möbius _"),'this-is-a-test-that-must-work-or-else-it-fails-big-time-123-xyz-möbius');
  });

  it('should work with compound kebabCase containing diacritical marks', function() {
    assert.deepStrictEqual(kebabCase('LETTERSÆiouAreVowels'), 'letters-æiou-are-vowels');
    assert.deepStrictEqual(kebabCase('æiouAreVowels'), 'æiou-are-vowels');
    assert.deepStrictEqual(kebabCase('æiou2Consonants'), 'æiou-2-consonants');
  });
});
