
import assert from 'assert';
import snakeCase from "../snakeCase";

describe('snakeCase', function () {
  it('should support a `pattern`', function() {
    assert.deepStrictEqual(snakeCase('FOOBARv1.0',/([A-Z]+)(v)(\d).(\d)/), 'foobar_v_1_0');
    assert.deepStrictEqual(snakeCase('TestURLs',/([A-Z][a-z]+)(\w+)/), 'test_urls');
    assert.deepStrictEqual(snakeCase('HTML5 ShouldReturn only html5 in uppercase and v1.0 and nothing else',/(HTML5).*(v)(\d).(\d)/), 'html5_v_1_0');
  });

  it('should work with compound snakeCase', function() {
    assert.deepStrictEqual(snakeCase('12ft'), '12_ft');
    assert.deepStrictEqual(snakeCase('aeiouAreVowels'), 'aeiou_are_vowels');
    assert.deepStrictEqual(snakeCase('enable 6h format'), 'enable_6_h_format');
    assert.deepStrictEqual(snakeCase('enable 24H format'), 'enable_24_h_format');
    assert.deepStrictEqual(snakeCase('isISO8601'), 'is_iso_8601');
    assert.deepStrictEqual(snakeCase('LETTERSAeiouAreVowels'), 'letters_aeiou_are_vowels');
    assert.deepStrictEqual(snakeCase('tooLegit2Quit'), 'too_legit_2_quit');
    assert.deepStrictEqual(snakeCase('walk500Miles'), 'walk_500_miles');
    assert.deepStrictEqual(snakeCase('xhr2Request'), 'xhr_2_request');
    assert.deepStrictEqual(snakeCase('XMLHttp'), 'xml_http');
    assert.deepStrictEqual(snakeCase('XmlHTTP'), 'xml_http');
    assert.deepStrictEqual(snakeCase('XmlHttp'), 'xml_http');
    assert.deepStrictEqual(snakeCase("- (this),is.a+test-that*must:work;or&else#it%fails big/*/time 123--xyz----Möbius _"),'this_is_a_test_that_must_work_or_else_it_fails_big_time_123_xyz_möbius');
  });

  it('should work with compound snakeCase containing diacritical marks', function() {
    assert.deepStrictEqual(snakeCase('LETTERSÆiouAreVowels'), 'letters_æiou_are_vowels');
    assert.deepStrictEqual(snakeCase('æiouAreVowels'), 'æiou_are_vowels');
    assert.deepStrictEqual(snakeCase('æiou2Consonants'), 'æiou_2_consonants');
  });
});
