import lodashStable from 'lodash';
import { falsey, args, slice, symbol, realm } from './utils';
import isUndefined from '../src/isUndefined';

describe('isUndefined', () => {
    it('should return `true` for `undefined` values', () => {
        expect(isUndefined()).toBe(true);
        expect(isUndefined(undefined)).toBe(true);
    });

    it('should return `false` for non `undefined` values', () => {
        const expected = lodashStable.map(falsey, (value) => value === undefined);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isUndefined(value) : isUndefined(),
        );

        expect(actual).toEqual(expected);

        expect(isUndefined(args)).toBe(false);
        expect(isUndefined([1, 2, 3])).toBe(false);
        expect(isUndefined(true)).toBe(false);
        expect(isUndefined(new Date())).toBe(false);
        expect(isUndefined(new Error())).toBe(false);
        expect(isUndefined(slice)).toBe(false);
        expect(isUndefined({ a: 1 })).toBe(false);
        expect(isUndefined(1)).toBe(false);
        expect(isUndefined(/x/)).toBe(false);
        expect(isUndefined('a')).toBe(false);

        if (Symbol) {
            expect(isUndefined(symbol)).toBe(false);
        }
    });

    it('should work with `undefined` from another realm', () => {
        if (realm.object) {
            expect(isUndefined(realm.undefined)).toBe(true);
        }
    });
});
