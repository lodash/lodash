import assert from 'node:assert';
import { _, stubA } from './utils';

describe('now', () => {
    it('should return the number of milliseconds that have elapsed since the Unix epoch', (done) => {
        const stamp = +new Date(),
            actual = _.now();

        assert.ok(actual >= stamp);

        setTimeout(() => {
            assert.ok(_.now() > actual);
            done();
        }, 32);
    });

    it('should work with mocked `Date.now`', () => {
        const now = Date.now;
        Date.now = stubA;

        const actual = _.now();
        Date.now = now;

        assert.strictEqual(actual, 'a');
    });
});
