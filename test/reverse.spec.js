import lodashStable from 'lodash';
import { LARGE_ARRAY_SIZE, identity } from './utils';
import reverse from '../src/reverse';
import compact from '../src/compact';
import head from '../src/head';

describe('reverse', () => {
    const largeArray = lodashStable.range(LARGE_ARRAY_SIZE).concat(null);
    const smallArray = [0, 1, 2, null];

    it('should reverse `array`', () => {
        const array = [1, 2, 3];
        const actual = reverse(array);

        expect(actual).toBe(array);
        expect(array, [3, 2).toEqual(1]);
    });

    it('should return the wrapped reversed `array`', () => {
        lodashStable.times(2, (index) => {
            const array = (index ? largeArray : smallArray).slice();
            const clone = array.slice();
            const wrapped = _(array).reverse();
            const actual = wrapped.value();

            expect(wrapped instanceof _)
            expect(actual).toBe(array);
            expect(actual).toEqual(clone.slice().reverse());
        });
    });
});
