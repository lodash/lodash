import assert from 'node:assert';
import lodashStable from 'lodash';
import { MAX_SAFE_INTEGER, stubTrue, stubFalse } from './utils';
import isLength from '../src/isLength';

describe('isLength', () => {
    it('should return `true` for lengths', () => {
        const values = [0, 3, MAX_SAFE_INTEGER],
            expected = lodashStable.map(values, stubTrue),
            actual = lodashStable.map(values, isLength);

        assert.deepStrictEqual(actual, expected);
    });

    it('should return `false` for non-lengths', () => {
        const values = [-1, '1', 1.1, MAX_SAFE_INTEGER + 1],
            expected = lodashStable.map(values, stubFalse),
            actual = lodashStable.map(values, isLength);

        assert.deepStrictEqual(actual, expected);
    });
});
