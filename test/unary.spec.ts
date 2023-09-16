import assert from 'node:assert';
import lodashStable from 'lodash';
import { slice } from './utils';
import unary from '../src/unary';

describe('unary', () => {
    function fn() {
        return slice.call(arguments);
    }

    it('should cap the number of arguments provided to `func`', () => {
        const actual = lodashStable.map(['6', '8', '10'], unary(parseInt));
        assert.deepStrictEqual(actual, [6, 8, 10]);
    });

    it('should not force a minimum argument count', () => {
        const capped = unary(fn);
        assert.deepStrictEqual(capped(), []);
    });

    it('should use `this` binding of function', () => {
        const capped = unary(function (a, b) {
                return this;
            }),
            object = { capped: capped };

        assert.strictEqual(object.capped(), object);
    });
});
