import lodashStable from 'lodash';
import after from '../src/after';

describe('after', () => {
    function testAfter(n, times) {
        let count = 0;
        lodashStable.times(
            times,
            after(n, () => {
                count++;
            }),
        );
        return count;
    }

    it('should create a function that invokes `func` after `n` calls', () => {
        // 'after(n) should invoke `func` after being called `n` times'
        expect(testAfter(5, 5)).toBe(1);
        // 'after(n) should not invoke `func` before being called `n` times'
        expect(testAfter(5, 4)).toBe(0);
        // 'after(0) should not invoke `func` immediately'
        expect(testAfter(0, 0)).toBe(0);
        // 'after(0) should invoke `func` when called once'
        expect(testAfter(0, 1)).toBe(1);
    });

    it('should coerce `n` values of `NaN` to `0`', () => {
        expect(testAfter(NaN, 1)).toBe(1);
    });

    it('should use `this` binding of function', () => {
        const afterFn = after(1, function () {
            return ++this.count;
        });
        const object = { after: afterFn, count: 0 };

        object.after();
        expect(object.after()).toBe(2);
        expect(object.count).toBe(2);
    });
});
