import lodashStable from 'lodash';
import { falsey, stubObject } from './utils';
import fromPairs from '../src/fromPairs';
import toPairs from '../src/toPairs';

describe('fromPairs', () => {
    it('should accept a two dimensional array', () => {
        const array = [
            ['a', 1],
            ['b', 2],
        ];
        const object = { a: 1, b: 2 };
        const actual = fromPairs(array);

        expect(actual).toEqual(object);
    });

    it('should accept a falsey `array`', () => {
        const expected = lodashStable.map(falsey, stubObject);

        const actual = lodashStable.map(falsey, (array, index) => {
            try {
                return index ? fromPairs(array) : fromPairs();
            } catch (e) {}
        });

        expect(actual).toEqual(expected);
    });

    it('should not support deep paths', () => {
        const actual = fromPairs([['a.b', 1]]);
        expect(actual).toEqual({ 'a.b': 1 });
    });

    it('should support consuming the return value of `_.toPairs`', () => {
        const object = { 'a.b': 1 };
        expect(fromPairs(toPairs(object))).toEqual(object);
    });
});
