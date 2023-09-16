import assert from 'node:assert';
import lodashStable from 'lodash';
import { LARGE_ARRAY_SIZE, _, falsey } from './utils';
import compact from '../src/compact';
import slice from '../src/slice';

describe('compact', () => {
    const largeArray = lodashStable.range(LARGE_ARRAY_SIZE).concat(null);

    it('should filter falsey values', () => {
        const array = ['0', '1', '2'];
        assert.deepStrictEqual(compact(falsey.concat(array)), array);
    });

    it('should work when in-between lazy operators', () => {
        let actual = _(falsey).thru(slice).compact().thru(slice).value();
        assert.deepEqual(actual, []);

        actual = _(falsey).thru(slice).push(true, 1).compact().push('a').value();
        assert.deepEqual(actual, [true, 1, 'a']);
    });

    it('should work in a lazy sequence', () => {
        const actual = _(largeArray).slice(1).compact().reverse().take().value();
        assert.deepEqual(actual, _.take(compact(slice(largeArray, 1)).reverse()));
    });

    it('should work in a lazy sequence with a custom `_.iteratee`', () => {
        let iteratee = _.iteratee,
            pass = false;

        _.iteratee = identity;

        try {
            const actual = _(largeArray).slice(1).compact().value();
            pass = lodashStable.isEqual(actual, compact(slice(largeArray, 1)));
        } catch (e) {
            console.log(e);
        }

        assert.ok(pass);
        _.iteratee = iteratee;
    });
});
