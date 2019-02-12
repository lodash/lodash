import assert from 'assert';
import lodashStable from 'lodash';
import { emojiVar, comboMarks, fitzModifiers } from './utils.js';
import repeat from '../repeat.js';
import camelCase from '../camelCase.js';
import capitalize from '../capitalize.js';
import pad from '../pad.js';
import padStart from '../padStart.js';
import padEnd from '../padEnd.js';
import size from '../size.js';
import split from '../split.js';
import toArray from '../toArray.js';
import trim from '../trim.js';
import trimStart from '../trimStart.js';
import trimEnd from '../trimEnd.js';
import truncate from '../truncate.js';
import words from '../words.js';

describe('uncommon symbols', function() {
  var flag = '\ud83c\uddfa\ud83c\uddf8',
      heart = '\u2764' + emojiVar,
      hearts = '\ud83d\udc95',
      comboGlyph = '\ud83d\udc68\u200d' + heart + '\u200d\ud83d\udc8B\u200d\ud83d\udc68',
      hashKeycap = '#' + emojiVar + '\u20e3',
      leafs = '\ud83c\udf42',
      mic = '\ud83c\udf99',
      noMic = mic + '\u20e0',
      raisedHand = '\u270B' + emojiVar,
      rocket = '\ud83d\ude80',
      thumbsUp = '\ud83d\udc4d';

  it('should account for astral symbols', function() {
    var allHearts = repeat(hearts, 10),
        chars = hearts + comboGlyph,
        string = 'A ' + leafs + ', ' + comboGlyph + ', and ' + rocket,
        trimChars = comboGlyph + hearts,
        trimString = trimChars + string + trimChars;

    assert.strictEqual(camelCase(hearts + ' the ' + leafs), hearts + 'The' + leafs);
    assert.strictEqual(camelCase(string), 'a' + leafs + comboGlyph + 'And' + rocket);
    assert.strictEqual(capitalize(rocket), rocket);

    assert.strictEqual(pad(string, 16), ' ' + string + '  ');
    assert.strictEqual(padStart(string, 16), '   ' + string);
    assert.strictEqual(padEnd(string, 16), string + '   ');

    assert.strictEqual(pad(string, 16, chars), hearts + string + chars);
    assert.strictEqual(padStart(string, 16, chars), chars + hearts + string);
    assert.strictEqual(padEnd(string, 16, chars), string + chars + hearts);

    assert.strictEqual(size(string), 13);
    assert.deepStrictEqual(split(string, ' '), ['A', leafs + ',', comboGlyph + ',', 'and', rocket]);
    assert.deepStrictEqual(split(string, ' ', 3), ['A', leafs + ',', comboGlyph + ',']);
    assert.deepStrictEqual(split(string, undefined), [string]);
    assert.deepStrictEqual(split(string, undefined, -1), [string]);
    assert.deepStrictEqual(split(string, undefined, 0), []);

    var expected = ['A', ' ', leafs, ',', ' ', comboGlyph, ',', ' ', 'a', 'n', 'd', ' ', rocket];

    assert.deepStrictEqual(split(string, ''), expected);
    assert.deepStrictEqual(split(string, '', 6), expected.slice(0, 6));
    assert.deepStrictEqual(toArray(string), expected);

    assert.strictEqual(trim(trimString, chars), string);
    assert.strictEqual(trimStart(trimString, chars), string + trimChars);
    assert.strictEqual(trimEnd(trimString, chars), trimChars + string);

    assert.strictEqual(truncate(string, { 'length': 13 }), string);
    assert.strictEqual(truncate(string, { 'length': 6 }), 'A ' + leafs + '...');

    assert.deepStrictEqual(words(string), ['A', leafs, comboGlyph, 'and', rocket]);
    assert.deepStrictEqual(toArray(hashKeycap), [hashKeycap]);
    assert.deepStrictEqual(toArray(noMic), [noMic]);

    lodashStable.times(2, function(index) {
      var separator = index ? RegExp(hearts) : hearts,
          options = { 'length': 4, 'separator': separator },
          actual = truncate(string, options);

      assert.strictEqual(actual, 'A...');
      assert.strictEqual(actual.length, 4);

      actual = truncate(allHearts, options);
      assert.strictEqual(actual, hearts + '...');
      assert.strictEqual(actual.length, 5);
    });
  });

  it('should account for combining diacritical marks', function() {
    var values = lodashStable.map(comboMarks, function(mark) {
      return 'o' + mark;
    });

    var expected = lodashStable.map(values, function(value) {
      return [1, [value], [value]];
    });

    var actual = lodashStable.map(values, function(value) {
      return [size(value), toArray(value), words(value)];
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should account for fitzpatrick modifiers', function() {
    var values = lodashStable.map(fitzModifiers, function(modifier) {
      return thumbsUp + modifier;
    });

    var expected = lodashStable.map(values, function(value) {
      return [1, [value], [value]];
    });

    var actual = lodashStable.map(values, function(value) {
      return [size(value), toArray(value), words(value)];
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should account for regional symbols', function() {
    var pair = flag.match(/\ud83c[\udde6-\uddff]/g),
        regionals = pair.join(' ');

    assert.strictEqual(size(flag), 1);
    assert.strictEqual(size(regionals), 3);

    assert.deepStrictEqual(toArray(flag), [flag]);
    assert.deepStrictEqual(toArray(regionals), [pair[0], ' ', pair[1]]);

    assert.deepStrictEqual(words(flag), [flag]);
    assert.deepStrictEqual(words(regionals), [pair[0], pair[1]]);
  });

  it('should account for variation selectors', function() {
    assert.strictEqual(size(heart), 1);
    assert.deepStrictEqual(toArray(heart), [heart]);
    assert.deepStrictEqual(words(heart), [heart]);
  });

  it('should account for variation selectors with fitzpatrick modifiers', function() {
    var values = lodashStable.map(fitzModifiers, function(modifier) {
      return raisedHand + modifier;
    });

    var expected = lodashStable.map(values, function(value) {
      return [1, [value], [value]];
    });

    var actual = lodashStable.map(values, function(value) {
      return [size(value), toArray(value), words(value)];
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should match lone surrogates', function() {
    var pair = hearts.split(''),
        surrogates = pair[0] + ' ' + pair[1];

    assert.strictEqual(size(surrogates), 3);
    assert.deepStrictEqual(toArray(surrogates), [pair[0], ' ', pair[1]]);
    assert.deepStrictEqual(words(surrogates), []);
  });

  it('should match side by side fitzpatrick modifiers separately ', function() {
    var string = fitzModifiers[0] + fitzModifiers[0];
    assert.deepStrictEqual(toArray(string), [fitzModifiers[0], fitzModifiers[0]]);
  });
});
