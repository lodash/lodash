import lodashStable from 'lodash';
import { emojiVar, comboMarks, fitzModifiers } from './utils';
import repeat from '../src/repeat';
import camelCase from '../src/camelCase';
import capitalize from '../src/capitalize';
import pad from '../src/pad';
import padStart from '../src/padStart';
import padEnd from '../src/padEnd';
import size from '../src/size';
import split from '../src/split';
import toArray from '../src/toArray';
import trim from '../src/trim';
import trimStart from '../src/trimStart';
import trimEnd from '../src/trimEnd';
import truncate from '../src/truncate';
import words from '../src/words';

describe('uncommon symbols', () => {
    const flag = '\ud83c\uddfa\ud83c\uddf8';
    const heart = `\u2764${emojiVar}`;
    const hearts = '\ud83d\udc95';
    const comboGlyph = `\ud83d\udc68\u200d${heart}\u200d\ud83d\udc8B\u200d\ud83d\udc68`;
    const hashKeycap = `#${emojiVar}\u20e3`;
    const leafs = '\ud83c\udf42';
    const mic = '\ud83c\udf99';
    const noMic = `${mic}\u20e0`;
    const raisedHand = `\u270B${emojiVar}`;
    const rocket = '\ud83d\ude80';
    const thumbsUp = '\ud83d\udc4d';

    it('should account for astral symbols', () => {
        const allHearts = repeat(hearts, 10);
        const chars = hearts + comboGlyph;
        const string = `A ${leafs}, ${comboGlyph}, and ${rocket}`;
        const trimChars = comboGlyph + hearts;
        const trimString = trimChars + string + trimChars;

        expect(camelCase(`${hearts} the ${leafs}`)).toBe(`${hearts}The${leafs}`);
        expect(camelCase(string)).toBe(`a${leafs}${comboGlyph}And${rocket}`);
        expect(capitalize(rocket)).toBe(rocket);

        expect(pad(string, 16)).toBe(` ${string}  `);
        expect(padStart(string, 16)).toBe(`   ${string}`);
        expect(padEnd(string, 16)).toBe(`${string}   `);

        expect(pad(string, 16, chars)).toBe(hearts + string + chars);
        expect(padStart(string, 16, chars)).toBe(chars + hearts + string);
        expect(padEnd(string, 16, chars)).toBe(string + chars + hearts);

        expect(size(string)).toBe(13);
        expect(split(string, ' ')).toEqual(['A', `${leafs},`, `${comboGlyph},`, 'and', rocket]);
        expect(split(string, ' ', 3), ['A', `${leafs},`, `${comboGlyph}).toEqual(`]);
        expect(split(string, undefined)).toEqual([string]);
        expect(split(string, undefined, -1)).toEqual([string]);
        expect(split(string, undefined, 0)).toEqual([]);

        const expected = [
            'A',
            ' ',
            leafs,
            ',',
            ' ',
            comboGlyph,
            ',',
            ' ',
            'a',
            'n',
            'd',
            ' ',
            rocket,
        ];

        expect(split(string, '')).toEqual(expected);
        expect(split(string, '', 6), expected.slice(0).toEqual(6));
        expect(toArray(string)).toEqual(expected);

        expect(trim(trimString, chars)).toBe(string);
        expect(trimStart(trimString, chars)).toBe(string + trimChars);
        expect(trimEnd(trimString, chars)).toBe(trimChars + string);

        expect(truncate(string, { length: 13 })).toBe(string);
        expect(truncate(string, { length: 6 })).toBe(`A ${leafs}...`);

        expect(words(string)).toEqual(['A', leafs, comboGlyph, 'and', rocket]);
        expect(toArray(hashKeycap)).toEqual([hashKeycap]);
        expect(toArray(noMic)).toEqual([noMic]);

        lodashStable.times(2, (index) => {
            const separator = index ? RegExp(hearts) : hearts;
            const options = { length: 4, separator: separator };
            let actual = truncate(string, options);

            expect(actual).toBe('A...');
            expect(actual.length).toBe(4);

            actual = truncate(allHearts, options);
            expect(actual).toBe(`${hearts}...`);
            expect(actual.length).toBe(5);
        });
    });

    it('should account for combining diacritical marks', () => {
        const values = lodashStable.map(comboMarks, (mark) => `o${mark}`);

        const expected = lodashStable.map(values, (value) => [1, [value], [value]]);

        const actual = lodashStable.map(values, (value) => [
            size(value),
            toArray(value),
            words(value),
        ]);

        expect(actual).toEqual(expected);
    });

    it('should account for fitzpatrick modifiers', () => {
        const values = lodashStable.map(fitzModifiers, (modifier) => thumbsUp + modifier);

        const expected = lodashStable.map(values, (value) => [1, [value], [value]]);

        const actual = lodashStable.map(values, (value) => [
            size(value),
            toArray(value),
            words(value),
        ]);

        expect(actual).toEqual(expected);
    });

    it('should account for regional symbols', () => {
        const pair = flag.match(/\ud83c[\udde6-\uddff]/g);
        const regionals = pair.join(' ');

        expect(size(flag)).toBe(1);
        expect(size(regionals)).toBe(3);

        expect(toArray(flag)).toEqual([flag]);
        expect(toArray(regionals)).toEqual([pair[0], ' ', pair[1]]);

        expect(words(flag)).toEqual([flag]);
        expect(words(regionals)).toEqual([pair[0], pair[1]]);
    });

    it('should account for variation selectors', () => {
        expect(size(heart)).toBe(1);
        expect(toArray(heart)).toEqual([heart]);
        expect(words(heart)).toEqual([heart]);
    });

    it('should account for variation selectors with fitzpatrick modifiers', () => {
        const values = lodashStable.map(fitzModifiers, (modifier) => raisedHand + modifier);

        const expected = lodashStable.map(values, (value) => [1, [value], [value]]);

        const actual = lodashStable.map(values, (value) => [
            size(value),
            toArray(value),
            words(value),
        ]);

        expect(actual).toEqual(expected);
    });

    it('should match lone surrogates', () => {
        const pair = hearts.split('');
        const surrogates = `${pair[0]} ${pair[1]}`;

        expect(size(surrogates)).toBe(3);
        expect(toArray(surrogates)).toEqual([pair[0], ' ', pair[1]]);
        expect(words(surrogates)).toEqual([]);
    });

    it('should match side by side fitzpatrick modifiers separately ', () => {
        const string = fitzModifiers[0] + fitzModifiers[0];
        expect(toArray(string)).toEqual([fitzModifiers[0], fitzModifiers[0]]);
    });
});
