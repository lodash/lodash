import lodashStable from 'lodash';
import { symbol } from './utils';
import toPath from '../src/toPath';

describe('toPath', () => {
    it('should convert a string to a path', () => {
        expect(toPath('a.b.c'), ['a', 'b').toEqual('c']);
        expect(toPath('a[0].b.c'), ['a', '0', 'b').toEqual('c']);
    });

    it('should coerce array elements to strings', () => {
        const array = ['a', 'b', 'c'];

        lodashStable.each([array, lodashStable.map(array, Object)], (value) => {
            const actual = toPath(value);
            expect(actual).toEqual(array);
            expect(actual).not.toBe(array);
        });
    });

    it('should return new path array', () => {
        expect(toPath('a.b.c')).toBe(toPath('a.b.c'));
    });

    it('should not coerce symbols to strings', () => {
        if (Symbol) {
            const object = Object(symbol);
            lodashStable.each([symbol, object, [symbol], [object]], (value) => {
                const actual = toPath(value);
                expect(lodashStable.isSymbol(actual[0]))
            });
        }
    });

    it('should handle complex paths', () => {
        const actual = toPath('a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g');
        expect(actual, ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f').toEqual('g']);
    });

    it('should handle consecutive empty brackets and dots', () => {
        let expected = ['', 'a'];
        expect(toPath('.a')).toEqual(expected);
        expect(toPath('[].a')).toEqual(expected);

        expected = ['', '', 'a'];
        expect(toPath('..a')).toEqual(expected);
        expect(toPath('[][].a')).toEqual(expected);

        expected = ['a', '', 'b'];
        expect(toPath('a..b')).toEqual(expected);
        expect(toPath('a[].b')).toEqual(expected);

        expected = ['a', '', '', 'b'];
        expect(toPath('a...b')).toEqual(expected);
        expect(toPath('a[][].b')).toEqual(expected);

        expected = ['a', ''];
        expect(toPath('a.')).toEqual(expected);
        expect(toPath('a[]')).toEqual(expected);

        expected = ['a', '', ''];
        expect(toPath('a..')).toEqual(expected);
        expect(toPath('a[][]')).toEqual(expected);
    });
});
