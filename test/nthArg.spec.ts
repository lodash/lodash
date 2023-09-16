import assert from 'node:assert';
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

        assert.deepStrictEqual(actual, args);
    });

    it('should work with a negative `n`', () => {
        const actual = lodashStable.map(lodashStable.range(1, args.length + 1), (n) => {
            const func = nthArg(-n);
            return func.apply(undefined, args);
        });

        assert.deepStrictEqual(actual, ['d', 'c', 'b', 'a']);
    });

    it('should coerce `n` to an integer', () => {
        let values = falsey,
            expected = lodashStable.map(values, stubA);

        let actual = lodashStable.map(values, (n) => {
            const func = n ? nthArg(n) : nthArg();
            return func.apply(undefined, args);
        });

        assert.deepStrictEqual(actual, expected);

        values = ['1', 1.6];
        expected = lodashStable.map(values, stubB);

        actual = lodashStable.map(values, (n) => {
            const func = nthArg(n);
            return func.apply(undefined, args);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should return `undefined` for empty arrays', () => {
        const func = nthArg(1);
        assert.strictEqual(func(), undefined);
    });

    it('should return `undefined` for non-indexes', () => {
        const values = [Infinity, args.length],
            expected = lodashStable.map(values, noop);

        const actual = lodashStable.map(values, (n) => {
            const func = nthArg(n);
            return func.apply(undefined, args);
        });

        assert.deepStrictEqual(actual, expected);
    });
});
