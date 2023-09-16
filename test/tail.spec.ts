import assert from 'node:assert';
import lodashStable from 'lodash';
import { falsey, stubArray, LARGE_ARRAY_SIZE } from './utils';
import tail from '../src/tail';

describe('tail', () => {
    const array = [1, 2, 3];

    it('should accept a falsey `array`', () => {
        const expected = lodashStable.map(falsey, stubArray);

        const actual = lodashStable.map(falsey, (array, index) => {
            try {
                return index ? tail(array) : tail();
            } catch (e) {}
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should exclude the first element', () => {
        assert.deepStrictEqual(tail(array), [2, 3]);
    });

    it('should return an empty when querying empty arrays', () => {
        assert.deepStrictEqual(tail([]), []);
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const array = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ],
            actual = lodashStable.map(array, tail);

        assert.deepStrictEqual(actual, [
            [2, 3],
            [5, 6],
            [8, 9],
        ]);
    });

    it('should work in a lazy sequence', () => {
        let array = lodashStable.range(LARGE_ARRAY_SIZE),
            values = [];

        let actual = _(array)
            .tail()
            .filter((value) => {
                values.push(value);
                return false;
            })
            .value();

        assert.deepEqual(actual, []);
        assert.deepEqual(values, array.slice(1));

        values = [];

        actual = _(array)
            .filter((value) => {
                values.push(value);
                return isEven(value);
            })
            .tail()
            .value();

        assert.deepEqual(actual, tail(_.filter(array, isEven)));
        assert.deepEqual(values, array);
    });

    it('should not execute subsequent iteratees on an empty array in a lazy sequence', () => {
        var array = lodashStable.range(LARGE_ARRAY_SIZE),
            iteratee = function () {
                pass = false;
            },
            pass = true,
            actual = _(array).slice(0, 1).tail().map(iteratee).value();

        assert.ok(pass);
        assert.deepEqual(actual, []);

        pass = true;
        actual = _(array).filter().slice(0, 1).tail().map(iteratee).value();

        assert.ok(pass);
        assert.deepEqual(actual, []);
    });
});
