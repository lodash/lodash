import lodashStable from 'lodash';
import { stubTrue, burredLetters, deburredLetters } from './utils';
import camelCase from '../src/camelCase';
import kebabCase from '../src/kebabCase';
import lowerCase from '../src/lowerCase';
import snakeCase from '../src/snakeCase';
import startCase from '../src/startCase';
import upperCase from '../src/upperCase';

const caseMethods = {
    camelCase,
    kebabCase,
    lowerCase,
    snakeCase,
    startCase,
    upperCase,
};

describe('case methods', () => {
    lodashStable.each(['camel', 'kebab', 'lower', 'snake', 'start', 'upper'], (caseName) => {
        const methodName = `${caseName}Case`;
        const func = caseMethods[methodName];

        const strings = [
            'foo bar',
            'Foo bar',
            'foo Bar',
            'Foo Bar',
            'FOO BAR',
            'fooBar',
            '--foo-bar--',
            '__foo_bar__',
        ];

        const converted = (function () {
            switch (caseName) {
                case 'camel':
                    return 'fooBar';
                case 'kebab':
                    return 'foo-bar';
                case 'lower':
                    return 'foo bar';
                case 'snake':
                    return 'foo_bar';
                case 'start':
                    return 'Foo Bar';
                case 'upper':
                    return 'FOO BAR';
            }
        })();

        it(`\`_.${methodName}\` should convert \`string\` to ${caseName} case`, () => {
            const actual = lodashStable.map(strings, (string) => {
                const expected = caseName === 'start' && string === 'FOO BAR' ? string : converted;
                return func(string) === expected;
            });

            expect(actual).toEqual(lodashStable.map(strings, stubTrue));
        });

        it(`\`_.${methodName}\` should handle double-converting strings`, () => {
            const actual = lodashStable.map(strings, (string) => {
                const expected = caseName === 'start' && string === 'FOO BAR' ? string : converted;
                return func(func(string)) === expected;
            });

            expect(actual).toEqual(lodashStable.map(strings, stubTrue));
        });

        it(`\`_.${methodName}\` should remove contraction apostrophes`, () => {
            const postfixes = ['d', 'll', 'm', 're', 's', 't', 've'];

            lodashStable.each(["'", '\u2019'], (apos) => {
                const actual = lodashStable.map(postfixes, (postfix) =>
                    func(`a b${apos}${postfix} c`),
                );

                const expected = lodashStable.map(postfixes, (postfix) => {
                    switch (caseName) {
                        case 'camel':
                            return `aB${postfix}C`;
                        case 'kebab':
                            return `a-b${postfix}-c`;
                        case 'lower':
                            return `a b${postfix} c`;
                        case 'snake':
                            return `a_b${postfix}_c`;
                        case 'start':
                            return `A B${postfix} C`;
                        case 'upper':
                            return `A B${postfix.toUpperCase()} C`;
                    }
                });

                expect(actual).toEqual(expected);
            });
        });

        it(`\`_.${methodName}\` should remove Latin mathematical operators`, () => {
            const actual = lodashStable.map(['\xd7', '\xf7'], func);
            expect(actual).toEqual(['', '']);
        });

        it(`\`_.${methodName}\` should coerce \`string\` to a string`, () => {
            const string = 'foo bar';
            expect(func(Object(string))).toBe(converted);
            expect(func({ toString: lodashStable.constant(string) })).toBe(converted);
        });
    });

    (function () {
        it('should get the original value after cycling through all case methods', () => {
            const funcs = [
                camelCase,
                kebabCase,
                lowerCase,
                snakeCase,
                startCase,
                lowerCase,
                camelCase,
            ];

            const actual = lodashStable.reduce(
                funcs,
                (result, func) => func(result),
                'enable 6h format',
            );

            expect(actual).toBe('enable6HFormat');
        });
    })();
});
