import assert from 'node:assert';
import lodashStable from 'lodash';
import { falsey, stubArray, LARGE_ARRAY_SIZE } from './utils';
import initial from '../src/initial';

describe('initial', () => {
    const array = [1, 2, 3];

    it('should accept a falsey `array`', () => {
        const expected = lodashStable.map(falsey, stubArray);

        const actual = lodashStable.map(falsey, (array, index) => {
            try {
                return index ? initial(array) : initial();
            } catch (e) {}
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should exclude last element', () => {
        assert.deepStrictEqual(initial(array), [1, 2]);
    });

    it('should return an empty when querying empty arrays', () => {
        assert.deepStrictEqual(initial([]), []);
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const array = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ],
            actual = lodashStable.map(array, initial);

        assert.deepStrictEqual(actual, [
            [1, 2],
            [4, 5],
            [7, 8],
        ]);
    });

    it('should work in a lazy sequence', () => {
        let array = lodashStable.range(LARGE_ARRAY_SIZE),
            values = [];

        let actual = _(array)
            .initial()
            .filter((value) => {
                values.push(value);
                return false;
            })
            .value();

        assert.deepEqual(actual, []);
        assert.deepEqual(values, initial(array));

        values = [];

        actual = _(array)
            .filter((value) => {
                values.push(value);
                return isEven(value);
            })
            .initial()
            .value();

        assert.deepEqual(actual, initial(lodashStable.filter(array, isEven)));
        assert.deepEqual(values, array);
    });
});
