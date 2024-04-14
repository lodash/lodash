import lodashStable from 'lodash';
import { _, whitespace } from './utils';

describe('trim methods', () => {
    lodashStable.each(['trim', 'trimStart', 'trimEnd'], (methodName, index) => {
        const func = _[methodName];
        let parts = [];

        if (index !== 2) {
            parts.push('leading');
        }
        if (index !== 1) {
            parts.push('trailing');
        }
        parts = parts.join(' and ');

        it(`\`_.${methodName}\` should remove ${parts} whitespace`, () => {
            const string = `${whitespace}a b c${whitespace}`;
            const expected = `${index === 2 ? whitespace : ''}a b c${
                index === 1 ? whitespace : ''
            }`;

            expect(func(string)).toBe(expected);
        });

        it(`\`_.${methodName}\` should coerce \`string\` to a string`, () => {
            const object = { toString: lodashStable.constant(`${whitespace}a b c${whitespace}`) };
            const expected = `${index === 2 ? whitespace : ''}a b c${
                index === 1 ? whitespace : ''
            }`;

            expect(func(object)).toBe(expected);
        });

        it(`\`_.${methodName}\` should remove ${parts} \`chars\``, () => {
            const string = '-_-a-b-c-_-';
            const expected = `${index === 2 ? '-_-' : ''}a-b-c${index === 1 ? '-_-' : ''}`;

            expect(func(string, '_-')).toBe(expected);
        });

        it(`\`_.${methodName}\` should coerce \`chars\` to a string`, () => {
            const object = { toString: lodashStable.constant('_-') };
            const string = '-_-a-b-c-_-';
            const expected = `${index === 2 ? '-_-' : ''}a-b-c${index === 1 ? '-_-' : ''}`;

            expect(func(string, object)).toBe(expected);
        });

        it(`\`_.${methodName}\` should return an empty string for empty values and \`chars\``, () => {
            lodashStable.each([null, '_-'], (chars) => {
                expect(func(null, chars)).toBe('');
                expect(func(undefined, chars)).toBe('');
                expect(func('', chars)).toBe('');
            });
        });

        it(`\`_.${methodName}\` should work with \`undefined\` or empty string values for \`chars\``, () => {
            const string = `${whitespace}a b c${whitespace}`;
            const expected = `${index === 2 ? whitespace : ''}a b c${
                index === 1 ? whitespace : ''
            }`;

            expect(func(string, undefined)).toBe(expected);
            expect(func(string, '')).toBe(string);
        });

        it(`\`_.${methodName}\` should work as an iteratee for methods like \`_.map\``, () => {
            const string = Object(`${whitespace}a b c${whitespace}`);
            const trimmed = `${index === 2 ? whitespace : ''}a b c${index === 1 ? whitespace : ''}`;
            const actual = lodashStable.map([string, string, string], func);

            expect(actual).toEqual([trimmed, trimmed, trimmed]);
        });

        it(`\`_.${methodName}\` should return an unwrapped value when implicitly chaining`, () => {
            const string = `${whitespace}a b c${whitespace}`;
            const expected = `${index === 2 ? whitespace : ''}a b c${
                index === 1 ? whitespace : ''
            }`;

            expect(_(string)[methodName]()).toBe(expected);
        });

        it(`\`_.${methodName}\` should return a wrapped value when explicitly chaining`, () => {
            const string = `${whitespace}a b c${whitespace}`;
            expect(_(string).chain()[methodName]() instanceof _).toBeTruthy();
        });
    });
});
