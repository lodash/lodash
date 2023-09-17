import lodashStable from 'lodash';
import { args, toArgs, objectProto, stringProto } from './utils';
import omit from '../src/omit';

describe('omit', () => {
    const args = toArgs(['a', 'c']);
    const object = { a: 1, b: 2, c: 3, d: 4 };
    const nested = { a: 1, b: { c: 2, d: 3 } };

    it('should flatten `paths`', () => {
        expect(omit(object, 'a', 'c')).toEqual({ b: 2, d: 4 });
        expect(omit(object, ['a', 'd'], 'c')).toEqual({ b: 2 });
    });

    it('should support deep paths', () => {
        expect(omit(nested, 'b.c')).toEqual({ a: 1, b: { d: 3 } });
    });

    it('should support path arrays', () => {
        const object = { 'a.b': 1, a: { b: 2 } };
        const actual = omit(object, [['a.b']]);

        expect(actual).toEqual({ a: { b: 2 } });
    });

    it('should omit a key over a path', () => {
        const object = { 'a.b': 1, a: { b: 2 } };

        lodashStable.each(['a.b', ['a.b']], (path) => {
            expect(omit(object, path)).toEqual({ a: { b: 2 } });
        });
    });

    it('should coerce `paths` to strings', () => {
        expect(omit({ 0: 'a' }, 0)).toEqual({});
    });

    it('should return an empty object when `object` is nullish', () => {
        lodashStable.each([null, undefined], (value) => {
            objectProto.a = 1;
            const actual = omit(value, 'valueOf');
            delete objectProto.a;
            expect(actual).toEqual({});
        });
    });

    it('should work with a primitive `object`', () => {
        stringProto.a = 1;
        stringProto.b = 2;

        expect(omit('', 'b')).toEqual({ a: 1 });

        delete stringProto.a;
        delete stringProto.b;
    });

    it('should work with `arguments` object `paths`', () => {
        expect(omit(object, args)).toEqual({ b: 2, d: 4 });
    });

    it('should not mutate `object`', () => {
        lodashStable.each(['a', ['a'], 'a.b', ['a.b']], (path) => {
            const object = { a: { b: 2 } };
            omit(object, path);
            expect(object).toEqual({ a: { b: 2 } });
        });
    });
});
