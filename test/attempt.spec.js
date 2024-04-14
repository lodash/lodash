import lodashStable from 'lodash';
import { slice, errors, stubTrue, CustomError, realm } from './utils';
import attempt from '../src/attempt';

describe('attempt', () => {
    it('should return the result of `func`', () => {
        expect(attempt(lodashStable.constant('x'))).toBe('x');
    });

    it('should provide additional arguments to `func`', () => {
        const actual = attempt(
            function () {
                return slice.call(arguments);
            },
            1,
            2,
        );
        expect(actual).toEqual([1, 2]);
    });

    it('should return the caught error', () => {
        const expected = lodashStable.map(errors, stubTrue);

        const actual = lodashStable.map(
            errors,
            (error) =>
                attempt(() => {
                    throw error;
                }) === error,
        );

        expect(actual).toEqual(expected);
    });

    it('should coerce errors to error objects', () => {
        const actual = attempt(() => {
            throw 'x';
        });
        expect(lodashStable.isEqual(actual, Error('x'))).toBeTruthy();
    });

    it('should preserve custom errors', () => {
        const actual = attempt(() => {
            throw new CustomError('x');
        });
        expect(actual instanceof CustomError);
    });

    it('should work with an error object from another realm', () => {
        if (realm.errors) {
            const expected = lodashStable.map(realm.errors, stubTrue);

            const actual = lodashStable.map(
                realm.errors,
                (error) =>
                    attempt(() => {
                        throw error;
                    }) === error,
            );

            expect(actual).toEqual(expected);
        }
    });

    // FIXME: Work out a solution for _.
    //
    // it('should return an unwrapped value when implicitly chaining', () => {
    //     expect(_(lodashStable.constant('x')).attempt()).toBe('x');
    // });
    //
    // it('should return a wrapped value when explicitly chaining', () => {
    //     expect(_(lodashStable.constant('x')).chain().attempt() instanceof _);
    // });
});
