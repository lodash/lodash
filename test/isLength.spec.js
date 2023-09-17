import lodashStable from 'lodash';
import { MAX_SAFE_INTEGER, stubTrue, stubFalse } from './utils';
import isLength from '../src/isLength';

describe('isLength', () => {
    it('should return `true` for lengths', () => {
        const values = [0, 3, MAX_SAFE_INTEGER];
        const expected = lodashStable.map(values, stubTrue);
        const actual = lodashStable.map(values, isLength);

        expect(actual).toEqual(expected);
    });

    it('should return `false` for non-lengths', () => {
        const values = [-1, '1', 1.1, MAX_SAFE_INTEGER + 1];
        const expected = lodashStable.map(values, stubFalse);
        const actual = lodashStable.map(values, isLength);

        expect(actual).toEqual(expected);
    });
});
