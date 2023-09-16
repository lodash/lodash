import assert from 'node:assert';
import lodashStable from 'lodash';
import uniqueId from '../src/uniqueId';

describe('uniqueId', () => {
    it('should generate unique ids', () => {
        const actual = lodashStable.times(1000, () => uniqueId());

        assert.strictEqual(lodashStable.uniq(actual).length, actual.length);
    });

    it('should return a string value when not providing a `prefix`', () => {
        assert.strictEqual(typeof uniqueId(), 'string');
    });

    it('should coerce the prefix argument to a string', () => {
        const actual = [uniqueId(3), uniqueId(2), uniqueId(1)];
        assert.ok(/3\d+,2\d+,1\d+/.test(actual));
    });
});
