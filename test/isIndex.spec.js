import lodashStable from 'lodash';
import { MAX_SAFE_INTEGER, stubTrue, stubFalse } from './utils';
import _isIndex from '../src/.internal/isIndex';

describe('isIndex', () => {
    const func = _isIndex;

    it('should return `true` for indexes', () => {
        if (func) {
            const values = [[0], ['0'], ['1'], [3, 4], [MAX_SAFE_INTEGER - 1]];
            const expected = lodashStable.map(values, stubTrue);

            const actual = lodashStable.map(values, (args) => func.apply(undefined, args));

            expect(actual).toEqual(expected);
        }
    });

    it('should return `false` for non-indexes', () => {
        if (func) {
            const values = [['1abc'], ['07'], ['0001'], [-1], [3, 3], [1.1], [MAX_SAFE_INTEGER]];
            const expected = lodashStable.map(values, stubFalse);

            const actual = lodashStable.map(values, (args) => func.apply(undefined, args));

            expect(actual).toEqual(expected);
        }
    });
});
