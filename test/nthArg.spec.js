import lodashStable from 'lodash';
import { args, falsey, stubA, stubB, noop } from './utils';
import nthArg from '../src/nthArg';

describe('nthArg', () => {
    const args = ['a', 'b', 'c', 'd'];

    it('should create a function that returns its nth argument', () => {
        const actual = lodashStable.map(args, (value, index) => {
            const func = nthArg(index);
            return func.apply(undefined, args);
        });

        expect(actual).toEqual(args);
    });

    it('should work with a negative `n`', () => {
        const actual = lodashStable.map(lodashStable.range(1, args.length + 1), (n) => {
            const func = nthArg(-n);
            return func.apply(undefined, args);
        });

        expect(actual).toEqual(['d', 'c', 'b', 'a']);
    });

    it('should coerce `n` to an integer', () => {
        let values = falsey;
        let expected = lodashStable.map(values, stubA);

        let actual = lodashStable.map(values, (n) => {
            const func = n ? nthArg(n) : nthArg();
            return func.apply(undefined, args);
        });

        expect(actual).toEqual(expected);

        values = ['1', 1.6];
        expected = lodashStable.map(values, stubB);

        actual = lodashStable.map(values, (n) => {
            const func = nthArg(n);
            return func.apply(undefined, args);
        });

        expect(actual).toEqual(expected);
    });

    it('should return `undefined` for empty arrays', () => {
        const func = nthArg(1);
        expect(func()).toBe(undefined);
    });

    it('should return `undefined` for non-indexes', () => {
        const values = [Infinity, args.length];
        const expected = lodashStable.map(values, noop);

        const actual = lodashStable.map(values, (n) => {
            const func = nthArg(n);
            return func.apply(undefined, args);
        });

        expect(actual).toEqual(expected);
    });
});
