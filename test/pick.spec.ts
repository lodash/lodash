import assert from 'node:assert';
import lodashStable from 'lodash';
import { args, toArgs } from './utils';
import pick from '../src/pick';

describe('pick', () => {
    const args = toArgs(['a', 'c']),
        object = { a: 1, b: 2, c: 3, d: 4 },
        nested = { a: 1, b: { c: 2, d: 3 } };

    it('should flatten `paths`', () => {
        assert.deepStrictEqual(pick(object, 'a', 'c'), { a: 1, c: 3 });
        assert.deepStrictEqual(pick(object, ['a', 'd'], 'c'), { a: 1, c: 3, d: 4 });
    });

    it('should support deep paths', () => {
        assert.deepStrictEqual(pick(nested, 'b.c'), { b: { c: 2 } });
    });

    it('should support path arrays', () => {
        const object = { 'a.b': 1, a: { b: 2 } },
            actual = pick(object, [['a.b']]);

        assert.deepStrictEqual(actual, { 'a.b': 1 });
    });

    it('should pick a key over a path', () => {
        const object = { 'a.b': 1, a: { b: 2 } };

        lodashStable.each(['a.b', ['a.b']], (path) => {
            assert.deepStrictEqual(pick(object, path), { 'a.b': 1 });
        });
    });

    it('should coerce `paths` to strings', () => {
        assert.deepStrictEqual(pick({ '0': 'a', '1': 'b' }, 0), { '0': 'a' });
    });

    it('should return an empty object when `object` is nullish', () => {
        lodashStable.each([null, undefined], (value) => {
            assert.deepStrictEqual(pick(value, 'valueOf'), {});
        });
    });

    it('should work with a primitive `object`', () => {
        assert.deepStrictEqual(pick('', 'slice'), { slice: ''.slice });
    });

    it('should work with `arguments` object `paths`', () => {
        assert.deepStrictEqual(pick(object, args), { a: 1, c: 3 });
    });
});
