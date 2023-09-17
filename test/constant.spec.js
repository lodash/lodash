import lodashStable from 'lodash';
import { empties, _, falsey, stubTrue } from './utils';

describe('constant', () => {
    it('should create a function that returns `value`', () => {
        const object = { a: 1 };
        const values = Array(2).concat(empties, true, 1, 'a');
        const constant = _.constant(object);

        const results = lodashStable.map(values, (value, index) => {
            if (index < 2) {
                return index ? constant.call({}) : constant();
            }
            return constant(value);
        });

        expect(lodashStable.every(results, (result) => result === object));
    });

    it('should work with falsey values', () => {
        const expected = lodashStable.map(falsey, stubTrue);

        const actual = lodashStable.map(falsey, (value, index) => {
            const constant = index ? _.constant(value) : _.constant();
            const result = constant();

            return result === value || (result !== result && value !== value);
        });

        expect(actual).toEqual(expected);
    });

    it('should return a wrapped value when chaining', () => {
        const wrapped = _(true).constant();
        expect(wrapped instanceof _);
    });
});
