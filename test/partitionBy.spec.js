import partitionBy from '../src/partitionBy'; 
import { identity } from './utils';

describe('partitionBy', () => {
    const array = [1, 0, 1];

    it('should split elements into two groups by the predicate', () => {
        expect(partitionBy([], identity)).toEqual({ true: [], false: [] });
        expect(partitionBy(array, value => value === 1)).toEqual({ true: [1, 1], false: [0] });
        expect(partitionBy(array, value => value === 0)).toEqual({ true: [0], false: [1, 1] });
    });

    it('should use the identity function when the predicate is nullish', () => {
        const values = [, null, undefined];
        const expected = [{ true: [1, 1], false: [0] }, { true: [1, 1], false: [0] }, { true: [1, 1], false: [0] }];

        const actual = values.map((value, index) =>
            index ? partitionBy(array, value) : partitionBy(array),
        );

        expect(actual).toEqual(expected);
    });

    it('should work with a custom predicate function', () => {
        const isEven = value => value % 2 === 0;
        const numbers = [1, 2, 3, 4, 5];

        expect(partitionBy(numbers, isEven)).toEqual({ true: [2, 4], false: [1, 3, 5] });
    });

    it('should work with a number for the predicate', () => {
        const array = [
            [1, 0],
            [0, 1],
            [1, 0],
        ];

        expect(partitionBy(array, 0)).toEqual({ true: [array[0], array[2]], false: [array[1]] });
        expect(partitionBy(array, 1)).toEqual({ true: [array[1]], false: [array[0], array[2]] });
    });

    it('should work with an object for the collection', () => {
        const collection = { a: 1.1, b: 0.2, c: 1.3 };
        const expected = { true: [1.1, 1.3], false: [0.2] };

        const actual = partitionBy(collection, Math.floor);

        expect(actual).toEqual(expected);
    });
});
