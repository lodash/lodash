import lodashStable from 'lodash';

import {
    errors,
    stubTrue,
    CustomError,
    falsey,
    stubFalse,
    args,
    slice,
    symbol,
    realm,
} from './utils';

import isError from '../src/isError';

describe('isError', () => {
    it('should return `true` for error objects', () => {
        const expected = lodashStable.map(errors, stubTrue);

        const actual = lodashStable.map(errors, (error) => isError(error) === true);

        expect(actual).toEqual(expected);
    });

    it('should return `true` for subclassed values', () => {
        expect(isError(new CustomError('x'))).toBe(true);
    });

    it('should return `false` for non error objects', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isError(value) : isError(),
        );

        expect(actual).toEqual(expected);

        expect(isError(args)).toBe(false);
        expect(isError([1, 2, 3])).toBe(false);
        expect(isError(true)).toBe(false);
        expect(isError(new Date())).toBe(false);
        expect(isError(slice)).toBe(false);
        expect(isError({ a: 1 })).toBe(false);
        expect(isError(1)).toBe(false);
        expect(isError(/x/)).toBe(false);
        expect(isError('a')).toBe(false);
        expect(isError(symbol)).toBe(false);
    });

    it('should return `false` for plain objects', () => {
        expect(isError({ name: 'Error', message: '' })).toBe(false);
    });

    it('should work with an error object from another realm', () => {
        if (realm.errors) {
            const expected = lodashStable.map(realm.errors, stubTrue);

            const actual = lodashStable.map(realm.errors, (error) => isError(error) === true);

            expect(actual).toEqual(expected);
        }
    });
});
