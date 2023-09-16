import assert from 'node:assert';
import lodashStable from 'lodash';
import { args, strictArgs, falsey, stubFalse, slice, noop, symbol, realm } from './utils';
import isArguments from '../src/isArguments';

describe('isArguments', () => {
    it('should return `true` for `arguments` objects', () => {
        assert.strictEqual(isArguments(args), true);
        assert.strictEqual(isArguments(strictArgs), true);
    });

    it('should return `false` for non `arguments` objects', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isArguments(value) : isArguments(),
        );

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isArguments([1, 2, 3]), false);
        assert.strictEqual(isArguments(true), false);
        assert.strictEqual(isArguments(new Date()), false);
        assert.strictEqual(isArguments(new Error()), false);
        assert.strictEqual(isArguments(slice), false);
        assert.strictEqual(isArguments({ '0': 1, callee: noop, length: 1 }), false);
        assert.strictEqual(isArguments(1), false);
        assert.strictEqual(isArguments(/x/), false);
        assert.strictEqual(isArguments('a'), false);
        assert.strictEqual(isArguments(symbol), false);
    });

    it('should work with an `arguments` object from another realm', () => {
        if (realm.arguments) {
            assert.strictEqual(isArguments(realm.arguments), true);
        }
    });
});
