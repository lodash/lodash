import assert from 'assert'
import lodashStable from 'lodash'
import { burredLetters, stubArray } from './utils.js'
import words from '../words.js'

describe('words', () => {
  it('should match words containing Latin Unicode letters', () => {
    const expected = lodashStable.map(burredLetters, (letter) => [letter])

    const actual = lodashStable.map(burredLetters, (letter) => words(letter))

    assert.deepStrictEqual(actual, expected)
  })

  it('should support a `pattern`', () => {
    assert.deepStrictEqual(words('abcd', /ab|cd/g), ['ab', 'cd'])
    assert.deepStrictEqual(Array.from(words('abcd', 'ab|cd')), ['ab'])
  })

  it('should work with compound words', () => {
    assert.deepStrictEqual(words('12ft'), ['12', 'ft'])
    assert.deepStrictEqual(words('aeiouAreVowels'), ['aeiou', 'Are', 'Vowels'])
    assert.deepStrictEqual(words('enable 6h format'), ['enable', '6', 'h', 'format'])
    assert.deepStrictEqual(words('enable 24H format'), ['enable', '24', 'H', 'format'])
    assert.deepStrictEqual(words('isISO8601'), ['is', 'ISO', '8601'])
    assert.deepStrictEqual(words('LETTERSAeiouAreVowels'), ['LETTERS', 'Aeiou', 'Are', 'Vowels'])
    assert.deepStrictEqual(words('tooLegit2Quit'), ['too', 'Legit', '2', 'Quit'])
    assert.deepStrictEqual(words('walk500Miles'), ['walk', '500', 'Miles'])
    assert.deepStrictEqual(words('xhr2Request'), ['xhr', '2', 'Request'])
    assert.deepStrictEqual(words('XMLHttp'), ['XML', 'Http'])
    assert.deepStrictEqual(words('XmlHTTP'), ['Xml', 'HTTP'])
    assert.deepStrictEqual(words('XmlHttp'), ['Xml', 'Http'])
  })

  it('should work with compound words containing diacritical marks', () => {
    assert.deepStrictEqual(words('LETTERSÆiouAreVowels'), ['LETTERS', 'Æiou', 'Are', 'Vowels'])
    assert.deepStrictEqual(words('æiouAreVowels'), ['æiou', 'Are', 'Vowels'])
    assert.deepStrictEqual(words('æiou2Consonants'), ['æiou', '2', 'Consonants'])
  })

  it('should not treat contractions as separate words', () => {
    const postfixes = ['d', 'll', 'm', 're', 's', 't', 've']

    lodashStable.each(["'", '\u2019'], (apos) => {
      lodashStable.times(2, (index) => {
        const actual = lodashStable.map(postfixes, (postfix) => {
          const string = `a b${apos}${postfix} c`
          return words(string[index ? 'toUpperCase' : 'toLowerCase']())
        })

        const expected = lodashStable.map(postfixes, (postfix) => {
          const words = ['a', `b${apos}${postfix}`, 'c']
          return lodashStable.map(words, (word) => word[index ? 'toUpperCase' : 'toLowerCase']())
        })

        assert.deepStrictEqual(actual, expected)
      })
    })
  })

  it('should not treat ordinal numbers as separate words', () => {
    const ordinals = ['1st', '2nd', '3rd', '4th']

    lodashStable.times(2, (index) => {
      const expected = lodashStable.map(ordinals, (ordinal) => [ordinal[index ? 'toUpperCase' : 'toLowerCase']()])

      const actual = lodashStable.map(expected, (expectedWords) => words(expectedWords[0]))

      assert.deepStrictEqual(actual, expected)
    })
  })

  it('should not treat mathematical operators as words', () => {
    const operators = ['\xac', '\xb1', '\xd7', '\xf7'],
      expected = lodashStable.map(operators, stubArray),
      actual = lodashStable.map(operators, words)

    assert.deepStrictEqual(actual, expected)
  })

  it('should not treat punctuation as words', () => {
    const marks = [
        '\u2012', '\u2013', '\u2014', '\u2015',
        '\u2024', '\u2025', '\u2026',
        '\u205d', '\u205e'
      ],
      expected = lodashStable.map(marks, stubArray),
      actual = lodashStable.map(marks, words)

    assert.deepStrictEqual(actual, expected)
  })

  it('should prevent ReDoS', () => {
    const largeWordLen = 50000,
      maxMs = 1000,
      startTime = lodashStable.now(),
      largeWord = 'A'.repeat(largeWordLen)

    assert.deepStrictEqual(words(`${largeWord}ÆiouAreVowels`), [largeWord, 'Æiou', 'Are', 'Vowels'])

    const endTime = lodashStable.now(),
      timeSpent = endTime - startTime

    assert.ok(timeSpent < maxMs, `operation took ${timeSpent}ms`)
  })
})
