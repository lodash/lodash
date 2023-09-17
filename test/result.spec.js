import lodashStable from 'lodash';
import { stubB } from './utils';
import result from '../src/result';

describe('result', () => {
    const object = { a: 1, b: stubB };

    it('should invoke function values', () => {
        expect(result(object, 'b')).toBe('b');
    });

    it('should invoke default function values', () => {
        const actual = result(object, 'c', object.b);
        expect(actual).toBe('b');
    });

    it('should invoke nested function values', () => {
        const value = { a: lodashStable.constant({ b: stubB }) };

        lodashStable.each(['a.b', ['a', 'b']], (path) => {
            expect(result(value, path)).toBe('b');
        });
    });

    it('should invoke deep property methods with the correct `this` binding', () => {
        const value = {
            a: {
                b: function () {
                    return this.c;
                },
                c: 1,
            },
        };

        lodashStable.each(['a.b', ['a', 'b']], (path) => {
            expect(result(value, path)).toBe(1);
        });
    });
});
