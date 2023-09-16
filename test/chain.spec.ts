import assert from 'node:assert';
import lodashStable from 'lodash';
import { square } from './utils';
import chain from '../src/chain';

describe('chain', () => {
    it('should return a wrapped value', () => {
        const actual = chain({ a: 0 });
        assert.ok(actual instanceof _);
    });

    it('should return existing wrapped values', () => {
        const wrapped = _({ a: 0 });
        assert.strictEqual(chain(wrapped), wrapped);
        assert.strictEqual(wrapped.chain(), wrapped);
    });

    it('should enable chaining for methods that return unwrapped values', () => {
        const array = ['c', 'b', 'a'];

        assert.ok(chain(array).head() instanceof _);
        assert.ok(_(array).chain().head() instanceof _);

        assert.ok(chain(array).isArray() instanceof _);
        assert.ok(_(array).chain().isArray() instanceof _);

        assert.ok(chain(array).sortBy().head() instanceof _);
        assert.ok(_(array).chain().sortBy().head() instanceof _);
    });

    it('should chain multiple methods', () => {
        lodashStable.times(2, (index) => {
            let array = ['one two three four', 'five six seven eight', 'nine ten eleven twelve'],
                expected = {
                    ' ': 9,
                    e: 14,
                    f: 2,
                    g: 1,
                    h: 2,
                    i: 4,
                    l: 2,
                    n: 6,
                    o: 3,
                    r: 2,
                    s: 2,
                    t: 5,
                    u: 1,
                    v: 4,
                    w: 2,
                    x: 1,
                },
                wrapped = index ? _(array).chain() : chain(array);

            let actual = wrapped
                .chain()
                .map((value) => value.split(''))
                .flatten()
                .reduce((object, chr) => {
                    object[chr] || (object[chr] = 0);
                    object[chr]++;
                    return object;
                }, {})
                .value();

            assert.deepStrictEqual(actual, expected);

            array = [1, 2, 3, 4, 5, 6];
            wrapped = index ? _(array).chain() : chain(array);
            actual = wrapped
                .chain()
                .filter((n) => n % 2 != 0)
                .reject((n) => n % 3 == 0)
                .sortBy((n) => -n)
                .value();

            assert.deepStrictEqual(actual, [5, 1]);

            array = [3, 4];
            wrapped = index ? _(array).chain() : chain(array);
            actual = wrapped
                .reverse()
                .concat([2, 1])
                .unshift(5)
                .tap((value) => {
                    value.pop();
                })
                .map(square)
                .value();

            assert.deepStrictEqual(actual, [25, 16, 9, 4]);
        });
    });
});
