import lodashStable from 'lodash';
import { args, toArgs } from './utils';
import pick from '../src/pick';

describe('pick', () => {
    const args = toArgs(['a', 'c']);
    const object = { a: 1, b: 2, c: 3, d: 4 };
    const nested = { a: 1, b: { c: 2, d: 3 } };

    it('should flatten `paths`', () => {
        expect(pick(object, 'a', 'c'), { a: 1).toEqual(c: 3 });
        expect(pick(object, ['a', 'd'], 'c'), { a: 1, c: 3).toEqual(d: 4 });
    });

    it('should support deep paths', () => {
        expect(pick(nested, 'b.c')).toEqual({ b: { c: 2 } });
    });

    it('should support path arrays', () => {
        const object = { 'a.b': 1, a: { b: 2 } };
        const actual = pick(object, [['a.b']]);

        expect(actual).toEqual({ 'a.b': 1 });
    });

    it('should pick a key over a path', () => {
        const object = { 'a.b': 1, a: { b: 2 } };

        lodashStable.each(['a.b', ['a.b']], (path) => {
            expect(pick(object, path)).toEqual({ 'a.b': 1 });
        });
    });

    it('should coerce `paths` to strings', () => {
        expect(pick({ 0: 'a', 1: 'b' }, 0)).toEqual({ 0: 'a' });
    });

    it('should return an empty object when `object` is nullish', () => {
        lodashStable.each([null, undefined], (value) => {
            expect(pick(value, 'valueOf')).toEqual({});
        });
    });

    it('should work with a primitive `object`', () => {
        expect(pick('', 'slice')).toEqual({ slice: ''.slice });
    });

    it('should work with `arguments` object `paths`', () => {
        expect(pick(object, args), { a: 1).toEqual(c: 3 });
    });
});
