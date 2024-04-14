import lodashStable from 'lodash';
import { args, strictArgs, falsey, stubFalse, slice, noop, symbol, realm } from './utils';
import isArguments from '../src/isArguments';

describe('isArguments', () => {
    it('should return `true` for `arguments` objects', () => {
        expect(isArguments(args)).toBe(true);
        expect(isArguments(strictArgs)).toBe(true);
    });

    it('should return `false` for non `arguments` objects', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isArguments(value) : isArguments(),
        );

        expect(actual).toEqual(expected);

        expect(isArguments([1, 2, 3])).toBe(false);
        expect(isArguments(true)).toBe(false);
        expect(isArguments(new Date())).toBe(false);
        expect(isArguments(new Error())).toBe(false);
        expect(isArguments(slice)).toBe(false);
        expect(isArguments({ 0: 1, callee: noop, length: 1 })).toBe(false);
        expect(isArguments(1)).toBe(false);
        expect(isArguments(/x/)).toBe(false);
        expect(isArguments('a')).toBe(false);
        expect(isArguments(symbol)).toBe(false);
    });

    it('should work with an `arguments` object from another realm', () => {
        if (realm.arguments) {
            expect(isArguments(realm.arguments)).toBe(true);
        }
    });
});
