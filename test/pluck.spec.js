import lodashStable from 'lodash';
import { toArgs } from './utils';
import pluck from '../src/pluck';

describe('pluck', () => {
    const args = toArgs(['a', 'c']);
    const collection = [
        { a: 1, b: '2', c: 3 },
        { a: 4, b: 5, c: 6 },
    ];

    it('should flatten `paths`', () => {
        expect(pluck(collection, 'a', 'c')).toEqual([
            { a: 1, c: 3 },
            { a: 4, c: 6 },
        ]);
        expect(pluck(collection, ['a', 'd'], 'c')).toEqual([
            { a: 1, c: 3 },
            { a: 4, c: 6 },
        ]);
    });

    it('should support deep paths', () => {
        const nested = [{ a: 1, b: { c: 2, d: 3 } }];

        expect(pluck(nested, 'b.c')).toEqual([{ b: { c: 2 } }]);
    });

    it('should support path arrays', () => {
        const collection = [{ 'a.b': 1, a: { b: 2 } }];
        const actual = pluck(collection, [['a.b']]);

        expect(actual).toEqual([{ 'a.b': 1 }]);
    });

    it('should pluck a key over a path', () => {
        const collection = [{ 'a.b': 1, a: { b: 2 } }];

        lodashStable.each(['a.b', ['a.b']], (path) => {
            expect(pluck(collection, path)).toEqual([{ 'a.b': 1 }]);
        });
    });

    it('should coerce `paths` to strings', () => {
        expect(pluck([{ 0: 'a', 1: 'b' }], 0)).toEqual([{ 0: 'a' }]);
    });

    it('should return an empty collection when `collection` is nullish', () => {
        expect(pluck([[null], [undefined]], 'valueOf')).toEqual([{}, {}]);
    });

    it('should work with `arguments` collection `paths`', () => {
        expect(pluck(collection, args)).toEqual([
            { a: 1, c: 3 },
            { a: 4, c: 6 },
        ]);
    });
});
