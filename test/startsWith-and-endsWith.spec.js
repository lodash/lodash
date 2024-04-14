import lodashStable from 'lodash';
import { _, MAX_SAFE_INTEGER } from './utils';

describe('startsWith and endsWith', () => {
    lodashStable.each(['startsWith', 'endsWith'], (methodName) => {
        const func = _[methodName];
        const isStartsWith = methodName === 'startsWith';

        const string = 'abc';
        const chr = isStartsWith ? 'a' : 'c';

        it(`\`_.${methodName}\` should coerce \`string\` to a string`, () => {
            expect(func(Object(string), chr)).toBe(true);
            expect(func({ toString: lodashStable.constant(string) }, chr)).toBe(true);
        });

        it(`\`_.${methodName}\` should coerce \`target\` to a string`, () => {
            expect(func(string, Object(chr))).toBe(true);
            expect(func(string, { toString: lodashStable.constant(chr) })).toBe(true);
        });

        it(`\`_.${methodName}\` should coerce \`position\` to a number`, () => {
            const position = isStartsWith ? 1 : 2;

            expect(func(string, 'b', Object(position))).toBe(true);
            expect(
                func(string, 'b', { toString: lodashStable.constant(String(position)) })
            ).toBe(true);
        });

        it('should return `true` when `target` is an empty string regardless of `position`', () => {
            const positions = [-Infinity, NaN, -3, -1, 0, 1, 2, 3, 5, MAX_SAFE_INTEGER, Infinity];

            expect(lodashStable.every(positions, (position) => func(string, '', position)));
        });
    });
});
