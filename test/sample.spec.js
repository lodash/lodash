import lodashStable from 'lodash';
import { empties, noop } from './utils';
import sample from '../src/sample';

describe('sample', () => {
    const array = [1, 2, 3];

    it('should return a random element', () => {
        const actual = sample(array);
        expect(lodashStable.includes(array, actual));
    });

    it('should return `undefined` when sampling empty collections', () => {
        const expected = lodashStable.map(empties, noop);

        const actual = lodashStable.transform(empties, (result, value) => {
            try {
                result.push(sample(value));
            } catch (e) {}
        });

        expect(actual).toEqual(expected);
    });

    it('should sample an object', () => {
        const object = { a: 1, b: 2, c: 3 };
        const actual = sample(object);

        expect(lodashStable.includes(array, actual));
    });
});
