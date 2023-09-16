import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, isEven, stubTrue } from './utils';

describe('negate', () => {
    it('should create a function that negates the result of `func`', () => {
        const negate = _.negate(isEven);

        assert.strictEqual(negate(1), true);
        assert.strictEqual(negate(2), false);
    });

    it('should create a function that negates the result of `func`', () => {
        const negate = _.negate(isEven);

        assert.strictEqual(negate(1), true);
        assert.strictEqual(negate(2), false);
    });

    it('should create a function that accepts multiple arguments', () => {
        let argCount,
            count = 5,
            negate = _.negate(function () {
                argCount = arguments.length;
            }),
            expected = lodashStable.times(count, stubTrue);

        const actual = lodashStable.times(count, (index) => {
            switch (index) {
                case 0:
                    negate();
                    break;
                case 1:
                    negate(1);
                    break;
                case 2:
                    negate(1, 2);
                    break;
                case 3:
                    negate(1, 2, 3);
                    break;
                case 4:
                    negate(1, 2, 3, 4);
            }
            return argCount == index;
        });

        assert.deepStrictEqual(actual, expected);
    });
});
