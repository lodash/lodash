import lodashStable from 'lodash';
import { stubString } from './utils';

import camelCase from '../src/camelCase';
import capitalize from '../src/capitalize';
import escape from '../src/escape';
import kebabCase from '../src/kebabCase';
import lowerCase from '../src/lowerCase';
import lowerFirst from '../src/lowerFirst';
import pad from '../src/pad';
import padEnd from '../src/padEnd';
import padStart from '../src/padStart';
import repeat from '../src/repeat';
import snakeCase from '../src/snakeCase';
import trim from '../src/trim';
import trimStart from '../src/trimStart';
import trimEnd from '../src/trimEnd';
import truncate from '../src/truncate';
import unescape from '../src/unescape';
import upperCase from '../src/upperCase';
import upperFirst from '../src/upperFirst';

const methods = {
    camelCase,
    capitalize,
    escape,
    kebabCase,
    lowerCase,
    lowerFirst,
    pad,
    padEnd,
    padStart,
    repeat,
    snakeCase,
    trim,
    trimStart,
    trimEnd,
    truncate,
    unescape,
    upperCase,
    upperFirst,
};

describe('"Strings" category methods', () => {
    const stringMethods = [
        'camelCase',
        'capitalize',
        'escape',
        'kebabCase',
        'lowerCase',
        'lowerFirst',
        'pad',
        'padEnd',
        'padStart',
        'repeat',
        'snakeCase',
        'trim',
        'trimEnd',
        'trimStart',
        'truncate',
        'unescape',
        'upperCase',
        'upperFirst',
    ];

    lodashStable.each(stringMethods, (methodName) => {
        const func = methods[methodName];

        it(`\`_.${methodName}\` should return an empty string for empty values`, () => {
            const values = [, null, undefined, ''];
            const expected = lodashStable.map(values, stubString);

            const actual = lodashStable.map(values, (value, index) =>
                index ? func(value) : func(),
            );

            expect(actual).toEqual(expected);
        });
    });
});
