import assert from 'node:assert';
import lodashStable from 'lodash';
import { args, toArgs, objectProto, stringProto } from './utils';
import omit from '../src/omit';

describe('omit', () => {
    const args = toArgs(['a', 'c']),
        object = { a: 1, b: 2, c: 3, d: 4 },
        nested = { a: 1, b: { c: 2, d: 3 } };

    it('should flatten `paths`', () => {
        assert.deepStrictEqual(omit(object, 'a', 'c'), { b: 2, d: 4 });
        assert.deepStrictEqual(omit(object, ['a', 'd'], 'c'), { b: 2 });
    });

    it('should support deep paths', () => {
        assert.deepStrictEqual(omit(nested, 'b.c'), { a: 1, b: { d: 3 } });
    });

    it('should support path arrays', () => {
        const object = { 'a.b': 1, a: { b: 2 } },
            actual = omit(object, [['a.b']]);

        assert.deepStrictEqual(actual, { a: { b: 2 } });
    });

    it('should omit a key over a path', () => {
        const object = { 'a.b': 1, a: { b: 2 } };

        lodashStable.each(['a.b', ['a.b']], (path) => {
            assert.deepStrictEqual(omit(object, path), { a: { b: 2 } });
        });
    });

    it('should coerce `paths` to strings', () => {
        assert.deepStrictEqual(omit({ '0': 'a' }, 0), {});
    });

    it('should return an empty object when `object` is nullish', () => {
        lodashStable.each([null, undefined], (value) => {
            objectProto.a = 1;
            const actual = omit(value, 'valueOf');
            delete objectProto.a;
            assert.deepStrictEqual(actual, {});
        });
    });

    it('should work with a primitive `object`', () => {
        stringProto.a = 1;
        stringProto.b = 2;

        assert.deepStrictEqual(omit('', 'b'), { a: 1 });

        delete stringProto.a;
        delete stringProto.b;
    });

    it('should work with `arguments` object `paths`', () => {
        assert.deepStrictEqual(omit(object, args), { b: 2, d: 4 });
    });

    it('should not mutate `object`', () => {
        lodashStable.each(['a', ['a'], 'a.b', ['a.b']], (path) => {
            const object = { a: { b: 2 } };
            omit(object, path);
            assert.deepStrictEqual(object, { a: { b: 2 } });
        });
    });
});
