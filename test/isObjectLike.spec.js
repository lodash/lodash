import lodashStable from 'lodash';
import { args, falsey, slice, symbol, stubFalse, realm } from './utils';
import isObjectLike from '../src/isObjectLike';

describe('isObjectLike', () => {
    it('should return `true` for objects', () => {
        expect(isObjectLike(args)).toBe(true);
        expect(isObjectLike([1, 2, 3])).toBe(true);
        expect(isObjectLike(Object(false))).toBe(true);
        expect(isObjectLike(new Date())).toBe(true);
        expect(isObjectLike(new Error())).toBe(true);
        expect(isObjectLike({ a: 1 })).toBe(true);
        expect(isObjectLike(Object(0))).toBe(true);
        expect(isObjectLike(/x/)).toBe(true);
        expect(isObjectLike(Object('a'))).toBe(true);
    });

    it('should return `false` for non-objects', () => {
        const values = falsey.concat(true, _, slice, 1, 'a', symbol);
        const expected = lodashStable.map(values, stubFalse);

        const actual = lodashStable.map(values, (value, index) =>
            index ? isObjectLike(value) : isObjectLike(),
        );

        expect(actual).toEqual(expected);
    });

    it('should work with objects from another realm', () => {
        if (realm.object) {
            expect(isObjectLike(realm.boolean)).toBe(true);
            expect(isObjectLike(realm.date)).toBe(true);
            expect(isObjectLike(realm.number)).toBe(true);
            expect(isObjectLike(realm.object)).toBe(true);
            expect(isObjectLike(realm.regexp)).toBe(true);
            expect(isObjectLike(realm.string)).toBe(true);
        }
    });
});
