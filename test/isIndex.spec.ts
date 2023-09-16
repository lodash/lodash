import assert from 'node:assert';
import lodashStable from 'lodash';
import { MAX_SAFE_INTEGER, stubTrue, stubFalse } from './utils';
import _isIndex from '../src/.internal/isIndex';

describe('isIndex', () => {
    const func = _isIndex;

    it('should return `true` for indexes', () => {
        if (func) {
            const values = [[0], ['0'], ['1'], [3, 4], [MAX_SAFE_INTEGER - 1]],
                expected = lodashStable.map(values, stubTrue);

            const actual = lodashStable.map(values, (args) => func.apply(undefined, args));

            assert.deepStrictEqual(actual, expected);
        }
    });

    it('should return `false` for non-indexes', () => {
        if (func) {
            const values = [['1abc'], ['07'], ['0001'], [-1], [3, 3], [1.1], [MAX_SAFE_INTEGER]],
                expected = lodashStable.map(values, stubFalse);

            const actual = lodashStable.map(values, (args) => func.apply(undefined, args));

            assert.deepStrictEqual(actual, expected);
        }
    });
});
