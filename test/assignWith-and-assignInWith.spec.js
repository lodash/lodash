import lodashStable from 'lodash';
import { _, noop } from './utils';

describe('assignWith and assignInWith', () => {
    lodashStable.each(['assignWith', 'assignInWith'], (methodName) => {
        const func = _[methodName];

        it(`\`_.${methodName}\` should work with a \`customizer\` callback`, () => {
            const actual = func({ a: 1, b: 2 }, { a: 3, c: 3 }, (a, b) =>
                a === undefined ? b : a,
            );

            expect(actual).toEqual({ a: 1, b: 2, c: 3 });
        });

        it(`\`_.${methodName}\` should work with a \`customizer\` that returns \`undefined\``, () => {
            const expected = { a: 1 };
            expect(func({}, expected, noop)).toEqual(expected);
        });
    });
});
