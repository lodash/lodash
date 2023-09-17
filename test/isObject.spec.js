import lodashStable from 'lodash';
import { args, slice, document, body, symbol, falsey, stubFalse, realm } from './utils';
import isObject from '../src/isObject';

describe('isObject', () => {
    it('should return `true` for objects', () => {
        expect(isObject(args)).toBe(true);
        expect(isObject([1, 2, 3])).toBe(true);
        expect(isObject(Object(false))).toBe(true);
        expect(isObject(new Date())).toBe(true);
        expect(isObject(new Error())).toBe(true);
        expect(isObject(slice)).toBe(true);
        expect(isObject({ a: 1 })).toBe(true);
        expect(isObject(Object(0))).toBe(true);
        expect(isObject(/x/)).toBe(true);
        expect(isObject(Object('a'))).toBe(true);

        if (document) {
            expect(isObject(body)).toBe(true);
        }
        if (Symbol) {
            expect(isObject(Object(symbol))).toBe(true);
        }
    });

    it('should return `false` for non-objects', () => {
        const values = falsey.concat(true, 1, 'a', symbol);
        const expected = lodashStable.map(values, stubFalse);

        const actual = lodashStable.map(values, (value, index) =>
            index ? isObject(value) : isObject(),
        );

        expect(actual).toEqual(expected);
    });

    it('should work with objects from another realm', () => {
        if (realm.element) {
            expect(isObject(realm.element)).toBe(true);
        }
        if (realm.object) {
            expect(isObject(realm.boolean)).toBe(true);
            expect(isObject(realm.date)).toBe(true);
            expect(isObject(realm.function)).toBe(true);
            expect(isObject(realm.number)).toBe(true);
            expect(isObject(realm.object)).toBe(true);
            expect(isObject(realm.regexp)).toBe(true);
            expect(isObject(realm.string)).toBe(true);
        }
    });
});
