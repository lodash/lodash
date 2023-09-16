import assert from 'node:assert';
import { _ } from './utils';

describe('once', () => {
    it('should invoke `func` once', () => {
        let count = 0,
            once = _.once(() => ++count);

        once();
        assert.strictEqual(once(), 1);
        assert.strictEqual(count, 1);
    });

    it('should ignore recursive calls', () => {
        let count = 0;

        var once = _.once(() => {
            once();
            return ++count;
        });

        assert.strictEqual(once(), 1);
        assert.strictEqual(count, 1);
    });

    it('should not throw more than once', () => {
        const once = _.once(() => {
            throw new Error();
        });

        assert.throws(once);

        once();
        assert.ok(true);
    });
});
