import lodashStable from 'lodash';
import { falsey, stubFalse, args, slice, symbol, realm } from './utils';
import isRegExp from '../src/isRegExp';

describe('isRegExp', () => {
    it('should return `true` for regexes', () => {
        expect(isRegExp(/x/)).toBe(true);
        expect(isRegExp(RegExp('x'))).toBe(true);
    });

    it('should return `false` for non-regexes', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isRegExp(value) : isRegExp(),
        );

        expect(actual).toEqual(expected);

        expect(isRegExp(args)).toBe(false);
        expect(isRegExp([1, 2, 3])).toBe(false);
        expect(isRegExp(true)).toBe(false);
        expect(isRegExp(new Date())).toBe(false);
        expect(isRegExp(new Error())).toBe(false);
        expect(isRegExp(slice)).toBe(false);
        expect(isRegExp({ a: 1 })).toBe(false);
        expect(isRegExp(1)).toBe(false);
        expect(isRegExp('a')).toBe(false);
        expect(isRegExp(symbol)).toBe(false);
    });

    it('should work with regexes from another realm', () => {
        if (realm.regexp) {
            expect(isRegExp(realm.regexp)).toBe(true);
        }
    });
});
