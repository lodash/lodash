import assert from 'assert';
import lodashStable from 'lodash';
import { burredLetters, _, stubArray } from './utils.js';

describe('words', function() {
  it('should match words containing Latin Unicode letters', function() {
    var expected = lodashStable.map(burredLetters, function(letter) {
      return [letter];
    });

    var actual = lodashStable.map(burredLetters, function(letter) {
      return _.words(letter);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should support a `pattern`', function() {
    assert.deepStrictEqual(_.words('abcd', /ab|cd/g), ['ab', 'cd']);
    assert.deepStrictEqual(_.words('abcd', 'ab|cd'), ['ab']);
  });

  it('should work with compound words', function() {
    assert.deepStrictEqual(_.words('12ft'), ['12', 'ft']);
    assert.deepStrictEqual(_.words('aeiouAreVowels'), ['aeiou', 'Are', 'Vowels']);
    assert.deepStrictEqual(_.words('enable 6h format'), ['enable', '6', 'h', 'format']);
    assert.deepStrictEqual(_.words('enable 24H format'), ['enable', '24', 'H', 'format']);
    assert.deepStrictEqual(_.words('isISO8601'), ['is', 'ISO', '8601']);
    assert.deepStrictEqual(_.words('LETTERSAeiouAreVowels'), ['LETTERS', 'Aeiou', 'Are', 'Vowels']);
    assert.deepStrictEqual(_.words('tooLegit2Quit'), ['too', 'Legit', '2', 'Quit']);
    assert.deepStrictEqual(_.words('walk500Miles'), ['walk', '500', 'Miles']);
    assert.deepStrictEqual(_.words('xhr2Request'), ['xhr', '2', 'Request']);
    assert.deepStrictEqual(_.words('XMLHttp'), ['XML', 'Http']);
    assert.deepStrictEqual(_.words('XmlHTTP'), ['Xml', 'HTTP']);
    assert.deepStrictEqual(_.words('XmlHttp'), ['Xml', 'Http']);
  });

  it('should work with compound words containing diacritical marks', function() {
    assert.deepStrictEqual(_.words('LETTERSÆiouAreVowels'), ['LETTERS', 'Æiou', 'Are', 'Vowels']);
    assert.deepStrictEqual(_.words('æiouAreVowels'), ['æiou', 'Are', 'Vowels']);
    assert.deepStrictEqual(_.words('æiou2Consonants'), ['æiou', '2', 'Consonants']);
  });

  it('should not treat contractions as separate words', function() {
    var postfixes = ['d', 'll', 'm', 're', 's', 't', 've'];

    lodashStable.each(["'", '\u2019'], function(apos) {
      lodashStable.times(2, function(index) {
        var actual = lodashStable.map(postfixes, function(postfix) {
          var string = 'a b' + apos + postfix +  ' c';
          return _.words(string[index ? 'toUpperCase' : 'toLowerCase']());
        });

        var expected = lodashStable.map(postfixes, function(postfix) {
          var words = ['a', 'b' + apos + postfix, 'c'];
          return lodashStable.map(words, function(word) {
            return word[index ? 'toUpperCase' : 'toLowerCase']();
          });
        });

        assert.deepStrictEqual(actual, expected);
      });
    });
  });

  it('should not treat ordinal numbers as separate words', function() {
    var ordinals = ['1st', '2nd', '3rd', '4th'];

    lodashStable.times(2, function(index) {
      var expected = lodashStable.map(ordinals, function(ordinal) {
        return [ordinal[index ? 'toUpperCase' : 'toLowerCase']()];
      });

      var actual = lodashStable.map(expected, function(words) {
        return _.words(words[0]);
      });

      assert.deepStrictEqual(actual, expected);
    });
  });

  it('should not treat mathematical operators as words', function() {
    var operators = ['\xac', '\xb1', '\xd7', '\xf7'],
        expected = lodashStable.map(operators, stubArray),
        actual = lodashStable.map(operators, _.words);

    assert.deepStrictEqual(actual, expected);
  });

  it('should not treat punctuation as words', function() {
    var marks = [
      '\u2012', '\u2013', '\u2014', '\u2015',
      '\u2024', '\u2025', '\u2026',
      '\u205d', '\u205e'
    ];

    var expected = lodashStable.map(marks, stubArray),
        actual = lodashStable.map(marks, _.words);

    assert.deepStrictEqual(actual, expected);
  });

  it('should work as an iteratee for methods like `_.map`', function() {
    var strings = lodashStable.map(['a', 'b', 'c'], Object),
        actual = lodashStable.map(strings, _.words);

    assert.deepStrictEqual(actual, [['a'], ['b'], ['c']]);
  });

  it('should prevent ReDoS', function() {
    var largeWordLen = 50000,
        largeWord = 'A'.repeat(largeWordLen),
        maxMs = 1000,
        startTime = lodashStable.now();

    assert.deepStrictEqual(_.words(largeWord + 'ÆiouAreVowels'), [largeWord, 'Æiou', 'Are', 'Vowels']);

    var endTime = lodashStable.now(),
        timeSpent = endTime - startTime;

    assert.ok(timeSpent < maxMs, 'operation took ' + timeSpent + 'ms');
  });
});
