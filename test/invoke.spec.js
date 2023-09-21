import lodashStable from 'lodash';
import { noop, stubA, stubB, stubOne } from './utils';
import invoke from '../src/invoke';

describe('invoke', () => {
    it('should invoke a method on `object`', () => {
        const object = { a: lodashStable.constant('A') };
        const actual = invoke(object, 'a');

        expect(actual).toBe('A');
    });

    it('should support invoking with arguments', () => {
        const object = {
            a: function (a, b) {
                return [a, b];
            },
        };
        const actual = invoke(object, 'a', [1, 2]);

        expect(actual).toEqual([1, 2]);
    });

    it('should not error on nullish elements', () => {
        const values = [null, undefined];
        const expected = lodashStable.map(values, noop);

        const actual = lodashStable.map(values, (value) => {
            try {
                return invoke(value, 'a.b', [1, 2]);
            } catch (e) {}
        });

        expect(actual).toEqual(expected);
    });

    it('should preserve the sign of `0`', () => {
        const object = { '-0': stubA, 0: stubB };
        const props = [-0, Object(-0), 0, Object(0)];

        const actual = lodashStable.map(props, (key) => invoke(object, key));

        expect(actual).toEqual(['a', 'a', 'b', 'b']);
    });

    it('should support deep paths', () => {
        const object = {
            a: {
                b: function (a, b) {
                    return [a, b];
                },
            },
        };

        lodashStable.each(['a.b', ['a', 'b']], (path) => {
            const actual = invoke(object, path, [1, 2]);
            expect(actual).toEqual([1, 2]);
        });
    });

    it('should invoke deep property methods with the correct `this` binding', () => {
        const object = {
            a: {
                b: function () {
                    return this.c;
                },
                c: 1,
            },
        };

        lodashStable.each(['a.b', ['a', 'b']], (path) => {
            expect(invoke(object, path)).toEqual(1);
        });
    });

    // FIXME: Work out a solution for _.
    //
    // it('should return an unwrapped value when implicitly chaining', () => {
    //     const object = { a: stubOne };
    //     expect(_(object).invoke('a')).toBe(1);
    // });
    //
    // it('should return a wrapped value when explicitly chaining', () => {
    //     const object = { a: stubOne };
    //     expect(_(object).chain().invoke('a') instanceof _)
    // });
});
