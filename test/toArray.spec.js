import lodashStable from 'lodash';
import { arrayProto, LARGE_ARRAY_SIZE } from './utils';
import toArray from '../src/toArray';

describe('toArray', () => {
    it('should convert objects to arrays', () => {
        expect(toArray({ a: 1, b: 2 })).toEqual([1, 2]);
    });

    it('should convert iterables to arrays', () => {
        if (Symbol && Symbol.iterator) {
            const object = { 0: 'a', length: 1 };
            object[Symbol.iterator] = arrayProto[Symbol.iterator];
            expect(toArray(object)).toEqual(['a']);
        }
    });

    it('should convert maps to arrays', () => {
        if (Map) {
            const map = new Map();
            map.set('a', 1);
            map.set('b', 2);
            expect(toArray(map)).toEqual([
                ['a', 1],
                ['b', 2],
            ]);
        }
    });

    it('should convert strings to arrays', () => {
        expect(toArray('')).toEqual([]);
        expect(toArray('ab')).toEqual(['a', 'b']);
        expect(toArray(Object('ab'))).toEqual(['a', 'b']);
    });
});
