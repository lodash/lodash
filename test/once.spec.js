import { _ } from './utils';

describe('once', () => {
    it('should invoke `func` once', () => {
        let count = 0;
        const once = _.once(() => ++count);

        once();
        expect(once()).toBe(1);
        expect(count).toBe(1);
    });

    it('should ignore recursive calls', () => {
        let count = 0;

        var once = _.once(() => {
            once();
            return ++count;
        });

        expect(once()).toBe(1);
        expect(count).toBe(1);
    });

    it('should not throw more than once', () => {
        const once = _.once(() => {
            throw new Error();
        });

        assert.throws(once);

        once();
        expect(true);
    });
});
