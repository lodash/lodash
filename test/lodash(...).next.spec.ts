import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, isNpm, LARGE_ARRAY_SIZE, isEven } from './utils';
import toArray from '../src/toArray';
import filter from '../src/filter';

describe('lodash(...).next', () => {
    lodashStable.each([false, true], (implicit) => {
        function chain(value) {
            return implicit ? _(value) : _.chain(value);
        }

        const chainType = `in an ${implicit ? 'implicit' : 'explict'} chain`;

        it(`should follow the iterator protocol ${chainType}`, () => {
            const wrapped = chain([1, 2]);

            assert.deepEqual(wrapped.next(), { done: false, value: 1 });
            assert.deepEqual(wrapped.next(), { done: false, value: 2 });
            assert.deepEqual(wrapped.next(), { done: true, value: undefined });
        });

        it(`should act as an iterable ${chainType}`, () => {
            if (!isNpm && Symbol && Symbol.iterator) {
                const array = [1, 2],
                    wrapped = chain(array);

                assert.strictEqual(wrapped[Symbol.iterator](), wrapped);
                assert.deepStrictEqual(lodashStable.toArray(wrapped), array);
            }
        });

        it(`should use \`_.toArray\` to generate the iterable result ${chainType}`, () => {
            if (!isNpm && Array.from) {
                const hearts = '\ud83d\udc95',
                    values = [[1], { a: 1 }, hearts];

                lodashStable.each(values, (value) => {
                    const wrapped = chain(value);
                    assert.deepStrictEqual(Array.from(wrapped), toArray(value));
                });
            }
        });

        it(`should reset the iterator correctly ${chainType}`, () => {
            if (!isNpm && Symbol && Symbol.iterator) {
                const array = [1, 2],
                    wrapped = chain(array);

                assert.deepStrictEqual(lodashStable.toArray(wrapped), array);
                assert.deepStrictEqual(
                    lodashStable.toArray(wrapped),
                    [],
                    'produces an empty array for exhausted iterator',
                );

                const other = wrapped.filter();
                assert.deepStrictEqual(
                    lodashStable.toArray(other),
                    array,
                    'reset for new chain segments',
                );
                assert.deepStrictEqual(
                    lodashStable.toArray(wrapped),
                    [],
                    'iterator is still exhausted',
                );
            }
        });

        it(`should work in a lazy sequence ${chainType}`, () => {
            if (!isNpm && Symbol && Symbol.iterator) {
                var array = lodashStable.range(LARGE_ARRAY_SIZE),
                    predicate = function (value) {
                        values.push(value);
                        return isEven(value);
                    },
                    values = [],
                    wrapped = chain(array);

                assert.deepStrictEqual(lodashStable.toArray(wrapped), array);

                wrapped = wrapped.filter(predicate);
                assert.deepStrictEqual(
                    lodashStable.toArray(wrapped),
                    filter(array, isEven),
                    'reset for new lazy chain segments',
                );
                assert.deepStrictEqual(values, array, 'memoizes iterator values');
            }
        });
    });
});
