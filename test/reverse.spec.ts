import assert from 'node:assert';
import lodashStable from 'lodash';
import { LARGE_ARRAY_SIZE, identity } from './utils';
import reverse from '../src/reverse';
import compact from '../src/compact';
import head from '../src/head';

describe('reverse', () => {
    const largeArray = lodashStable.range(LARGE_ARRAY_SIZE).concat(null),
        smallArray = [0, 1, 2, null];

    it('should reverse `array`', () => {
        const array = [1, 2, 3],
            actual = reverse(array);

        assert.strictEqual(actual, array);
        assert.deepStrictEqual(array, [3, 2, 1]);
    });

    it('should return the wrapped reversed `array`', () => {
        lodashStable.times(2, (index) => {
            const array = (index ? largeArray : smallArray).slice(),
                clone = array.slice(),
                wrapped = _(array).reverse(),
                actual = wrapped.value();

            assert.ok(wrapped instanceof _);
            assert.strictEqual(actual, array);
            assert.deepStrictEqual(actual, clone.slice().reverse());
        });
    });

    it('should work in a lazy sequence', () => {
        lodashStable.times(2, (index) => {
            const array = (index ? largeArray : smallArray).slice(),
                expected = array.slice(),
                actual = _(array).slice(1).reverse().value();

            assert.deepStrictEqual(actual, expected.slice(1).reverse());
            assert.deepStrictEqual(array, expected);
        });
    });

    it('should be lazy when in a lazy sequence', () => {
        const spy = {
            toString: function () {
                throw new Error('spy was revealed');
            },
        };

        const array = largeArray.concat(spy),
            expected = array.slice();

        try {
            var wrapped = _(array).slice(1).map(String).reverse(),
                actual = wrapped.last();
        } catch (e) {}

        assert.ok(wrapped instanceof _);
        assert.strictEqual(actual, '1');
        assert.deepEqual(array, expected);
    });

    it('should work in a hybrid sequence', () => {
        lodashStable.times(2, (index) => {
            const clone = (index ? largeArray : smallArray).slice();

            lodashStable.each(['map', 'filter'], (methodName) => {
                let array = clone.slice(),
                    expected = clone.slice(1, -1).reverse(),
                    actual = _(array)[methodName](identity).thru(compact).reverse().value();

                assert.deepStrictEqual(actual, expected);

                array = clone.slice();
                actual = _(array)
                    .thru(compact)
                    [methodName](identity)
                    .pull(1)
                    .push(3)
                    .reverse()
                    .value();

                assert.deepStrictEqual(actual, [3].concat(expected.slice(0, -1)));
            });
        });
    });

    it('should track the `__chain__` value of a wrapper', () => {
        lodashStable.times(2, (index) => {
            const array = (index ? largeArray : smallArray).slice(),
                expected = array.slice().reverse(),
                wrapped = _(array).chain().reverse().head();

            assert.ok(wrapped instanceof _);
            assert.strictEqual(wrapped.value(), head(expected));
            assert.deepStrictEqual(array, expected);
        });
    });
});
