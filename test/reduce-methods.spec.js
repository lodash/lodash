import lodashStable from 'lodash';
import { _, empties, noop, add } from './utils';

describe('reduce methods', () => {
    lodashStable.each(['reduce', 'reduceRight'], (methodName) => {
        const func = _[methodName];
        const array = [1, 2, 3];
        const isReduce = methodName === 'reduce';

        it(`\`_.${methodName}\` should reduce a collection to a single value`, () => {
            const actual = func(['a', 'b', 'c'], (accumulator, value) => accumulator + value, '');

            expect(actual).toBe(isReduce ? 'abc' : 'cba');
        });

        it(`\`_.${methodName}\` should support empty collections without an initial \`accumulator\` value`, () => {
            const actual = [];
            const expected = lodashStable.map(empties, noop);

            lodashStable.each(empties, (value) => {
                try {
                    actual.push(func(value, noop));
                } catch (e) {}
            });

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should support empty collections with an initial \`accumulator\` value`, () => {
            const expected = lodashStable.map(empties, lodashStable.constant('x'));

            const actual = lodashStable.map(empties, (value) => {
                try {
                    return func(value, noop, 'x');
                } catch (e) {}
            });

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should handle an initial \`accumulator\` value of \`undefined\``, () => {
            const actual = func([], noop, undefined);
            expect(actual).toBe(undefined);
        });

        it(`\`_.${methodName}\` should return \`undefined\` for empty collections when no \`accumulator\` is given (test in IE > 9 and modern browsers)`, () => {
            const array = [];
            const object = { 0: 1, length: 0 };

            if ('__proto__' in array) {
                array.__proto__ = object;
                expect(func(array, noop)).toBe(undefined);
            }
            expect(func(object, noop)).toBe(undefined);
        });

        it(`\`_.${methodName}\` should return an unwrapped value when implicitly chaining`, () => {
            expect(_(array)[methodName](add)).toBe(6);
        });

        it(`\`_.${methodName}\` should return a wrapped value when explicitly chaining`, () => {
            expect(_(array).chain()[methodName](add) instanceof _);
        });
    });
});
